import { createPortal } from "react-dom";
import styles from "./Modal.module.scss";

const Modal = ({
  onClose,
  children,
}: {
  onClose: () => void;
  children: React.ReactNode;
}) => {
  return createPortal(
    <div className={styles.modal}>
      <div className={styles.backdrop} onClick={onClose} />
      {children}
    </div>,
    document.body
  );
};

export default Modal;
