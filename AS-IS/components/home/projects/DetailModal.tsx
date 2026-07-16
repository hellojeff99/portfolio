"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { type ModalItem } from "./types";

export default function DetailModal({ item, onClose }: { item: ModalItem; onClose: () => void }) {
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => { document.body.style.overflow = ""; };
    }, []);

    const hasImages = (item.detailImages ?? []).length > 0;

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
            {/* 모달 */}
            <div className="bg-white rounded-xl w-4/5 max-h-[80vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
                {/* 헤더 */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 sticky top-0 bg-white z-10">
                    <div>
                        <p className="text-xs text-gray-400">{item.period}</p>
                        <h2 className="text-lg font-bold text-gray-900">{item.title}</h2>
                    </div>
                    {/* 닫기 버튼 */}
                    <button
                        onClick={onClose}
                        className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors text-gray-700 hover:text-gray-900 font-bold text-xl"
                        aria-label="닫기"
                    >
                        ✕
                    </button>
                </div>

                {/* 이미지 영역 */}
                <div className="p-6 space-y-6">
                    {!hasImages ? (
                        <div className="w-full bg-gray-100 rounded flex items-center justify-center text-gray-300 text-sm" style={{ aspectRatio: "297 / 210" }}>
                            이미지 준비 중
                        </div>
                    ) : (
                        item.detailImages!.map((src, i) => (
                            <div key={i} className="relative w-full">
                                <Image
                                    src={src}
                                    alt={`${item.title} 상세 이미지 ${i + 1}`}
                                    width={2000}
                                    height={2000}
                                    className="w-full h-auto object-contain rounded"
                                    quality={100}
                                    priority={i === 0}
                                />
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>,
        document.body
    );
}