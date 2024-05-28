export type UserInfo = {
    isLoggedIn: boolean;
    setToken: (token: string) => void;
    getToken: () => string;
}

// TODO implement after authentication system
export const useUserInfo = () => {
    return false;
}