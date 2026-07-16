export type Education = {
  school: string;
  major: string | null;
  sub?: string;
  gpa: string | null;
  period: string;
};

export const educations: Education[] = [
  {
    school: "제주대학교",
    major: "공과대학 소프트웨어학부 컴퓨터공학전공",
    sub: "연계전공: 빅데이터융합전공",
    gpa: "3.9 / 4.5",
    period: "2018.03 — 2026.02",
  },
  {
    school: "제주대학교사범대학부설고등학교",
    major: null,
    gpa: null,
    period: "2015.03 — 2018.02",
  },
];
