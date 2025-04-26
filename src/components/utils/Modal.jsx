import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";

export default function Modal({ children, title, trigger }) {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return (
    <>
      <div className="w-full flex justify-end">{trigger({ open })}</div>
      <Dialog
        open={isOpen}
        onClose={close}
        className="relative z-10 focus:outline-none"
      >
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm"
          aria-hidden="true"
        />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl">
              <DialogTitle className=" text-2xl font-medium text-white text-center">
                {title}
              </DialogTitle>
              {children({ close })}
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
