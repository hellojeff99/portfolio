"use client";

import ActivitiesSection from "@/components/resume/ActivitiesSection";
import CertificationsSection from "@/components/resume/CertificationsSection";
import PrintBtn from "@/components/resume/common/PrintBtn";
import EducationSection from "@/components/resume/EducationSection";
import ProfileSection from "@/components/resume/ProfileSection";
import ProjectsSection from "@/components/resume/ProjectsSection";
import SkillsSection from "@/components/resume/SkillsSection";
import SummarySection from "@/components/resume/SummarySection";
import WorkSection from "@/components/resume/WorkSection";

export default function ResumePage() {
  return (
    <>
      <PrintBtn />
      <div className="max-w-3xl mx-auto py-8 border border-gray-200 rounded-lg px-10 print:border-none print:rounded-none">
        <ProfileSection />
        <SummarySection />
        <EducationSection />
        <CertificationsSection />
        <SkillsSection />
        {/* <div className="print:break-before-page"> */}
        <WorkSection />
        <ProjectsSection />
        {/* </div> */}
        <ActivitiesSection />
      </div>
    </>
  );
}
