import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Field,
  Label,
} from "@headlessui/react";
import { useState } from "react";

export default function Dropdown({
  label,
  slug,
  setDataFn,
  data,
  validation,
  required,
  options,
}) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState({});

  const filteredOptions =
    query === ""
      ? options
      : options.filter((option) =>
          option.label.toLowerCase().includes(query.toLowerCase())
        );

  return (
    <div className="w-full">
      <Field className="text-left">
        <Label className="text-white">{label}</Label>
        <Combobox
          value={selected}
          onChange={(value) => {
            setSelected(value);
            setDataFn((prev) => ({ ...prev, [slug]: value }));
          }}
          key={slug}
          className="mt-1"
        >
          <div className="relative w-full">
            <ComboboxButton className="w-full flex rounded-lg border-none bg-white/5 py-2 px-3 text-sm text-white outline-none focus:outline-none">
              <ComboboxInput
                autocomplete="off"
                className="w-full bg-transparent outline-none text-white placeholder-white/70"
                displayValue={(option) => option?.label}
                onChange={(e) => setQuery(e.target.value)}
                required={required}
              />
              <span className="ml-2 mb-2">{"⌄"}</span>
            </ComboboxButton>

            {!!filteredOptions.length && (
              <ComboboxOptions
                anchor="bottom"
                className="absolute left-0 z-20 mt-1 rounded-md border border-white/5 bg-black p-1 transition duration-100 ease-in"
              >
                {filteredOptions.map((option) => (
                  <ComboboxOption
                    key={option.value}
                    value={option}
                    className="group flex cursor-default items-center gap-2 rounded-md px-3 w-full text-sm text-white select-none data-[focus]:bg-white/5"
                  >
                    {option.label}
                  </ComboboxOption>
                ))}
              </ComboboxOptions>
            )}
          </div>
        </Combobox>
      </Field>
    </div>
  );
}
