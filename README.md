# 이솝 우화 늑대의 흉계

이솝우화 늑대의 흉계 이야기를 사용자와의 인터렉션을 통해 보여줍니다. ![웹 페이지 이동하기](https://8ight6ix.github.io/artworks/sample01)

## 1. Locat Test

```shall
$ npm install
$ npm start
```

## 2. Deploy

```shall
$ npm install
$ npm run deploy
```

## 3. Architecture

| 이름 | 기능 설명                                                                       |
| ---- | ------------------------------------------------------------------------------- |
| App  | Scene 번호를 관리하고, Slide 이벤트를 통해 Scene 번호를 증가 혹은 감소시킵니다. |

### 3.1 Compnents

| 이름     | 기능 설명                                                                                                                   |
| -------- | --------------------------------------------------------------------------------------------------------------------------- |
| sequence | Scene 번호의 변화에 따라 Sequence의 Short 번호를 관리합니다. Short 번호에 따라 Container와 Actor의 에니메이션을 진행합니다. |

### 3.2 Modules

| 이름                   | 기능 설명                                                                                             |
| ---------------------- | ----------------------------------------------------------------------------------------------------- |
| animation              | Animation Config Data를 파싱하여 Container와 Actor에게 현재 Short와 진행도에 맞는 Style을 제공합니다. |
| hocs/acotr             | Actor Component 공통된 로직을 관리합니다.                                                             |
| hocs/sequence          | Sequence Component 공통된 로직을 관리합니다.                                                          |
| hooks/use-scroll-event | Wheel 이벤트와 Touch 이벤트로 유저의 슬라이드 엑션 수치를 계산합니다.                                 |
| hooks/use-sequence     | 현재 Scene 번호에 Animation Config Data를 반영하여 Sequence의 Short 번호를 계산합니다.                |
| hooks/use-short        | 현재 Short 번호에 Animation Config Data를 반영하여 Acotr의 Style 값을 계산합니다.                     |

### 3.3 Static

| 이름      | 기능 설명             |
| --------- | --------------------- |
| animation | Animation Config Data |
| fonts     | Font Data             |
| svg       | SVG Data              |

### 3.4 Styles

| 이름 | 기능 설명                                       |
| ---- | ----------------------------------------------- |
| base | 표준 스타일을 정의하는 스타일시트가 포함됩니다. |
| page | 각 Sequence에 한정된 스타일이 포함됩니다.       |
| util | Sass 도구와 헬퍼를 모음입니다                   |

## 4. Ainmtaion System

**Slide Action**에 의해 **Scene**가 증가 혹은 감소하고, Scene 값에 따라 각 **Sequence**의 **short**가 증가 혹은 감소하여 에니메이션이 진행됩니다.

### 4.1 Animation Config

전체 Animation에 관한 설정 값입니다. 다음은 Animation 설정 예시입니다.

```json
{
  "totalScene": 5,
  "deletaSensitive": 0.4,
  "actionStart": 40
}
```

- `totalScene`: 전체 Scene의 갯수입니다. Scene 번호는 `0`부터 출발합니다.
- `deletaSensitive`: Wheel 혹은 Touch Move 이벤트의 deltaY 값의 반영 비율입니다. 즉 사용자 모션의 민감도입니다.
- `actionStart`: 현재 Scene가 이 수치 이상으로 진행되면 다음 Scene으로 자동 이동합니다.

### 4.2 Sequence Config

각 Sequence에 관한 설정 값입니다. 다음은 Sequence 설정 예시입니다.

```json
{
  "startScene": 0,
  "duration": 1200,
  "shortEnd": 4,
  "shortDest": [2, 3, 4],
  "cuts": {
    "container": {
      "baseWidth": 100,
      "baseHeight": 100,
      "animationData": [{ "x": 0, "y": 0 }, {}, {}, {}, { "y": -100 }]
    },
    "title": {
      "baseWidth": 1920,
      "baseHeight": 1080,
      "animationData": [{ "x": 960, "y": 0, "marginLeft": -50, "opacity": 100 }, {}, {}, { "y": -300, "opacity": 0 }]
    }
  }
}
```

- `startScene`: Sequence가 동작을 시작하는 최초 Scene의 번호
- `duration`: Sequence 에니메이션 소요 시간
- `shortEnd`: 마지막 short 번호 (short는 0번터 시작)
- `shortDest`: 각 Scene에서 연쇄적으로 진행되는 마지막 short 번호
- `cuts`: Sequence에 속한 Actor의 설정 값
  - `baseWidth/baseHeight`: Tramsform 설정 값의 기준 너비와 높이. x와 y값은 현재 stage의 크기와 base 크기의 비율을 계산하여 적용
  - `animationData`: Actor가 각 short에 가져야하는 데이터
    - `x`: X 좌표 값 (Stage 좌상단 기준)
    - `y`: Trasform Y (Stage 좌상단 기준)
    - `anchor`: Tranform origin
    - `scale`: 크기 (anchor 기준)
    - `rotate`: 회전 (anchor 기준)
    - `marginLeft`: Actor의 가로 키기에 비례하여 좌우 이동
    - `marginTop`: Actor의 세로 크기에 비례하여 상하 이동
    - `opacity`: 투명도
    - `visibility`: Acotr의 등장 여부
