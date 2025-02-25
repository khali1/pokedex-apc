"use client";

import { createPortal } from "react-dom";
import styles from "./Modal.module.scss";
import { useEffect } from "react";

const Modal = ({
  onClose,
  children,
}: {
  onClose: () => void;
  children: React.ReactNode;
}) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  return createPortal(
    <div className={styles.modal}>
      <div className={styles.content}>{children}</div>
      <div className={styles.backdrop} onClick={onClose} />
    </div>,
    document.body
  );
};

export default Modal;
