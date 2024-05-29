'use client'

import classNames from "classnames";
import Link from "next/link";
import Image from 'next/image';
import { usePathname } from "next/navigation"
import { HEADER_CONFIG } from "./config";
import { useUserInfo } from "@/hooks/useUserInfo";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

import styles from './styles.module.scss';

export type HeaderNavigationItem = {
    title: string;
    to: string;
    activePattern: string;
}

export const Header = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false)
    const currentPath = usePathname();
    const isLoggedIn = useUserInfo();
    const items = HEADER_CONFIG;

    return (
        <header className="bg-white">
            <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
                <div className="flex lg:flex-1">
                    <a href="#" className="-m-1.5 p-1.5">
                        <Image width={200} height={32} className="h-8 w-auto" src="/logo.png" alt="" />
                    </a>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>
                <div className="hidden lg:flex lg:gap-x-12">
                    {items.map(({ title, to, activePattern }) =>
                        <Link key={to} href={to} className={classNames("text-sm leading-6 text-gray-900", {
                            "font-bold": currentPath.match(activePattern)
                        })}>{title}</Link>
                    )}
                </div>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    <Link href="/cart">
                        <div className="flex flex-row-reverse">
                            Cart <ShoppingCartIcon className="h-6 w-6 mr-2" />
                        </div>
                    </Link>
                    <Link href={isLoggedIn ? "/user/profile" : "/user/login"} className={classNames("text-sm font-semibold leading-6 text-gray-900", { "font-bold": currentPath.match("/user*") })}>
                        {isLoggedIn ? "My Account" : "Login/Signup"} <span aria-hidden="true">&rarr;</span>
                    </Link>
                </div>
            </nav>
            <Dialog className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                <div className="fixed inset-0 z-10" />
                <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                        <a href="#" className="-m-1.5 p-1.5">
                            <Image
                                className="h-8 w-auto"
                                src="/logo.png"
                                width={200}
                                height={32}
                                alt=""
                            />
                        </a>
                        <button
                            type="button"
                            className="-m-2.5 rounded-md p-2.5 text-gray-700"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-6">
                                {items.map(({ title, to, activePattern }) =>
                                    <Link key={to} href={to} className={classNames("-mx-3 block rounded-lg px-3 py-2 text-base leading-7 text-gray-900 hover:bg-gray-50", {
                                        "font-bold": currentPath.match(activePattern)
                                    })}>{title}</Link>
                                )}
                            </div>
                            <div className="py-6">
                                <Link href="/cart">
                                    <div className={"-mx-3 block rounded-lg px-3 py-2.5 text-base leading-7 text-gray-900 hover:bg-gray-50 flex"}>
                                        Cart <ShoppingCartIcon className="h-6 w-6 mr-2" />
                                    </div>
                                </Link>
                                <Link href={isLoggedIn ? "/user/profile" : "/user/login"} className={classNames("-mx-3 block rounded-lg px-3 py-2.5 text-base leading-7 text-gray-900 hover:bg-gray-50", { "font-bold": currentPath.match("/user*") })}>{isLoggedIn ? "My Account" : "Login/Signup"}</Link>
                            </div>
                        </div>
                    </div>
                </Dialog.Panel>
            </Dialog>
        </header>
    )
}