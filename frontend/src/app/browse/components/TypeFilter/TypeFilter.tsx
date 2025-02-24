"use client";

import { useState } from "react";
import styles from "./TypeFilter.module.scss";
import cx from "classnames";
import TypeTag from "@/components/TypeTag/TypeTag";

const TypeFilter = ({
  value,
  options,
  onChange,
}: {
  value: string[];
  options: string[];
  onChange: (value: string[] | null) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.trigger} onClick={() => setIsOpen(!isOpen)}>
        <span
          className={cx(styles.placeholder, {
            [styles.notEmpty]: value.length !== 0,
          })}
        >
          Filter by Type
        </span>
        {value.map((val) => (
          <TypeTag
            key={val}
            type={val}
            onXClick={(type) => {
              onChange(value.filter((v) => v !== type));
            }}
          />
        ))}
      </div>
      <div
        className={`${styles.backdrop} ${isOpen ? styles.open : ""}`}
        onClick={() => setIsOpen(false)}
      />
      <div className={`${styles.dropdown} ${isOpen ? styles.open : ""}`}>
        {options
          .filter((type) => !value.includes(type))
          .map((type) => (
            <div
              key={type}
              className={styles.option}
              onClick={() => {
                onChange([...value, type]);
                setIsOpen(false);
              }}
            >
              {type}
            </div>
          ))}
      </div>
    </div>
  );
};

export default TypeFilter;
