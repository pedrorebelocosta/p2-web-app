'use client'

import { UserJwt, useUserJwt } from "@/hooks/useUserJwt/useUserJwt";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

export const SignupForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [address, setAddress] = useState('');
    const [vatNo, setVatNo] = useState('');

    const router = useRouter();
    const { setToken } = useUserJwt();


    const onClickSignup = useCallback(async () => {
        try {
            const userDetails = await fetch('http://localhost:8080/api/auth/signup', {
                method: 'POST',
                body: JSON.stringify({
                    username,
                    password,
                    first_name: firstName,
                    last_name: lastName,
                    date_of_birth: dateOfBirth,
                    address,
                    vat_no: vatNo
                }),
                headers: new Headers({ 'Content-Type': 'application/json' }),
            }).then((res) => res.json() as UserJwt);

            setToken(userDetails.access_token!);
            router.push("/user/profile");
        } catch (e) {
            console.error('Something wrong happened when signing up', e);
        }

        console.table()
    }, [username, password, firstName, lastName, dateOfBirth, address, vatNo, setToken, router]);

    return (
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
                    <label htmlFor="firstname" className="block text-sm font-medium leading-6 text-gray-900">
                        First Name
                    </label>
                    <div className="mt-2">
                        <input
                            id="firstname"
                            name="firstname"
                            type="text"
                            value={firstName}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            onChange={(e) => setFirstName(e.target.value)}
                            required />
                    </div>
                </div>

                <div>
                    <label htmlFor="lastname" className="block text-sm font-medium leading-6 text-gray-900">
                        Last Name
                    </label>
                    <div className="mt-2">
                        <input
                            id="lastname"
                            name="lastname"
                            type="text"
                            value={lastName}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            onChange={(e) => setLastName(e.target.value)}
                            required />
                    </div>
                </div>

                <div>
                    <label htmlFor="dateOfBirth" className="block text-sm font-medium leading-6 text-gray-900">
                        Date of Birth
                    </label>
                    <div className="mt-2">
                        <input
                            id="dateOfBirth"
                            name="dateOfBirth"
                            type="date"
                            value={dateOfBirth}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            onChange={(e) => {
                                console.log(e.target.value);
                                setDateOfBirth(e.target.value);
                            }
                        }
                            required />
                    </div>
                </div>

                <div>
                    <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">
                        Address
                    </label>
                    <div className="mt-2">
                        <input
                            id="address"
                            name="address"
                            type="text"
                            value={address}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            onChange={(e) => {
                                console.log(e.target.value);
                                setAddress(e.target.value);
                            }
                        }
                            required />
                    </div>
                </div>

                <div>
                    <label htmlFor="vatNo" className="block text-sm font-medium leading-6 text-gray-900">
                        Vat No.
                    </label>
                    <div className="mt-2">
                        <input
                            id="vatNo"
                            name="vatNo"
                            type="text"
                            value={vatNo}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            onChange={(e) => {
                                console.log(e.target.value);
                                setVatNo(e.target.value);
                            }
                        }
                            required />
                    </div>
                </div>

                <div>
                    <button
                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={onClickSignup}
                    >
                        Sign up
                    </button>
                </div>
            </div>
        </div>
    );
}
