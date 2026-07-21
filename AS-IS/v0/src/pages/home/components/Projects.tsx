import {ProjectTabs} from "./ProjectTabs.tsx";
import {ImagePreviewModal} from "./ImagePreviewModal.tsx";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import {useEffect, useState} from "react";
import {ProjectDataTypes} from "../projectDataTypes.ts";
import imagesByFolder from "../imageUtils.ts";
import {projectData} from "../projectData.ts";

export const Projects = () => {
	const categoryTabs = [
		{
			label: "System Design",
			data: projectData.systemDesign,
		},
		{
			label: "UI Development",
			data: projectData.uiDevelopment,
		},
		{
			label: "System Feature",
			data: projectData.systemFeature,
		},
		{
			label: "Collaboration",
			data: projectData.collaboration,
		},
	];
	
	const allProjects = categoryTabs.flatMap((tab) => tab.data);
	
	const [selectedTab, setSelectedTab] = useState(-1);
	const [selectedActivity, setSelectedActivity] = useState<ProjectDataTypes>(allProjects[0]);
	const [markdownContent, setMarkdownContent] = useState("");
	const [imageUrls, setImageUrls] = useState<string[]>(imagesByFolder[selectedActivity.name]);
	
	
	useEffect(() => {
		fetch(selectedActivity.src)
			.then((res) => res.text())
			.then(setMarkdownContent)
			.catch(() => setMarkdownContent("마크다운 파일을 불러오는 데 실패했습니다."));
		
		setImageUrls(imagesByFolder[selectedActivity.name]);
		
	}, [selectedActivity]);
	
	return (
		<>
			<section
				id="projects"
				className="w-full max-w-3xl border-b border-gray-300 dark:border-gray-700 pb-8 px-4"
			>
				<h2 className="text-h2">Projects</h2>
				
				<ProjectTabs
					tabs={categoryTabs}
					selectedTab={selectedTab}
					setSelectedTab={setSelectedTab}
					selectedActivity={selectedActivity}
					setSelectedActivity={setSelectedActivity}
				/>
				
				{imageUrls && (
					<ImagePreviewModal imagePaths={imageUrls}/>
				)}
				
				<div className="prose prose-blue dark:prose-invert max-w-none mt-6">
					<ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
						{markdownContent}
					</ReactMarkdown>
				</div>
			</section>
		</>
	);
};