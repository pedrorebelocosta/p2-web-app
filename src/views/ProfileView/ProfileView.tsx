'use client';

import { UserBike, useUserInfo } from "@/hooks/useUserInfo/useUserInfo";
import { getClientTier } from "./util";
import { useCallback, useState } from "react";
import { AddBicycleModal } from "@/components/AddBicycleModal/AddBicycleModal";

export const ProfileView = () => {
    const { userData, userBikes } = useUserInfo();
    const [isBicycleModalOpen, setBicycleModalOpen] = useState(false);

    const onAddBicycle = useCallback(() => {
        setBicycleModalOpen((prev) => !prev);
    }, []);

    const onSaveBicycle = useCallback((data?: UserBike) => {
        console.log(data);
    }, []);

    const onCloseBicycleModal = useCallback(() => {
        setBicycleModalOpen(() => false);
    }, []);

    const onScheduleAppointment = useCallback(() => {}, []);

    return (
        <div className="max-w-sm mx-auto bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg">
            <div className="border-b px-4">
                <div className="text-center my-4">
                    <div className="py-2">
                        <h3 className="font-bold text-2xl text-gray-800 dark:text-white mb-1">{userData?.first_name} {userData?.last_name}</h3>
                        <h4 className="font-bold text-l text-gray-800 dark:text-white mb-1">Born In: {userData?.date_of_birth}</h4>
                        <h4 className="font-bold text-l text-gray-800 dark:text-white mb-1">Lives at: {userData?.address}</h4>
                        <h4 className="font-bold text-l text-gray-800 dark:text-white mb-1">Client Tier: {getClientTier(userData?.discount_rate!)}</h4>
                    </div>
                </div>
            </div>
            <div className="border-b px-4 py-4">
                <div className="flex">
                    <div className="flex flex-col justify-end mr-2 flex-1">
                        <h3 className="font-bold text-2xl text-gray-800 dark:text-white mb-1">My Bikes</h3>
                        <div className="flex flex-1 justify-evenly">
                            <div className="text-l text-gray-800 dark:text-white mb-1">Bike name</div>
                            <div className="text-l text-gray-800 dark:text-white mb-1">Brand</div>
                            <div className="text-l text-gray-800 dark:text-white mb-1">Model</div>
                            <div className="text-l text-gray-800 dark:text-white mb-1">Type</div>
                        </div>
                        { userBikes && userBikes.map(
                            (bike) =>
                                <div className="flex flex-1 justify-evenly" key={bike.name}>
                                    <div className="text-sm text-gray-800 dark:text-white mb-1">{bike.name}</div>
                                    <div className="text-sm text-gray-800 dark:text-white mb-1">{bike.brand}</div>
                                    <div className="text-sm text-gray-800 dark:text-white mb-1">{bike.model}</div>
                                    <div className="text-sm text-gray-800 dark:text-white mb-1">{bike.type}</div>
                                </div>
                            )
                        }
                        <button
                            className="flex-1 rounded-full bg-blue-600 dark:bg-blue-800 text-white dark:text-white antialiased font-bold hover:bg-blue-800 dark:hover:bg-blue-900 px-4 py-2"
                            onClick={onAddBicycle}>
                            Add bicycle
                        </button>
                        <AddBicycleModal open={isBicycleModalOpen} onConfirm={onSaveBicycle} onCancel={onCloseBicycleModal} />
                    </div>
                </div>
            </div>
            <div className="px-4 py-4">
                <div className="flex">
                    <div className="flex flex-col justify-end mr-2 flex-1">
                        <h3 className="font-bold text-2xl text-gray-800 dark:text-white mb-1">My Appointments</h3>
                        <button
                            className="flex-1 rounded-full bg-blue-600 dark:bg-blue-800 text-white dark:text-white antialiased font-bold hover:bg-blue-800 dark:hover:bg-blue-900 px-4 py-2"
                            onClick={onScheduleAppointment}>
                            Schedule Appointment
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
