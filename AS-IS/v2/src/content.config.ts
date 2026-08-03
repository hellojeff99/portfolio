import {
  certifications,
  educations,
  profile,
  projects,
  skills,
} from "./content/v2.0/collections";
import { v2Collections } from "./content/v2.1/content.config";

export const collections = {
  projects,
  skills,
  certifications,
  educations,
  profile,
  ...v2Collections,
};
