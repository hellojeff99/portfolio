import {
  certifications,
  educations,
  profile,
  projects,
  skills,
} from "./content/collections";
import { v2Collections } from "./content/v2/content.config";

export const collections = {
  projects,
  skills,
  certifications,
  educations,
  profile,
  ...v2Collections,
};
