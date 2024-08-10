# Toy Project : 스타포스 시뮬레이터 2024ver.
<p align="center">
    <img alt="메인 화면 이미지" src="https://github.com/user-attachments/assets/1e08ecc5-49ee-48ac-ad65-5eb879b8466e" >
</p>
<br>

## 프로젝트 소개
> 기존에 만든 스타포스 시뮬레이터를 최신화하고 개선한 토이 프로젝트<br>개발 기간: 2024.07.17 - 진행중

스타포스 시뮬레이터는 넥슨의 RPG 게임 <메이플스토리> 내에 존재하는 장비 강화 시스템인 '스타포스'를 웹페이지 내에서 체험하고 시뮬레이션할 수 있도록 만든 프로젝트입니다.<br>
특히 기존에 제작한 스타포스 시뮬레이터보다 UI/UX를 개선하고, 실제 게임 내에서 변경된 강화 정보를 반영하며, 기존에 제공하지 못했던 여러 기능들을 제공하는 것이 목표입니다.<br>
<br>
[Click here to visit](https://cwt629.github.io/starforceSimul_TS_React/)

## 기술 스택

### Environment
<img src="https://img.shields.io/badge/visual studio code-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white"> <img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=Git&logoColor=white"> <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white">

### Front-End
<img src="https://img.shields.io/badge/HTML5-E34F29?style=for-the-badge&logo=HTML5&logoColor=white"> <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=CSS3&logoColor=white"> <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white"> <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white"> <img src="https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=Bootstrap&logoColor=white"> <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"> <img src="https://img.shields.io/badge/react router-CA4245?style=for-the-badge&logo=react router&logoColor=white"> <img src="https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=Redux&logoColor=white">

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
 ┃ ┃ ┗ 📜LogNotice.tsx
 ┃ ┣ 📜BreadCrumb.tsx
 ┃ ┣ 📜LeaderBoard.tsx
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
    <img alt="초기 시뮬레이션 설정" src="https://github.com/user-attachments/assets/2dffedea-e558-430c-a55c-6e53e8f86b40" >
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
            <td>25성</td>
        </tr>
    </table>
</details>
<br>

### 강화 진행
- 입력한 시작 강화 단계에서 시작하여 강화를 진행할 수 있습니다.
- 옵션은 다음과 같습니다.
    - *스타캐치 해제*: 성공 확률을 1.05배 높이는 옵션 해제
        - 실제 게임 내에서 '스타캐치'라는 미니게임을 통해 성공 확률을 1.05배 높일 수 있으며, 이 옵션이 체크되어 있지 않다면 증가된 확률이 적용되고, 체크되어 있다면 화면에 보이는 원래 확률이 적용됩니다.
    - *파괴방지*: 15~16성 단계의 장비가 파괴되지 않도록 막는 대신, 기본 강화 비용만큼 비용이 증가합니다.
<p align="center">
    <img alt="강화진행" src="https://github.com/user-attachments/assets/ffcf317f-5a5e-49fe-aa33-81fc0c80fe8e" >
</p>
<details>
    <summary><b>결과에 따른 강화 단계 변화</b></summary>
    <ul>
        <li>성공: 강화 단계 1 증가</li>
        <li>실패: 현 단계가 15 이하이거나 20이면 강화 단계 유지, 그 외에는 강화 단계 1 감소. 2번 연속으로 강화 단계가 1 감소한 경우, 찬스타임이 발동되어 1회에 한해 100% 강화 성공</li>
        <li>파괴: 강화 단계 12로 변경, 장비 복구 비용을 추가로 지불 </li>
    </ul>
</details>
<br>

- 목표치에 도달하면 결과를 보여주며, 15자 이내의 이름으로 해당 강화 내역을 저장할 수 있습니다.
<p align="center">
    <img alt="강화완료" src="https://github.com/user-attachments/assets/32d3d2a4-ad3a-4cba-b631-6da9c0dd9924" >
</p>
<br>

### 강화 내역 확인
- 앞서 저장한 강화 내역을 확인할 수 있습니다.
- 작성한 제목과 날짜, 목표와 총 강화 횟수 등의 요약 정보가 제공되며, 각 카드를 클릭하면 강화의 결과가 순서대로 출력됩니다.
- 내역 저장은 로컬스토리지를 바탕으로 저장됩니다.
<p align="center">
    <img alt="강화목록" src="https://github.com/user-attachments/assets/050c1aaa-1cc4-4713-b253-ecf3c68d8ab9" >
</p>