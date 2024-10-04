import React from "react";

export default function Input({
  type = "text",
  id,
  label: label,
  value,
  onChange,
  ...props
}: {
  id: string;
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  [key: string]: any;
}) {
  return (
    <>
      <label
        htmlFor={id}
        className="block text-gray-700 text-sm font-bold mb-2"
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-pink-300 focus:ring-pink-500 placeholder:text-gray-400  sm:text-sm sm:leading-6 p-3"
        {...props}
      />
    </>
  );
}
