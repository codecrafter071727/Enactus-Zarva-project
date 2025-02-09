import React, { useState, useEffect, useCallback, useRef } from "react";
// import SecureSharing from "./SecureSharing";
// import AudioSegmentation from "./AudioSegmentation";
import RestrictedWordsInput from "./Addsafetyword";
import PhoneNumberForm from "./PhoneNumber";

import {
  Mic,
  Square,
  Trash2,
  Shield,
} from "lucide-react";

const SpeechRecognition = () => {
  const [location, setLocation] = useState(null);
  
  
    const API_KEY = "AIzaSyALQLhxgvllyOzJiTgr467C8u3oUPtr_Rk";
    const [message, setMessage] = useState(
      "This is an automated call from ZARVA speech recogition system the following user:(name) is in danger kindly try to reach them we have also called the police."
    ); //This is an automated call from the distress detection system. Please respond if you need help.
    
  
   
  // State management
  const [isListening, setIsListening] = useState(false);
  const [finalTranscript, setFinalTranscript] = useState("");
  const [interimTranscript, setInterimTranscript] = useState("");
  const [error, setError] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("en-US");
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recordings, setRecordings] = useState([]);
  const [alerts, setAlerts] = useState([]);

  // Refs
  const recognitionRef = useRef(null);
  const streamRef = useRef(null);
  const chunksRef = useRef([]);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);

  // Constants
  const harmfulWords = [
    "kill", // English
    "die", // English
    "hate", // English
    "murder", // English
    "hurt", // English
    "harm", // English
    "threat", // English
    "attack", // English
    "destroy", // English
    "help", // English
    "stranger", // English
    "Pink, pink, pink.", // English
    "pink, pink, pink.", // English
    "मदद", // Hindi (help)
    "मदद |",
    "हत्या", // Hindi (murder)
    "घृणा", // Hindi (hate)
    "आक्रमण", // Hindi (attack)
    "धमकी", // Hindi (threat)
    "विनाश", // Hindi (destroy)
    "क्षति", // Hindi (harm)
    "मरना", // Hindi (die)
    "दर्द", // Hindi (hurt)
    "अपराध", // Hindi (crime)
    "संत्रास", // Hindi (terror)
    "विनाशकारी", // Hindi (devastating)
    "शिकार", // Hindi (prey)
    "शत्रु", // Hindi (enemy)
    "उत्पीड़न", // Hindi (abuse)
    "आतंक", // Hindi (fear)
    "बदला", // Hindi (revenge)
    "नफरत", // Hindi (loathe)
    "घायल", // Hindi (injure)
    "टूटना", // Hindi (break)
    "हिंसा", // Hindi (violence)
    "खतरा", // Hindi (danger)
    "कष्ट", // Hindi (pain)
    "बेहद", // Hindi (extreme)
    "बुरा", // Hindi (bad)
    "दुष्ट", // Hindi (evil)
    "कुप्रभाव", // Hindi (adverse)
    "विष", // Hindi (poison)
    "बदनाम", // Hindi (notorious)
    "अप्रिय", // Hindi (unpleasant)
    "खराब", // Hindi (poor)
    "संदेह", // Hindi (doubt)
    "बिगड़ना", // Hindi (spoil)
    "धोखा", // Hindi (betrayal)
    "बिगड़ता", // Hindi (deteriorate)
    "बचाओ", // Hindi (save)
    "मदद।", // Hindi (help)
  ];

  const languages = [
    { code: "en-US", name: "English (US)" },
    { code: "hi-IN", name: "Hindi" },
    { code: "es-ES", name: "Spanish" },
    { code: "fr-FR", name: "French" },
    { code: "de-DE", name: "German" },
    { code: "it-IT", name: "Italian" },
    { code: "ja-JP", name: "Japanese" },
  ];

  const [status, setStatus] = useState("");
  
  const [toNumber, setToNumber] = useState(localStorage.getItem("phone")); //+919835428707
  const [toNumber1, setToNumber1] = useState(localStorage.getItem("phone1")); //+919835428707
  
  const initiateCall = async (newmessage) => {
    try {
      
      const response = await fetch("https://twilio-backend-epvs.onrender.com/api/twilio-call", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: toNumber,
          message: newmessage,
        }),
      });

      const data = await response.json();
      console.log(data);
      setStatus(`Call initiated: ${data.sid}`);
    } catch (error) {
      setStatus("Error making call");
    }
  };
  const initiateCall1 = async (newmessage) => {
    try {
      
      const response = await fetch("https://twilio-backend-epvs.onrender.com/api/twilio-call", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: toNumber1,
          message: newmessage,
        }),
      });

      const data = await response.json();
      console.log(data);
      setStatus(`Call initiated: ${data.sid}`);
    } catch (error) {
      setStatus("Error making call");
    }
  };
  const initiatemessage = async (newmessage) => {
    try {
      console.log(toNumber);
      const response = await fetch("https://twilio-backend-epvs.onrender.com/api/twilio-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: toNumber,
          messageText: newmessage,
        }),
      });

      const data = await response.json();
      console.log(data);
      setStatus(`Call initiated: ${data.sid}`);
    } catch (error) {
      setStatus("Error making call");
    }
  };
  const initiatemessage1 = async (newmessage) => {
    try {
      console.log(toNumber1);
      const response = await fetch("https://twilio-backend-epvs.onrender.com/api/twilio-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: toNumber1,
          messageText: newmessage,
        }),
      });

      const data = await response.json();
      console.log(data);
      setStatus(`Call initiated: ${data.sid}`);
    } catch (error) {
      setStatus("Error making call");
    }
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      
    }
  };

  const showPosition = (position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    console.log(lat, lon);
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${API_KEY}`;
    
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.status === "OK") {
          const result = data.results[0];
          const locality = result.address_components.find(comp => 
            comp.types.includes("locality")
          );
          
          setLocation({
            latitude: lat,
            longitude: lon,
            formattedAddress: result.formatted_address,
            locality: locality ? locality.long_name : "Not found" 
          });
          console.log(result.formatted_address);
          
          setMessage(`Location: ${result.formatted_address}`);
          initiateCall(`Location: ${result.formatted_address}`);
          initiateCall1(`Location: ${result.formatted_address}`);
          initiatemessage(`Location: ${result.formatted_address}`);
          initiatemessage1(`Location: ${result.formatted_address}`);
          console.log(`Location: ${result.formatted_address}`);
        } else {
          
        }
      })
      .catch(error => setError(`Error fetching location: ${error.message}`));
  };
  // Add calling functionality
  
  //New
  const [savedWords, setSavedWords] = useState([]);
 // Load saved words from localStorage
 useEffect(() => {
  const loadSavedWords = () => {
    const stored = localStorage.getItem('savedWords');
    if (stored) {
      setSavedWords(JSON.parse(stored));
    }
  };
  
  loadSavedWords();
  // Listen for storage changes in other tabs
  window.addEventListener('storage', loadSavedWords);
  return () => window.removeEventListener('storage', loadSavedWords);
}, []);

const checkHarmfulContent = useCallback((text, options = { checkSpeech: false }) => {
  const words = text.toLowerCase().split(/\s+/);
  
  // Combine default harmful words with saved words from localStorage
  const allHarmfulWords = [...harmfulWords, ...savedWords];
  
  const foundHarmfulWords = words.filter((word) =>
    allHarmfulWords.some((harmfulWord) => word.includes(harmfulWord))
  );

  if (foundHarmfulWords.length > 0) {
    const timestamp = new Date().toLocaleString();
    setAlerts((prev) => [
      ...prev,
      {
        type: "harmful_words",
        content: foundHarmfulWords.join(", "),
        timestamp,
        severity: "high",
        source: options.checkSpeech ? 'speech' : 'text'
      },
    ]);
    getLocation();
    
    // initiateCall();
    // initiatemessage();
  }
}, [savedWords]);

  const analyzeAudioData = useCallback((dataArray, bufferLength) => {
    const average = dataArray.reduce((a, b) => a + b) / bufferLength;
    const highFreqData = dataArray.slice(Math.floor(bufferLength * 0.7));
    const highFreqIntensity =
      highFreqData.reduce((a, b) => a + b) / highFreqData.length;

    return {
      average,
      highFreqIntensity,
      isDistress: highFreqIntensity > 200 && average > 150,
    };
  }, []);

  // Audio analysis setup
  const setupAudioAnalysis = useCallback(
    (stream) => {
      try {
        if (!audioContextRef.current) {
          audioContextRef.current = new (window.AudioContext ||
            window.webkitAudioContext)();
        }

        analyserRef.current = audioContextRef.current.createAnalyser();
        analyserRef.current.fftSize = 2048;

        const source = audioContextRef.current.createMediaStreamSource(stream);
        source.connect(analyserRef.current);

        const bufferLength = analyserRef.current.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const checkAudioLevels = () => {
          if (!isListening) return;

          analyserRef.current.getByteFrequencyData(dataArray);
          const analysis = analyzeAudioData(dataArray, bufferLength);

          if (analysis.isDistress) {
            const timestamp = new Date().toLocaleString();
            setAlerts((prev) => {
              // Prevent alert spam by checking last alert time
              if (
                prev.length &&
                new Date(timestamp) -
                  new Date(prev[prev.length - 1].timestamp) <
                  2000
              ) {
                return prev;
              }
              return [
                ...prev,
                {
                  type: "distress_sound",
                  content: "Potential distress sound detected",
                  timestamp,
                  severity: "high",
                },
              ];
            });
          }

          requestAnimationFrame(checkAudioLevels);
        };

        checkAudioLevels();
      } catch (err) {
        console.error("Audio analysis setup failed:", err);
        setError("Audio analysis setup failed: " + err.message);
      }
    },
    [isListening, analyzeAudioData]
  );

  // Speech Recognition setup
  const createSpeechRecognition = useCallback(() => {
    if ("webkitSpeechRecognition" in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = selectedLanguage;
      return recognition;
    }
    return null;
  }, [selectedLanguage]);

  // Recording handlers
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      chunksRef.current = [];

      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      recorder.onstop = () => {
        const audioBlob = new Blob(chunksRef.current, { type: "audio/webm" });
        const url = URL.createObjectURL(audioBlob);

        setRecordings((prev) => {
          // Clean up previous recording URLs
          prev.forEach((recording) => URL.revokeObjectURL(recording.url));

          return [
            {
              url,
              blob: audioBlob,
              timestamp: new Date().toLocaleString(),
              transcript: finalTranscript,
              language: selectedLanguage,
              alerts: [...alerts],
            },
          ];
        });
      };

      recorder.start(1000);
    } catch (err) {
      setError("Error accessing microphone: " + err.message);
    }
  };

  // Speech recognition handlers
  const startListening = useCallback(async () => {
    setError("");
    const recognition = createSpeechRecognition();
    const phoneNumber = localStorage.getItem("phone");
    if (!phoneNumber) {
      setError("Please enter a Safe words and loved one's contact phone number before starting the recording.");
      toggleComponent("phone")
      return;
    }
    const phoneNumber1 = localStorage.getItem("phone1");
    if (!phoneNumber1) {
      setError("Please enter an emergency contact phone number before starting the recording.");
      toggleComponent("phone")
      return;
    }
    if (!recognition) {
      setError("Speech recognition is not supported in your browser.");
      return;
    }

    recognitionRef.current = recognition;
    await startRecording();

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onerror = (event) => {
      setError(`Error occurred: ${event.error}`);
    };

    recognition.onend = () => {
      if (isListening) {
        recognition.start();
      }
    };

    recognition.onresult = (event) => {
      let interim = "";
      let final = "";
  
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          final += event.results[i][0].transcript.toLowerCase();
          checkHarmfulContent(event.results[i][0].transcript.toLowerCase());
        } else {
          interim += event.results[i][0].transcript.toLowerCase();
        }
      }
  
      setFinalTranscript((prev) => (prev + final).toLowerCase());
      setInterimTranscript(interim.toLowerCase());
    };

    recognition.start();
  }, [
    createSpeechRecognition,
    checkHarmfulContent,
    isListening,
    startRecording,
  ]);
  const downloadRecording = useCallback(() => {
    if (recordings.length > 0) {
      const recording = recordings[recordings.length - 1];

      if (recording.blob) {
        // Create a unique filename based on timestamp and language
        const filename = `recording_${recording.timestamp.replace(
          /[/:]/g,
          "_"
        )}_${recording.language}.webm`;

        // Create a link element and trigger download
        const url = URL.createObjectURL(recording.blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();

        // Clean up
        setTimeout(() => {
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        }, 100);
      }
    }
  }, [recordings]);

  const downloadTranscript = useCallback(() => {
    if (finalTranscript) {
      // Create a unique filename based on timestamp and language
      const timestamp = new Date().toLocaleString().replace(/[/:]/g, "_");
      const filename = `transcript_${timestamp}_${selectedLanguage}.txt`;

      // Create a text file with the transcript
      const blob = new Blob([finalTranscript], { type: "text/plain" });
      const url = URL.createObjectURL(blob);

      // Create a link element and trigger download
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();

      // Clean up
      setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 100);
    }
  }, [finalTranscript, selectedLanguage]);
  const clearTranscript = useCallback(() => {
    setFinalTranscript("");
    setInterimTranscript("");
    setAlerts([]);

    recordings.forEach((recording) => {
      URL.revokeObjectURL(recording.url);
    });
    setRecordings([]);
    setTimeout(() => {
      downloadRecording(); // Always download audio
      downloadTranscript(); // Always download transcript
    }, 2000); // Slightly increased timeout for reliability
  }, [recordings, downloadRecording, downloadTranscript]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }

    if (mediaRecorder && mediaRecorder.state !== "inactive") {
      mediaRecorder.stop();

      // Ensure both audio and transcript are downloaded
      // Slightly increased timeout for reliability
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    setIsListening(false);
  }, [mediaRecorder]);

  // Initial setup and cleanup
  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) {
      setError("Speech recognition is not supported in your browser.");
    }

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
      recordings.forEach((recording) => {
        URL.revokeObjectURL(recording.url);
      });
    };
  }, [recordings]);

  const [activeComponent, setActiveComponent] = useState(null);
  const toggleComponent = (component) => {
    setActiveComponent(activeComponent === component ? null : component);
  };
  
  return (
    <div className="min-h-screen p-4 overflow-x-hidden bg-gradient-to-br from-[#615839] via-gray-900 to-[#736638] "  >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Settings */}
        <div className="w-full flex justify-center items-center flex-col">
        <div className="flex gap-4 justify-center items-center">
        <button
          onClick={() => toggleComponent("restricted")}
          className={`px-4 py-2 rounded-lg font-medium transition-colors bg-gradient-to-t from-gray-700 to-black shadow-xl text-white hover:bg-blue-600 
            ${activeComponent === "restricted" ? "bg-blue-500" : ""}`}
        >
          Add Safe Words
        </button>
        <button
          onClick={() => toggleComponent("phone")}
          className={`px-4 py-2 rounded-lg font-medium transition-colors bg-gradient-to-t from-gray-700 to-black shadow-xl text-white hover:bg-blue-600 
            ${activeComponent === "phone" ? "bg-blue-500" : ""}`}
        >
          Add loved One's Number
        </button>
      </div>

      <div className="mt-4 w-full max-w-md">
        {activeComponent === "restricted" && <RestrictedWordsInput />}
        {activeComponent === "phone" && <PhoneNumberForm />}
      </div>
        </div>

        {/* Right Column - Recording Interface */}
        <div className="w-full min-h-full flex justify-center items-center p-6 rounded-2xl">
      <div className="bg-gradient-to-t from-gray-700 to-black shadow-xl rounded-2xl p-6 md:p-8 lg:p-10 w-full">

            <div className="text-center mb-6">
              <h1 className="text-2xl md:text-4xl font-bold text-white mb-4">
                Secure Voice Recorder
              </h1>
              <div className="flex items-center justify-center gap-2 text-[#b0a26d]">
                <Shield className="w-4 h-4 md:w-5 md:h-5" />
                <span className="text-base md:text-lg">Safety-First Voice Recording</span>
              </div>
            </div>

            {/* Language Selector */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mb-6">
              <label htmlFor="language" className="font-medium text-[#e3d39b]">
                Select Language:
              </label>
              <select
                id="language"
                className="w-full sm:w-auto p-2 border rounded-md bg-black text-[#776d47]"
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Control Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <button
                onClick={isListening ? stopListening : startListening}
                className={`flex items-center justify-center gap-2 px-4 py-3 rounded-full font-medium text-white transition-all w-full sm:w-auto ${
                  isListening
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-[#665c3b] hover:bg-[#d5c58a]"
                } shadow-lg hover:scale-105`}
              >
                {isListening ? (
                  <>
                    <Square className="w-4 h-4 md:w-5 md:h-5" />
                   Recording
                  </>
                ) : (
                  <>
                    <Mic className="w-4 h-4 md:w-5 md:h-5" />
                    Recording
                  </>
                )}
              </button>

              <button
                onClick={clearTranscript}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-full font-medium text-gray-100 bg-gray-700 hover:bg-gray-700 transition-all w-full sm:w-auto"
              >
                <Trash2 className="w-4 h-4 md:w-5 md:h-5" />
                Clear
              </button>
            </div>

            {/* Status and Errors */}
            {isListening && (
              <div className="text-green-600 flex items-center gap-2 text-sm md:text-base">
                <span className="animate-pulse">●</span> Listening...
              </div>
            )}
            {error && (
              <div className="text-red-500 p-2 bg-red-50 rounded-md text-sm md:text-base">
                {error}
              </div>
            )}

            {/* Alerts Section */}
            {alerts.length > 0 && (
              <div className="mt-4 p-3 md:p-4 bg-red-50 rounded-md">
                <h3 className="font-medium text-red-700 mb-2 text-sm md:text-base">
                  Content Alerts:
                </h3>
                <div className="space-y-2">
                  {alerts.map((alert, index) => (
                    <div
                      key={index}
                      className="text-red-600 text-xs md:text-sm p-2 bg-red-100 rounded"
                    >
                      <span className="font-medium">{alert.timestamp}</span>:{" "}
                      {alert.type === "harmful_words"
                        ? `Harmful content detected: ${alert.content}`
                        : alert.content}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Transcripts */}
            <div className="space-y-4 mt-4" >  
              <div className="p-3 md:p-4 bg-gray-50 rounded-md min-h-[100px]">
                <h3 className="font-medium mb-2 text-sm md:text-base">Final Transcript:</h3>
                <p className="whitespace-pre-wrap text-sm md:text-base text-black">{finalTranscript}</p>
              </div>
              <div className="p-3 md:p-4 bg-gray-50 rounded-md min-h-[50px]">
                <h3 className="font-medium mb-2 text-sm md:text-base">Interim Transcript:</h3>
                <p className="text-gray-600 italic text-sm md:text-base ">{interimTranscript}</p>
              </div>
            </div>

            {/* Recordings */}
            {recordings.length > 0 && (
              <div className="space-y-4 mt-6">
                <h3 className="font-medium text-base md:text-lg">Last Recording:</h3>
                {recordings.map((recording, index) => (
                  <div key={index} className="p-3 md:p-4 bg-gray-50 rounded-md">
                    <div className="mb-2">
                      <span className="text-xs md:text-sm text-gray-600">
                        {recording.timestamp} (
                        {languages.find((l) => l.code === recording.language)?.name})
                      </span>
                    </div>
                    <audio
                      controls
                      src={recording.url}
                      className="w-full mb-2"
                      autoPlay
                    />
                    {recording.transcript && (
                      <div className="text-xs md:text-sm text-gray-700 mt-2">
                        <strong>Transcript:</strong> {recording.transcript}
                      </div>
                    )}
                    {recording.alerts && recording.alerts.length > 0 && (
                      <div className="mt-2 text-xs md:text-sm text-red-600 bg-red-50 p-2 rounded">
                        <strong>Alerts during recording:</strong>
                        <ul className="list-disc pl-4 mt-1">
                          {recording.alerts.map((alert, alertIndex) => (
                            <li key={alertIndex}>
                              {alert.timestamp}: {alert.content}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpeechRecognition;
