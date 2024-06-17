import { useCallback, useEffect, useState } from "react";
import { useUserJwt } from "../useUserJwt"
import { useRouter } from "next/navigation";

export type UserData = {
    first_name: string;
    last_name: string;
    date_of_birth: string;
    discount_rate: number;
    vat_no: number;
    username: string;
    address: string;
}

export type UserBike = {
    name: string;
    brand: string;
    model: string;
    type: string;
};

export type UseUserInfoReturn = {
    userData?: UserData;
    userBikes?: UserBike[];
}

export const useUserInfo = (): UseUserInfoReturn => {
    const { getToken, clearToken } = useUserJwt();
    const [userData, setUserData] = useState<UserData>();
    const [userBikes, setUserBikes] = useState<UserBike[]>([]);
    const router = useRouter();

    const fetchUserData = useCallback(async () => {
        try {
            const loggedInUser = await fetch("http://localhost:8080/api/users/me", {
                headers: new Headers({
                    'content-type': 'application/json',
                    'authorization': `Bearer ${getToken()}`
                })
            }).then((res) => {
                if (!res.ok) {
                    throw new Error();
                }

                return res.json();
            }) as UserData;
            setUserData(loggedInUser);
        } catch (e) {
            console.error('Something wrong happened when requesting data with token', e);
            clearToken();
            router.push('/user/login');
        }
    }, [clearToken, getToken, router]);

    const fetchUserBikes = useCallback(async () => {
        try {
            const fetchedBikes = await fetch('http://localhost:8080/api/users/me/bikes', {
                headers: new Headers({
                    'content-type': 'application/json',
                    'authorization': `Bearer ${getToken()}`
                })
            }).then((res) => {
                if (!res.ok) {
                    throw new Error();
                }
                
                return res.json();
            }) as UserBike[];
            fetchedBikes.push({ name: 'Fake Mock', brand: 'BMC', model: 'GF02', type: 'road' })
            setUserBikes(fetchedBikes);
        } catch (e) {
            console.error('Something wrong happened when requesting data with token', e);
            clearToken();
            router.push('/user/login');
        }
    }, [clearToken, getToken, router]);

    useEffect(() => {
        fetchUserData();
        fetchUserBikes();
    }, [fetchUserBikes, fetchUserData]);

    return { userData, userBikes }
}