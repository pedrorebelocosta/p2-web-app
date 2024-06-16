'use client';

import { UserJwt, useUserJwt } from "@/hooks/useUserJwt/useUserJwt";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

export const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { setToken } = useUserJwt();
    const router = useRouter();

    const onClickSignin = useCallback(async () => {
        try {
            const userDetails = await fetch('http://localhost:8080/api/auth/signin', {
                method: 'POST',
                body: JSON.stringify({ username, password }),
                headers: new Headers({ 'Content-Type': 'application/json' }),
            }).then((res) => res.json()) as UserJwt;
            // forcing here as the token is definitely present in this scope otherwise exception is handled
            setToken(userDetails.access_token!);
            router.push("/user/profile");
        } catch (e) {
            console.error('Error fetching token: ', e);
        }

    }, [password, router, setToken, username]);


    const onClickSignup = useCallback(() => {
        router.push('/user/signup');
    }, [router]);

    return (
        <>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <div className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Username
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="username"
                                type="text"
                                value={username}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                onChange={(e) => setUsername(e.target.value)}
                                required />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Password
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={password}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                onChange={(e) => setPassword(e.target.value)}
                                required />
                        </div>
                    </div>

                    <div>
                        <button
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            onClick={onClickSignin}
                        >
                            Sign in
                        </button>
                    </div>
                </div>
            </div>
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Don&apos;t have an account?
            </h2>
            <div>
                <button
                    className="flex w-full  justify-center rounded-full border-2 border-gray-400c dark:border-gray-700 font-semibold text-black px-4 py-2"
                    onClick={onClickSignup}
                >
                    Sign up
                </button>
            </div>
        </>
    );
}
