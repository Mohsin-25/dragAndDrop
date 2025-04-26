import { Field, Input, Label } from "@headlessui/react";
import React from "react";

const TextField = ({
  label,
  slug,
  setDataFn,
  data,
  validation,
  required,
  maxLength,
  type = "text",
}) => {
  const handleChange = (e) => {
    let value = e.target.value;

    if (validation === "numeric") {
      value = value.replace(/[^0-9]/g, "");
    } else if (validation === "alphanumeric") {
      value = value.replace(/[^a-zA-Z0-9 ]/g, "");
    } else if (validation === "email") {
      value = value.replace(/[^a-zA-Z0-9@._-]/g, "");
    }

    setDataFn((prev) => ({ ...prev, [slug]: value }));
  };

  return (
    <div className="w-full">
      <Field className="text-left">
        <Label className=" text-white">{label}</Label>
        <Input
          autocomplete="off"
          className={
            "mt-1 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
          }
          key={slug}
          name={slug}
          value={data?.[slug]}
          onChange={handleChange}
          required={required}
          maxLength={maxLength}
          type={type}
        />
      </Field>
    </div>
  );
};

export default TextField;
