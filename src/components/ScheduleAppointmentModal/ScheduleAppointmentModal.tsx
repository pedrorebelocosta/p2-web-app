import { Appointment, CreateAppointmentData } from "@/types/system.types"
import { Modal, ModalProps } from "../Modal/Modal"
import { useCallback, useState } from "react"
import { createPortal } from "react-dom";
import { Menu, MenuButton, Transition, MenuItems, MenuItem } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import { DropdownItem } from "@/types/util.types";
import { APPOINTMENT_TYPES } from "./config";
import { getTimeIntervals } from "./util";

const ScheduleAppointment = ({ open, onConfirm, onCancel }: ModalProps<CreateAppointmentData>) => {
    const [type, setType] = useState<DropdownItem<string, string>>();
    const [date, setDate] = useState<string>('');
    const [time, setTime] = useState<string>('');
    const [notes, setNotes] = useState<string>('');
    
    const onSaveAppointment = useCallback(() => {
        onConfirm({ type: type?.key, schedule_date: date, schedule_time: time, notes });
    }, [date, notes, onConfirm, time, type]);

    return (
        <Modal open={open} customClass={'overflow-visible'} onConfirm={onSaveAppointment} onCancel={onCancel}>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm mb-12">
                <div className="space-y-6">
                    <div>
                        <label htmlFor="type" className="block text-sm font-medium leading-6 text-gray-900">
                            Type
                        </label>
                        <div className="mt-2">
                            <Menu as="div" className="relative inline-block text-left w-full">
                                <div>
                                    <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                        {type?.value ?? 'Options'}
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
                                            {APPOINTMENT_TYPES.map(
                                                ({ key, value }) =>
                                                    <MenuItem key={key}>
                                                        {({ focus }) => (
                                                            <div
                                                                className={classNames(
                                                                    focus ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                    'block px-4 py-2 text-sm',
                                                                )}
                                                                onClick={() => setType({ key, value })}
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
                    <div>
                        <label htmlFor="date" className="block text-sm font-medium leading-6 text-gray-900">
                            Date
                        </label>
                        <div className="mt-2">
                            <input
                                id="date"
                                name="date"
                                type="date"
                                value={date}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                onChange={(e) => {
                                    setDate(e.target.value);
                                }
                                }
                                required />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="time" className="block text-sm font-medium leading-6 text-gray-900">
                            Time
                        </label>
                        <datalist id="time_intervals">
                            { getTimeIntervals().map((time) => <option key={time} value={time}></option>) }
                        </datalist>
                        <div className="mt-2">
                            <input
                                id="time"
                                name="time"
                                type="time"
                                value={time}
                                list="time_intervals"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                onChange={(e) => {
                                    setTime(e.target.value);
                                }
                                }
                                required />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="c" className="block text-sm font-medium leading-6 text-gray-900">
                            Notes
                        </label>
                        <div className="mt-2">
                            <textarea
                                id="notes"
                                name="notes"
                                value={notes}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                onChange={(e) => {
                                    setNotes(e.target.value);
                                }}
                                required
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export const ScheduleAppointmentModal = (props: ModalProps<Appointment>) => createPortal(<ScheduleAppointment {...props} />, document.body);