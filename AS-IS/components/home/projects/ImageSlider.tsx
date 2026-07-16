"use client";

import { useState } from "react";
import Image from "next/image";

export default function ImageSlider({ images, title }: { images: string[]; title: string }) {
    const [idx, setIdx] = useState(0);

    if (images.length === 0) {
        return (
            <div className="w-full aspect-video bg-gray-100 rounded-lg flex items-center justify-center text-gray-300 text-sm">
                이미지 준비 중
            </div>
        );
    }

    return (
        <div className="relative w-full aspect-video bg-gray-100 rounded-lg overflow-hidden">
            <Image src={images[idx]} alt={`${title} 이미지 ${idx + 1}`} fill className="object-cover" />
            {images.length > 1 && (
                <>
                    <button
                        onClick={() => setIdx((i) => (i - 1 + images.length) % images.length)}
                        aria-label="이전"
                        className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/80 text-navy flex items-center justify-center text-xs hover:bg-white transition-colors shadow"
                    >‹</button>
                    <button
                        onClick={() => setIdx((i) => (i + 1) % images.length)}
                        aria-label="다음"
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/80 text-navy flex items-center justify-center text-xs hover:bg-white transition-colors shadow"
                    >›</button>
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                        {images.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setIdx(i)}
                                className={`w-1.5 h-1.5 rounded-full transition-colors ${i === idx ? "bg-navy" : "bg-gray-300"}`}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}