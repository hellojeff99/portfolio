// React + Tailwind Responsive Resume Component
import { useState } from "react";
import {
	Activity,
	Certification,
	Education,
	Project,
	WorkExperience,
} from "./resumeTypes.ts";
import {
	FaBlogger,
	FaExternalLinkAlt,
	FaGithub,
	FaLinkedin,
} from "react-icons/fa";
import profile from "/src/assets/profile.jpg";
import { resumeData } from "./resumeData.ts";
import React from "react";
import {myInfo} from "../myInfo.ts";
import {HiOutlineMail} from "react-icons/hi";

export const Resume = () => {
	const [basicInfo] = useState(myInfo);
	const [skills] = useState(myInfo.skills);
	const [projects] = useState<Project[]>(resumeData.projects);
	const [workExperience] = useState<WorkExperience[]>(resumeData.workExperience);
	const [education] = useState<Education[]>(resumeData.education);
	const [certifications] = useState<Certification[]>(resumeData.certifications);
	const [activities] = useState<Activity[]>(resumeData.activities);
	
	return (
		<div className="min-h-screen bg-gray-200 dark:bg-gray-900 flex justify-center py-4 px-2 sm:px-4">
			<div className="w-full max-w-4xl shadow-lg rounded-lg p-4 sm:p-8 flex flex-col gap-4 bg-white dark:bg-gray-800">
				{/* Basic Info */}
				<section
					id="basic_info"
					className="border-b border-gray-400 pb-4 flex flex-col-reverse sm:flex-row gap-4"
				>
					<div className="sm:w-3/4 w-full">
						<h1 className="text-black dark:text-white text-3xl sm:text-4xl font-bold">
							{basicInfo.name}
						</h1>
						<p className="text-gray-600 dark:text-gray-300 text-lg sm:text-xl py-1">
							{basicInfo.job}
						</p>
						<div className="mt-2 space-x-2 text-base flex flex-wrap items-center">
							{basicInfo.github && (
								<a
									href={basicInfo.github}
									target="_blank"
									rel="noopener noreferrer"
									className="text-blue-600 hover:underline flex items-center gap-1"
								>
									<FaGithub /> {basicInfo.github}
								</a>
							)}
							{basicInfo.portfolio && (
								<a
									href={basicInfo.portfolio}
									target="_blank"
									rel="noopener noreferrer"
									className="text-blue-600 hover:underline flex items-center gap-1"
								>
									<FaExternalLinkAlt /> 포트폴리오
								</a>
							)}
							{basicInfo.linkedin && (
								<a
									href={basicInfo.linkedin}
									target="_blank"
									rel="noopener noreferrer"
									className="text-blue-600 hover:underline flex items-center gap-1"
								>
									<FaLinkedin /> LinkedIn
								</a>
							)}
							{basicInfo.blog && (
								<a
									href={basicInfo.blog}
									target="_blank"
									rel="noopener noreferrer"
									className="text-blue-600 hover:underline flex items-center gap-1"
								>
									<FaBlogger /> 기술 블로그
								</a>
							)}
						</div>
						{basicInfo.email && (
							<p className="text-gray-500 dark:text-gray-200 mt-1 text-base flex items-center gap-1">
								<HiOutlineMail className="text-xl text-blue-600 dark:text-blue-400" />
								<a
									href={`mailto:${myInfo.email}`}
									className="text-blue-600 hover:underline flex items-center gap-1"
								>
									{myInfo.email}
								</a>
							</p>
						)}
						{basicInfo.simple_about && (
							<p className="text-contents-description leading-relaxed mt-2">
								{basicInfo.simple_about.split("\n").map((line, idx) => (
									<React.Fragment key={idx}>
										{line}
										<br />
									</React.Fragment>
								))}
							</p>
						)}
					</div>
					{profile && (
						<div className="sm:w-1/4 w-full flex justify-center items-center">
							<img
								src={profile}
								alt="Profile"
								className="rounded-full shadow-2xl"
							/>
						</div>
					)}
				</section>
				
				{/* Sections (Skills, Experience, Projects, Activities, Education, Certifications) */}
				{[{
					id: "skills",
					title: "기술 스택",
					subtitle: "Skills",
					content: (
						<div className="text-gray-700 dark:text-gray-300 text-sm w-full space-y-2">
							{Object.entries(skills).map(([key, values]) => (
								values.length > 0 && (
									<div key={key} className="flex flex-wrap gap-1 items-center">
										<p className="font-semibold capitalize w-24 flex justify-end">{key}:</p>
										{values.map((value: string, index: number) => (
											<span
												key={`${key}-${index}`}
												className="text-contents-description badge-skill"
											>
                        {value}
                      </span>
										))}
									</div>
								)
							))}
						</div>
					),
				},
					{
						id: "education",
						title: "교육 & 학력",
						subtitle: "Education",
						content: education.map((edu, i) => (
							<div key={`education-${i}`} className="border-b border-gray-300 border-dashed pb-2">
								<p className="text-contents-title">
									{edu.institution} - {edu.degree}
								</p>
								<p className="text-contents-caption">{edu.date}</p>
							</div>
						)),
					},
					{
						id: "experience",
						title: "인턴 & 실무 경험",
						subtitle: "Work Experience",
						content: workExperience.map((work, i) => (
							<div key={`work-${i}`} className="border-b border-gray-300 border-dashed pb-2">
								<p className="text-contents-title">
									{work.company} - {work.position}
								</p>
								<p className="text-contents-caption">{work.date}</p>
								<ul className="list-disc pl-5 text-contents-description whitespace-pre-line">
									{work.description.map((d, idx) => (
										<li key={`work-desc-${i}-${idx}`}>{d}</li>
									))}
								</ul>
							</div>
						)),
					},
					{
						id: "activity",
						title: "활동",
						subtitle: "Activity",
						content: activities.map((activity, i) => (
							<div key={`activity-${i}`} className="border-b border-gray-300 border-dashed pb-2">
								<p className="text-contents-title">{activity.title}</p>
								<p className="text-contents-caption">{activity.date}</p>
								<ul className="list-disc pl-5 text-contents-description whitespace-pre-line">
									{activity.description.map((d, idx) => (
										<li key={`activity-desc-${i}-${idx}`}>{d}</li>
									))}
								</ul>
								{activity.contribution.length > 0 && (
									<>
										<p className="text-contents-description font-medium">주요 역할</p>
										<ul className="list-disc pl-5 text-contents-description whitespace-pre-line">
											{activity.contribution.map((c, idx) => (
												<li key={`activity-contrib-${i}-${idx}`}>{c}</li>
											))}
										</ul>
									</>
								)}
							</div>
						)),
					},
					
					{
						id: "projects",
						title: "프로젝트 경험",
						subtitle: "Projects",
						content: projects.map((project, i) => (
							<div key={`project-${i}`} className="border-b border-gray-300 border-dashed pb-2">
								<p className="text-contents-title">
									{project.title} | {project.project_type} - {project.sub_title}
								</p>
								<p className="text-contents-caption">{project.date}</p>
								<ul className="list-disc pl-5 text-contents-description whitespace-pre-line">
									{project.description.map((d, idx) => (
										<li key={`project-desc-${i}-${idx}`}>{d}</li>
									))}
								</ul>
								{project.contribution.length > 0 && (
									<>
										<p className="text-contents-description font-medium">주요 역할</p>
										<ul className="list-disc pl-5 text-contents-description whitespace-pre-line">
											{project.contribution.map((c, idx) => (
												<li key={`project-contrib-${i}-${idx}`}>{c}</li>
											))}
										</ul>
									</>
								)}
							</div>
						)),
					}
					].map(({ id, title, subtitle, content }) => (
					<section
						key={id}
						id={id}
						className="border-b border-gray-400 pb-4 flex flex-col sm:flex-row gap-4"
					>
						<div className="sm:w-1/5 w-full flex flex-col sm:items-end">
							<h2 className="text-lg font-semibold">{title}</h2>
							<p className="text-gray-500 dark:text-gray-200 text-sm">{subtitle}</p>
						</div>
						<div className="sm:w-4/5 w-full space-y-2">{content}</div>
					</section>
				))}
				
				{/* Certifications */}
				{certifications.length > 0 && (
					<section id="certifications" className="border-b border-gray-400 pb-4 flex flex-col sm:flex-row gap-4">
						<div className="sm:w-1/5 w-full flex flex-col sm:items-end">
							<h2 className="text-lg font-semibold">자격증</h2>
							<p className="text-gray-500 dark:text-gray-200 text-sm">Certifications</p>
						</div>
						<div className="sm:w-4/5 w-full space-y-2">
							{certifications.map((cert, i) => (
								<div key={`certification-${i}`} className="border-b border-gray-300 border-dashed pb-2">
									<p className="text-contents-title">{cert.name}</p>
									<p className="text-contents-caption">{cert.date}</p>
								</div>
							))}
						</div>
					</section>
				)}
			</div>
		</div>
	);
};