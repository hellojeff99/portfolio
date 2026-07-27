---
title: SignaHand
subtitle: 손동작으로 만든 서명을 PDF 페이지에 적용하고 다중 페이지 PDF로 내려받는 브라우저 기반 서명 프로토타입
role: "Front: PDF 업로드·렌더링, 페이지 상태 관리, Canvas 출력·서명 데이터 연동, 다중 페이지 PDF 내보내기"
team-size: 4명(Design 1, Front 3)
period: "2023.07.21 ~ 2023.11.03"
github: https://github.com/SignaHand/SignaHand

contributions:
  - PDF.js 기반 로컬 PDF 파싱과 페이지별 Canvas 렌더링
  - PageContext 기반 페이지별 편집 결과 저장·미리보기 연동·초기화
  - Canvas 출력과 팀 서명 데이터 연동 및 jsPDF 기반 다중 페이지 PDF 내보내기

highlights:
  - title: 브라우저 기반 PDF 전 페이지 편집
  - title: 페이지 전환 간 편집 상태 동기화
  - title: 다중 페이지 PDF 재구성 및 다운로드

stack:
  - React
  - TypeScript
  - Tailwind CSS
---

## 구현 화면

| 홈                                                                                  | PDF 업로드                                                                          | 손동작 가이드(팀 기능)                                                                        |
| ----------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| <img src="/images/career/projects/signahand/signahand-home.png" alt="SignaHand 홈"> | <img src="/images/career/projects/signahand/signahand-upload.png" alt="PDF 업로드"> | <img src="/images/career/projects/signahand/signahand-gesture-guide.png" alt="손동작 가이드"> |

| 서명 생성(팀 기능)                                                                               | PDF 편집                                                                               | 서명 적용                                                                                            |
| ------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| <img src="/images/career/projects/signahand/signahand-signature-modal.png" alt="서명 생성 모달"> | <img src="/images/career/projects/signahand/signahand-editor.png" alt="PDF 편집 화면"> | <img src="/images/career/projects/signahand/signahand-signed-document.png" alt="서명이 적용된 문서"> |

<details>
<summary>웹캠을 활용한 손동작 서명 시연</summary>
<img src="/images/career/projects/signahand/signahand-hand-demo.png" alt="웹캠을 활용한 손동작 서명 시연" style="zoom:10%;" />
</details>

---

## 1. 프로젝트 개요

- 웹캠 손동작으로 생성한 서명을 로컬 PDF에 적용하는 브라우저 기반 편집 프로토타입
- PDF 업로드부터 페이지 렌더링·서명 적용·다중 페이지 PDF 다운로드까지의 클라이언트 처리

---

## 2. 담당 역할

- 개인 담당: PDF 입력·페이지 렌더링·편집 상태 관리·다중 페이지 PDF 출력
- 기능 통합: Canvas 출력과 팀의 Base64 서명 데이터·미리보기 연결
- 팀 담당: MediaPipe 기반 손동작 인식·서명 생성·배치

---

## 3. 시스템 구조

### 주요 데이터 흐름

<img src="/images/career/projects/signahand/image-20260725151525333.png" alt="image-20260725151525333" style="zoom:80%;" />

---

## 4. 핵심 구현 1 — 로컬 PDF를 편집 가능한 페이지 데이터로 변환

<img src="/images/career/projects/signahand/signahand-upload.png" alt="로컬 PDF 선택 화면" style="zoom:50%;" />

### 문제와 선택

- `react-pdf` 기반 뷰어의 페이지 픽셀 접근·편집 결과 추출 제약
- 렌더링 결과를 직접 제어하는 PDF.js·Canvas 조합 선택

### 구현

1. `URL.createObjectURL()`과 `getDocument()`를 통한 로컬 PDF 로드
2. 전 페이지의 Canvas 렌더링과 JPEG Data URL 변환
3. `{ page, url }` 형식의 `PageContext` 저장

### 결과

- 편집기·미리보기가 공유하는 페이지별 입력 데이터 구성

관련 코드: `PdfUploader.tsx`, `PdfDisplay.tsx`, `Loading.tsx`

---

## 5. 핵심 구현 2 — 페이지 이동 후에도 편집 결과 유지

<img src="/images/career/projects/signahand/signahand-editor.png" alt="페이지 편집 화면과 미리보기" style="zoom:50%;" />

### 문제와 선택

- 페이지 전환 시 Canvas 교체로 인한 편집 결과 소실
- 편집기·미리보기가 공유하는 페이지별 스냅샷 방식 선택

### 구현

1. `pages`에 편집본, `origin`에 초기 이미지 저장
2. 페이지 이동 전 Canvas 직렬화와 `updatePage()` 갱신
3. 동일 Context 기반 미리보기 동기화·현재 페이지 초기화

### 결과

- 페이지 이동 이후에도 유지되는 편집 결과와 미리보기 구성

관련 코드: `PageContext.tsx`, `PreviewDisplay.tsx`

---

## 6. 핵심 구현 3 — 단일 Canvas 저장을 다중 페이지 PDF 출력으로 확장

<img src="/images/career/projects/signahand/signahand-signed-document.png" alt="서명 적용 결과와 파일 저장 화면" style="zoom:50%;" />

### 문제와 선택

- 현재 Canvas를 PNG 한 장으로 저장하는 초기 출력 범위
- 전체 페이지를 재구성하는 jsPDF 출력 방식 선택

### 구현

1. 팀의 Base64 서명 이미지와 PDF Canvas 연결
2. 편집 결과 직렬화와 전체 페이지 스냅샷 수집
3. jsPDF `addImage()`·`addPage()` 기반 PDF 생성

- 개인 구현: 서명 데이터 연결·페이지 상태·PDF 출력 통합
- 팀 구현: 서명 위치 계산과 Canvas 배치

### 결과

- 단일 페이지 PNG 저장에서 다중 페이지 PDF 다운로드로 확장

관련 코드: `PdfDisplay.tsx`

---

## 7. 프로젝트 결과

- 로컬 PDF 입력부터 렌더링·편집 상태 유지·다중 페이지 PDF 출력까지의 브라우저 처리 흐름 구성
- 팀의 손동작 서명 결과와 개인 담당 PDF 처리 파이프라인 통합
