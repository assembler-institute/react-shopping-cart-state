import React from "react";

function Input({
  type = "text",
  label = "input-01",
  id = "input-01",
  value = "",
  placeholder = "",
  handleChange = () => {},
  ...props
}) {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <input
        className="form-control"
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        {...props}
      />
    </div>
  );
}

export default Input;
