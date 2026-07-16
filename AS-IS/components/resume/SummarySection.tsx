import { profile } from "@/lib/common/profile";
import SectionTitle from "@/components/resume/common/SectionTitle";

export default function ProfileSection() {
    return (
        <section className="py-5 border-t border-gray-200">
            <SectionTitle>Summary</SectionTitle>
            <div className="flex-1">
                <p className="text-sm text-gray-600 mt-3 leading-6 whitespace-pre-line">{profile.bio}</p>
            </div>
        </section>
    );
}