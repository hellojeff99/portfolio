export interface Skills {
	backend: string[];
	front: string[];
	infra: string[];
}

export interface Project {
	title: string;
	project_type: string;
	sub_title: string;
	date: string;
	description: string[];
	contribution: string[];
}

export interface WorkExperience {
	company: string;
	position: string;
	date: string;
	description: string[];
}

export interface Education {
	degree: string;
	institution: string;
	date: string;
}

export interface Certification {
	name: string;
	date: string;
}

export interface Activity {
	title: string;
	date: string;
	description: string[];
	contribution: string[];
}