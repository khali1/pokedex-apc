"use client";

import { useState } from "react";
import styles from "./TypeFilter.module.scss";
import cx from "classnames";
import TypeTag from "@/components/TypeTag/TypeTag";
import { IconX } from "@tabler/icons-react";

const TypeFilter = ({
  value,
  options,
  onChange,
}: {
  value: string[] | null;
  options: string[];
  onChange: (value: string[] | null) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.trigger} onClick={() => setIsOpen(!isOpen)}>
        <span
          className={cx(styles.placeholder, {
            [styles.hidden]: value?.length !== 0,
          })}
        >
          Filter by Type
        </span>
        {value?.map((val) => (
          <TypeTag
            key={val}
            type={val}
            onXClick={(type) => {
              const filtered = value?.filter((v) => v !== type);
              onChange(filtered.length > 0 ? filtered : null);
            }}
          />
        ))}
        <IconX
          className={cx({
            [styles.hidden]: value?.length === 0,
          })}
          onClick={(e) => {
            e.stopPropagation();
            onChange(null);
          }}
        />
      </div>
      <div
        className={`${styles.backdrop} ${isOpen ? styles.open : ""}`}
        onClick={() => {
          setIsOpen(false);
        }}
      />
      <div className={`${styles.dropdown} ${isOpen ? styles.open : ""}`}>
        {options
          .filter((type) => !value?.includes(type))
          .map((type) => (
            <div
              key={type}
              className={styles.option}
              onClick={(e) => {
                e.stopPropagation();
                onChange([...(value || []), type]);
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
