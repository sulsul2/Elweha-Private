import Select, { ActionMeta, SingleValue } from "react-select";

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
  value?: { value: string; label: string };
  options: any;
  required?: boolean;
}

const Dropdown = ({
  placeholder,
  type,
  onChange,
  options,
  value,
  required,
}: DropdownProps) => {
  return (
    <Select
      required={required}
      className="basic-single w-full rounded-lg "
      onChange={onChange}
      placeholder={placeholder}
      name={type}
      maxMenuHeight={200}
      options={options}
      value={
        value == null ? undefined : { value: value!.value, label: value!.label }
      }
      isSearchable={true}
      isClearable={true}
      theme={(theme) => ({
        ...theme,
        borderRadius: 0,
        border: "2px",
        colors: {
          ...theme.colors,
          primary: "#FD6701",
        },
      })}
      styles={{
        control: (baseStyles, state) => ({
          ...baseStyles,
          borderRadius: "8px",
          paddingLeft: "8px",
          paddingTop: "2px",
          paddingBottom: "2px",
          border: state.isFocused ? "" : "2px solid #A8A8A8",
          "&:hover": {
            borderColor: state.isFocused ? "" : "#F5BA93",
          },
        }),
        placeholder: (base) => ({
          ...base,
          fontSize: "14px",
          color: "#A8A8A8",
          fontWeight: 400,
        }),
      }}
    />
  );
};

export default Dropdown;
