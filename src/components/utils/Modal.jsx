import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";
import { HiMiniXMark } from "react-icons/hi2";

export default function Modal({
  children,
  title,
  trigger,
  openExternally = {},
}) {
  const { openForm, setOpenForm } = openExternally;
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return (
    <>
      <div className=" flex">{trigger({ open })}</div>
      <Dialog
        open={isOpen || openForm?.open}
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
              <DialogPanel className="sm:max-w-[600px] min-w-[400px] sm:min-w-[600px] rounded-xl bg-white/10 p-6 relative">
                <DialogTitle className=" text-2xl font-medium text-white text-center">
                  {title}
                </DialogTitle>
                {children({ close })}
                <div className="absolute top-5 right-5 cursor-pointer">
                  <HiMiniXMark
                    size={40}
                    onClick={() => {
                      close();
                      setOpenForm &&
                        setOpenForm({
                          open: false,
                          data: {},
                        });
                    }}
                  />
                </div>
              </DialogPanel>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
}
