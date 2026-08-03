---
title: DevBrew
subtitle: 멘토 탐색부터 커피챗 예약·승인·1:1 실시간 채팅까지 연결한 개발자 멘토링 플랫폼
role: 풀스택 개발
type: 개인프로젝트
team-size: 1명
period: 2026.05.14 ~ 2026.05.24
github: https://github.com/hellojeff99/devbrew
contributions:
  - Next.js·NestJS 기반 멘토링 서비스 설계 및 풀스택 구현
  - Prisma 트랜잭션과 고유 제약을 활용한 예약 데이터 일관성 확보
  - 커피챗 승인 연계 채팅방 생성 및 JWT 기반 실시간 채팅 구현
  - 메시지 선저장 후 브로드캐스트를 통한 실시간 데이터와 대화 기록 일치
  - Vercel·Railway·Neon 기반 프론트엔드·서버·데이터베이스 분리 배포
highlights:
  - title: 예약 데이터 일관성 확보
  - title: 예약과 채팅 흐름 연결
  - title: 실시간 채팅의 영속성 확보
  - title: 분리 배포 환경 연결 안정화
stack:
  - Next.js
  - NestJS
  - TypeScript
  - Prisma
  - PostgreSQL
  - Socket.IO
---

## 예약부터 대화까지, 한 번에 이어지는 개발자 멘토링

기존 멘토링 서비스의 무거운 참여 방식에서 벗어난 커피챗 기반 멘토링 서비스 구현

## 핵심 결과

```text-flow
멘토 탐색 → 시간 선택 → 커피챗 신청 → 멘토 승인 → 실시간 채팅
```

> 흩어져 있던 다섯 단계를 하나의 서비스 흐름으로 완성했습니다.

- **예약 일관성** — 하나의 시간에는 하나의 예약만 연결
- **자동 연결** — 승인된 커피챗에는 채팅방이 자동으로 생성
- **대화 보존** — 메시지는 저장된 뒤 전달되어 다시 접속해도 유지
- **서비스 배포** — 프론트엔드, API, 데이터베이스를 분리

<img src="/images/career/projects/featured/devbrew/live-chat.gif" alt="live-chat" style="zoom:20%;">

## 구현 화면

| 멘토 탐색                                                                  | 커피챗 예약                                                                | 커피챗 승인                                                                         | 실시간 채팅                                                          |
| -------------------------------------------------------------------------- | -------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| <img src="/images/career/projects/featured/devbrew/find-mento.png" alt=""> | <img src="/images/career/projects/featured/devbrew/metno-info.png" alt=""> | <img src="/images/career/projects/featured/devbrew/dashboard-for-mento.png" alt=""> | <img src="/images/career/projects/featured/devbrew/chat.png" alt=""> |

---

---

## 문제 해결

### 01. 중복 예약 차단

**문제**

동일한 시간에 여러 신청이 들어오면 예약 상태가 어긋날 수 있음

**해결**

슬롯 점유와 커피챗 생성을 하나의 트랜잭션으로 처리하고,
`timeSlotId`에 고유 제약을 적용

**결과**

**1개 슬롯 : 1개 커피챗** 규칙이 화면 상태와 관계없이 유지
거절된 슬롯은 자동으로 다시 예약 가능한 상태로 변경

### 02. 저장과 실시간 전달을 일치

**문제**

화면에 보낸 메시지가 데이터베이스에 남지 않으면 대화 기록을 신뢰할 수 없음

**해결**

```text-flow
메시지 전송 → DB 저장 → 룸 단위 전송 → 양쪽 화면 갱신
```

JWT로 소켓 연결 사용자를 확인하고,
채팅방 참여자만 룸에 입장하도록 검증

**결과**

실시간으로 받은 메시지와 다시 불러온 대화 내역이 동일하게 유지

---

### 03. 배포 환경의 소켓 연결 안정화

**문제**

로컬에서 동작하던 WebSocket 연결이 Railway 프록시 환경에서는 불안정

**해결**

- CORS 허용 주소를 환경 변수로 분리
- polling으로 연결한 뒤 WebSocket으로 전환
- 소켓 생성과 실제 연결 시점을 분리

**결과**

Vercel과 Railway로 분리된 환경에서도 양방향 채팅이 올바르게 동작

---

## 사용자 흐름

<img src="/images/career/projects/featured/devbrew/image-20260721145558311.png" alt="image-20260721145558311">

---

## 시스템 아키텍처

<img src="/images/career/projects/featured/devbrew/image-20260721145617162.png" alt="image-20260721145617162">

REST API와 Socket.IO가 같은 도메인 서비스를 사용하고,
모든 영속 데이터는 Prisma를 통해 PostgreSQL에 저장

---

## ERD

<img src="/images/career/projects/featured/devbrew/image-20260721145643724.png" alt="image-20260721145643724">

`timeSlotId`와 `coffeeChatId`에 고유 제약을 적용해
슬롯–커피챗과 커피챗–채팅방의 1:1 관계를 보장

---

## 구현 범위

- 서비스 기획과 멘토·멘티 사용자 흐름 설계
- 5개 데이터 모델과 관계·고유 제약 정의
- 인증·멘토·슬롯·예약·채팅 API 구현
- 역할별 9개 화면과 실시간 채팅 UI 구현
- 프론트엔드·백엔드·데이터베이스 배포

---

<details>
<summary><strong>상세 설계 문서 보기</strong></summary>

- [API 명세](https://github.com/hellojeff99/devbrew/blob/main/docs/API.md)
- [ERD](https://github.com/hellojeff99/devbrew/blob/main/docs/ERD.md)
- [Socket.IO 설계](https://github.com/hellojeff99/devbrew/blob/main/docs/SOCKET.md)
- [서비스 비즈니스 흐름](https://github.com/hellojeff99/devbrew/blob/main/docs/FLOW.md)

</details>
