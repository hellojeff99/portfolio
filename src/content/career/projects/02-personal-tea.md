---
title: 퍼스널TEA
subtitle: 날씨 기반 반려식물 케어와 커뮤니티, 허브 취향 추천을 연결한 웹 서비스
role: "Front: React 초기 구성, 화면 라우팅·공통 UI, 허브 취향 테스트 구현"
team-size: 5명(Design 1, Front 2, Back 2)
period: "2023.06.27 ~ 2023.06.30"
github: https://github.com/sw-hackathon-team-41/client

contributions:
- React 프로젝트 초기 구성과 홈·공통 UI 컴포넌트 설계
- React Router 기반 7개 화면 라우팅과 공통 내비게이션 구현
- 5단계 허브 취향 테스트 구현

highlights:
- title: 질문·점수·결과를 연결한 5단계 허브 추천
  subtasks:
  - 5개 질문과 20개 선택지의 진행 상태·허브별 점수·최종 결과를 하나의 화면 흐름으로 구성
- title: 7개 화면을 연결한 라우팅·공통 UI 구조
  subtasks:
  - 페이지를 containers로 분리하고 Banner·Board·Card·NavLink를 재사용 컴포넌트로 구성

stack:
- React
- JavaScript
- Tailwind CSS
- daisyUI

---

## 구현 화면

| 홈 | 로그인 | 게시글 작성 |
| --- | --- | --- |
| <img src="/images/career/projects/personal-tea/home.png" alt="퍼스널TEA 홈"> | <img src="/images/career/projects/personal-tea/login.png" alt="로그인"> | <img src="/images/career/projects/personal-tea/post-1.png" alt="게시글 작성"> |

| 허브 취향 테스트 시작 | 허브 취향 선택 | 추천 결과 |
| --- | --- | --- |
| <img src="/images/career/projects/personal-tea/recommand-1.png" alt="허브 취향 테스트 시작"> | <img src="/images/career/projects/personal-tea/recommand-2.png" alt="허브 취향 선택"> | <img src="/images/career/projects/personal-tea/recommand-4.png" alt="허브 추천 결과"> |

---

## 1. 프로젝트 개요

- 날씨 정보, 반려식물 커뮤니티, 허브 취향 추천을 결합한 3일 해커톤 웹 서비스
- 일반·Q&A 게시글, 내 게시글, 로그인·회원가입, 날씨 정보, 5단계 허브 취향 테스트로 구성

---

## 2. 담당 역할

- 개인 담당: React 초기 설정·홈 화면·공통 UI·라우팅·허브 취향 테스트
- 화면 통합: 홈·마이피드·설문을 공통 Banner·Board·Card 컴포넌트로 연결
- 팀 담당: 게시글·사용자 API 연동, Spring Boot API·JPA·PostgreSQL·Docker 구성

---

## 3. 시스템 구조

### 주요 데이터 흐름

<img src="/images/career/projects/personal-tea/data-flow.png" alt="data-flow" style="zoom:20%;" />

- 프론트엔드는 사용자·게시글·날씨 API를 호출하고 React 상태에 따라 화면을 갱신
- 백엔드는 사용자·게시글 도메인을 처리하고 PostgreSQL에 저장
- 날씨 데이터는 WeatherAPI.com에서 조회해 온도·습도·UV 기반 분류값으로 가공

---

## 4. 핵심 구현 1 — 질문·점수·결과를 연결한 5단계 허브 추천

<img src="/images/career/projects/personal-tea/recommand-2.png" alt="5단계 허브 취향 테스트" style="zoom:50%;" />

### 문제와 선택

- 5개 질문, 질문별 4개 선택지, 허브별 누적 점수, 진행률, 결과 화면을 하나의 흐름으로 연결해야 하는 문제
- 질문별 페이지를 분리하는 대신 단일 React 컴포넌트에서 단계와 점수를 관리하는 방식 선택

### 구현

1. `currentStep`으로 현재 질문과 20% 단위 진행률 관리
2. 선택한 열에 대응하는 민트·카모마일·로즈마리·라벤더 점수 누적
3. 마지막 응답에서 최고 점수를 계산하고 추천 결과 화면으로 전환

### 결과

- 5개 질문·20개 선택지·4종 추천 결과를 별도 API 없이 브라우저에서 처리

---

## 5. 핵심 구현 2 — 7개 화면을 연결한 라우팅·공통 UI 구조

<img src="/images/career/projects/personal-tea/home.png" alt="공통 배너와 게시판으로 구성한 홈 화면" style="zoom:50%;" />

### 문제와 선택

- 짧은 기간에 홈·마이피드·글쓰기·소개·인증·설문 화면이 추가되며 공통 UI 중복과 통합 충돌이 커지는 문제
- 화면은 containers, 재사용 UI는 components로 분리하고 React Router로 연결하는 구조 선택

### 구현

1. `BrowserRouter`와 `Routes`를 이용해 7개 화면 경로 구성
2. Banner·BannerButton·Board·Card를 페이지에서 조합할 수 있는 컴포넌트로 분리
3. Router의 Link와 공통 스타일을 결합한 NavLink로 내비게이션 통합

### 결과

- 홈·마이피드·설문이 공통 UI를 공유하고 팀원의 데이터 조회 로직을 연결할 수 있는 화면 구조 구성

---

## 6. 프로젝트 결과

- 5단계 질문부터 허브 추천 결과까지 이어지는 클라이언트 처리 흐름 구현
- 7개 화면과 공통 UI를 연결해 팀 기능을 통합할 수 있는 React 화면 구조 구성
