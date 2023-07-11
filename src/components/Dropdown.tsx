import Select from "react-select";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
  { value: "vanilla", label: "Vanilla" },
  { value: "vanilla", label: "Vanilla" },
  { value: "vanilla", label: "Vanilla" },
  { value: "vanilla", label: "Vanilla" },
  { value: "vanilla", label: "Vanilla" },
  { value: "vanilla", label: "Vanilla" },
  { value: "vanilla", label: "Vanilla" },
  { value: "vanilla", label: "Vanilla" },
  { value: "vanilla", label: "Vanilla" },
];

interface DropdownProps {
  placeholder: string;
  type: string;
  onChange?: any;
  value?: string;
}

const Dropdown = ({ placeholder, type, onChange, value }: DropdownProps) => {
  return (
    <div className=" w-full rounded-lg bg-slate-700">
      <Select
        className="basic-single"
        onChange={onChange}
        placeholder={placeholder}
        name={type}
        options={options}
        defaultValue={value == null ? null : { value: value, label: value }}
        isSearchable={false}
        theme={(theme) => ({
          ...theme,
          borderRadius: 0,
          colors: {
            ...theme.colors,
            primary25: "#FD6701",
            primary: "#A8A8A8",
          },
        })}
        styles={{
          control: (baseStyles) => ({
            ...baseStyles,
            borderRadius: "8px",
            paddingLeft: "8px",
            paddingTop: "2px",
            paddingBottom: "2px",
          }),
          placeholder: (base) => ({
            ...base,
            fontSize: "16px",
            color: "#A8A8A8",
            fontWeight: 400,
          }),
        }}
      />
    </div>
  );
};

export default Dropdown;
