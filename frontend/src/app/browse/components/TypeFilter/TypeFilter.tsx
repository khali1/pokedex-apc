"use client";
import { MultiSelect } from "@mantine/core";

const TypeFilter = ({
  value,
  options,
  onChange,
}: {
  value: string[];
  options: string[];
  onChange: (value: string[] | null) => void;
}) => {
  return (
    <MultiSelect clearable value={value} data={options} onChange={onChange} />
  );
};

export default TypeFilter;
