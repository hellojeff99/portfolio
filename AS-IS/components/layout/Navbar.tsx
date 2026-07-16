"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
    { label: "Home", href: "/" },
    { label: "Resume", href: "/resume" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
];

export default function Navbar() {
    const pathname = usePathname();

    return (
        <nav className="w-full border-b border-gray-200 px-6 py-4 flex items-center justify-between relative">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-1 select-none">
                <span className="font-extrabold text-lg tracking-tight text-navy">
                    HELLOJEFF
                </span>
                <span className="font-extrabold text-lg tracking-tight bg-navy text-white px-1 rounded">
                    99
                </span>
            </Link>

            {/* Nav Items */}
            <ul className="absolute left-1/2 -translate-x-1/2 flex gap-6">
                {navItems.map((item) => {
                    const isActive =
                        item.href === "/"
                            ? pathname === "/"
                            : pathname.startsWith(item.href);

                    return (
                        <li key={item.href}>
                            <Link
                                href={item.href}
                                className={`
                                    relative text-sm pb-1 transition-colors
                                    after:absolute after:left-0 after:bottom-0 after:h-[1.5px] after:bg-navy
                                    after:transition-all after:duration-200
                                    ${isActive
                                    ? "font-semibold text-navy after:w-full"
                                    : "text-gray-400 hover:text-gray-700 after:w-0 hover:after:w-full hover:after:bg-gray-400"
                                }
                                `}
                            >
                                {item.label}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}