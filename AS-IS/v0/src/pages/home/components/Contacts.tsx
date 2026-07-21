import {HiOutlineMail} from "react-icons/hi";
import {myInfo} from "../../myInfo.ts";
import {GoLocation} from "react-icons/go";
import {FaGithub} from "react-icons/fa";

export const Contacts = () => {
	return (
		<>
			<section
				id="contacts"
				className="text-base text-gray-700 dark:text-gray-300 md:ml-4 flex flex-col"
			>
				<div className="flex justify-start gap-1">
					<HiOutlineMail className="text-xl text-blue-600 dark:text-blue-400" />
					<a
						href={`mailto:${myInfo.email}`}
						className="hover:underline hover:text-blue-800 dark:hover:text-blue-300 transition"
					>
						{myInfo.email}
					</a>
				</div>
				<div className="flex justify-start gap-1">
					<p className="flex items-center justify-center gap-2">
						<GoLocation className="text-xl text-red-500 dark:text-red-400" />
						{myInfo.location}
					</p>
				</div>
				<div className="flex justify-start gap-1">
					<p className="flex items-center justify-center gap-2">
						<FaGithub className="text-xl text-gray-800 dark:text-white" />
						<a
							href={myInfo.github}
							target="_blank"
							rel="noopener noreferrer"
							className="hover:underline hover:text-blue-800 dark:hover:text-blue-300 transition"
						>
							GitHub
						</a>
					</p>
				</div>
			</section>
		</>
	);
};