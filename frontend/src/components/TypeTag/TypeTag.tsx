import { IconX } from "@tabler/icons-react";
import { typeIcons } from "./typeIcons";
import styles from "./TypeTag.module.scss";

interface TypeTagProps {
  type?: string;
  onXClick: (type: string) => void;
}

const TypeTag = ({ type, onXClick }: TypeTagProps) => {
  if (!type) return null;

  const Icon = typeIcons[type.toLowerCase() as keyof typeof typeIcons] || null;

  return (
    <div className={`${styles.typeTag} ${styles[type.toLowerCase()]}`}>
      <Icon className={styles.icon} />
      <span>{type}</span>
      {onXClick && (
        <IconX
          onClick={(e) => {
            e.stopPropagation();
            onXClick(type);
          }}
        />
      )}
    </div>
  );
};

export default TypeTag;
