import {myInfo} from "../../myInfo.ts";

export const Skills = () => {
	return (
		<>
			<section
				id="skills"
				className="w-full max-w-3xl border-b border-gray-300 dark:border-gray-700 pb-8 px-4"
			>
				<h2 className="text-h2">Skills</h2>
				<ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
					<li>
						<strong>Backend: </strong>{myInfo.skills.backend.toString()}
					</li>
					<li>
						<strong>Frontend: </strong>{myInfo.skills.front.toString()}
					</li>
					<li>
						<strong>Infra: </strong>{myInfo.skills.infra.toString()}
					</li>
					<li>
						<strong>Development support tools: </strong>{myInfo.skills.etc.toString()}
					</li>
				</ul>
			</section>
		</>
	);
};