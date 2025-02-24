"use client";
import { MultiSelect } from "@mantine/core";

const TypeFilter = ({
  value,
  options,
  onChange,
  className,
}: {
  className: string;
  value: string[];
  options: string[];
  onChange: (value: string[] | null) => void;
}) => {
  return (
    <MultiSelect
      className={className}
      clearable
      value={value}
      data={options}
      onChange={onChange}
      placeholder="Filter by type"
    />
  );
};

export default TypeFilter;
