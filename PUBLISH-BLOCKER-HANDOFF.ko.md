# Publish Blocker Handoff

이 문서는 `chanchan2`의 npm 공개 배포가 현재 어디에서 막혀 있는지와,
다른 워크스페이스에서 바로 이어서 해결할 수 있도록 남기는 handoff 문서다.

## 현재 결론

현재 사용자는 아직 npm에서 아래 패키지를 설치할 수 없다.

- `@blackstarzck/tokens`
- `@blackstarzck/ui`

이유는 코드와 GitHub Actions는 준비되었지만, npm 첫 공개 배포가 아직 성공하지 않았기 때문이다.

## 현재 상태

- GitHub 저장소: [blackstarzck/chanchan2](https://github.com/blackstarzck/chanchan2)
- 기본 브랜치: `main`
- release workflow 파일: [\.github/workflows/release.yml](C:\Users\chanki\workspace\creative-ui\chanchan2\.github\workflows\release.yml)
- 현재 publish 대상 패키지:
  - `@blackstarzck/tokens@0.2.0`
  - `@blackstarzck/ui@0.2.0`
- 로컬 빌드 상태:
  - `npm run typecheck` 통과
  - `npm run build` 통과

## 실패 지점

실패는 GitHub Actions의 release workflow 안 `Create release PR or publish` 단계에서 발생한다.

가장 최근 확인한 실행:

- [run 24092049266](https://github.com/blackstarzck/chanchan2/actions/runs/24092049266)
- 이전 실패 run: [run 24091040280](https://github.com/blackstarzck/chanchan2/actions/runs/24091040280)

실패 메시지 핵심:

```text
Publishing "@blackstarzck/tokens" at "0.2.0"
Publishing "@blackstarzck/ui" at "0.2.0"
E404 Not Found - PUT https://registry.npmjs.org/@blackstarzck%2ftokens
E404 Not Found - PUT https://registry.npmjs.org/@blackstarzck%2fui
The requested resource could not be found or you do not have permission to access it.
```

즉, 현재 막히는 정확한 지점은 `changeset publish`가 npm registry로 `PUT`하는 순간이다.

## 지금까지 확인한 것

다음 항목들은 이미 확인되었거나 다시 검증되었다.

### GitHub 쪽

- 저장소는 public으로 생성되었다.
- release workflow는 정상 실행된다.
- `changesets/action`은 정상적으로 publish 단계까지 도달한다.
- release PR 생성/머지 흐름은 정상이다.
- GitHub Actions 기본 권한 문제는 이미 해결되었다.

### 코드/패키지 쪽

- 패키지명은 모두 `@blackstarzck/*`로 교체되었다.
- 각 패키지의 `package.json`에는 `publishConfig.access = "public"`이 들어있다.
- release 전 빌드 단계는 모두 통과한다.
- `@blackstarzck/ui`는 `@blackstarzck/tokens` 0.2.0을 참조하도록 정리되어 있다.

관련 파일:

- [packages/tokens/package.json](C:\Users\chanki\workspace\creative-ui\chanchan2\packages\tokens\package.json)
- [packages/ui/package.json](C:\Users\chanki\workspace\creative-ui\chanchan2\packages\ui\package.json)
- [package.json](C:\Users\chanki\workspace\creative-ui\chanchan2\package.json)

### npm 계정/권한 쪽

사용자가 제공한 화면으로 다음을 확인했다.

- npm 로그인 계정: `chanchan22`
- npm organization: `blackstarzck`
- `chanchan22`는 `blackstarzck` organization의 `owner`
- 새로 만든 granular token에는 다음이 포함됨:
  - `Packages and scopes`: `@blackstarzck`, `@chanchan22`
  - `Organizations`: `blackstarzck`
  - `Bypass two-factor authentication (2FA)` 활성화
- GitHub repository secret `NPM_TOKEN`은 새 토큰으로 교체했다고 사용자 확인을 받음

## 이미 배제된 가설

아래 가능성은 낮아졌다.

- GitHub 저장소 권한 부족
- release workflow 설정 오류
- package name이 여전히 `@chanchan2/*`인 문제
- 오래된 시크릿이 rerun에만 남아 있는 문제

마지막 항목은 빈 커밋을 새로 push해 완전히 새로운 release run을 만들어도 같은 `E404`가 발생했기 때문에 사실상 배제했다.

관련 커밋:

- `2c9e634` `chore: retry release with refreshed npm token`

## 현재 가장 유력한 원인

현재 시점에서 가장 가능성이 높은 원인은 아래 둘 중 하나다.

1. npm이 새 org-scoped 패키지의 첫 생성/공개 배포를 CI 토큰 경로에서 거절하고 있다.
2. 토큰/owner/organization 설정은 맞아 보이지만, npm이 실제 publish 시점에는 다른 정책 또는 추가 조건으로 거절하고 있다.

문제는 GitHub보다 npm registry 쪽에 더 가깝다.

## 다음 실행계획

다음 작업자는 아래 순서대로 진행하면 된다.

### 1. 로컬에서 owner 계정으로 직접 publish 검증

가장 먼저 해야 할 일은 로컬에서 `chanchan22` 계정으로 직접 publish를 시도해 보는 것이다.

```powershell
cd C:\Users\chanki\workspace\creative-ui\chanchan2
npm login
npm whoami
npm run build
```

`npm whoami` 결과가 `chanchan22`여야 한다.

그 다음 수동 publish:

```powershell
cd C:\Users\chanki\workspace\creative-ui\chanchan2\packages\tokens
npm publish --access public

cd C:\Users\chanki\workspace\creative-ui\chanchan2\packages\ui
npm publish --access public
```

### 2. 수동 publish 결과에 따라 분기

#### 수동 publish 성공

이 경우:

- npm org/owner 권한은 실제로 정상
- CI 토큰 기반 publish 경로만 막혀 있었을 가능성이 높음

다음 조치:

1. GitHub Actions release를 다시 실행
2. 이후 버전부터는 자동 배포가 정상 동작하는지 확인
3. 장기적으로는 token 방식 대신 npm trusted publishing 전환 검토

#### 수동 publish 실패

이 경우:

- CI 문제가 아니라 npm 계정/organization publish 정책 문제로 확정

다음 조치:

1. 로컬 터미널의 정확한 오류 메시지를 저장
2. `npm whoami` 결과 재확인
3. `blackstarzck` organization의 publish 정책이나 package creation 제한 확인
4. 필요하면 npm 지원 문서 기준으로 org package publish 설정 재검토

## 작업 시 체크할 명령

```powershell
cd C:\Users\chanki\workspace\creative-ui\chanchan2
npm whoami
npm run typecheck
npm run build
```

수동 publish:

```powershell
cd C:\Users\chanki\workspace\creative-ui\chanchan2\packages\tokens
npm publish --access public

cd C:\Users\chanki\workspace\creative-ui\chanchan2\packages\ui
npm publish --access public
```

release 재실행:

```powershell
gh run rerun 24092049266 --repo blackstarzck/chanchan2
```

release 로그 확인:

```powershell
gh run view 24092049266 --repo blackstarzck/chanchan2 --log
```

## 완료 기준

다음 조건을 모두 만족하면 이 blocker는 해소된 것이다.

1. `@blackstarzck/tokens`가 npm에 공개 배포됨
2. `@blackstarzck/ui`가 npm에 공개 배포됨
3. 아래 명령이 외부 환경에서 성공함

```bash
npm install @blackstarzck/tokens @blackstarzck/ui
```

4. GitHub Actions release workflow가 이후 버전에서도 재현 가능하게 성공함

## 참고 문서

- 운영 문서: [DEPLOYMENT-AND-OPERATIONS.md](C:\Users\chanki\workspace\creative-ui\chanchan2\DEPLOYMENT-AND-OPERATIONS.md)
- 운영 문서 한국어판: [PUBLISHING-AND-OPERATIONS.ko.md](C:\Users\chanki\workspace\creative-ui\chanchan2\PUBLISHING-AND-OPERATIONS.ko.md)
- 로드맵: [FIGMA-TO-CODE-ROADMAP.md](C:\Users\chanki\workspace\creative-ui\chanchan2\FIGMA-TO-CODE-ROADMAP.md)
