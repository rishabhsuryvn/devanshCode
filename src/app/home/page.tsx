"use client"

import { useState } from 'react';
import AudioComponent from "@/components/ui/AudioComponent";

function page() {
  const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(null);

  const handleRecordingComplete = (audioUrl: string) => {
    // Handle the recording completion logic here
    setRecordedAudioUrl(audioUrl);
  };

  return (
    <div>
      { <AudioComponent onRecordingComplete={handleRecordingComplete} />}
    </div>
  );
}

export default page;