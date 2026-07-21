import { certifications } from "@/lib/home";

export default function CertificationsSection() {
    return (
        <section id="certifications" className="section-hidden px-16 py-10 border-gray-100">
            <div className="space-y-5">
                <div className="flex items-center gap-4">
                    <p className="text-sm font-extrabold uppercase tracking-widest text-navy">Certifications</p>
                    <div className="flex-1 h-px bg-gray-200" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {certifications.map((cert) => (
                        <div key={cert.name} className="p-4 rounded-xl border border-gray-200 space-y-1">
                            <p className="text-xs text-gray-400">{cert.date}</p>
                            <p className="text-base font-bold text-gray-900">{cert.name}</p>
                            <p className="text-sm text-gray-400">{cert.issuer}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}