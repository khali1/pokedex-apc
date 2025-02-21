"use client";
import { IconVolume } from "@tabler/icons-react";
import { useRef } from "react";

export const SoundPlayer = ({ sound }: { sound?: string }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  return (
    <>
      <audio ref={audioRef} src={sound} />
      <IconVolume
        onClick={() => {
          if (!sound) return;
          audioRef.current?.play();
        }}
      />
    </>
  );
};
