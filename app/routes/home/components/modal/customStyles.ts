/* eslint-disable @typescript-eslint/no-explicit-any */
export const customStyles = {
    control: (base: any, state: any) => ({
      ...base,
      backgroundColor: state.isFocused ? "#f0f4ff" : "#fff",
      borderColor: state.isFocused ? "#4f46e5" : "#ccc",
      "&:hover": { borderColor: "#4f46e5" },
    }),
    option: (base: any, state: any) => ({
      ...base,
      backgroundColor: state.isSelected
        ? "#6D54CF"
        : state.isFocused
        ? "#e0e7ff"
        : undefined,
      color: state.isSelected ? "#fff" : "#111",
      "&:active": { backgroundColor: "#f0f4ff" },
    }),
    multiValue: (base: any) => ({
      ...base,
      backgroundColor: "#6D54CF",
    }),
    multiValueLabel: (base: any) => ({
      ...base,
      color: "#fff",
      fontWeight: "500",
    }),
    multiValueRemove: (base: any) => ({
      ...base,
      color: "#fff",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "#5b3ebc",
        color: "#fff",
      },
    }),
  };