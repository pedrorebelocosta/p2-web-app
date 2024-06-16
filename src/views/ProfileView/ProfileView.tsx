'use client';

import { useUserInfo } from "@/hooks/useUserInfo/useUserInfo";
import { getClientTier } from "./util";

export const ProfileView = () => {
    const { userData } = useUserInfo();

    console.log(userData);

    

    return (
        <div className="max-w-sm mx-auto bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg">
            <div className="border-b px-4 pb-6">
                <div className="text-center my-4">
                    <div className="py-2">
                        <h3 className="font-bold text-2xl text-gray-800 dark:text-white mb-1">{userData?.first_name} {userData?.last_name}</h3>
                        <h4 className="font-bold text-xl text-gray-800 dark:text-white mb-1">Born In: {userData?.date_of_birth}</h4>
                        <h4 className="font-bold text-xl text-gray-800 dark:text-white mb-1">Lives at: {userData?.address}</h4>
                        <h4 className="font-bold text-xl text-gray-800 dark:text-white mb-1">Client Tier: {getClientTier(userData?.discount_rate!)}</h4>
                    </div>
                </div>
                <div className="flex gap-2 px-2">
                    <button
                        className="flex-1 rounded-full bg-blue-600 dark:bg-blue-800 text-white dark:text-white antialiased font-bold hover:bg-blue-800 dark:hover:bg-blue-900 px-4 py-2">
                        Add bicycle
                    </button>
                    <button
                        className="flex-1 rounded-full bg-blue-600 dark:bg-blue-800 text-white dark:text-white antialiased font-bold hover:bg-blue-800 dark:hover:bg-blue-900 px-4 py-2">
                        Schedule Appointment
                    </button>
                </div>
            </div>
            <div className="px-4 py-4">
                <div className="flex">
                    <div className="flex justify-end mr-2">
                        <img className="border-2 border-white dark:border-gray-800 rounded-full h-10 w-10 -mr-2"
                            src="https://randomuser.me/api/portraits/men/32.jpg" alt="" />
                        <img className="border-2 border-white dark:border-gray-800 rounded-full h-10 w-10 -mr-2"
                            src="https://randomuser.me/api/portraits/women/31.jpg" alt="" />
                        <img className="border-2 border-white dark:border-gray-800 rounded-full h-10 w-10 -mr-2"
                            src="https://randomuser.me/api/portraits/men/33.jpg" alt="" />
                        <img className="border-2 border-white dark:border-gray-800 rounded-full h-10 w-10 -mr-2"
                            src="https://randomuser.me/api/portraits/women/32.jpg" alt="" />
                        <img className="border-2 border-white dark:border-gray-800 rounded-full h-10 w-10 -mr-2"
                            src="https://randomuser.me/api/portraits/men/44.jpg" alt="" />
                        <img className="border-2 border-white dark:border-gray-800 rounded-full h-10 w-10 -mr-2"
                            src="https://randomuser.me/api/portraits/women/42.jpg" alt="" />
                        <span
                            className="flex items-center justify-center bg-white dark:bg-gray-800 text-sm text-gray-800 dark:text-white font-semibold border-2 border-gray-200 dark:border-gray-700 rounded-full h-10 w-10">
                            +999
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
