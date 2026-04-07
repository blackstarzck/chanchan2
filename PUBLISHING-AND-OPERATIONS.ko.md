# Chanchan2 배포 및 운영 가이드

이 문서는 `chanchan2` 패키지를 유지보수하고 npm에 배포할 때 필요한 흐름을 한국어로 정리한 문서입니다.

대상 패키지:

- `@chanchan2/tokens`
- `@chanchan2/ui`

내부 앱:

- `@chanchan2/docs`

## 가장 자주 쓰는 흐름

일반적인 작업 순서는 아래처럼 보면 됩니다.

1. Figma 기반 토큰 값을 수정한다.
2. `npm run tokens:sync`를 실행한다.
3. `packages/ui`에서 컴포넌트를 수정하거나 추가한다.
4. `apps/docs`에서 예제를 확인한다.
5. `npm run typecheck`를 실행한다.
6. `npm run build`를 실행한다.
7. 배포할 변경이 있다면 `npm run changeset`을 실행한다.
8. PR을 머지하고 GitHub Actions 릴리스를 확인한다.

## `npm run tokens:sync`는 무엇인가

이 명령은 Figma 기반 토큰 원본을 읽어서 코드 파일을 다시 생성하는 명령입니다.

원본 파일:

- [packages/tokens/src/token-source.json](C:\Users\chanki\workspace\creative-ui\chanchan2\packages\tokens\src\token-source.json)

자동 생성 파일:

- [packages/tokens/src/tokens.ts](C:\Users\chanki\workspace\creative-ui\chanchan2\packages\tokens\src\tokens.ts)
- [packages/tokens/theme.css](C:\Users\chanki\workspace\creative-ui\chanchan2\packages\tokens\theme.css)

쉽게 말하면:

- `token-source.json`은 사람이 수정하는 파일
- `tokens.ts`, `theme.css`는 기계가 다시 만들어주는 파일

중요한 규칙:

- 생성 파일은 직접 수정하지 않는다
- 항상 `token-source.json`을 수정한 뒤 `npm run tokens:sync`를 실행한다

## `npm run changeset`은 무엇인가

이 명령은 바로 배포하는 명령이 아닙니다.

이 명령은 "이번 릴리스에서 무엇이 바뀌었는지"를 기록하는 명령입니다.

실행하면 보통 아래를 묻습니다.

1. 어떤 패키지가 바뀌었는지
2. 버전을 `patch`, `minor`, `major` 중 무엇으로 올릴지
3. 변경 내용을 한 줄로 어떻게 설명할지

그러면 `.changeset` 폴더에 markdown 파일이 하나 생깁니다.

예시 위치:

- [\.changeset](C:\Users\chanki\workspace\creative-ui\chanchan2\.changeset)

이 파일은 나중에 GitHub Actions의 release workflow가 읽어서:

- 버전을 올리고
- changelog를 만들고
- npm publish까지 이어갑니다

즉 아주 쉽게 말하면:

- `changeset` = 릴리스 예약 메모

## `patch`, `minor`, `major`를 언제 쓰나

`patch`

- 버그 수정
- 스타일 수정
- 동작 개선
- 문서 보강
- 기존 API를 깨지 않는 작은 수정

`minor`

- 새 컴포넌트 추가
- 새 variant 추가
- 새 prop 추가
- 기존 사용법을 깨지 않는 기능 확장

`major`

- export 이름 변경
- 기존 컴포넌트 제거
- prop 제거
- 소비자가 이미 쓰고 있는 토큰 이름이나 스타일 계약을 깨는 변경

## 릴리스 자동화는 어떻게 동작하나

이 저장소에는 GitHub Actions workflow가 두 개 있습니다.

- CI: [\.github/workflows/ci.yml](C:\Users\chanki\workspace\creative-ui\chanchan2\.github\workflows\ci.yml)
- Release: [\.github/workflows/release.yml](C:\Users\chanki\workspace\creative-ui\chanchan2\.github\workflows\release.yml)

### 1. CI workflow

CI는 PR과 `main` 브랜치 push에서 실행됩니다.

하는 일:

1. 의존성 설치
2. `npm run tokens:sync`
3. `npm run typecheck`
4. `npm run build`

즉 코드가 깨진 상태로 머지되지 않도록 막아주는 단계입니다.

