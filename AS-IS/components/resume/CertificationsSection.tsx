import { certifications } from "@/lib/common/certifications";
import SectionTitle from "@/components/resume/common/SectionTitle";

export default function CertificationsSection() {
    return (
        <section className="py-5 border-t border-gray-200">
            <SectionTitle>Certifications</SectionTitle>
            <div className="mt-3 space-y-2">
                {certifications.map((cert, i) => (
                    <div key={i} className="flex justify-between items-center">
                        <span className="text-sm font-semibold text-gray-800">{cert.name}</span>
                        <span className="text-xs text-gray-400">{cert.date} · {cert.issuer}</span>
                    </div>
                ))}
            </div>
        </section>
    );
}