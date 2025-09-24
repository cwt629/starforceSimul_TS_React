# Toy Project : 스타포스 시뮬레이터 2024ver.

<p align="center">
    <img alt="메인 화면 이미지" src="https://github.com/user-attachments/assets/1e08ecc5-49ee-48ac-ad65-5eb879b8466e" >
</p>
<br>

## 프로젝트 소개

> 기존에 만든 스타포스 시뮬레이터를 최신화하고 개선한 토이 프로젝트<br>개발 기간: 2024.07.17 - 2024.09.14 (2개월)

스타포스 시뮬레이터는 넥슨의 RPG 게임 <메이플스토리> 내에 존재하는 장비 강화 시스템인 '스타포스'를 웹페이지 내에서 체험하고 시뮬레이션할 수 있도록 만든 프로젝트입니다.<br>
특히 기존에 제작한 스타포스 시뮬레이터보다 UI/UX를 개선하고, 실제 게임 내에서 변경된 강화 정보를 반영하며, 기존에 제공하지 못했던 여러 기능들을 제공하는 것이 목표입니다.<br>
<br>
[Click here to visit the website](https://cwt629.github.io/starforceSimul_TS_React/)

## 기술 스택

### Environment

<img src="https://img.shields.io/badge/visual studio code-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white"> <img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=Git&logoColor=white"> <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white">

### Front-End

<img src="https://img.shields.io/badge/HTML5-E34F29?style=for-the-badge&logo=HTML5&logoColor=white"> <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=CSS3&logoColor=white"> <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white"> <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white"> <img src="https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=Bootstrap&logoColor=white"> <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"> <img src="https://img.shields.io/badge/Redux_Toolkit-764ABC?style=for-the-badge&logo=Redux&logoColor=white">

## 파일 구조

```
📦public
 ┣ 📜favicon.ico
 ┣ 📜index.html
 ┣ 📜logo192.png
 ┣ 📜logo512.png
 ┣ 📜manifest.json
 ┣ 📜robots.txt
 ┗ 📜stars_icon.png

📦src
 ┣ 📂components
 ┃ ┣ 📂log
 ┃ ┃ ┣ 📂badges
 ┃ ┃ ┃ ┣ 📜DestroyBadge.tsx
 ┃ ┃ ┃ ┣ 📜FailureBadge.tsx
 ┃ ┃ ┃ ┗ 📜SuccessBadge.tsx
 ┃ ┃ ┣ 📜Log.tsx
 ┃ ┃ ┣ 📜LogNotice.tsx
 ┃ ┃ ┗ 📜LogPagination.tsx
 ┃ ┣ 📜BreadCrumb.tsx
 ┃ ┣ 📜LeaderBoard.tsx
 ┃ ┣ 📜Options.tsx
 ┃ ┣ 📜Setting.tsx
 ┃ ┣ 📜Simulator.tsx
 ┃ ┣ 📜StarDisplay.tsx
 ┃ ┗ 📜Title.tsx
 ┣ 📂data
 ┃ ┗ 📜reinforce-data.json
 ┣ 📂images
 ┃ ┣ 📜star_empty.png
 ┃ ┗ 📜star_filled.png
 ┣ 📂routers
 ┃ ┣ 📜RouterLog.tsx
 ┃ ┗ 📜RouterMain.tsx
 ┣ 📂store
 ┃ ┗ 📜store.ts
 ┣ 📂styles
 ┃ ┗ 📜Log.css
 ┣ 📂type
 ┃ ┣ 📜auto.ts
 ┃ ┣ 📜discount.ts
 ┃ ┣ 📜result.ts
 ┃ ┣ 📜state.ts
 ┃ ┣ 📜storage.d.ts
 ┃ ┗ 📜swal.ts
 ┣ 📂utils
 ┃ ┣ 📜alert.ts
 ┃ ┣ 📜autoscroll.ts
 ┃ ┣ 📜bigint.ts
 ┃ ┣ 📜chance.ts
 ┃ ┣ 📜cost.ts
 ┃ ┣ 📜dateformat.ts
 ┃ ┣ 📜reinforce.ts
 ┃ ┣ 📜storage.ts
 ┃ ┗ 📜validate.ts
 ┣ 📜App.css
 ┣ 📜App.test.tsx
 ┣ 📜App.tsx
 ┣ 📜index.css
 ┣ 📜index.tsx
 ┣ 📜logo.svg
 ┣ 📜react-app-env.d.ts
 ┣ 📜reportWebVitals.ts
 ┗ 📜setupTests.ts
```

<br>

## 기능 활용 방법

### 시뮬레이션 설정

- 강화할 장비 레벨(0~300 사이의 정수), 시뮬레이션을 진행할 시작 강화 수치와 목표 강화 수치를 입력합니다.
- 복구 비용은 강화 중 장비가 파괴되었을 경우, 해당 장비를 복구하는 데 드는 비용(소위 노작값)입니다. 강화 도중 장비가 파괴되면 해당 비용만큼 총 소모 메소가 증가합니다. (0메소로 입력하면 최종 결과에서 파괴된 장비의 개수를 통해 결과를 알려줍니다.)

<p align="center">
    <img alt="초기 시뮬레이션 설정" src="https://github.com/user-attachments/assets/2baee6aa-38ef-4df8-8584-70ac1bab927e" >
</p>

<details>
    <summary><b>레벨별 가능 강화 수치</b></summary>
    <br>
    <table>
        <tr>
            <th>장비 레벨</th>
            <th>최대 강화 수치</th>
        </tr>
        <tr>
            <td>95 미만</td>
            <td>5성</td>
        </tr>
        <tr>
            <td>95 ~ 107</td>
            <td>8성</td>
        </tr>
        <tr>
            <td>108 ~ 117</td>
            <td>10성</td>
        </tr>
        <tr>
            <td>118 ~ 127</td>
            <td>15성</td>
        </tr>
        <tr>
            <td>128 ~ 137</td>
            <td>20성</td>
        </tr>
        <tr>
            <td>138 ~ 300</td>
            <td>30성</td>
        </tr>
    </table>
</details>
<br>

### 강화 진행(기본)

- 입력한 시작 강화 단계에서 시작하여 강화를 진행할 수 있습니다.
- 옵션은 다음과 같습니다. - _스타캐치 해제_: 성공 확률을 1.05배 높이는 옵션 해제 - 실제 게임 내에서 '스타캐치'라는 미니게임을 통해 성공 확률을 1.05배 높일 수 있으며, 이 옵션이 체크되어 있지 않다면 증가된 확률이 적용되고, 체크되어 있다면 화면에 보이는 원래 확률이 적용됩니다. - _파괴방지_: 15~17성 단계의 장비가 파괴되지 않도록 막는 대신, 기본 강화 비용만큼 비용이 증가합니다.
<p align="center">
    <img alt="강화진행" src="https://github.com/user-attachments/assets/d7399383-fcd9-41fe-86cf-ef64d1922d43" >
</p>

<details>
    <summary><b>결과에 따른 강화 단계 변화</b></summary>
    <ul>
        <li>성공: 강화 단계 1 증가</li>
        <li>실패: 강화 단계 유지</li>
        <li>파괴: 강화 단계 12로 변경, 장비 복구 비용을 추가로 지불 </li>
    </ul>
</details>
<br>

- MVP 등급(인게임 유저 등급), PC방 혜택 적용 유무, 강화 확률이나 비용과 관련된 이벤트를 적용하여 강화를 진행할 수 있습니다. 단, 비용 할인은 파괴방지 옵션에 의해 증가되는 비용에는 적용되지 않습니다.
  - **비용 할인 옵션**
    - _MVP 등급 할인_: 브론즈(할인 없음), 실버(3% 할인), 골드(5% 할인), 다이아/레드(10% 할인)
    - _PC방 혜택 적용 시_: 비용 5% 할인
  - **이벤트 옵션**
    - _10성 이하 강화 시 1+1_ : 10성 이하 강화 단계에서 강화 성공 시 단계 2 증가
    - _강화 비용 30% 할인_ : 모든 단계에서 강화 비용 30% 할인
    - _5, 10, 15성에서 강화 성공 100%_ : 5, 10, 15성 단계에서 강화 시 100% 성공(파괴방지에 의한 비용 증가 없음)
    - _21성 이하 파괴 확률 30% 감소_ : 21성 이하 단계의 기존 파괴 확률의 30%를 실패 확률로 치환
    - _샤이닝 스타포스 적용_ : _강화 비용 30% 할인_ + _21성 이하 파괴 확률 30% 감소_ 동시 적용

<details>
    <summary><b>비용 할인 옵션 정리</b></summary>
    <ul>
        <li>MVP 등급 할인: 브론즈(할인 없음), 실버(3% 할인), 골드(5% 할인), 다이아/레드(10% 할인)</li>
        <li>PC방 혜택 적용: 비용 5% 할인</li>
    </ul>
</details>
<br>
<details>
    <summary><b>이벤트 옵션 정리</b></summary>
    <ul>
        <li>10성 이하 강화 시 1+1 : 10성 이하 강화 단계에서 강화 성공 시 단계 2 증가</li>
        <li>강화 비용 30% 할인 : 모든 단계에서 강화 비용 30% 할인</li>
        <li>5, 10, 15성에서 강화 성공 100% : 5, 10, 15성 단계에서 강화 시 100% 성공(파괴방지에 의한 비용 증가 없음)</li>
        <li>샤이닝 스타포스 적용 : '강화 비용 30% 할인' + '5, 10, 15성에서 강화 성공 100%' 동시 적용</li>
    </ul>
</details>

<br>

<p align="center">
    <img alt="할인이벤트옵션" src="https://github.com/user-attachments/assets/1f818fa9-2e80-4f3f-8f22-b4dcd2f37648" >
</p>
<br>

- 목표치에 도달하면 결과를 보여주며, 15자 이내의 이름으로 해당 강화 내역을 저장할 수 있습니다.
<p align="center">
    <img alt="강화완료" src="https://github.com/user-attachments/assets/d2a70ad2-6936-4fef-8d0e-095c88ad54ae" >
</p>
<br>

### 강화 진행(자동)

- 현재 강화 단계에서 목표 강화 단계까지 자동으로 강화를 진행할 수 있습니다.
- 자동 강화 과정을 볼 수 있으며, 그 강화의 속도를 매우 느린 속도(매초 1회)부터 매우 빠른 속도(매초 20회)까지 지정할 수 있습니다.
- 자동 강화 도중에는 '강화 기록 확인' 페이지로의 이동, 할인/이벤트 옵션 설정 버튼, '직접 강화' 탭, 그리고 자동 강화 옵션의 수정 모두가 비활성화됩니다.
- 자동 강화 도중에 버튼을 다시 눌러 자동 강화를 중지할 수 있습니다.

<p align="center">
    <img alt="자동강화" src="https://github.com/user-attachments/assets/8e5a358b-8286-447e-b0a8-f7e8a6566e58" >
</p>
<br>

### 강화 내역 확인

- 앞서 저장한 강화 내역을 확인할 수 있습니다.
- 작성한 제목과 날짜, 강화의 성공/실패/파괴 횟수 등의 요약 정보가 제공됩니다.
- 내역 저장은 로컬스토리지를 바탕으로 저장되며, 최신순으로 정렬되어 있습니다.
<p align="center">
    <img alt="강화목록" src="https://github.com/user-attachments/assets/7ba6f72e-a0ad-4ac9-8970-74be2dcae870" >
</p>
