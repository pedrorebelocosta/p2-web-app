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

export type UseUserInfoReturn = {
    userData?: UserData;
}

export const useUserInfo = (): UseUserInfoReturn => {
    const { getToken, clearToken } = useUserJwt();
    const [userData, setUserData] = useState<UserData>();
    const router = useRouter();

    const fetchUserData = useCallback(async () => {
        try {
            const loggedInUser = await fetch("http://localhost:8080/api/users/me", {
                headers: new Headers({
                    'content-type': 'application/json',
                    'authorization': `Bearer ${getToken()}`
                })
            }).then((res) => res.json()) as UserData;
            setUserData(loggedInUser);
        } catch (e) {
            console.error('Something wrong happened when requesting data with token', e);
            clearToken();
            router.push('/user/login');
        }
    }, [clearToken, getToken, router]);

    useEffect(() => {
        fetchUserData();
    }, [fetchUserData]);

    return { userData }
}