import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";

export default function Modal({ children, title, trigger }) {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return (
    <>
      <div className=" flex">{trigger({ open })}</div>
      <Dialog
        open={isOpen}
        onClose={close}
        className="relative z-10 focus:outline-none"
      >
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-xs backdrop-invert-25"
          aria-hidden="true"
        />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="bg-black rounded-xl">
              <DialogPanel className="w-full min-w-[600px] rounded-xl bg-white/10 p-6 ">
                <DialogTitle className=" text-2xl font-medium text-white text-center">
                  {title}
                </DialogTitle>
                {children({ close })}
              </DialogPanel>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
}
