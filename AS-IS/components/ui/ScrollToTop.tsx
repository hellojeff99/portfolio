"use client";

import { useEffect, useState } from "react";

export default function ScrollToTop() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY > 300);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    if (!visible) return null;

    return (
        <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-8 right-8 z-50 w-10 h-10 flex items-center justify-center rounded-full bg-navy text-white shadow-md hover:opacity-80 transition-opacity"
            aria-label="Scroll to top"
        >
            ↑
        </button>
    );
}