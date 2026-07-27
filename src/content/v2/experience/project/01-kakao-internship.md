---
title: 카카오 현장실습(제대로 먹젠!?)
subtitle: 교내 위치와 이동 시간을 기준으로 음식 종류와 주변 식당을 추천하는 제주대학교 학생 대상 모바일 웹 서비스
role: "Front: Kakao Maps SDK 연동·지도/마커 원형·초기 식당/건물 데이터 구축 / Management: Jira·Agit 협업 운영·GitHub Wiki 문서화"
team-size: 5명
period: "2023.01.03 ~ 2023.01.30"
github: https://github.com/kakaoDreamy/jnu-eat

contributions:
  - Kakao Maps SDK 초기 연동과 지도·마커 객체화, 다중 마커 렌더링 원형 구현
  - 식당 48개·교내 건물 74개의 초기 JSON 데이터셋 구축
  - Jira Kanban·Agit Daily Scrum 기반 협업 운영과 GitHub Wiki 문서화

highlights:
  - title: 지도 SDK·다중 마커 기반 위치 탐색
  - title: 공통 JSON 기반 무서버 추천 데이터 구축
  - title: Jira·Agit·GitHub 기반 협업 및 지식 관리

stack:
  - React
  - JavaScript
  - Kakao Maps JavaScript SDK
  - GitHub Pages
  - GitHub Wiki
  - Jira
  - Agit
---

## 구현 화면

| 시작                                                                                      | 사용 방법                                                                                | 조건 선택                                                                                                  |
| ----------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| <img src="/images/career/projects/kakao-internship/home.png" alt="제대로 먹젠 시작 화면"> | <img src="/images/career/projects/kakao-internship/how-to-use.png" alt="사용 방법 안내"> | <img src="/images/career/projects/kakao-internship/select-condition.png" alt="교내 위치와 이동 시간 선택"> |

| 음식 추천                                                                                 | 추천 결과 선택                                                                                        | 식당 추천                                                                                 | 최종 결과                                                                                 |
| ----------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| <img src="/images/career/projects/kakao-internship/rullet.png" alt="음식 종류 추천 룰렛"> | <img src="/images/career/projects/kakao-internship/select-result.png" alt="룰렛 결과 수락 또는 제외"> | <img src="/images/career/projects/kakao-internship/nest-rullet.png" alt="식당 추천 룰렛"> | <img src="/images/career/projects/kakao-internship/result.png" alt="추천 식당 최종 결과"> |

---

## 1. 프로젝트 개요

- 교내 위치와 이동 가능 시간을 입력하면 도보 범위의 식당을 지도에 표시하는 제주대학교 학생 대상 서비스
- 음식 종류와 식당을 두 번의 룰렛으로 좁히고, 비선호 결과는 제외한 뒤 다시 추천하는 5단계 흐름
- React SPA에서 지도·추천·결과 확인을 처리하고 GitHub Pages에 정적 배포

---

## 2. 담당 역할

- 개인 담당: Kakao Maps SDK 초기 연동·지도 중심/줌 제어·다중 마커 원형·초기 식당/건물 데이터 구축
- 협업 운영: Jira Kanban·Agit Daily Scrum·GitHub Wiki Ground Rule 및 회의 기록
- 팀 통합: 개인 지도 원형과 팀의 거리 필터·룰렛·결과 화면 연결
- 팀 담당: 최종 거리 계산·추천 상태 전이·룰렛·Kakao Share와 결과 화면

---

## 3. 시스템 구조

### 주요 데이터 흐름

<img src="/images/career/projects/kakao-internship/data-flow.png" alt="data-flow" style="zoom:50%;" />

- 별도 API 서버·DB 없이 건물·식당 JSON을 브라우저 번들에 포함
- Kakao Maps JavaScript SDK로 지도·마커·인포윈도우 처리
- `MainPage`의 단계 상태를 기준으로 지도와 룰렛 화면 전환

---

## 4. 핵심 구현 1 — React에서 Kakao Maps와 다중 마커 제어

