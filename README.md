# OPT

신뢰있는 트레이너와 회원 관리를 위한 통합 피트니스 플랫폼

## 주요 기능

- 트레이너의 자격증 검증

- 움직임 추적으로 운동 횟수 카운트

- 운동 및 식단 기록 기반의 AI 리포트

- 회원의 관심사 기반 트레이너 추천

## 기술 스택

### 프론트엔드

<p>
  <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=white">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white">
  <img src="https://img.shields.io/badge/Firebase-DD2C00?style=flat-square&logo=Firebase&logoColor=white">
</p>

### 백엔드

<p>
  <img src="https://img.shields.io/badge/Java-ED8B00?style=flat-square&logo=openjdk&logoColor=white" /> 
  <img src="https://img.shields.io/badge/Spring Boot-6DB33F?style=flat-square&logo=Spring Boot&logoColor=white">
  <img src="https://img.shields.io/badge/Hibernate-59666C?style=flat-square&logo=hibernate&logoColor=white">
  <img src="https://img.shields.io/badge/MySQL-4479A1?style=flat-square&logo=MySQL&logoColor=white"> 
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white"> 
  <img src="https://img.shields.io/badge/Redis-DC382D?style=flat-square&logo=Redis&logoColor=white">
</p>

### AI

<p>
  <img src="https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white">
  <img src="https://img.shields.io/badge/MediaPipe-FF6F00?style=flat-square&logo=mediapipe&logoColor=white">
  <img src="https://img.shields.io/badge/FastAPI-009688?style=flat-square&logo=fastapi&logoColor=white">
</p>

### 인프라

<p>
  <img src="https://img.shields.io/badge/Amazon EC2-FF9900?style=flat-square&logo=amazonec2&logoColor=white">
  <img src="https://img.shields.io/badge/Apache Kafka-231F20?style=flat-square&logo=Apache Kafka&logoColor=white"> 
  <img src="https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=Docker&logoColor=white">
  <img src="https://img.shields.io/badge/Jenkins-D24939?style=flat-square&logo=Jenkins&logoColor=white">
</p>

### 협업

<p>
  <img src="https://img.shields.io/badge/GitLab-FC6D26?style=flat-square&logo=GitLab&logoColor=white">
  <img src="https://img.shields.io/badge/Jira-0052CC?style=flat-square&logo=Jira&logoColor=white">
</p>

## 소프트웨어 아키텍처

![아키텍처 이미지](/images/architecture.png)

## 기술 구성

- 미디어파이프를 활용한 AI 분석 모델 구축

- ML-Kit를 활용한 스트리밍 영상 내 동작 분석 및 카운트 모델 구축

- ko-sroberta-multitask(SentenceTransformer) 모델을 활용하여 문장 임베딩 및 의미적 유사도 분석

- 형태소 분석기(Okt)와 NLP 기반 토큰 정제 과정 적용

- Google OCR API 및 SentenceTransformer를 활용하여 OCR 텍스트 보정 및 키-값 매칭을 수행/사전 학습된 NLP 모델을 사용하여 OCR 결과에서 필요한 정보를 추출 및 정제

- OCR과 국가가공인인증 자격증 API를 통한 트레이너 자격증 검증 모델 구축

- Kafka 기반의 비동기 메시징 시스템을 활용하여 OCR 요청을 처리/OCR 오류 보정을 위한 SentenceTransformer 모델을 활용하여 신뢰도 높은 데이터 제공

- React Native를 활용한 안드로이드 어플리케이션 개발

## 주요 화면 및 사용자 흐름

### 메인 화면

<img src="./images/OPT 메인화면.gif" width="25%"/>

- 로그인 후 최초 진입하는 화면

- 사용자 로그인 후 메인 화면에서 챌린지 및 트레이너 추천

  - 현재 진행중인 챌린지 목록

  - 관심사 기반 트레이너 추천 목록

  - 조회수 및 별점이 좋은 트레이너 목록 조회 가능

### 검색 화면(트레이너 목록)

<img src="./images/OPT 검색화면.gif" width="25%"/>

- 사용자가 트레이너 검색

