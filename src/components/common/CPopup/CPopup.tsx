import React, { Fragment } from 'react';
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  clickOutsideToClose?: boolean;
}

export const CPopup: React.FC<PopupProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
}) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        // static={clickOutsideToClose}
        static={true}
        as="div"
        className="relative z-50"
        onClose={onClose}
      >
        {/* <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        > */}
        <div className="fixed inset-0 bg-black opacity-75" />
        {/* </TransitionChild> */}

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <DialogTitle
                  as="div"
                  className="flex justify-between items-center mb-4"
                >
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    {title}
                  </h3>
                  <button
                    type="button"
                    className="text-gray-400 hover:text-gray-500"
                    onClick={onClose}
                  >
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </DialogTitle>

                <div className="mt-2">{children}</div>

                {footer && (
                  <div className="mt-4 flex justify-end space-x-2">
                    {footer}
                  </div>
                )}
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
