'use client';

import { UserBike, useUserInfo } from "@/hooks/useUserInfo/useUserInfo";
import { getClientTier } from "./util";
import { useCallback, useState } from "react";
import { AddBicycleModal } from "@/components/AddBicycleModal/AddBicycleModal";
import { useUserJwt } from "@/hooks/useUserJwt";
import { ScheduleAppointmentModal } from "@/components/ScheduleAppointmentModal/ScheduleAppointmentModal";
import { Appointment } from "@/types/system.types";

export const ProfileView = () => {
    const { userData, userBikes, userAppointments } = useUserInfo();
    const { getToken } = useUserJwt();
    const [isBicycleModalOpen, setBicycleModalOpen] = useState(false);
    const [isScheduleAppointmentModalOpen, setIsScheduleAppointmentModalOpen] = useState(false);

    const onAddBicycle = useCallback(() => {
        setBicycleModalOpen((prev) => !prev);
    }, []);

    const onSaveBicycle = useCallback(async (data?: UserBike) => {
        if (!data) return;

        await fetch('http://localhost:8080/api/users/me/bikes', { 
            method: 'POST',
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-Type': 'application/json',
                'authorization': `Bearer ${getToken()}`
            })
        }).then((res) => {
            // TODO replace with nextjs routing option (can't investigate the caching issue atm)
            if (res.ok) {
                window.location.reload();
            }
        }).finally(() => setBicycleModalOpen(() => false));
    }, [getToken]);

    const onCloseBicycleModal = useCallback(() => {
        setBicycleModalOpen(() => false);
    }, []);

    const onSaveAppointment = useCallback((data?: Appointment) => {}, []);
    const onScheduleAppointment = useCallback(() => setIsScheduleAppointmentModalOpen(() => true), []);

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
                            (bike, idx) =>
                                <div className="flex flex-1 justify-evenly" key={`${bike.name}-${idx}`}>
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
                        <div className="flex flex-1 justify-between">
                            <div className="text-l text-gray-800 dark:text-white mb-1">Date</div>
                            <div className="text-l text-gray-800 dark:text-white mb-1">Time</div>
                            <div className="text-l text-gray-800 dark:text-white mb-1">State</div>
                        </div>
                        { userAppointments && userAppointments.map(
                            (appointment, idx) => <div className="flex flex-1 justify-evenly" key={idx}>
                                <div className="text-sm text-gray-800 dark:text-white mb-1">{appointment.schedule_date}</div>
                                <div className="text-sm text-gray-800 dark:text-white mb-1">{appointment.schedule_time}</div>
                                <div className="text-sm text-gray-800 dark:text-white mb-1">{appointment.state}</div>
                            </div>
                        )}
                        <button
                            className="flex-1 rounded-full bg-blue-600 dark:bg-blue-800 text-white dark:text-white antialiased font-bold hover:bg-blue-800 dark:hover:bg-blue-900 px-4 py-2"
                            onClick={onScheduleAppointment}>
                            Schedule Appointment
                        </button>
                        <ScheduleAppointmentModal open={isScheduleAppointmentModalOpen} onCancel={() => setIsScheduleAppointmentModalOpen(() => false)} onConfirm={onSaveAppointment} />
                    </div>
                </div>
            </div>
        </div>
    )
}
