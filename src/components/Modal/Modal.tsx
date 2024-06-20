'use client';

import { PropsWithChildren } from 'react'
import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react'
import classNames from 'classnames';
import { CustomCssClass } from '@/types/css.types';

export type ModalProps<T> = {
    open: boolean;
    confirmLabel?: string;
    cancelLabel?: string;
    customClass?: CustomCssClass;
    onConfirm: (data?: T) => void;
    onCancel: () => void;
}

export const Modal = <T,>({
    open,
    confirmLabel = 'Save',
    cancelLabel = 'Cancel',
    customClass,
    onConfirm,
    onCancel,
    children
}: PropsWithChildren<ModalProps<T>>) => {
  return (
    <Transition show={open}>
      <Dialog className="relative z-10" onClose={onCancel}>
        <TransitionChild
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <TransitionChild
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel className={classNames("relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg", customClass)}>
                {children}
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                    onClick={() => onConfirm()}
                  >
                    {confirmLabel}
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => onCancel()}
                    data-autofocus
                  >
                    {cancelLabel}
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