<img src="/images/career/projects/kakao-internship/select-condition.png" alt="Kakao Map과 조건 선택 화면" />

### 문제와 선택

- Kakao Maps SDK의 명령형 `Map·LatLng·Marker` 객체와 React의 선언형 렌더링 방식 차이
- DOM 컨테이너가 준비된 이후 `useEffect`에서 지도와 마커를 생성하는 방식 선택

### 구현

1. HTML 진입점에 Kakao Maps SDK를 연결하고 제주대 중심 좌표·지도 레벨 설정
2. JSON 좌표를 `kakao.maps.LatLng` 객체로 변환
3. 마커 이미지·위치·생성을 함수로 분리
4. 교내 건물 좌표 배열을 순회해 다중 마커 렌더링

### 결과

- 초기 74개 교내 건물 좌표를 지도에 표시하는 다중 마커 원형 구축
- 지도 중심 이동·줌 레벨·마커 표현을 후속 조건별 지도 기능의 기반으로 제공

관련 코드: `KaMap.jsx`

---

## 5. 핵심 구현 2 — 서버·DB 없는 추천 데이터 기반 구축

<img src="/images/career/projects/kakao-internship/rullet.png" alt="JSON 데이터를 이용한 음식 분류 룰렛"/>

### 문제와 선택

- 지도·룰렛·결과 화면이 함께 사용할 식당명·주소·분류·좌표·Kakao Map 정보 필요
- 4주 프로젝트에서 API 서버와 DB를 추가하기보다 검수한 JSON을 번들에 포함하는 방식 선택

### 구현

1. 식당 조사 자료를 `RES_ID·RES_NAME·RES_ADDR·RES_GB·RES_URL` 구조로 변환
2. 교내 건물을 `building_id·building_name·building_lat·building_lng` 구조로 정리
3. 식당 48개·교내 건물 74개의 초기 데이터셋을 Git으로 관리
4. 팀 통합 과정에서 식당 좌표를 추가해 거리 필터 입력으로 확장

### 결과

- 동일한 입력에서 같은 추천 후보를 만드는 재현 가능한 클라이언트 데이터 기반 확보
- 지도는 좌표, 룰렛은 분류·식당명, 결과 화면은 Kakao Map 정보를 같은 데이터 흐름에서 사용

관련 코드: `restaurant.json`, `building.json`

---

## 6. 핵심 구현 3 — 협업 과정을 추적 가능한 지식 자산으로 전환

### 문제와 선택

- 5명이 짧은 기간에 기획 변경·역할 조정·기능 통합을 반복해 구두 합의만으로는 결정 배경이 소실
- Jira는 작업 상태, Agit은 빠른 공유, GitHub Wiki는 규칙·회의·의사결정 보존에 사용

### 구현

1. Jira에서 업무를 `TODO→DOING→DONE`으로 구분해 담당 업무와 팀 진척도 공유
2. Daily Scrum 전 `done·to do·share`를 정리하고 Agit으로 일정·이슈 변경 전파
3. GitHub Issue의 `dev·bug·meeting` 라벨과 브랜치·커밋 규칙 수립
4. Ground Rule·Daily Meeting·Weekly Review·기획 변경 이력을 GitHub Wiki에 기록

### 결과

- 기획부터 역할·회의·협업 규칙까지 다시 확인할 수 있는 프로젝트 기록 구축

관련 문서: [Github Wiki](https://github.com/kakaoDreamy/jnu-eat/wiki)

---

## 7. 프로젝트 결과

- 현재 팀 데이터 기준 교내 위치 75개·식당 50개·음식 분류 13개를 활용한 5단계 추천 흐름 구성
- Kakao Map의 위치 탐색과 음식·식당 룰렛을 결합해 선택지 탐색부터 최종 결과 확인까지 연결
- 지도 SDK·초기 데이터·협업 문서라는 개인 담당 범위를 코드 커밋과 Wiki 이력으로 검증
- 기존 카카오 ICT 인턴십 포트폴리오 PDF의 지도 제어·Jira·Agit·Wiki 역할을 현재 저장소 근거와 교차 확인
