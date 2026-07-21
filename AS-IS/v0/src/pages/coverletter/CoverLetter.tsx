import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import ReactMarkdown from "react-markdown";
import {useEffect, useState} from "react";

export const CoverLetter = () => {
	const [markdownContent, setMarkdownContent] = useState("");
	
	useEffect(() => {
		fetch("/markdown/coverletter.md")
			.then((res) => res.text())
			.then(setMarkdownContent)
			.catch(() => setMarkdownContent("마크다운 파일을 불러오는 데 실패했습니다."));
	}, []);
	
	return (
		<div className="min-h-screen bg-gray-200 dark:bg-gray-900 flex justify-center py-4 px-2 sm:px-4">
			<div className="w-full max-w-4xl shadow-lg rounded-lg p-4 sm:p-8 flex flex-col gap-4 bg-white dark:bg-gray-800">
				<ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
					{markdownContent}
				</ReactMarkdown>
			</div>
		</div>
	);
};