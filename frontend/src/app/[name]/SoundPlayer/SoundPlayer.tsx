import { IconVolume } from "@tabler/icons-react";
const audio = new Audio();
export const SoundPlayer = ({ sound }: { sound?: string }) => {
  return (
    <IconVolume
      onClick={() => {
        if (!sound) return;
        audio.src = sound;
        audio.play();
      }}
    />
  );
};
