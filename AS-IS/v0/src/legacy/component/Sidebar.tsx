import { BasicInfo, Education, Profile, TechStack } from "../DataTypes.ts";
import { FaGithub, FaLinkedin, FaEnvelope, FaCode, FaGraduationCap, FaUser, FaLink } from "react-icons/fa";

interface SidebarProps {
  profile: Profile;
}

const Sidebar: React.FC<SidebarProps> = ({ profile }) => {
  const basic_info: BasicInfo = profile.basic_info;
  const tech_stack: TechStack = profile.tech_stack;
  const education: Education = profile.education;

  console.log(basic_info);

  return (
    <aside className="w-full h-full bg-blue-600 rounded-r-xl rounded-l-none flex flex-col items-center p-4 text-white print:text-black print:p-0">
      {/* 프로필 이미지 */}
      <section className="w-full flex flex-col justify-center items-center">
        <img
          src="profile.jpg"
          alt="Profile"
          className="rounded-full w-28 h-28 border-4 border-blue-300 shadow-md mt-4"
        />
        <h1 className="text-2xl font-bold">{basic_info.name}</h1>
      </section>
      
      {/* 기본 정보 */}
      <section className="w-full mt-6">
        <h2 className="text-sm font-semibold border-b pb-1 mb-2 flex items-center gap-2">
          <FaUser /> Contact
        </h2>
        <div className="text-xs space-y-2">
          {basic_info.email && (
            <p className="flex items-center gap-2">
              <FaEnvelope size={16} className="" />
              {basic_info.email}
            </p>
          )}
          {basic_info.github && (
            <p className="flex items-center gap-2">
              <FaGithub size={16} className="" />
              <a href={basic_info.github} className=" hover:text-gray-300 font-semibold hover:underline">
                {basic_info.github}
              </a>
            </p>
          )}
          {basic_info.linkedin && (
            <p className="flex items-center gap-2">
              <FaLinkedin size={16} className="" />
              <a href={basic_info.linkedin} className=" hover:text-gray-300 font-semibold hover:underline">
                {basic_info.linkedin}
              </a>
            </p>
          )}
          {basic_info.link1 && (
            <p className="flex items-center gap-2">
              <FaLink size={16} className="" />
              <a href={basic_info.link1} className=" hover:text-gray-300 font-semibold hover:underline">
                {basic_info.link1}
              </a>
            </p>
          )}
          {basic_info.link2 && (
            <p className="flex items-center gap-2">
              <FaLink size={16} className="" />
              <a href={basic_info.link2} className=" hover:text-gray-300 font-semibold hover:underline">
                {basic_info.link2}
              </a>
            </p>
          )}
          {basic_info.link3 && (
            <p className="flex items-center gap-2">
              <FaLink size={16} className="" />
              <a href={basic_info.link3} className=" hover:text-gray-300 font-semibold hover:underline">
                {basic_info.link3}
              </a>
            </p>
          )}
        </div>
      </section>

      {/* 기술 스택 */}
      <section className="w-full mt-4">
        <h2 className="text-sm font-semibold border-b pb-1 mb-2  flex items-center gap-2">
          <FaCode /> Tech Stack
        </h2>
        <div className="text-xs space-y-2">
          {Object.entries(tech_stack).map(([category, items]) => (
            <div key={category} className="mb-1">
              <h3 className="font-semibold text-xs">{category}</h3>
              <div className="flex flex-wrap gap-1 mt-1">
                {items.map((item: string, idx: number) => (
                  <span key={idx} className="bg-blue-500 px-2 py-1 text-xs rounded-lg font-medium shadow-sm">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 학력 정보 */}
      <section className="w-full mt-6">
        <h2 className="text-sm font-semibold border-b pb-1 mb-2 flex items-center gap-2">
          <FaGraduationCap /> Education
        </h2>
        <div className="text-xs ">
          <p className="font-semibold ">{education.university}</p>
          <p className="font-medium">
            {education.major} {education.double_major && `/ ${education.double_major}`}
          </p>
          <p className="font-medium">GPA: {education.gpa}</p>
          <p className="">{education.period}</p>
        </div>
      </section>
    </aside>
  );
};

export default Sidebar;
