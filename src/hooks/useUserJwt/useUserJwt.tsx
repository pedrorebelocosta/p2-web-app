'use client'

import { useCallback, useMemo, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { isEqual } from 'lodash';

export type UserJwt = {
    access_token?: string;
}

export type UseUserJwtReturn = {
    isLoggedIn: boolean;
    setToken: (token: string) => void;
    getToken: () => string | undefined;
    clearToken: () => void;
}

const USER_TOKEN_KEY = "nolhtaced_user_token";
const USER_TOKEN_DEFAULT = {};

export const useUserJwt = (): UseUserJwtReturn => {
    const [userToken, persistUserToken] = useLocalStorage<UserJwt>(USER_TOKEN_KEY, USER_TOKEN_DEFAULT);
    const isLoggedIn = useMemo(() => !isEqual(userToken, USER_TOKEN_DEFAULT), [userToken]);

    const setToken = useCallback(
        (token: string) => persistUserToken({ access_token: token }),
        [persistUserToken]
    );

    const getToken = useCallback(() => userToken.access_token, [userToken]);

    const clearToken = useCallback(() => {
        persistUserToken({})
    }, [persistUserToken]);

    return { isLoggedIn, getToken, setToken, clearToken };
}
