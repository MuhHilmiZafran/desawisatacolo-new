import React, { useState, useRef } from "react";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

const InputField = ({
  name,
  label,
  type,
  step,
  placeholder,
  errors,
  register,
  value,
  disabled,
  onChange,
  suffix = "",
}) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  if (type === "password") {
    return (
      <div className="relative mb-5 flex flex-col">
        <label>{label}</label>
        <input
          type={passwordVisible ? "text" : "password"}
          placeholder={placeholder}
          className="w-full focus:outline-none focus:ring-0 focus:border-cyan-600 focus:shadow-md focus:shadow-gray-300 py-3 px-3 border-solid border rounded mt-1"
          {...register(name, {
            required: `The ${name} field is required`,
          })}
        />
        <p className="mt-2 text-red-800 font-xs font-medium">
          {" "}
          {errors[name] && errors[name].message}
        </p>
        {passwordVisible ? (
          <VisibilityIcon
            className="absolute top-12 right-4 cursor-pointer"
            onClick={togglePasswordVisibility}
          />
        ) : (
          <VisibilityOffIcon
            className="absolute top-12 right-4 cursor-pointer"
            onClick={togglePasswordVisibility}
          />
        )}
      </div>
    );
  }

  if (type === "preview") {
    return (
      <div className="relative mb-5 flex flex-col">
        <label>{label}</label>
        <input
          className="w-full focus:outline-none focus:ring-0 focus:border-cyan-600 focus:shadow-md focus:shadow-gray-300 py-3 px-3 border-solid border rounded mt-1"
          id={name}
          name={name}
          type="text"
          placeholder={placeholder}
          defaultValue={value}
          disabled
        />
      </div>
    );
  }

  return (
    <div className="relative mb-5 flex flex-col">
      <label className="font-bold">{label}</label>
      <input
        className="w-full focus:outline-none focus:ring-0 focus:border-cyan-600 focus:shadow-md focus:shadow-gray-300 py-3 px-3 border-solid border rounded mt-1"
        id={name}
        name={name}
        type={type}
        step={step}
        placeholder={placeholder}
        disabled={disabled}
        onChange={onChange}
        {...register(name, {
          required: `The ${name} field is required`,
        })}
      />
      <p className="mt-2 text-red-800 font-xs font-medium">
        {" "}
        {errors[name] && errors[name].message}
      </p>
      {suffix && (
        <div className="absolute top-12 right-4 bg-white">{suffix}</div>
      )}
    </div>
  );
};

export default InputField;
