import { Button as Btn } from "@headlessui/react";

export default function Button({ children, type = "button", onClick = false }) {
  return (
    <Btn
      onClick={() => onClick && onClick()}
      type={type}
      className="w-fit h-fit inline-flex cursor-pointer items-center gap-2 rounded-md  bg-white/20 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-white/30 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
    >
      {children}
    </Btn>
  );
}
