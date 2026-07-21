export interface BasicInfo {
  name: string;
  email: string;
  location: string;
  github: string;
  portfolio: string;
  linkedin: string;
  link1: string;
  link2: string;
  link3: string;
}

export interface TechStack {
  backend: string[];
  frontend: string[];
  devops: string[];
  etc: string[];
}

export interface Education {
  university: string;
  major: string;
  double_major?: string;
  gpa: string;
  period: string;
}

export interface WorkExperience {
  company: string;
  role: string;
  period: string;
  project: string;
  responsibilities: string[];
}

export interface Project {
  name: string;
  period: string;
  description: string;
  tech_stack: string[];
  features: string[];
}

export interface Activity {
  organization: string;
  activity: string;
  period: string;
  tasks: string[];
}

export interface Additional {
  title: string;
  description: string;
  period: string;
}

export interface Profile {
  basic_info: BasicInfo;
  summary: string;
  tech_stack: TechStack;
  education: Education;
  work_experience: WorkExperience[];
  projects: Project[];
  activities: Activity[];
  certifications: string[];
  additionals: Additional[];
}

export interface UserProfile {
  ko: Profile;
  en: Profile;
}
