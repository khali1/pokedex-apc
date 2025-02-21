"use client";
import { useMemo } from "react";
import Select from "react-select";

const TypeFilter = ({
  value,
  options,
  onChange,
}: {
  value: string[];
  options: string[];
  onChange: (value: string[] | null) => void;
}) => {
  const memoOptions = useMemo(() => {
    return options?.map((type) => ({
      label: type,
      value: type,
    }));
  }, [options]);

  return (
    <Select
      isClearable
      isMulti
      value={
        value?.map((type) => ({
          label: type,
          value: type,
        })) || []
      }
      options={memoOptions}
      onChange={(e) => {
        onChange(e && e.length ? e.map((value) => value.value) : null);
      }}
    />
  );
};

export default TypeFilter;
