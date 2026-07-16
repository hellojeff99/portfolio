export type Certification = {
    name: string;
    date: string;
    issuer: string;
};

export const certifications: Certification[] = [
    { name: "정보처리기사",              issuer: "한국산업인력공단",         date: "2025.09" },
    { name: "SQL개발자 (SQLD)",          issuer: "한국데이터산업진흥원", date: "2025.12" },
    { name: "데이터분석준전문가 (ADsP)",  issuer: "한국데이터산업진흥원",   date: "2025.11" },
];