"use client";

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
    <div>
      {value.map((a) => (
        <div>
          <div>{a}</div>
          <div onClick={() => onChange(value.filter((b) => b !== a))}>x</div>
        </div>
      ))}
      <div onClick={() => onChange([])}>x</div>
      <div>
        {options
          .filter((a) => !value.includes(a))
          .map((a) => (
            <div onClick={() => onChange([...value, a])}>{a}</div>
          ))}
      </div>
    </div>
  );
};

export default TypeFilter;
