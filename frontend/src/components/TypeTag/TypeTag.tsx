import { IconX } from "@tabler/icons-react";
import styles from "./TypeTag.module.scss";

const TypeTag = ({
  type,
  onXClick,
}: {
  type: string;
  onXClick: (type: string) => void;
}) => {
  return (
    <div className={styles.typeTag}>
      {type}
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
