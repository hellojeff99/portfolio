// src/utils/loadImages.ts

const imageModules = import.meta.glob('/src/assets/images/project/**', {
	eager: true,
	as: 'url'
});

// Grouped by subfolder name
const imagesByFolder: Record<string, string[]> = {};

Object.entries(imageModules).forEach(([path, url]) => {
	const match = path.match(/\/project\/([^/]+)\//);
	if (!match) return;
	
	const folder: string = match[1];
	if (!imagesByFolder[folder]) {
		imagesByFolder[folder] = [];
	}
	
	imagesByFolder[folder].push(url as string);
});

export default imagesByFolder;