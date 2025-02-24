import React from "react";
import styles from "./ContentSwitcher.module.scss";
import cx from "classnames";

const ContentSwitcher = ({
  data,
  onChange,
  value,
}: {
  data: {
    label: string | React.ReactElement;
    value: string;
  }[];
  onChange: (value: string) => void;
  value: string;
}) => {
  return (
    <div className={styles.container}>
      <div>
        {data.map((val) => (
          <div
            key={val.value}
            className={cx({
              [styles.active]: value === val.value,
            })}
            onClick={() => onChange(val.value)}
          >
            {val.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentSwitcher;
