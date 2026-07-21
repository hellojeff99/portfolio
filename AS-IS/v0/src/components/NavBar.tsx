import { NavLink } from "react-router-dom";

export const NavBar = () => {
	return (
		<>
			<div className="w-full bg-blue-500 p-0.5"/>
		<nav className="bg-white dark:bg-gray-900 shadow border-b border-gray-300 px-4">
			<div className="flex">
				<div className="flex">
					{/*<NavLink*/}
					{/*	to="/"*/}
					{/*	end*/}
					{/*	className={({ isActive }) =>*/}
					{/*		`px-8 py-2 transition-colors font-medium ${*/}
					{/*			isActive*/}
					{/*				? "bg-gray-200 dark:bg-gray-800 text-black dark:text-white"*/}
					{/*				: "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"*/}
					{/*		}`*/}
					{/*	}*/}
					{/*>*/}
					{/*	Home*/}
					{/*</NavLink>*/}
					<NavLink
						to="/resume"
						className={({ isActive }) =>
							`px-8 py-2 transition-colors font-medium ${
								isActive
									? "bg-gray-200 dark:bg-gray-800 text-black dark:text-white"
									: "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
							}`
						}
					>
						Resume
					</NavLink>
					{/*<NavLink*/}
					{/*	to="/coverletter"*/}
					{/*	className={({ isActive }) =>*/}
					{/*		`px-8 py-2 transition-colors font-medium ${*/}
					{/*			isActive*/}
					{/*				? "bg-gray-200 dark:bg-gray-800 text-black dark:text-white"*/}
					{/*				: "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"*/}
					{/*		}`*/}
					{/*	}*/}
					{/*>*/}
					{/*	Cover Letter*/}
					{/*</NavLink>*/}
				</div>
			</div>
		</nav>
		</>
	);
};
