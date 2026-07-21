import {useState} from "react";
import {Profile} from "../DataTypes.ts";
import ControlPanel from "./ControlPanel.tsx";
import Sidebar from "./Sidebar.tsx";
import Contents from "./Contents.tsx";
import data from "../data.ts";

export const Temp = () => {
	const [lang, setLang] = useState<"ko" | "en">("ko");
	const profile: Profile = data[lang];
	
	return (
		<div className="flex flex-col items-center bg-gray-200 min-h-screen p-2 print:bg-white print:p-0">
			{/* Control Panel (숨김 처리) */}
			<div className="print:hidden max-w-4xl w-full print:max-w-full flex justify-end p-2">
				<ControlPanel lang={lang} setLang={setLang} />
			</div>
			
			{/* Resume Layout */}
			<div className="max-w-4xl w-full print:max-w-full">
				{/* Main Layout */}
				<div className="flex flex-col md:flex-row-reverse print:flex-row-reverse">
					{/* Sidebar - 작은 화면에서는 상단에 배치 */}
					<aside className="w-full md:w-1/3 print:w-1/3 print:bg-white print:p-2">
						<Sidebar profile={profile} />
					</aside>
					
					{/* Main Content */}
					<main className="flex-1 print:w-2/3">
						<Contents profile={profile} />
					</main>
				</div>
			</div>
			
			{/* 프린트 페이지 자동 분리 */}
			<div className="hidden print:block print:page-break-before-always" />
		</div>
	);
};