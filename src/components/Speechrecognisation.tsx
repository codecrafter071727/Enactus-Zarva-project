import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  AlertTriangle,
  Mic,
  Square,
  Trash2,
  Volume2,
  Shield,
  AlertCircle,
} from "lucide-react";

type Alert = {
  type: string;
  content: string;
  timestamp: string;
  severity: string;
};

type Recording = {
  url: string;
  blob: Blob;
  timestamp: string;
  transcript: string;
  language: string;
  alerts: Alert[];
};

type Language = {
  code: string;
  name: string;
};

type AnalysisResult = {
  average: number;
  highFreqIntensity: number;
  isDistress: boolean;
};

type RecognitionInstance = {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  onstart?: () => void;
  onerror?: (event: { error: string }) => void;
  onend?: () => void;
  onresult?: (event: { results: SpeechRecognitionResultList; resultIndex: number }) => void;
};

declare global {
  interface Window {
    webkitSpeechRecognition?: {
      new (): RecognitionInstance;
    };
    AudioContext?: AudioContext;
    webkitAudioContext?: AudioContext;
  }
}

const SpeechRecognition: React.FC = () => {
  const [isListening, setIsListening] = useState(false);
  const [finalTranscript, setFinalTranscript] = useState("");
  const [interimTranscript, setInterimTranscript] = useState("");
  const [error, setError] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("en-US");
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [recordings, setRecordings] = useState<Recording[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);

  const recognitionRef = useRef<RecognitionInstance | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);

  const harmfulWords: string[] = [
    "kill",
    "die",
    "hate",
    "murder",
    "hurt",
    "harm",
    "threat",
    "attack",
    "destroy",
    "help",
    "stranger",
    "Pink, pink, pink.",
    "pink, pink, pink.",
    "मदद",
    "मदद |",
    "हत्या",
    "घृणा",
    "आक्रमण",
    "धमकी",
    "विनाश",
    "क्षति",
    "मरना",
    "दर्द",
    "अपराध",
    "संत्रास",
    "विनाशकारी",
    "शिकार",
    "शत्रु",
    "उत्पीड़न",
    "आतंक",
    "बदला",
    "नफरत",
    "घायल",
    "टूटना",
    "हिंसा",
    "खतरा",
    "कष्ट",
    "बेहद",
    "बुरा",
    "दुष्ट",
    "कुप्रभाव",
    "विष",
    "बदनाम",
    "अप्रिय",
    "खराब",
    "संदेह",
    "बिगड़ना",
    "धोखा",
    "बिगड़ता",
    "बचाओ",
    "मदद।",
  ];

  const languages: Language[] = [
    { code: "en-US", name: "English (US)" },
    { code: "hi-IN", name: "Hindi" },
    { code: "es-ES", name: "Spanish" },
    { code: "fr-FR", name: "French" },
    { code: "de-DE", name: "German" },
    { code: "it-IT", name: "Italian" },
    { code: "ja-JP", name: "Japanese" },
  ];

  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [toNumber, setToNumber] = useState("+919835428707");
  const [message, setMessage] = useState(
    "This is an automated call from the distress detection system. The User is in distress please contact them as soon as possible."
  );

  const initiateCall = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/twilio-call", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: toNumber,
          message,
        }),
      });
      const data = await response.json();
      console.log(data);
      setStatus(`Call initiated: ${data.sid}`);
    } catch (error) {
      setStatus("Error making call");
    }
  };

  const initiatemessage = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/twilio-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: toNumber,
          messageText: message,
        }),
      });
      const data = await response.json();
      console.log(data);
      setStatus(`Message sent: ${data.sid}`);
    } catch (error) {
      setStatus("Error sending message");
    }
  };

  const initiatewhatsappmessage = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/twilio-send-whatsappmessage",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            to: toNumber,
            whatsappmessage: message,
          }),
        }
      );
      const data = await response.json();
      console.log(data);
      setStatus(`WhatsApp message sent: ${data.sid}`);
    } catch (error) {
      setStatus("Error sending WhatsApp message");
    }
  };

  const checkHarmfulContent = useCallback(
    (text: string) => {
      const words = text.toLowerCase().split(/\s+/);
      const foundHarmfulWords = words.filter((word) =>
        harmfulWords.some((harmfulWord) => word.includes(harmfulWord))
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
          },
        ]);
        initiateCall();
        initiatemessage();
        initiatewhatsappmessage();
      }
    },
    [harmfulWords]
  );

  const analyzeAudioData = useCallback(
    (dataArray: Uint8Array, bufferLength: number): AnalysisResult => {
      const average = dataArray.reduce((a, b) => a + b) / bufferLength;
      const highFreqData = dataArray.slice(Math.floor(bufferLength * 0.7));
      const highFreqIntensity =
        highFreqData.reduce((a, b) => a + b) / highFreqData.length;

      return {
        average,
        highFreqIntensity,
        isDistress: highFreqIntensity > 200 && average > 150,
      };
    },
    []
  );

  const setupAudioAnalysis = useCallback(
    (stream: MediaStream) => {
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

          analyserRef.current!.getByteFrequencyData(dataArray);
          const analysis = analyzeAudioData(dataArray, bufferLength);

          if (analysis.isDistress) {
            const timestamp = new Date().toLocaleString();
            setAlerts((prev) => {
              if (
                prev.length &&
                new Date(timestamp).getTime() -
                  new Date(prev[prev.length - 1].timestamp).getTime() <
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
      } catch (err: any) {
        console.error("Audio analysis setup failed:", err);
        setError("Audio analysis setup failed: " + err.message);
      }
    },
    [isListening, analyzeAudioData]
  );

  const createSpeechRecognition = useCallback(() => {
    if ("webkitSpeechRecognition" in window) {
      const recognition = new window.webkitSpeechRecognition!();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = selectedLanguage;
      return recognition;
    }
    return null;
  }, [selectedLanguage]);

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
    } catch (err: any) {
      setError("Error accessing microphone: " + err.message);
    }
  };

  const startListening = useCallback(async () => {
    setError("");
    const recognition = createSpeechRecognition();
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
          final += event.results[i][0].transcript;
          checkHarmfulContent(event.results[i][0].transcript);
        } else {
          interim += event.results[i][0].transcript;
        }
      }

      setFinalTranscript((prev) => prev + final);
      setInterimTranscript(interim);
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
        const filename = `recording_${recording.timestamp.replace(
          /[/:]/g,
          "_"
        )}_${recording.language}.webm`;

        const url = URL.createObjectURL(recording.blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();

        setTimeout(() => {
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        }, 100);
      }
    }
  }, [recordings]);

  const downloadTranscript = useCallback(() => {
    if (finalTranscript) {
      const timestamp = new Date().toLocaleString().replace(/[/:]/g, "_");
      const filename = `transcript_${timestamp}_${selectedLanguage}.txt`;

      const blob = new Blob([finalTranscript], { type: "text/plain" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();

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
      downloadRecording();
      downloadTranscript();
    }, 2000);
  }, [recordings, downloadRecording, downloadTranscript]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }

    if (mediaRecorder && mediaRecorder.state !== "inactive") {
      mediaRecorder.stop();
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    setIsListening(false);
  }, [mediaRecorder]);

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
  
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-white flex items-center justify-center p-4 relative overflow-hidden flex-col">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Secure Voice Recorder</h1>
          <div className="flex items-center justify-center gap-2 text-indigo-600">
            <Shield className="w-5 h-5" />
            <span className="text-lg">Safety-First Voice Recording</span>
          </div>
        </div>
        <div className="p-6 max-w-xl mx-auto bg-white shadow-lg rounded-lg w-full">
          <div className="space-y-4">
            {/* Language Selector */}
            <div className="flex items-center gap-4 mb-6">
              <label htmlFor="language" className="font-medium text-gray-700">
                Select Language:
              </label>
              <select
                id="language"
                className="p-2 border rounded-md bg-white"
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
            <div className="flex gap-4 mb-6 ">
              <button
                onClick={isListening ? stopListening : startListening}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium text-white transition-all ${
                  isListening ? 'bg-red-500 hover:bg-red-600' : 'bg-indigo-600 hover:bg-indigo-700'
                } shadow-lg hover:scale-105`}
              >
                {isListening ? (
                  <>
                    <Square className="w-5 h-5" />
                    Stop Recording
                  </>
                ) : (
                  <>
                    <Mic className="w-5 h-5" />
                    Start Recording
                  </>
                )}
              </button>
  
              <button
                onClick={clearTranscript}
                className="flex items-center gap-2 px-6 py-3 rounded-full font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-all"
              >
                <Trash2 className="w-5 h-5" />
                Clear
              </button>
            </div>
  
            {/* Status and Error Messages */}
            {isListening && (
              <div className="text-green-600 flex items-center gap-2">
                <span className="animate-pulse">●</span> Listening...
              </div>
            )}
            {error && <div className="text-red-500 p-2 bg-red-50 rounded-md">{error}</div>}
  
            {/* Alerts Section */}
            {alerts.length > 0 && (
              <div className="mt-4 p-4 bg-red-50 rounded-md">
                <h3 className="font-medium text-red-700 mb-2">Content Alerts:</h3>
                <div className="space-y-2">
                  {alerts.map((alert, index) => (
                    <div key={index} className="text-red-600 text-sm p-2 bg-red-100 rounded">
                      <span className="font-medium">{alert.timestamp}</span>: {alert.type === 'harmful_words' ? `Harmful content detected: ${alert.content}` : alert.content}
                    </div>
                  ))}
                </div>
              </div>
            )}
  
            {/* Transcripts */}
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-md min-h-[100px]">
                <h3 className="font-medium mb-2">Final Transcript:</h3>
                <p className="whitespace-pre-wrap">{finalTranscript}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-md min-h-[50px]">
                <h3 className="font-medium mb-2">Interim Transcript:</h3>
                <p className="text-gray-600 italic">{interimTranscript}</p>
              </div>
            </div>
  
            {/* Recordings */}
            {recordings.length > 0 && (
              <div className="space-y-4 mt-6">
                <h3 className="font-medium text-lg">Last Recording:</h3>
                {recordings.map((recording, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-md">
                    <div className="mb-2">
                      <span className="text-sm text-gray-600">
                        {recording.timestamp} (
                        {languages.find((l) => l.code === recording.language)?.name})
                      </span>
                    </div>
                    <audio controls src={recording.url} className="w-full mb-2" autoPlay />
                    {recording.transcript && (
                      <div className="text-sm text-gray-700 mt-2">
                        <strong>Transcript:</strong> {recording.transcript}
                      </div>
                    )}
                    {recording.alerts && recording.alerts.length > 0 && (
                      <div className="mt-2 text-sm text-red-600 bg-red-50 p-2 rounded">
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
    );
  };
  
  export default SpeechRecognition;