- 트레이너 검색 시 다음의 기준으로 트레이너 추천

  - 트레이너의 자기소개에서 추출한 키워드와 사용자의 관심사를 비교하여 계산한 유사도

  - 거리/별점/리뷰

### 트레이너 상세 정보

<img src="./images/OPT 트레이너 상세정보.gif" width="25%"/>

- 트레이너의 상세 정보(별점, 자기소개, 인증된 자격증, 위치, 후기, PT가격 등) 조회

### 채팅 기능

<img src="./images/OPT 트레이너에게 채팅.gif" width="25%"/>

- Web Socket을 기반으로 한 채팅 기능

### AI 주간 리포트

<img src="./images/OPT 운동기록-AI주간 리포트.gif" width="25%"/>

- 생성형 AI를 통해 회원의 일주일 간 식단 및 운동 기록을 통해 리포트 작성

### 내가 속한 챌린지 조회

<img src="./images/OPT 챌린지 목록 조회.gif" width="25%"/>

- 현재 내가 참여하고있는/신청한 챌린지 조회

### 내가 속한 챌린지 상세 조회

<img src="./images/OPT 챌린지 상세정보.gif" width="25%"/>

- 챌린지의 상세 정보, 등수, 나의 챌린지 참여현황 조회

### 전체 챌린지 조회 및 상세 조회

<img src="./images/OPT 전체챌린지 조회 및 상세정보.gif" width="25%"/>

- 내가 참여하고있는/신청한 챌린지 뿐만 아니라 현재 진행되고 있는 모든 챌린지 조회회

### 트레이너의 자격증 인증화면

<img src="./images/OPT OCR인증화면.gif" width="25%"/>

- 트레이너임을 증명하기 위해 생활체육지도사 자격증을 OCR로 전처리 후 외부 자격증 확인 API를 통해 인증하는 기능

### 트레이너의 마이페이지

<img src="./images/OPT 트레이너 상세정보.gif" width="25%"/>

- 트레이너의 별점, 키워드, 자기소개, 자격증, 위치, 후기 등 조회

### 사용자의 운동 카운트

<img src="./images/OPT 스쿼트 자세.webp" width="25%"/>

- ML-Kit를 사용하여 사용자의 운동 동작을 감지하여 카운트 세어주는 기능

# 팀원 소개

<table>
  <tbody>
    <tr>
      <td align="center"><a href="https://github.com/Cheonwooo"><img src="https://avatars.githubusercontent.com/u/82378975?v=4" width="100px;" alt=""/></a></td>
      <td align="center"><a href="https://github.com/R0731"><img src="https://avatars.githubusercontent.com/u/155418461?v=4" width="100px;" alt=""/></a></td>
      <td align="center"><a href="https://github.com/zwjddn1105"><img src="https://avatars.githubusercontent.com/u/175976497?v=4" width="100px;" alt=""/></a></td>
      <td align="center"><a href="https://github.com/Moc4418"><img src="https://avatars.githubusercontent.com/u/175369167?v=4" width="100px;" alt=""/></a></td>
      <td align="center"><a href="https://github.com/DDuMandoo"><img src="https://avatars.githubusercontent.com/u/102932167?v=4" width="100px;" alt=""/></a></td>
      <td align="center"><a href="https://github.com/swoolee97"><img src="https://avatars.githubusercontent.com/u/73256853?v=4" width="100px;" alt=""/></a></td>
    </tr>
    <tr>
      <td align="center"><a href="https://github.com/Cheonwooo"><b> 천현우 </b></a><br />팀장, Infra, BE<br /></td>
      <td align="center"><a href="https://github.com/JJBINY"><b> 강지은 </b></a><br />BE<br /></td>
      <td align="center"><a href="https://github.com/elsa-kim"><b> 김정우 </b></a><br />FE<br /></td>
      <td align="center"><a href="https://github.com/mwjng"><b> 김효성 </b></a><br />FE<br /></td>
      <td align="center"><a href="https://github.com/GuKBABjOa"><b> 오준수 </b></a><br />BE<br /></td>
      <td align="center"><a href="https://github.com/PKafka0320"><b> 이승우 </b></a><br />BE<br /></td>
    </tr>
  </tbody>
</table>
