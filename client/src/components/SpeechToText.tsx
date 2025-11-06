import { useState, useEffect } from 'react';
import { Mic, MicOff } from 'lucide-react';

interface SpeechToTextProps {
  onTranscript: (text: string) => void;
  className?: string;
}

export default function SpeechToText({ onTranscript, className = '' }: SpeechToTextProps) {
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);

  useEffect(() => {
    // Check if browser supports Speech Recognition
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = 'en-US';

      recognitionInstance.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0])
          .map((result) => result.transcript)
          .join('');

        onTranscript(transcript);
      };

      recognitionInstance.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
      };

      setRecognition(recognitionInstance);
    }

    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, []);

  const toggleListening = () => {
    if (!recognition) {
      alert('Speech recognition is not supported in your browser. Please use Chrome, Edge, or Safari.');
      return;
    }

    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      recognition.start();
      setIsListening(true);
    }
  };

  return (
    <button
      onClick={toggleListening}
      className={`
        p-2 rounded-lg transition-all duration-200
        ${isListening 
          ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90 animate-pulse' 
          : 'hover:bg-muted text-muted-foreground hover:text-foreground'
        }
        ${className}
      `}
      title={isListening ? 'Stop recording' : 'Start voice input'}
    >
      {isListening ? (
        <MicOff className="w-4 h-4" />
      ) : (
        <Mic className="w-4 h-4" />
      )}
    </button>
  );
}
