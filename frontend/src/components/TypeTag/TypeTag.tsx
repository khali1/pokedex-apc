"use client";

import { typeIcons } from "./typeIcons";
import styles from "./TypeTag.module.scss";
import { useRouter } from "next/navigation";

interface TypeTagProps {
  type: string;
  onXClick?: (type: string) => void;
}

const TypeTag = ({ type, onXClick }: TypeTagProps) => {
  const router = useRouter();

  if (!type) return null;

  const Icon = typeIcons[type.toLowerCase() as keyof typeof typeIcons] || null;

  return (
    <div
      className={`${styles.typeTag} ${styles[type.toLowerCase()]}`}
      onClick={(e) => {
        e.stopPropagation();
        if (onXClick) {
          onXClick(type);
        } else {
          router.push(`/browse/?type=${type}`);
        }
      }}
    >
      <Icon className={`${styles.icon}`} />
      <span>{type}</span>
    </div>
  );
};

export default TypeTag;
