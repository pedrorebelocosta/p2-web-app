'use client'

import { createPortal } from "react-dom"
import { Modal, ModalProps } from "../Modal/Modal";
import { UserBike } from "@/hooks/useUserInfo/useUserInfo";
import { ChevronDownIcon, ExclamationTriangleIcon } from "@heroicons/react/16/solid";
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from "@headlessui/react";
import { useCallback, useState } from "react";
import classNames from "classnames";
import { BIKE_TYPES } from "./config";
import { DropdownItem } from "@/types/util.types";

const AddBicycle = ({ open, onConfirm, onCancel }: ModalProps<UserBike>) => {
    const [name, setName] = useState<string>('');
    const [brand, setBrand] = useState<string>('');
    const [model, setModel] = useState<string>('');
    const [type, setType] = useState<DropdownItem<string, string>>();

    const onSaveBicycle = useCallback(() => {
        onConfirm({ name, brand, model, type: type!.key});
    }, [brand, model, name, type, onConfirm]);

    return (
        <Modal open={open} customClass={'overflow-visible'} onConfirm={onSaveBicycle} onCancel={onCancel}>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm mb-12">
                <div className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                            Name
                        </label>
                        <div className="mt-2">
                            <input
                                id="name"
                                name="name"
                                type="text"
                                value={name}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                onChange={(e) => setName(e.target.value)}
                                required />
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="brand" className="block text-sm font-medium leading-6 text-gray-900">
                                Brand
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                id="brand"
                                name="brand"
                                type="text"
                                value={brand}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                onChange={(e) => setBrand(e.target.value)}
                                required />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="model" className="block text-sm font-medium leading-6 text-gray-900">
                            Model
                        </label>
                        <div className="mt-2">
                            <input
                                id="model"
                                name="model"
                                type="text"
                                value={model}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                onChange={(e) => setModel(e.target.value)}
                                required />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="type" className="block text-sm font-medium leading-6 text-gray-900">
                            Type
                        </label>
                        <div className="mt-2">
                            <Menu as="div" className="relative inline-block text-left w-full">
                                <div>
                                    <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                        { type?.value ?? 'Options' }
                                        <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                                    </MenuButton>
                                </div>

                                <Transition
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <MenuItems className="absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <div className="py-1">
                                            {BIKE_TYPES.map(
                                                ({ key, value }) =>
                                                    <MenuItem key={key}>
                                                        {({ focus }) => (
                                                            <div
                                                                className={classNames(
                                                                    focus ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                    'block px-4 py-2 text-sm',
                                                                )}
                                                                onClick={() => setType({ key, value})}
                                                            >
                                                                {value}
                                                            </div>
                                                        )}
                                                    </MenuItem>
                                            )
                                            }
                                        </div>
                                    </MenuItems>
                                </Transition>
                            </Menu>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export const AddBicycleModal = (props: ModalProps<UserBike>) => createPortal(<AddBicycle {...props} />, document.body);