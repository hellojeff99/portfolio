// ── Base ──────────────────────────────────────────────────────
export type Task = {
  title: string;
  subtasks?: string[];
};

// 기존 Project type 수정
export type Project = {
  kind: "work" | "pinned" | "other" | "activity";
  title: string;
  subtitle?: string;
  meta?: string;
  period: string;
  tasks: (string | Task)[]; // 문자열 또는 Task 객체 둘 다 허용
  stack?: string[];
  imageFolder?: string;
  detailFolder?: string;
};

export type WorkProject = Project & { kind: "work" };
export type PinnedProject = Project & { kind: "pinned" };
export type OtherProject = Project & { kind: "other" | "activity" };

// ── Work ──────────────────────────────────────────────────────
export const workProjects: WorkProject[] = [
  {
    kind: "work",
    title: "제주은행 차세대 프로젝트 - 여신 파트",
    subtitle: "㈜인포마인드",
    meta: "SI 개발 · 프리랜서",
    period: "2021.03 ~ 2021.12",
    tasks: [
      "약 1,000개 규모의 여신 업무 화면을 차세대 표준 환경으로 이관",
      "JavaScript, 서버 프로그램(C), SQL 영역의 장애 원인을 분석하고 수정",
      "단말 스크립트 → 서버 → DB까지 데이터 흐름을 추적하여 정합성 검증 수행",
      "반복 로직 개선을 통해 유지보수성과 실행 효율 향상",
    ],
    stack: ["JavaScript", "Oracle", "xFrame", "C"],
    imageFolder: "work/jejubank",
    detailFolder: "work/jejubank/detail",
  },
];

// ── Pinned ────────────────────────────────────────────────────
export const pinnedProjects: PinnedProject[] = [
    {
    kind: "pinned",
    title: "TicketLab",
    subtitle:
      "동시성 제어와 조회 최적화 실험 프로젝트 (좌석 예약 시스템)",
    period: "2026.06.19 ~ 2026.06.26",
    tasks: [
      "Optimistic Lock, Pessimistic Lock을 비교 적용하여 동시 예약 시 데이터 정합성 검증",
      "Indexing과 Redis Cache를 적용해 좌석 조회 성능 최적화 및 캐시 무효화 구현",
      "k6 부하 테스트를 통해 동시성 환경에서 예약 정합성과 조회 성능을 측정·분석"
    ],
    stack: [
      "Java",
      "Spring Boot",
      "JPA",
      "PostgreSQL",
      "Redis",
      "Docker",
      "k6",
    ],
    imageFolder: "pinned/ticketlab",
    detailFolder: "pinned/ticketlab/detail",
  },
  {
    kind: "pinned",
    title: "DevBrew",
    subtitle:
      "멘토-멘티 기반 커피챗 + 실시간 1:1 채팅 플랫폼 (End-to-End 예약 및 대화 시스템)",
    period: "2026.05.14 ~ 2026.05.24",
    tasks: [
      "Prisma ORM을 활용해 User, CoffeeChat, ChatRoom, Message 관계를 설계하고 예약-채팅 전환 흐름 구현",
      "JWT 기반 인증/인가와 NestJS Guard를 적용하여 역할별 접근 제어 구현",
      "Socket.IO 기반 실시간 채팅을 구현하고 DB 저장 이후 브로드캐스트 구조를 적용하여 메시지 유실 방지",
      "멘토 탐색 → 슬롯 예약 → 승인 → 채팅 생성까지 상태 기반 비즈니스 플로우 설계",
    ],
    stack: [
      "Next.js",
      "NestJS",
      "TypeScript",
      "Prisma",
      "PostgreSQL",
      "Socket.IO",
    ],
    imageFolder: "pinned/devbrew",
    detailFolder: "pinned/devbrew/detail",
  },
];

// ── Other ─────────────────────────────────────────────────────
export const otherProjects: OtherProject[] = [
  {
    kind: "activity",
    title: "교육부 디지털 새싹 캠프 - 보조 멘토",
    subtitle: "",
    period: "2024.07.29 ~ 2024.11.19 (총 34회)",
    tasks: [
      "초·중등: 엔트리 기반 블록 코딩 및 알고리즘 기초 교육 지원",
      "고등: GPT 활용 Python 코딩 및 MS Power Automate 자동화 실습 가이드",
      "역할: 실습 로직 디버깅 및 대상별 눈높이에 맞춘 기술 개념 설명",
    ],
    stack: ["Entry", "MS Automate", "Python"],
    detailFolder: "other/newsac",
  },
  {
    kind: "activity",
    title: "SignaHand",
    subtitle: "웹캠 제스처 인식을 활용한 PDF 전자서명 및 문서 편집 서비스",
    period: "2023.07 ~ 2023.08(약 4주)",
    tasks: [
      "react-pdf가 제공하지 않는 편집 기능을 보완하기 위해 pdf.js 기반 PDF 뷰어 구현",
      "사용자 서명 이미지를 PDF 좌표계 기준으로 매핑하여 문서 편집 기능 구현",
      "편집 결과를 이미지 데이터로 변환하여 저장 가능한 형태로 직렬화",
      "PDF 로딩 및 페이지 전환 과정에서 Canvas 상태를 관리하여 렌더링 오류 방지",
    ],
    stack: ["React", "TypeScript"],
    imageFolder: "other/signahand",
    detailFolder: "other/signahand/detail",
  },
  {
    kind: "activity",
    title: "Personal Tea (SW 공동 해커톤)",
    subtitle: "사용자 취향 및 날씨 API 기반 맞춤형 허브티 추천 서비스",
    period: "2023.06(2박3일)",
    tasks: [
      "프로젝트 리딩: 개발 방향 수립, 일정 조율 및 이슈 관리 주도",
      "커뮤니티 게시판 및 SNS 스타일 기능 프론트엔드 구현 ",
      "Vercel을 이용한 지속적 배포(CD) 환경 구축 ",
    ],
    stack: ["React", "TypeScript", "Vercel"],
    detailFolder: "other/personal-tea",
  },
  {
    kind: "activity",
    title: "카카오 인턴십 (현장실습)",
    subtitle: "제주대학교 학생 대상 위치 기반 점심 메뉴 추천 서비스 개발",
    period: "2023.01",
    tasks: [
      "Jira 기반의 협업 프로세스 리딩",
      "Github Wiki를 활용한 지식 문서화",
      // "위치 기반 서비스 기능 구현",
    ],
    stack: ["React", "Jira", "GitHub Wiki"],
    detailFolder: "other/kakao-internship",
  },
  {
    kind: "activity",
    title: "월드프렌즈 ICT 봉사단 (베트남)",
    subtitle: "아두이노 기반 덴드로비움 재배 스마트팜 시스템 구축 및 교육",
    period: "2019.07 ~ 2019.08 (4주)",
    tasks: [
      "제한된 장비 환경에서 아두이노와 센서·펌프·LED를 조합해 스마트팜 시스템 완성",
      "온도, 습도, 조도 센서 로직 구현 및 LCD 모니터링 구현",
      "현지 대학생 대상 기술 교육 자료 제작 및 실습 지도",
    ],
    stack: ["Arduino", "C++", "JavaScript"],
    detailFolder: "other/vietnam-vol",
  },
];