### 2. Release workflow

Release workflow는 `main`에 push되면 실행됩니다.

여기서 `changesets/action`이 아래 역할을 합니다.

1. 아직 릴리스되지 않은 changeset이 있는지 확인
2. 버전을 올리는 PR이 필요한지 확인
3. publish 가능한 상태면 npm에 배포

쉽게 이해하면:

- `npm run changeset`으로 릴리스 메모를 남긴다
- 그 변경이 `main`에 들어간다
- GitHub Actions가 메모를 읽는다
- 버전을 올리고 npm publish를 진행한다

## 그러면 `NPM_TOKEN`은 어디에 있나

핵심은 이것입니다.

- `NPM_TOKEN`은 이 저장소 안에 있는 값이 아니다
- GitHub가 자동으로 만들어주는 값도 아니다
- npm 사이트에서 네가 직접 생성해야 한다

### `NPM_TOKEN`은 어디서 생성하나

[npmjs.com](https://www.npmjs.com/) 에 로그인한 뒤:

1. 우측 상단 프로필 메뉴를 연다
2. `Access Tokens`로 들어간다
3. 새 토큰을 만든다
4. 권한은 보통 `Read and write`를 선택한다
5. 토큰을 생성한 직후 값을 복사한다

주의:

- 토큰 원문은 생성 직후에만 다시 보이는 경우가 많다

### 생성한 `NPM_TOKEN`은 어디에 넣나

GitHub 저장소에서 아래 위치에 넣습니다.

1. 저장소 `Settings`
2. `Secrets and variables`
3. `Actions`
4. `New repository secret`
5. 이름을 `NPM_TOKEN`으로 입력
6. 아까 npm에서 복사한 값을 붙여넣기

즉 질문에 대한 가장 짧은 답은:

- 원본 위치는 npm 계정의 Access Token 페이지
- 실제 사용 위치는 GitHub Actions secret의 `NPM_TOKEN`

## `GITHUB_TOKEN`과 `NPM_TOKEN` 차이

`GITHUB_TOKEN`

- GitHub Actions가 자동 제공
- release PR 생성, workflow 내부 GitHub 작업에 사용

`NPM_TOKEN`

- npm에서 직접 생성해야 함
- GitHub secret에 직접 저장해야 함
- `npm publish` 인증에 사용

## 첫 공개 배포 전에 체크할 것

1. npm scope 또는 organization 이름을 확정한다
2. 각 `package.json`의 패키지 이름이 맞는지 확인한다
3. npm에서 `NPM_TOKEN`을 만든다
4. GitHub repository secret에 `NPM_TOKEN`을 저장한다
5. 기본 브랜치가 `main`인지 확인한다
6. workflow 파일이 저장소에 올라가 있는지 확인한다
7. `npm run changeset`을 실행한다
8. `main`에 머지한다
9. GitHub Actions의 CI와 Release 실행 결과를 확인한다

## 로컬에서 자주 쓰는 명령

```bash
npm run tokens:sync
npm run typecheck
npm run build
npm run changeset
npm run version-packages
```

수동 배포가 꼭 필요할 때만:

```bash
npm publish --workspace @chanchan2/tokens --access public
npm publish --workspace @chanchan2/ui --access public
```

보통은 수동 배포보다 GitHub Actions 릴리스를 사용하는 편이 좋습니다.

## 운영 규칙 추천

- 토큰은 항상 `token-source.json`만 수정한다
- 컴포넌트 변경에는 docs 예제를 같이 추가한다
- 배포 대상 변경에는 changeset을 항상 남긴다
- 로컬 수동 publish는 예외 상황에서만 사용한다
- public component 레이어에서는 브랜드 고유 이름보다 semantic token 이름을 우선한다

## 지금 구조에서 기억할 핵심 3줄

1. 토큰 수정 후에는 `npm run tokens:sync`
2. 배포할 변경이 있으면 `npm run changeset`
3. `main` 머지 후에는 GitHub Actions가 릴리스를 처리

## 참고 문서

영문 운영 문서:

- [DEPLOYMENT-AND-OPERATIONS.md](C:\Users\chanki\workspace\creative-ui\chanchan2\DEPLOYMENT-AND-OPERATIONS.md)
