## 발표 자료

> 소프트웨어 마에스트로 컨퍼런스 발표자료 22.07.07

![](https://velog.velcdn.com/images/hyunjine/post/8856f00e-ea15-4cc7-9a28-2220b0a3ca32/image.png)

안녕하세요 소프트웨어 마에스트로 연수생 프론트엔드 개발자 이현진 입니다.
웹 페이지를 그리는 다양한 렌더링 방식 즉 Rendering Pattern들에 대해 이야기 해보겠습니다.

![](https://velog.velcdn.com/images/hyunjine/post/9fb837bd-c81c-44bd-bea3-eebba30d93b5/image.gif)

렌더링은 브라우저 화면에 웹 페이지를 그리는 것을 말합니다. 먼저 유저가 브라우저를 통해 서버에 요청을 보내고, 서버는 이에 응답으로 html, css, JavaScript를 보내줍니다. 브라우저는 이를 해석하여 웹 페이지를 그립니다. (렌더링을 수행하는 브라우저의 프로세스를 렌더러 프로세스라고 합니다.)

![](https://velog.velcdn.com/images/hyunjine/post/1b858f59-55e1-47bb-a220-300e8a092a37/image.png)

브라우저가 화면에 html, css, JavaScript를 그리는 과정(절차)를 `CRP`(Critical Rendering Path)라고 합니다.
이 과정은 우선 DOM Tree와 CSSOM Tree를 만들고, 이 둘을 결합하여 Render Tree를 만듭니다. 다음에는 Render Tree를 배치하는 Layout과정, 화면에 직접 그리는 Paint 과정을 따릅니다.
위 그림에서 DOM Tree 부터 Render Tree를 만들기까지를 `Construction` 과정, Layout과 Paint를 `Operation` 과정이라고 합니다.
![](https://velog.velcdn.com/images/hyunjine/post/4b3611a5-bd74-479e-ba94-26cce050f983/image.png)

`CRP`를 알아야하는 이유는 우리가 작성한 코드가 렌더링에 직접적으로 영향을 미치기 때문입니다.
예를 들어 특정 요소를 안보이게 처리하고 싶을 때 `display: none`을 사용한다면 Tree들을 만드는 `Construction` 과정부터 `Operation`과정까지 다시 진행하기 때문에 렌더링 과정에 있어서 비효율성을 초래합니다. 따라서 `opacity`나 `visibility`속성을 사용하는것이 더 효율적입니다.

![](https://velog.velcdn.com/images/hyunjine/post/0b75cbd1-8ae0-4cea-bb79-c724b1173cd8/image.png)

이전 예시에서 알 수 있는 사실은 렌더링은 `UX`(User Experience)와 `DX`(Developer Experience)에 직접적으로 영향을 미친다는 것 입니다. 개발자가 작성하는 코드에 따라 렌더링의 속도가 달라질 수 있고 개발자는 어플리케이션의 첫 사용자(First User)이기도 하므로 `DX`에 영향을 미칩니다. 또한 개발자가 채택한 렌더링 패턴은 최초 유저인 개발자에게 영향을 미치고 이는 결국 `UX`의 저하로 이어집니다.

![](https://velog.velcdn.com/images/hyunjine/post/47798163-2b27-4fe8-89ec-b7f8b3aacf66/image.png)

따라서 우리는 올바른 렌더링 방법을 채택하는 것이 중요합니다.
그렇다면 어떤 렌더링 패턴이 올바른 것 일까요? 또, 올바르다는 기준은 무엇일까요?

올바른 렌더링 패턴이란, 우리의 어플리케이션의 특성에 맞고, UX와 DX를 모두 높여주는 패턴을 말합니다.

어플리케이션에서 고려해야 할 요소는 검색엔진 최적화, Web Performance등이 있습니다. 검색엔진 최적화는 SSR(Server Side Rendering) 해결할 수 있습니다.

![](https://velog.velcdn.com/images/hyunjine/post/56195331-4fb3-487b-b69d-543fde74dd3c/image.png)

Web Performance에서 고려할 점은 구글에서 제안하는 웹 사용자 경험에 대한 지표인 Core Web Vitals입니다.

- TTFB(Time To First Byte): 웹 페에지 컨텐츠의 첫 byte가 브라우저에 도달하는데 걸리는 시간
- FCP(First Contentful Paint): 초기 DOM 컨텐츠를 렌더링하는데 걸리는 시간
- LCP(Largest Contentful Paint): 가장 큰 컨텐츠(보통 중요한 컨텐츠일수록 크기가 큼)를 페이지에 렌더링하는데 걸리는 시간
- TTI(Time To Interactive): 컨텐츠와 상호작용까지의 시간(CSR에서는 TTV(Time To View)와 TTI가 같고 SSR에서는 TTV와 TTI가 다르다.)
- CLS(Cumulative Layout Shift): 누적 레이아웃 이동으로 사용자가 예상치 못한 레이아웃 이동을 경험하는 빈도를 수량화. 시각적 안정성을 측정할 때 중요한 사용자 중심 메트릭
- FID(First Input Delay): 사용자가 페이지와 처음 상호 작용할 때(버튼 클릭 등) 부터 해당 상호 작용에 대한 응답으로 브라우저가 실제로 이벤트 핸들러 처리를 시작하기까지의 시간을 측적하는 지표.

이 Core Web Vitals는 '어떤 방식으로 렌더링을 하냐'에 따라 수치가 달라집니다.

![](https://velog.velcdn.com/images/hyunjine/post/4466d59c-4613-4a1e-ae74-27148884700a/image.png)

'어떤 방식으로 렌더링을 하냐'는 어떤 렌더링 패턴으로 페이지를 렌더링 할 것인가로 귀결됩니다.

![](https://velog.velcdn.com/images/hyunjine/post/bf2094d4-5ccf-4277-b4c3-287fdce99041/image.gif)

Core Web Vitals를 기준으로 렌더링 패턴들의 특징을 알아보겠습니다.

CSR의 렌더링 과정은 먼저 유저의 요청에 의해 브라우저가 프론트엔드 서버로 HTML을 요청합니다. 서버는 빌드 타임에 미리 생성해 둔 HTML을 응답합니다. 이 HTML에는 로더나 skeleton UI가 들어 있습니다.

그 후에 head 태그에 정의된 CSS와 같은 렌더링 차단 리소스(다운로드되기 전까지 렌더링을 막음)를 다운 받는데, 보통 이런 리소스는 브라우저에 캐시 처리합니다. 다음으로 body 태그의 마지막 부분에 위치한 React앱이 들어있는 bundle을 프론트엔드 서버에 요청합니다. bundle을 body태그의 가장 아래에 위치시키는 이유는 자바스크립트는 문서를 파싱하다가 JavaScript를 만나면 파싱을 중지하고 JavaScript 엔진에게 권한을 넘겨서 JS를 실행하기 때문입니다.(Parse Blocking Resource)

React앱이 실행되면 이제 컨텐츠(데이터)를 받아오기 위해 API 서버로 요청을 보내고 응답을 받아서 유저에게 컨텐츠를 보여줍니다.

위 내용을 정리하면 유저는 아래와 같은 요청을 기다려야 합니다.

1. HTML 파일을 요청해서 응답을 받고
2. JavaScript 번들을 요청해서 응답을 받고
3. 번들을 실행하고
4. API 서버로 부터 응답을 받고 데이터를 렌더링

![](https://velog.velcdn.com/images/hyunjine/post/3a8847a2-867a-4dd1-9c99-a360c040b486/image.png)

CSR을 Core Web Vitals 관점으로 보겠습니다. 우선 오른쪽 아래에 표시된 파란색 표시는 브라우저에서 일어나는 과정을, 빨간색 표시는 서버에서 일어나는 과정을 뜻합니다. 또한 Network 부분과 Main Thread 부분을 나눴습니다.(Main Thread는 브라우저의 렌더러 프로세스의 Main Thread를 말합니다.)
유저가 HTML을 요청하고 서버가 이에 응답하여 브라우저에 컨텐츠의 첫 byte가 도달하는 순간을 TTFB라고 합니다. 이후에는 HTML을 파싱하고 body태그 맨 아래에 script 태그에 도달하면 bundle.js파일을 서버에서 받아오기 위해 요청을 보냅니다. 이 때 브라우저에서는 Operation과정이 수행되고 bundle을 가져오면 이제 JavaScript를 Evaluation하면서 다시 Operation을 실행합니다. 이 과정을 마치면 HTML에 JavaScript가 연결되어서 유저가 버튼을 클릭하면 연결된 로직이 수행됩니다.(TTI)

이제 서버로부터 데이터를 받아오기 위해 `/api/buildings`라는 엔드포인트에 요청을 보내고, 데이터를 받아옵니다. 데이터를 받아오면 브라우저는 바뀐 부분을 다시 그리는데 이 과정을 `hydration`이라고 합니다.

`hydration`이 완료되는 시간이 `LCP`(Largest ContentFul Paint)를 의미합니다. LCP는 보통 페이지에서 중요한 요소를 로드하는데 까지 걸리는 시간인데 CSR에서는 상대적으로 느리다는 것을 알 수 있습니다.

![](https://velog.velcdn.com/images/hyunjine/post/551f4cca-8f6c-4b10-9f56-0a5df7de7ace/image.png)

`hydration`을 시각적으로 이해하기 위해 데모 페이지를 만들었습니다.

[DEMO](https://rendering-patterns.vercel.app/)

`hydrate`은 `수분을 공급하다`라는 뜻을 가지고 있습니다. 왼쪽 브라우저에는 skeleton UI가 있고 오른쪽 브라우저에는 빌딩 데이터가 채워져 있습니다.
즉`hydration`이란, API요청을 통해 데이터라는 수분을 페이지에 공급해주는 것 이라고 할 수 있습니다.

> **hydration**
> 페이지가 브라우저에 로드되고 자바스크립트 코드가 실행되면서 페이지가 인터렉티브하게 동작하는 상태가 되는 과정

![](https://velog.velcdn.com/images/hyunjine/post/5a1e5a80-e922-489e-a21e-6c9dd4035e12/image.png)

다음으로 SSR(Server Side Rendering)입니다. 유저가 프론트엔스 서버에 HTML 파일을 요청하면 서버는 API 서버에 요청을 보내서 데이터를 받아와 컨텐츠를 채우고 완성된 HTML 파일을 클라이언트에게 보내줍니다. 기존 React앱이 실행된 후에 보내던 API 요청을 서버에서 미리 보내는 것 입니다. 따라서 유저는 한번의 요청만으로 보고 싶은 컨텐츠를 바로 보게 됩니다.

![](https://velog.velcdn.com/images/hyunjine/post/6ebea75c-b7ff-4a76-a1b6-c6b3b4ebcd30/image.png)

SSR을 Core Web Vitals 관점으로 보겠습니다. SSR이 이루어진 후 첫 바이트가 유저에게 도착하고, 유저에게 도착한 HTML은 컨텐츠를 포함하기 때문에 그 HTML을 렌더하는 순간 FCP(First Contentful Paint), LCP(Largest Contentful Paint)가 동시에 발생합니다. 마지막으로 JS를 로딩하면 유저가 인터렉션 가능한 페이지가 되므로 TTI는 마지막에 일어납니다.

![](https://velog.velcdn.com/images/hyunjine/post/6ccbd3ba-d6b2-4d0f-b6fe-f06b15f97d4f/image.png)

여러분의 컨텐츠가 빈번하게 바뀐다면 CSR과 SSR을 같이 활용할 수 있는데, SSR을 마친뒤에 `hydration`과정이 추가됩니다. `hydration` 과정에는 react-query나 swr같은 data-fetching 라이브러리를 주로 활용합니다.

![](https://velog.velcdn.com/images/hyunjine/post/80ab2b0b-af09-431a-8155-654b6f2e57da/image.png)

React에서는 SSR을 구현하기위해 React 프레임워크인 Next.js를 사용합니다.

![](https://velog.velcdn.com/images/hyunjine/post/a1c6b341-29c5-4fe7-8649-535a69ea28e0/image.png)

Next.js는 기본적으로 모든 페이지를 pre-render(미리 렌더링)합니다.
Client Side JavaScript가 페이지의 HTML을 다 그리는 것이 아니라 미리 각 페이지를 위한 HTML을 생성합니다.
각각 생성된 HTML 페이지에는 최소한의 자바스크립트가 연결되고 Client Side에서는 이 자바스크립트로 `hydration`과정이 일어납니다.

![](https://velog.velcdn.com/images/hyunjine/post/d186b858-c6d7-474f-9f19-f0a9997c85d7/image.png)

Next.js의 pre-rendering 형태는 `SSG`(Static Site Generation)과 `SSR`(Server Side Rendering)으로 나뉘며 각 페이지별로 다르게 적용할 수 있습니다.

예를 들어 Page A는 `SSG`로, Page B는 `SSR`로, Page C는 `CSR + SSR`로, Page D는 `CSR`로 렌더링 할 수 있습니다.

![](https://velog.velcdn.com/images/hyunjine/post/10619935-1655-49d1-8c62-7a72a86b5666/image.png)

Next.js의 pre-rendering 형태중 `SSG`에 대해서 먼저 알아보겠습니다. `SSG`는 빌드 타임에 HTML 페이지를 생성합니다.
데이터를 받아오는 API 요청 또한 빌드 타임에만 실행합니다. 따라서 API 서버의 부하가 줄어듭니다. 또한, 만들어진 컨텐츠를 CDN에 캐시함으로써 사용자에게 컨텐츠를 매우 빠르게 전달할 수 있습니다.
단점으로는 빌드 타임에 컨텐츠를 만들기 때문에 변하는 데이터에 취약합니다.

![](https://velog.velcdn.com/images/hyunjine/post/3da05a9e-c5fc-4f5b-a3de-ccab8eb53f1a/image.png)

`SSG`에 `CSR`을 곁들이면 변하지 않는 부분은 변하지 않게 고정하고, 유동적으로 데이터를 fetching 해야하는 부분은 `CSR`로 처리할 수 있습니다.(`hydration`) 또한, 두 렌더링 방식을 합쳤기 때문에 장점 또한 합쳐집니다.

![](https://velog.velcdn.com/images/hyunjine/post/19d25656-0260-429c-ab6a-a8e6a1c7cae6/image.png)

`ISR`(Incremental Static ReGeneration)은 `SSG`에서 `revalidation` 옵션을 추가한 것 입니다. 빌드 타임에 HTML을 생성하는 것은 동일하나 일정 주기마다 데이터의 최신 여부를 검사해서 업데이트된 데이터로 페이지를 다시 생성합니다.

![](https://velog.velcdn.com/images/hyunjine/post/b927663f-9de9-47f2-b86d-9cece9ea5dd9/image.png)

마찬가지로 `CSR`을 곁들이면 바뀌긴 하는데 자주 변하지 않는 데이터는 `ISR`의 렌더링 방법을, 동적으로 계속 바뀌는 데이터들은 `CSR`로 처리할 수 있습니다. 예를 들면 블로그 글(자주 안바뀜)과 댓글(자주 바뀜)을 이 방식으로 처리할 수 있습니다.

![](https://velog.velcdn.com/images/hyunjine/post/96bbbcea-112b-41c2-8e22-00b5e45dc303/image.png)

마찬가지로 `SSG` 또한 Core Web Vitals 관점으로 보겠습니다.
`SSG`로 만들어진 사이트이기 때문에 빌드 타임에 이미 HTML이 완성되어 있습니다. 따라서 서버에서는 마땅히 할 일이 없기 때문에 HTML을 바로 주고 클라이언트는 그 HTML을 바로 렌더링합니다. `CSR`을 곁들인다면 뒤에 `hydration` 과정이 추가되겠죠.

![](https://velog.velcdn.com/images/hyunjine/post/5b077a22-99f9-4b18-8b22-492a6bd24fe3/image.png)

다시 `SSR`입니다. `SSR`이야기를 다시 꺼낸 이유는 Next.js`SSR`의 Page단위 data fetching에 있습니다.

`getServerSideProps`라는 함수는 API서버로부터 데이터를 가져온 후에 해당 데이터를 사용한 props를 리턴해주면 페이지 컴포넌트는 그 props를 바로 사용할 수 있습니다. 만약 `CSR`에서 `SSR`로 마이그레이션 한다고하면 기존 클라이언트 사이드의 data fetching 로직을 `getServerSideProps`로 옮기면 됩니다. 하지만 여러 컴포넌트에서 여러개의 데이터를 fetching 한다면 처리가 어려워집니다. 또한 props drilling을 하면 관심사의 분리가 되지 않으므로(위 예제에서 A컴포넌트는 data에 관심이 없음) 좋지 않은 해결 방법입니다.

![](https://velog.velcdn.com/images/hyunjine/post/ab2fe241-8d55-4f91-8ec0-c70d3e4e8113/image.png)

이를 해결하는 것이 RSC(React Server Component)입니다. RSC는 컴포넌트 개별 단위별로 서버에서 data fetching을 할 수 있으며 서버의 리소스에 자유롭게 접근할 수 있습니다. 또한 서버컴포넌트는 클라이언트로 전송되는 번들에 포함되지 않으며, 클라이언트의 상태를 유지하며 refetch할 수 있습니다.

![](https://velog.velcdn.com/images/hyunjine/post/13465e72-b67f-4818-925f-b7173b8fac4f/image.png)

결국 이런 렌더링 패턴들을 알아야하는 이유는 렌더링 패턴이 UX와 DX에 직접적으로 연관이 있기 때문입니다.

![](https://velog.velcdn.com/images/hyunjine/post/e6d10946-1df5-479a-a21d-129fb125ad8f/image.png)

우리는 흔히 이런 개발 사이클을 돌곤 합니다. 엄청난 아이디어가 떠오르고 개발을 한 후 배포를 합니다.

![](https://velog.velcdn.com/images/hyunjine/post/5c6b6ff7-3f4b-4d72-a544-dcdfa8cbcf32/image.png)

그렇다면 이 과정에서 렌더링 패턴은 언제 고려되어야 할까요?

![](https://velog.velcdn.com/images/hyunjine/post/87c555cc-d884-4f23-8dab-b2e41398e76a/image.png)

정답은 없습니다. 어디서든지 렌더링 패턴을 고려할 수 있지만, 어플리케이션이 어떤 컨텐츠를 렌더링하냐에 적용할 패턴이 바뀔 것 같습니다.

![](https://velog.velcdn.com/images/hyunjine/post/18e1c107-c172-44f5-a452-2aa5a7761a3f/image.png)

저는 특정 패턴이 좋고 나쁘고를 주장하는 것이 아닙니다.
단지 웹을 렌더링하는 방법에는 다양한 렌더링 패턴이 존재하고, 이 패턴들은 모두 tradeoff가 있을 뿐 입니다.
여러분이 자신의 웹 애플리케이션의 문제점을 찾고 그 문제점을 해결하기 위한 렌더링 패턴을 적용했으면 좋겠습니다.

이 발표가 효율적인 렌더링 패턴을 찾는데 도움이 되었으면 좋겠습니다.

감사합니다.

<!-- # 발표 스크립트

안녕하세요.
소프트웨어 마에스트로 연수생 프론트엔드 개발자 이현진입니다.
웹 페이지를 그리는 다양한 렌더링 방식. 즉 Rendering Pattern들에 대해 이야기 해보도록 하겠습니다.

자신의 어플리케이션에 맞는 렌더링 방법을 이해하고 그것을 적용하는 과정은 쉽지 않습니다.

렌터링 패턴들에 대해서 알아보겠습니다.

## 임시

> 소프트웨어 마에스트로 컨퍼런스 발표자료 22.07.07

![](https://velog.velcdn.com/images/hyunjine/post/8856f00e-ea15-4cc7-9a28-2220b0a3ca32/image.png)

안녕하세요 소프트웨어 마에스트로 연수생 프론트엔드 개발자 이현진 입니다.
웹 페이지를 그리는 다양한 렌더링 방식 즉 Rendering Pattern들에 대해 이야기 해보겠습니다.

![](https://velog.velcdn.com/images/hyunjine/post/9fb837bd-c81c-44bd-bea3-eebba30d93b5/image.gif)

렌더링은 브라우저 화면에 웹 페이지를 그리는 것을 말합니다. 먼저 유저가 브라우저를 통해 서버에 요청을 보내고, 서버는 이에 응답으로 html, css, JavaScript를 보내줍니다. 브라우저는 이를 해석하여 웹 페이지를 그립니다. (렌더링을 수행하는 브라우저의 프로세스를 렌더러 프로세스라고 합니다.)

![](https://velog.velcdn.com/images/hyunjine/post/1b858f59-55e1-47bb-a220-300e8a092a37/image.png)

브라우저가 화면에 html, css, JavaScript를 그리는 과정(절차)를 `CRP`(Critical Rendering Path)라고 합니다.
이 과정은 우선 DOM Tree와 CSSOM Tree를 만들고, 이 둘을 결합하여 Render Tree를 만들고 이 Render Tree를 배치하는 Layout과정, 화면에 직접 그리는 Paint 과정을 따릅니다.
위 그림에서 DOM Tree 부터 Render Tree를 만들기까지를 `Construction` 과정, Layout과 Paint를 `Operation` 과정이라고 합니다.

![](https://velog.velcdn.com/images/hyunjine/post/4b3611a5-bd74-479e-ba94-26cce050f983/image.png)

`CRP`를 알아야하는 이유는 우리가 작성한 코드가 렌더링에 직접적으로 영향을 미치기 때문입니다.
예를 들어 특정 요소를 안보이게 처리하고 싶을 때 `display: none`을 사용한다면 Tree들을 만드는 `Construction` 과정부터 `Operation`과정까지 다시 진행하기 때문에 렌더링 과정에 있어서 비효율성을 초래합니다. 따라서 `opacity`나 `visibility`속성을 사용하는것이 더 효율적입니다.

<!--
지금까지 저희가 미시적인 관점으로 웹의 렌더링에 직접적으로 영향을 미치는 요소에 대해 봤다면 지금부터는 거시적 관점에서 웹 페이지 전체를 어떻게 렌더링할 것인가에 대한 방법에 대해 이야기해 보겠습니다.
 -->
<!--
번들로부터 리액트 앱을 실행할 때 저사양 기기를 사용한다면 시간이 오래 걸릴 수 있다.

SSR 시점에 react-query로 가져온 값은 undefined이기 때문에  -->
