import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";

interface RecorderComponentProps {
  onRecordingComplete: (audioUrl: string) => void;
}

const RecorderComponent: React.FC<RecorderComponentProps> = ({ onRecordingComplete }) => {
  const [recording, setRecording] = useState<boolean>(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [timer, setTimer] = useState<number>(0);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioElement = useRef<HTMLAudioElement>(null);
  const timerInterval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timerInterval.current) {
        clearInterval(timerInterval.current);
      }
    };
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      if (!stream) {
        throw new Error('Failed to get audio stream');
      }
      
      mediaRecorder.current = new MediaRecorder(stream);

      let chunks: Blob[] = [];
      mediaRecorder.current.ondataavailable = (event) => {
        chunks.push(event.data);
      };

      mediaRecorder.current.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        onRecordingComplete(url); // Notify parent component of recording completion
      };

      mediaRecorder.current.start();
      setRecording(true);
      startTimer();
    } catch (error:any) {
      console.error('Error starting recording:', error.message);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current && mediaRecorder.current.state !== 'inactive') {
      mediaRecorder.current.stop();
      setRecording(false);
      stopTimer();
    }
  };

  const playAudio = () => {
    if (audioUrl && audioElement.current) {
      audioElement.current.src = audioUrl;
      audioElement.current.play();
    }
  };

  const stopAudio = () => {
    if (audioElement.current) {
      audioElement.current.pause();
      audioElement.current.currentTime = 0;
    }
  };

  const formatTime = (seconds: number): string => {
    const format = (val: number) => `0${Math.floor(val)}`.slice(-2);
    const mins = (seconds / 60) % 60;
    const secs = seconds % 60;
    return `${format(mins)}:${format(secs)}`;
  };

  const startTimer = () => {
    if (!timerInterval.current) {
      timerInterval.current = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    }
  };

  const stopTimer = () => {
    if (timerInterval.current) {
      clearInterval(timerInterval.current);
      timerInterval.current = null;
      setTimer(0);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="grid gap-6">
        <div className="flex items-center justify-center gap-6">
          {!recording ? (
            
            <Button size="icon" variant="ghost" className="text-primary" onClick={startRecording}>
              Start Recording
            </Button>
          ) : (
            <Button size="icon" variant="ghost" className="text-red-500" onClick={stopRecording}>
              Stop Recording
            </Button>
          )}
          <div className='ml-5'>

          {audioUrl && (
            <>
              <Button size="icon" variant="ghost" className="text-green-500" onClick={playAudio}>
                Play
              </Button>
              <Button size="icon" variant="ghost" className="text-red-500" onClick={stopAudio}>
                Stop
              </Button>
            </>
          )}
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="text-sm text-muted-foreground">
            {audioUrl ? formatTime(timer) : '00:00'}
          </div>
        </div>
      </div>
      <audio ref={audioElement} controls style={{ display: 'none' }} />
    </div>
  );
};

export default RecorderComponent;
