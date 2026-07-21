// Home.tsx
import 'highlight.js/styles/github.css';
import {myInfo} from "../myInfo.ts";
import {Contacts} from "./components/Contacts.tsx";
import profile from "/src/assets/profile.jpg";
import {Skills} from "./components/Skills.tsx";
import {Projects} from "./components/Projects.tsx";

export const Home = () => {
	return (
		<main className="flex flex-col items-center space-y-8">
			<section
				id="header"
				className="w-full flex items-center justify-center bg-gradient-to-b from-white via-blue-50 to-blue-300 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 py-4"
			>
				<div className="flex flex-col md:flex-row-reverse gap-4 w-full max-w-3xl px-4">
					{profile && (
						<img
							src={profile}
							alt="Profile"
							className="w-1/3 content-center rounded-full shadow-2xl px-2"
						/>
					)}
					<div className="flex-col items-center content-center">
						<section id="name">
							<h1
								className="text-5xl md:text-6xl font-extrabold leading-tight text-gray-900 dark:text-white tracking-tight">
								<p className="bg-gradient-to-r from-sky-500 to-blue-700 bg-clip-text text-transparent">
									{myInfo.eng_name}
								</p>
							</h1>
						</section>
						<Contacts/>
					</div>
				</div>
			</section>
			
			<section
				id="about"
				className="w-full max-w-3xl border-b border-gray-300 dark:border-gray-700 pb-8 px-4"
			>
				<h2 className="text-h2">About Me</h2>
				<p className="text-gray-700 dark:text-gray-300 leading-relaxed">
					{myInfo.about}
				</p>
			</section>
			
			<Skills />
			
			<Projects />
		</main>
	);
};
