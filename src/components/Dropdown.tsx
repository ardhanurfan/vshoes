import Select from "react-select";

function Dropdown({
  label,
  options,
  onChange,
  value,
  isLabel = false,
}: {
  label: string;
  options: { label: string; value: string }[];
  onChange?: (selectedOption: { label: string; value: string } | null) => void;
  value?: { label: string; value: string } | null;
  isLabel?: boolean;
}) {
  return (
    <div className="relative mb-4">
      {isLabel && (
        <label
          htmlFor={label}
          className="block text-gray-800 border-gray-600 text-sm font-bold mb-1"
        >
          {label}
        </label>
      )}
      <Select
        maxMenuHeight={200}
        options={options}
        onChange={onChange}
        value={value}
        className="basic-single rounded-lg w-full"
        placeholder={`Select ${label}`}
        theme={(theme) => ({
          ...theme,
          borderRadius: 0,
          border: "2px",
          colors: {
            ...theme.colors,
            primary: "#111827",
          },
        })}
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            borderRadius: "8px",
            paddingTop: "2px",
            paddingBottom: "2px",
            border: state.isFocused ? "" : "1px solid #d1d5db",
            "&:hover": {
              borderColor: state.isFocused ? "" : "#111827",
            },
          }),
          placeholder: (base) => ({
            ...base,
            fontSize: "16px",
            color: "#d1d5db",
            fontWeight: 400,
          }),
        }}
      />
    </div>
  );
}

export default Dropdown;
