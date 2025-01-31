import React, { useState, useRef } from 'react';
import { ArrowLeft, Mic, Square, Download } from 'lucide-react';

export function VoiceRecognition({ onBack }: { onBack: () => void }) {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingComplete, setRecordingComplete] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        chunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = () => {
        setRecordingComplete(true);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error('Error accessing microphone:', err);
      alert('Unable to access microphone. Please check your permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const downloadRecording = () => {
    const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'recording.webm';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={onBack}
        className="flex items-center text-purple-600 mb-6 hover:text-purple-700 transition"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Features
      </button>

      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <h3 className="text-2xl font-bold mb-6">Voice Recording</h3>
        
        <div className="space-y-6">
          <div className="flex justify-center">
            {!isRecording ? (
              <button
                onClick={startRecording}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-full hover:opacity-90 transition"
                disabled={recordingComplete}
              >
                <Mic className="w-8 h-8" />
              </button>
            ) : (
              <button
                onClick={stopRecording}
                className="bg-red-500 text-white p-6 rounded-full hover:opacity-90 transition"
              >
                <Square className="w-8 h-8" />
              </button>
            )}
          </div>

          <p className="text-gray-600">
            {isRecording ? 'Recording in progress...' : 
             recordingComplete ? 'Recording complete!' : 
             'Click the microphone to start recording'}
          </p>

          {recordingComplete && (
            <button
              onClick={downloadRecording}
              className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition"
            >
              <Download className="w-5 h-5 mr-2" />
              Download Recording
            </button>
          )}
        </div>
      </div>
    </div>
  );
}