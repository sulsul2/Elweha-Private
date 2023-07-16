import Select, { ActionMeta, SingleValue } from "react-select";

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
  onChange?:
    | ((
        newValue: SingleValue<{
          value: string;
          label: string;
        }>,
        actionMeta: ActionMeta<{
          value: string;
          label: string;
        }>
      ) => void)
    | undefined;
  value?: string;
}

const Dropdown = ({ placeholder, type, onChange, value }: DropdownProps) => {
  return (
    <Select
      className="basic-single shadow-button w-[180px] rounded-lg bg-slate-700"
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
  );
};

export default Dropdown;
