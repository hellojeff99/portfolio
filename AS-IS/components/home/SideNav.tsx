"use client";

import { useEffect, useRef, useState } from "react";
import { navItems } from "@/lib/home";

export default function SideNav() {
    const [active, setActive] = useState("hero");
    const rafRef = useRef<number | null>(null);

    useEffect(() => {
        // 섹션 진입 애니메이션 (IntersectionObserver는 애니메이션에만 사용)
        const sections = document.querySelectorAll<HTMLElement>(".section-hidden");
        const animObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) {
                        e.target.classList.remove("section-hidden");
                        e.target.classList.add("animate-fade-up");
                        animObserver.unobserve(e.target);
                    }
                });
            },
            { threshold: 0.1 }
        );
        sections.forEach((s) => animObserver.observe(s));

        // 네비 활성화 — scroll 이벤트 + offsetTop 직접 비교
        const ids = navItems.map((n) => n.href.slice(1));

        const onScroll = () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            rafRef.current = requestAnimationFrame(() => {
                const scrollY = window.scrollY + window.innerHeight * 0.15;
                let current = ids[0];
                for (const id of ids) {
                    const el = document.getElementById(id);
                    if (el && el.offsetTop <= scrollY) current = id;
                }
                setActive(current);
            });
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll(); // 초기 실행

        return () => {
            animObserver.disconnect();
            window.removeEventListener("scroll", onScroll);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, []);

    return (
        <aside className="hidden lg:flex flex-col gap-1 sticky top-0 h-screen w-48 shrink-0 pt-10 pl-6 pr-4">
            <p className="text-sm font-extrabold uppercase tracking-widest text-navy mb-6">
                hellojeff99
            </p>
            {navItems.map((item) => {
                const id = item.href.slice(1);
                const isActive = active === id;
                return (
                    <a
                        key={item.label}
                        href={item.href}
                        onClick={(e) => {
                            e.preventDefault();
                            const target = document.getElementById(id);
                            if (!target) return;
                            const root = document.documentElement;
                            root.classList.add("smooth-scroll");
                            target.scrollIntoView();
                            setTimeout(() => root.classList.remove("smooth-scroll"), 500);
                        }}
                        className={`relative text-base font-medium transition-all duration-200 py-1.5 pl-3 rounded-r
              ${isActive
                            ? "text-navy font-bold before:absolute before:left-0 before:top-1 before:bottom-1 before:w-0.5 before:bg-navy before:rounded-full"
                            : "text-gray-400 hover:text-navy hover:pl-4"
                        }`}
                    >
                        {item.label}
                    </a>
                );
            })}
        </aside>
    );
}