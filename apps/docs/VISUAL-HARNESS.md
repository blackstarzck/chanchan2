# Visual Harness Workflow

UI layout changes in `apps/docs` should be verified through a visual harness, not by DOM assertions alone.

## 목적

- isolated route에서 문제를 재현한다.
- Playwright로 실제 화면을 캡처한다.
- 캡처 이미지를 사람이 직접 검수한다.
- 이후에 build / e2e를 통과시킨다.

## Harness routes

- `/harness/code-editor`
  - 코드 패널 gutter / line number / border / spacing 확인용
- `/components/button`
  - 실제 상세 페이지의 main panel / preview / code / anchor 구조 확인용

## Capture command

```bash
npm run harness:capture --workspace @blackstarzck/docs
```

생성 위치:

- `apps/docs/.visual-harness/code-editor-harness.png`
- `apps/docs/.visual-harness/button-detail-main.png`

## 검수 절차

1. UI 수정
2. harness capture 실행
3. 생성된 이미지를 직접 확인
4. HTML 구조 확인
   - 시각 보정만을 위한 불필요한 wrapper / spacer / helper DOM 추가 금지
   - 가능하면 parent shell + CSS로 해결
5. 최종 검증
   - `npm run build --workspace @blackstarzck/docs`
   - `npm run test:e2e --workspace @blackstarzck/docs`

## 원칙

- Playwright는 단순 pass/fail 용도만이 아니라 실제 시각 검수의 입력을 만든다.
- UI 수정 요청이 들어오면 harness screenshot을 먼저 보고, 그 다음에 레이아웃을 판단한다.
- DOM은 최소화한다. 추가 요소가 필요하면:
  - 시각적 목적이 명확해야 한다.
  - CSS만으로 해결 가능한지 먼저 검토한다.
