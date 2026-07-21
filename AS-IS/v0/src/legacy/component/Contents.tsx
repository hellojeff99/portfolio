import React from "react";
import { Profile } from "../DataTypes.ts";

interface ContentsProps {
  profile: Profile;
}

const Contents: React.FC<ContentsProps> = ({ profile }) => {
  return (
    <div className="p-4 bg-white w-full h-full flex flex-col rounded-l-xl rounded-r-none text-black">
        {/* 기본 정보 섹션 */}
        <section className="mb-4">
          <h2 className="text-xl font-semibold border-b pb-2 mb-2">About Me</h2>
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div>
              <p className="text-gray-500">{profile.summary}</p>
            </div>
          </div>
        </section>

        {/* 경력 */}
        <section className="mb-4">
          <h2 className="text-xl font-semibold border-b pb-2 mb-2">Work Experience</h2>
          {profile.work_experience.map((exp, index) => (
            <div key={index} className="mb-4">
              <h3 className="font-medium">{exp.company}</h3>
              <p className="text-gray-500">{exp.role} ({exp.period})</p>
              <p className="font-semibold">{exp.project}</p>
              <ul className="list-disc list-inside ml-4">
                {exp.responsibilities.map((task, idx) => <li key={idx}>{task}</li>)}
              </ul>
            </div>
          ))}
        </section>

        {/* 프로젝트 */}
        <section className="mb-4">
          <h2 className="text-xl font-semibold border-b pb-2 mb-2">Projects</h2>
          {profile.projects.map((project, index) => (
            <div key={index} className="mb-4">
              <h3 className="font-medium">{project.name}</h3>
              <p className="text-gray-500">{project.period}</p>
              <p>{project.description}</p>
              {project.features.length > 0 && (
                <>
                  <h4 className="font-semibold mt-2">Features:</h4>
                  <ul className="list-disc list-inside ml-4">
                    {project.features.map((feature, idx) => <li key={idx}>{feature}</li>)}
                  </ul>
                </>
              )}
            </div>
          ))}
        </section>

        {/* 활동 */}
        <section className="mb-4">
          <h2 className="text-xl font-semibold border-b pb-2 mb-2">Activities</h2>
          {profile.activities.map((activity, index) => (
            <div key={index} className="mb-2">
              <h3 className="font-medium">{activity.organization}</h3>
              <p className="text-gray-500">{activity.activity} ({activity.period})</p>
              <ul className="list-disc list-inside ml-4">
                {activity.tasks.map((task, idx) => <li key={idx}>{task}</li>)}
              </ul>
            </div>
          ))}
        </section>

        {/* 자격증 */}
        <section className="mb-4">
          <h2 className="text-xl font-semibold border-b pb-2 mb-2">Certifications</h2>
          <ul className="list-disc list-inside ml-4">
            {profile.certifications.map((cert, idx) => <li key={idx}>{cert}</li>)}
          </ul>
        </section>

        {/* 추가 정보 */}
        <section className="mb-4">
          <h2 className="text-xl font-semibold border-b pb-2 mb-2">Activities</h2>
          {profile.additionals.map((additional, index) => (
            <div key={index} className="mb-2">
              <h3 className="font-medium">{additional.title}</h3>
              <p className="text-gray-500">{additional.period}</p>
              <ul className="list-disc list-inside ml-4">{additional.description}</ul>
            </div>
          ))}
        </section>
    </div>
  );
};

export default Contents;
