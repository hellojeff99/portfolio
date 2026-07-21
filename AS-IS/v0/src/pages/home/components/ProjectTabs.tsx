import { ProjectDataTypes } from "../projectDataTypes.ts";

export const ProjectTabs = ({
	                            tabs,
	                            selectedTab,
	                            setSelectedTab,
	                            selectedActivity,
	                            setSelectedActivity,
                            }: {
	tabs: { label: string; data: ProjectDataTypes[] }[];
	selectedTab: number;
	setSelectedTab: (index: number) => void;
	selectedActivity: ProjectDataTypes;
	setSelectedActivity: (project: ProjectDataTypes) => void;
}) => {
	const allProjects = tabs.flatMap((tab) => tab.data);
	
	return (
		<div className="space-y-6">
			{/* 상위 탭 (카테고리) */}
			<div className="flex flex-wrap gap-3">
				<button
					onClick={() => {
						setSelectedTab(-1);
						setSelectedActivity(allProjects[0]);
					}}
					className={`project-tab ${
						selectedTab === -1
							? "project-tab-selected"
							: "project-tab-unselected"
					}`}
				>
					All
				</button>
				{tabs.map((tab, idx) => (
					<button
						key={tab.label}
						onClick={() => {
							setSelectedTab(idx);
							setSelectedActivity(tab.data[0]);
						}}
						className={`project-tab ${
							selectedTab === idx
								? "project-tab-selected"
								: "project-tab-unselected"
						}`}
					>
						{tab.label}
					</button>
				))}
			</div>
			
			{/* 하위 탭 (프로젝트 목록) */}
			<div className="flex flex-wrap gap-2">
				{(selectedTab === -1 ? allProjects : tabs[selectedTab].data).map((proj) => (
					<button
						key={proj.title}
						onClick={() => setSelectedActivity(proj)}
						className={`project-tab ${
							selectedActivity.title === proj.title
								? "project-tab-selected"
								: "project-tab-unselected"
						}`}
					>
						{proj.title}
					</button>
				))}
			</div>
		</div>
	);
};