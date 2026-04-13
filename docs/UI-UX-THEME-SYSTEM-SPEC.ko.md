# UI/UX 설계 및 Theme 시스템 확장 1차 설계 문서

## 1. 문서 목적

이 문서는 `chanchan2` docs 앱을 단일 데모 페이지에서 "탐색 가능한 디자인 시스템 문서 사이트"로 확장하기 위한 1차 설계 문서다.

문서 범위는 다음을 포함한다.

- 컴포넌트 문서 사이트 IA 설계
- Ant Design 공식 문서 구조를 참고한 상세 페이지 레이아웃 설계
- Global Theme / Preset Theme / Custom Theme 시스템 설계
- 컴포넌트 단위 Playground 및 하단 패널 설계
- Radix + Headless 구조를 전제로 한 UI 컴포넌트 설계 방향
- 구현 가능한 수준의 상태 구조, 디렉터리 구조, React 예시

참고 구조:

- Ant Design Components Overview: [https://ant.design/components/overview/](https://ant.design/components/overview/)
- Ant Design Button detail: [https://ant.design/components/button/](https://ant.design/components/button/)

본 문서는 Ant Design의 "시각 스타일"을 복제하는 문서가 아니다. Ant Design의 정보 구조, 탐색 흐름, 상세 문서 패턴을 참고해 `chanchan2` 목적에 맞게 재구성하는 문서다.

---

## 2. 현재 상태 진단

현재 docs 앱은 [apps/docs/src/App.tsx](C:\Users\admin\Desktop\workspace\chanchan2\apps\docs\src\App.tsx) 하나에 전체 showcase가 집약된 구조다.

현재 구조의 한계:

- URL 단위 문서 분리가 없다.
- 컴포넌트 목록과 상세 정보가 분리되지 않는다.
- 데모는 많지만 문서 구조가 없어 탐색성이 낮다.
- Variation, API, Token, Usage를 공통 템플릿으로 축적하기 어렵다.
- Theme 시스템이 현재는 간단한 `data-theme` 전환 수준이며, 글로벌 커스터마이징과 preset 기반 편집 UX가 없다.

현재 코드 기준으로 확인된 사실:

- Theme preset은 이미 존재한다.
  - `default`, `default-dark`, `harvest`, `harvest-dark`, `retro`, `retro-dark`
  - 기준 파일: [packages/tokens/src/tokens.ts](C:\Users\admin\Desktop\workspace\chanchan2\packages\tokens\src\tokens.ts)
- UI 컴포넌트는 `shadcn/ui` 패키지가 아니라 `@radix-ui/react-*`를 직접 사용한다.
  - 기준 파일: [packages/ui/package.json](C:\Users\admin\Desktop\workspace\chanchan2\packages\ui\package.json)
- Variant 처리는 `class-variance-authority` 기반이다.
  - 기준 파일: [packages/ui/src/components/button.tsx](C:\Users\admin\Desktop\workspace\chanchan2\packages\ui\src\components\button.tsx)
- Theme 적용은 현재 `ThemeRoot -> data-theme -> CSS variable` 흐름이다.
  - 기준 파일: [packages/ui/src/components/theme-root.tsx](C:\Users\admin\Desktop\workspace\chanchan2\packages\ui\src\components\theme-root.tsx)

---

## 3. 설계 목표

### 3.1 문서 사이트 목표

- 컴포넌트 목록 페이지와 상세 페이지를 분리한다.
- 상세 페이지는 Ant Design과 유사한 3패널 구조를 사용한다.
- 컴포넌트 variation을 중심으로 빠르게 탐색하고 비교할 수 있어야 한다.
- API, Token, Accessibility, Code 연결 정보를 축적 가능한 공통 문서 구조로 만든다.

### 3.2 Theme 시스템 목표

- Global Theme 변경 시 전체 UI가 즉시 동적으로 변경된다.
- Default / Harvest / Retro preset을 기본 제공한다.
- 각 preset은 light / dark 모드를 기본 지원한다.
- 사용자는 preset을 기반으로 커스터마이징할 수 있어야 한다.
- Theme 편집은 Drawer UX를 통해 실시간 미리보기 기반으로 수행한다.

### 3.3 컴포넌트 Playground 목표

- Storybook과 유사한 "실시간 variation / props / token 조작" 구조를 제공한다.
- 하단 패널로 Controls, Props, Tokens, Code를 노출한다.
- 개발자, 디자이너, 기획자가 같은 화면에서 협업 가능한 상태를 만든다.

---

## 4. IA (Information Architecture)

### 4.1 최상위 구조

```text
/
├─ /overview
├─ /foundations
│  ├─ /foundations/tokens
│  ├─ /foundations/typography
│  ├─ /foundations/spacing
│  └─ /foundations/motion
├─ /components
│  ├─ /components
│  └─ /components/:slug
├─ /patterns
│  ├─ /patterns/navigation
│  ├─ /patterns/forms
│  └─ /patterns/data-display
└─ /playground
```

### 4.2 컴포넌트 카테고리 구조

현재 보유 컴포넌트 기준으로 1차 카테고리는 아래처럼 정의한다.

```text
General
- Button
- Badge
- Avatar
- Spinner
- Skeleton

Navigation
- Breadcrumb
- Pagination
- Tabs
- Sidebar
- Navbar
- DropdownMenu

Data Entry
- Input
- Textarea
- Checkbox
- RadioGroup
- Switch
- Select
- DatePicker
- NumberField
- PasswordField
- PinInput
- FileInput
- Dropzone
- Slider

Data Display
- Table
- Progress
- Timeline
- UploadList
- Carousel

Feedback / Overlay
- Alert
- Dialog
- Sheet
- Popover
- Tooltip
```

### 4.3 문서 페이지 역할

#### `/components`

- 컴포넌트 전체 인덱스
- 카테고리별 카드 목록
- 빠른 스캔과 진입이 목적

#### `/components/:slug`

- 개별 컴포넌트 상세 페이지
- Ant Design형 3패널 구조
- variation grid + API + token + accessibility + playground 연동

#### `/foundations/*`

- 디자인 시스템 토큰, 타이포, spacing, radius, shadow, motion 설명
- Theme 시스템 문서와 연결

---

## 5. 상세 페이지 레이아웃 구조

상세 페이지는 Ant Design 문서 구조를 기준으로 아래 4영역으로 구성한다.

1. 상단 글로벌 헤더
2. 왼쪽 컴포넌트 목록 패널
3. 가운데 상세 문서 본문
4. 오른쪽 variation 목차 패널
5. 하단 컴포넌트 조작 패널

### 5.1 레이아웃 다이어그램

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│ Global Header                                                               │
│ Logo | Section Nav | Search | Theme Presets | Mode Toggle | Theme Drawer    │
├───────────────┬──────────────────────────────────────────┬───────────────────┤
│ Left Panel    │ Center Panel                             │ Right Panel       │
│ Components    │ Component Detail Content                 │ Variation TOC     │
│               │                                          │                   │
│ Category Nav  │ Header                                   │ Overview          │
│ + List        │ When To Use                              │ Basic             │
│               │ Variation Grid                           │ Sizes             │
│ Scroll only   │ API                                      │ States            │
│ inside panel  │ Tokens                                   │ API               │
│               │ Accessibility                            │ Tokens            │
│               │                                          │ Sticky            │
│               │ Scroll container                         │ to center scroll  │
├───────────────┴──────────────────────────────────────────┴───────────────────┤
│ Bottom Component Panel (Controls | Props | Tokens | Code | A11y)            │
│ Docked, resizable, collapsible                                               │
└──────────────────────────────────────────────────────────────────────────────┘
```

### 5.2 패널별 동작 정의

#### 왼쪽 패널

- 역할: 전체 컴포넌트 탐색
- 스크롤: 패널 내부 독립 스크롤
- 고정: viewport 기준 고정
- 포함 요소:
  - 카테고리 아코디언
  - 현재 컴포넌트 active 상태
  - 필터 또는 검색 입력

#### 가운데 패널

- 역할: 상세 문서 본문
- 스크롤: 메인 스크롤 컨테이너
- 포함 요소:
  - 컴포넌트 헤더
  - When To Use
  - Variation grid
  - API
  - Design Tokens
  - Accessibility
  - Related Components

#### 오른쪽 패널

- 역할: variation 및 섹션 목차
- 기준: 가운데 패널의 섹션 id
- 동작:
  - 가운데 패널 스크롤 기준 active 상태 변경
  - 클릭 시 가운데 패널 해당 섹션으로 스크롤
  - viewport 고정 또는 sticky 유지

#### 하단 패널

- 역할: Playground / Control Surface
- 탭 구조:
  - Controls
  - Props
  - Tokens
  - Code
  - Accessibility
- 동작:
  - 접기/펼치기 가능
  - 높이 resize 가능
  - 현재 variation 컨텍스트에 종속됨

---

## 6. 컴포넌트 상세 페이지 템플릿

### 6.1 상세 페이지 섹션 순서

```text
1. Header
2. When To Use
3. Variations
4. API
5. Design Tokens
6. Accessibility
7. Related Components
```

### 6.2 Header 구성

- 컴포넌트 이름
- 한 줄 설명
- 카테고리
- import 코드
- source 링크
- figma source 링크
- status badge (`stable`, `beta`, `experimental`)

예시:

```tsx
<ComponentDocHeader
  name="Button"
  category="General"
  status="stable"
  description="Primary action trigger with semantic variants and token-driven styles."
  importCode={`import { Button } from "@blackstarzck/ui";`}
  sourceHref="https://github.com/blackstarzck/chanchan2/tree/main/packages/ui/src/components/button.tsx"
/>
```

### 6.3 Variation grid 구성

variation 섹션은 세로 문단 나열이 아니라 카드 그리드가 기본이다.

카드 구조:

- variation title
- 목적 설명
- live preview
- optional controls shortcut
- optional code toggle

예시 variation:

- Basic
- Variant
- Size
- Icon
- Disabled
- Loading
- With slot

### 6.4 API 섹션 구조

- props 테이블
- variant 테이블
- slot / subcomponent 구조
- event 설명

예시:

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `"default" \| "secondary" \| ...` | `"default"` | 버튼 시각 variant |
| `size` | `"sm" \| "default" \| "lg" \| "icon"` | `"default"` | 버튼 크기 |
| `asChild` | `boolean` | `false` | Slot 기반 렌더링 |

### 6.5 Token 섹션 구조

- 이 컴포넌트가 참조하는 semantic token 목록
- global token + component token 구분

예시:

| Token | Scope | Description |
| --- | --- | --- |
| `--cc-color-primary` | global | 기본 버튼 배경 |
| `--cc-color-primary-foreground` | global | 기본 버튼 텍스트 |
| `--cc-button-height-sm` | component | 버튼 small height |

---

## 7. 사용자 인터랙션 흐름

### 7.1 기본 탐색 흐름

```text
Overview 진입
→ Components 이동
→ 목록에서 Button 선택
→ 상세 페이지 진입
→ 오른쪽 TOC로 variation 탐색
→ variation 선택
→ 하단 panel에서 props/theme 조작
→ 결과 확인
```

### 7.2 Theme 선택 흐름

```text
상단 Theme preset 영역 진입
→ Default / Harvest / Retro 중 선택
→ light / dark mode 선택
→ 전체 UI 즉시 변경
→ 필요 시 Theme Drawer 열기
→ preset 기반 커스터마이징
→ 저장 또는 reset
```

### 7.3 컴포넌트 플레이그라운드 흐름

```text
컴포넌트 상세 페이지 진입
→ variation 카드 선택
→ 하단 panel 활성화
→ controls에서 variant / size / state 변경
→ tokens 탭에서 사용 token 확인
→ code 탭에서 JSX 예시 확인
```

---

## 8. Design System 적용 방식

## 8.1 적용 원칙

- 모든 시각 속성은 가능한 한 semantic token을 통해 주입한다.
- 컴포넌트는 raw hex 값을 직접 가지지 않는다.
- variant는 토큰 조합과 semantic state 표현에 집중한다.
- UI 상태는 "구조", "스타일", "문서"를 분리해 관리한다.

### 8.2 현재 적용 구조

현재 `ThemeRoot`는 `data-theme` 속성을 통해 테마를 적용한다.

```tsx
<ThemeRoot theme="harvest-dark">
  <App />
</ThemeRoot>
```

이 구조는 유지하되, Theme 관리 계층을 확장해야 한다.

### 8.3 확장 대상 토큰

현재 토큰은 색상과 radius 중심이다. 1차 확장에서는 아래 토큰이 추가되어야 한다.

- color
- typography
  - font family
  - font size
  - font weight
  - line height
- spacing
  - xxs, xs, sm, md, lg, xl, 2xl
- radius
- shadow
- border width
- motion
  - duration
  - easing

예시 테마 스키마:

```ts
type ThemeSpec = {
  id: string;
  label: string;
  family: "default" | "harvest" | "retro" | string;
  mode: "light" | "dark";
  tokens: {
    color: Record<string, string>;
    typography: {
      bodyFont: string;
      headingFont: string;
      baseFontSize: string;
      lineHeight: string;
      weightRegular: number;
      weightMedium: number;
      weightBold: number;
    };
    spacing: Record<string, string>;
    radius: Record<string, string>;
    shadow: Record<string, string>;
    motion: {
      durationFast: string;
      durationBase: string;
      durationSlow: string;
      easingStandard: string;
    };
  };
};
```

---

## 9. Global Theme 시스템 설계

### 9.1 목표

- Theme 변경 시 색상, 타이포, spacing, radius, shadow, 컴포넌트 style이 전체 UI에 즉시 반영된다.
- 테마 상태는 전역에서 관리된다.
- 사용자 정의 테마를 preset 위에 override 형태로 구성할 수 있다.

### 9.2 상태 관리 권장안

권장 구조:

- `@blackstarzck/ui` 패키지: React Context 기반 `ThemeProvider`
- `apps/docs` 앱: Zustand 기반 문서/플레이그라운드 상태 관리

이유:

- UI 패키지는 외부 앱 의존성을 최소화해야 한다.
- docs 앱은 theme drawer, preview hover, panel state, component controls 등 로컬 인터랙션 상태가 많아 Zustand가 적합하다.

### 9.3 Theme 상태 구조 예시

```ts
type PresetThemeId =
  | "default"
  | "default-dark"
  | "harvest"
  | "harvest-dark"
  | "retro"
  | "retro-dark";

type ThemeOverride = {
  color?: Partial<Record<string, string>>;
  typography?: Partial<Record<string, string | number>>;
  spacing?: Partial<Record<string, string>>;
  radius?: Partial<Record<string, string>>;
  shadow?: Partial<Record<string, string>>;
  component?: Record<string, Record<string, string>>;
};

type ThemeStore = {
  activeThemeId: PresetThemeId | string;
  activePresetId: PresetThemeId;
  mode: "light" | "dark";
  drawerOpen: boolean;
  previewThemeId?: PresetThemeId;
  overrides: ThemeOverride;
  resolvedTheme: ThemeSpec;

  setTheme: (themeId: PresetThemeId) => void;
  setMode: (mode: "light" | "dark") => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  setPreviewTheme: (themeId?: PresetThemeId) => void;
  updateOverride: (group: keyof ThemeOverride, key: string, value: string) => void;
  resetOverrides: () => void;
  saveCustomTheme: (name: string) => void;
};
```

### 9.4 Theme 적용 흐름

```text
activePreset 선택
→ preset token 로드
→ custom override merge
→ resolvedTheme 생성
→ CSS variable 주입
→ ThemeRoot / document root 반영
→ 전체 UI 즉시 업데이트
```

### 9.5 CSS variable 반영 방식

```tsx
function ThemeProvider({ theme, children }: { theme: ThemeSpec; children: React.ReactNode }) {
  const style = useMemo(
    () =>
      ({
        "--cc-color-primary": theme.tokens.color.primary,
        "--cc-color-background": theme.tokens.color.background,
        "--cc-font-body": theme.tokens.typography.bodyFont,
        "--cc-space-md": theme.tokens.spacing.md,
        "--cc-radius-lg": theme.tokens.radius.lg
      }) as React.CSSProperties,
    [theme]
  );

  return (
    <div data-theme={theme.id} data-mode={theme.mode} style={style}>
      {children}
    </div>
  );
}
```

---

## 10. Preset Theme 시스템 설계

## 10.1 기본 제공 preset

기본 preset은 아래 6개를 제공한다.

- Default
- Default Dark
- Harvest
- Harvest Dark
- Retro
- Retro Dark

### 10.2 UX 원칙

- 단순 텍스트 탭 나열만으로 끝내지 않는다.
- 시각적 preview를 동반한 선택 UI가 필요하다.
- 사용자가 "theme를 바꾸면 UI 전체가 이렇게 바뀐다"를 즉시 이해해야 한다.

### 10.3 권장 UI 구조

상단 header의 theme 영역은 두 단계로 분리한다.

1. 빠른 전환 영역
   - 현재 theme badge
   - mode toggle
   - 최근 사용 theme chip

2. preset picker drawer / popover
   - 카드 기반 preset 선택 UI
   - 카드 내 미니 preview
   - hover 시 preview theme 적용
   - click 시 theme 확정

### 10.4 Preset 카드 구성

각 카드 구성:

- theme 이름
- light/dark 상태
- primary / accent / background 미니 swatch
- typographic sample
- radius 차이 예시

예시:

```tsx
<ThemePresetCard
  title="Harvest"
  mode="light"
  swatches={["#92400e", "#fef3c7", "#ffffff"]}
  typographyPreview="Harvest Heading"
  radiusPreview="rounded"
/>
```

### 10.5 Hover preview 규칙

- hover 시 임시 preview theme 적용
- mouse leave 시 기존 active theme로 복구
- click 시 active theme 확정
- keyboard focus 상태에서도 preview 가능

이 규칙은 "테마를 직접 만져보며 학습"하는 UX에 중요하다.

---

## 11. Theme Drawer UX 상세 설계

## 11.1 목표

- preset 기반 커스터마이징
- 시각 기반 편집
- 그룹화된 설정
- 실시간 미리보기
- 낮은 피로도

### 11.2 Drawer 구조

```text
Drawer Header
- Theme name
- Based on preset
- Save / Reset / Duplicate

Drawer Body
- Section tabs
  - Colors
  - Typography
  - Spacing
  - Radius
  - Shadow
  - Component

Drawer Footer
- Apply
- Cancel
- Save as custom theme
```

### 11.3 세부 편집 방식

#### Colors

- semantic 그룹별 color picker
- 실시간 swatch preview
- 대비 경고 표시

#### Typography

- heading/body font family 선택
- font scale slider
- line-height stepper
- preview sentence

#### Spacing

- scale stepper 또는 slider
- sample spacing preview block

#### Radius

- xs ~ full radius 조절
- button/card/input 미리보기

#### Component

- component-level token override
- 예: button, input, dialog, tabs

### 11.4 preset 기반 커스터마이징 흐름

```text
Harvest 선택
→ Theme Drawer 오픈
→ Harvest base 위에 color / radius 조정
→ Preview 반영
→ Save as "Harvest Custom A"
```

### 11.5 저장 정책

1차 단계:

- LocalStorage 저장
- 사용자 정의 theme import/export JSON 지원

2차 단계:

- 팀 공유용 theme preset registry
- Figma token export/import 연동

---

## 12. 컴포넌트 단위 Theme / Playground 시스템

## 12.1 목표

- 글로벌 테마와 별개로 각 컴포넌트 variation과 props를 실시간 조작한다.
- 컴포넌트 문서 사이트와 Storybook 중간 형태를 만든다.

### 12.2 하단 패널 역할

하단 패널은 현재 선택된 variation 컨텍스트를 기준으로 동작한다.

탭 정의:

- `Controls`: props 조작
- `Props`: 타입/기본값/설명
- `Tokens`: 사용 token 및 override 가능 항목
- `Code`: JSX 예시와 import
- `A11y`: keyboard / aria / semantic notes

### 12.3 컴포넌트 상태 구조 예시

```ts
type PlaygroundStore = {
  selectedComponentSlug?: string;
  selectedVariationId?: string;
  panelOpen: boolean;
  panelHeight: number;
  activePanelTab: "controls" | "props" | "tokens" | "code" | "a11y";
  controls: Record<string, unknown>;

  openPanel: (componentSlug: string, variationId: string) => void;
  closePanel: () => void;
  setPanelHeight: (height: number) => void;
  setActivePanelTab: (tab: PlaygroundStore["activePanelTab"]) => void;
  updateControl: (name: string, value: unknown) => void;
  resetControls: () => void;
};
```

### 12.4 Variation 정의 예시

```ts
type VariationDefinition = {
  id: string;
  title: string;
  description: string;
  columns?: 1 | 2 | 3;
  defaultControls?: Record<string, unknown>;
  controlsSchema?: Array<{
    name: string;
    type: "select" | "boolean" | "number" | "text" | "color";
    options?: Array<{ label: string; value: string }>;
  }>;
  render: (controls: Record<string, unknown>) => React.ReactNode;
};
```

### 12.5 예시: Button variation

```ts
export const buttonVariations: VariationDefinition[] = [
  {
    id: "basic",
    title: "Basic",
    description: "기본 버튼 variation 조합",
    defaultControls: {
      variant: "default",
      size: "default",
      disabled: false
    },
    controlsSchema: [
      { name: "variant", type: "select", options: [
        { label: "Default", value: "default" },
        { label: "Secondary", value: "secondary" },
        { label: "Outline", value: "outline" }
      ] },
      { name: "size", type: "select", options: [
        { label: "SM", value: "sm" },
        { label: "Default", value: "default" },
        { label: "LG", value: "lg" }
      ] },
      { name: "disabled", type: "boolean" }
    ],
    render: (controls) => (
      <Button
        variant={String(controls.variant) as "default" | "secondary" | "outline"}
        size={String(controls.size) as "sm" | "default" | "lg"}
        disabled={Boolean(controls.disabled)}
      >
        Ship it
      </Button>
    )
  }
];
```

---

## 13. Radix / Headless 기반 UI 설계 방향

## 13.1 기본 원칙

- 동작 로직은 headless primitive가 담당한다.
- 시각 스타일은 token + recipe + variant 계층이 담당한다.
- public API는 semantic하고 예측 가능해야 한다.
- 문서 사이트는 "구조와 스타일의 분리"를 사용자에게 보여줘야 한다.

### 13.2 계층 구조

```text
Radix primitive
→ Chanchan2 wrapper
→ Variant recipe (CVA)
→ Theme token mapping
→ Docs registry / playground
```

### 13.3 컴포넌트 구성 원칙

- Slot 기반 확장 허용 (`asChild`)
- Subcomponent 조합형 API 유지
- `data-state`, `data-disabled`, `data-orientation` 등 semantic DOM 유지
- Component token override 수용 가능 구조 확보

### 13.4 Variant 처리 원칙

현재처럼 `class-variance-authority` 사용을 유지하되, 장기적으로는 token 레이어와 더 강하게 분리해야 한다.

권장 방향:

- variant: semantic 조합
- token: 시각 값 공급
- component recipe: token 참조

예시:

```ts
const buttonRecipe = cva("base-class", {
  variants: {
    variant: {
      default: "bg-[var(--cc-button-bg)] text-[var(--cc-button-fg)]",
      secondary: "bg-[var(--cc-button-secondary-bg)] text-[var(--cc-button-secondary-fg)]"
    },
    size: {
      sm: "h-[var(--cc-button-height-sm)] px-[var(--cc-space-3)]",
      md: "h-[var(--cc-button-height-md)] px-[var(--cc-space-4)]"
    }
  }
});
```

---

## 14. 커스터마이징 가능한 UI 구조 설계

## 14.1 커스터마이징 계층

```text
Preset Theme
→ Global Override
→ Component Override
→ Variation-level control
```

### 14.2 우선순위 규칙

```text
Variation control > Component override > Global override > Preset theme
```

### 14.3 적용 예시

- Global theme에서 `primary` 색상 변경
- Button component override에서 `button.radius`만 변경
- Playground variation에서 `size=lg` 적용

최종 렌더 결과는 위 3개가 병합된 값이다.

---

## 15. 추천 디렉터리 구조

### 15.1 docs 앱 구조

```text
apps/docs/src/
├─ app/
│  ├─ layout/
│  │  ├─ docs-shell.tsx
│  │  ├─ header.tsx
│  │  ├─ left-nav.tsx
│  │  ├─ right-toc.tsx
│  │  └─ bottom-panel.tsx
│  ├─ routes/
│  │  ├─ overview-page.tsx
│  │  ├─ components-page.tsx
│  │  ├─ component-detail-page.tsx
│  │  └─ foundations-page.tsx
│  └─ router.tsx
├─ features/
│  ├─ components/
│  │  ├─ registry/
│  │  │  ├─ component-registry.ts
│  │  │  ├─ categories.ts
│  │  │  └─ types.ts
│  │  ├─ docs/
│  │  │  ├─ button.doc.tsx
│  │  │  ├─ input.doc.tsx
│  │  │  └─ ...
│  │  ├─ demos/
│  │  │  ├─ button/
│  │  │  ├─ input/
│  │  │  └─ ...
│  │  └─ ui/
│  │     ├─ variation-card.tsx
│  │     ├─ api-table.tsx
│  │     └─ token-table.tsx
│  ├─ theme/
│  │  ├─ presets/
│  │  │  ├─ default.ts
│  │  │  ├─ harvest.ts
│  │  │  └─ retro.ts
│  │  ├─ store/
│  │  │  ├─ theme-store.ts
│  │  │  └─ theme-selectors.ts
│  │  ├─ ui/
│  │  │  ├─ theme-switcher.tsx
│  │  │  ├─ preset-card.tsx
│  │  │  └─ theme-drawer.tsx
│  │  └─ utils/
│  │     ├─ resolve-theme.ts
│  │     └─ apply-theme-vars.ts
│  └─ playground/
│     ├─ store/
│     │  └─ playground-store.ts
│     ├─ controls/
│     └─ code-preview/
└─ shared/
   ├─ hooks/
   ├─ lib/
   └─ types/
```

### 15.2 package 확장 구조

현재는 디자인 입력 계층과 패키지 출력 계층을 분리하는 구조가 더 적절하다.

```text
design/
├─ handoff/
│  └─ current/
│     ├─ tokens.json
│     ├─ themes.json
│     ├─ components.json
│     └─ samples.json
├─ releases/
│  └─ <design-version>/
│     ├─ manifest.json
│     ├─ tokens.json
│     ├─ themes.json
│     ├─ components.json
│     └─ samples.json
└─ scripts/
   └─ create-release.mjs

packages/tokens/
├─ src/
│  ├─ token-source.json
│  └─ tokens.ts
└─ theme.css

packages/ui/src/
├─ components/
├─ theme/
│  ├─ theme-provider.tsx
│  ├─ theme-context.ts
│  └─ component-tokens.ts
└─ recipes/
   ├─ button.recipe.ts
   └─ input.recipe.ts
```

여기서 `design/handoff/current`는 사람이 관리하는 handoff 입력이고, `packages/tokens/src/token-source.json`은 sync 결과로 생성되는 mirror로 보는 것이 맞다.

---

## 16. 구현 단계 제안

### Phase 1. Docs 구조 전환

- `react-router-dom` 도입
- docs shell 구현
- `/components` 목록 페이지 구현
- `/components/:slug` 상세 페이지 구현

### Phase 2. Theme 시스템 전역화

- ThemeProvider 확장
- preset registry 분리
- header theme switcher 추가
- light/dark mode 지원 정리

### Phase 3. Theme Drawer

- drawer UI 구현
- color/typography/spacing/radius 섹션 구현
- live preview 적용
- custom theme 저장

### Phase 4. Playground

- 하단 panel 구현
- variation controls 연동
- code/token/a11y 탭 구현

### Phase 5. 협업 확장

- Figma source link 연결
- export/import JSON
- 디자인 토큰 스냅샷 문서화
- Storybook 또는 external docs export 고려

---

## 17. 팀 협업 및 확장성 고려

### 17.1 디자이너

- preset theme와 token 구조를 시각적으로 이해 가능
- Figma token source와 docs 테마의 대응 관계 확인 가능

### 17.2 개발자

- component API / token / variant 구조를 동일 문서에서 확인 가능
- docs variation과 실제 package 코드의 연결이 명확함

### 17.3 기획자

- variation 비교와 사용 시나리오를 빠르게 확인 가능
- preset theme 변경 효과를 직접 체험 가능

### 17.4 장기 확장 방향

- 팀 단위 custom theme 공유
- component-level token override preset
- Figma variable import/export 자동화
- docs <-> package <-> Figma 연결 강화

---

## 18. 구현 의사결정 요약

### 즉시 확정할 항목

- 상세 페이지는 Ant Design형 3패널 구조를 사용한다.
- 왼쪽 패널은 독립 스크롤 패널이다.
- 가운데 패널은 variation grid 중심 문서 영역이다.
- 오른쪽 패널은 variation TOC이며 가운데 패널 기준 sticky 동작을 한다.
- 하단 패널은 Storybook 스타일의 controls panel이다.
- Theme 시스템은 preset + custom override 혼합 구조로 간다.
- 기본 preset은 Default / Harvest / Retro + Dark mode를 지원한다.
- UI 컴포넌트 구조는 Radix + Headless + semantic token 기반을 유지한다.

### 이후 논의가 필요한 항목

- Zustand 도입 여부
- custom theme 저장 범위(LocalStorage / server)
- component-level token schema 범위
- code preview의 source generation 방식

---

## 19. 부록: 1차 구현 체크리스트

- [ ] docs 라우팅 구조 분리
- [ ] Components Overview 페이지 추가
- [ ] Component Detail 3패널 셸 추가
- [ ] Right TOC active sync 구현
- [ ] Bottom Playground Panel 추가
- [ ] Theme preset card UI 추가
- [ ] Theme Drawer 추가
- [ ] typography / spacing token 스키마 정의
- [ ] Button / Input / Select / Dialog / Tabs / Table 상세 페이지 우선 구현
- [ ] API / Token / Accessibility 공통 섹션 컴포넌트화
