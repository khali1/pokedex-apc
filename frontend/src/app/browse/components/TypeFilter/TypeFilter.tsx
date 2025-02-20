"use client";
import Select from "react-select";

const TypeFilter = ({
  value,
  options,
  onChange,
}: {
  value: string[];
  options: string[];
  onChange: (value: string[] | null) => void;
}) => (
  <Select
    isClearable
    isMulti
    value={
      value?.map((type) => ({
        label: type,
        value: type,
      })) || []
    }
    options={
      options?.map((type) => ({
        label: type,
        value: type,
      })) || []
    }
    onChange={(e) => {
      onChange(e && e.length ? e.map((value) => value.value) : null);
    }}
  />
);

export default TypeFilter;
