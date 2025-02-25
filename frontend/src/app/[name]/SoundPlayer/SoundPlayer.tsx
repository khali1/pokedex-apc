"use client";
import { IconVolume } from "@tabler/icons-react";
import { useRef } from "react";

interface SoundPlayerProps {
  sound?: string;
  className?: string;
}

export const SoundPlayer = ({ sound, className }: SoundPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  return (
    <div className={className}>
      <audio ref={audioRef} src={sound} />
      <IconVolume
        onClick={() => {
          if (!sound) return;
          audioRef.current?.play();
        }}
      />
    </div>
  );
};
