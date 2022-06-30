# Pre-rendering

기본적으로 Next.js는 모든 페이지를 pre-render한다.
client-side JavaScript가 페이지의 HTML을 다 그리는 것이 아니라 미리 각 페이지를 위한 HTML을 생성한다.

각각 생성된 페이지는 최소한의 자바스크립트와 연관되어있는데, Client Side에서는 브라우저에 페이지가 로드되었을 때, 자바스크립트가 페이지를 완전히 완성시킨다. 이 과정을 hydration이라고 한다.

> hydration
>
> 페이지가 브라우저에 로드되고 자바스크립트 코드가 실행되면서 페이지가 인터렉티브 하게 동작할 상태가 되는 과정

Next.js의 pre-rendering 형태는 Static Generation과 Server Side Rendering으로 나뉜다. 이 둘의 차이점은 HTML을 생성할 때에 있다.

Next.js에서는 대부분의 페이지를 Static Generation으로 구현하고 나머지를 Server Side Rendering으로 구현할 것을 제안한다. 또한, CSR 또한 함께 사용 가능하다. 페이지의 일부분은 Client Side JavaScript에 의해 렌더링 될 수 있다는 뜻이다. (사용자의 선택에 따른 Data Fetching의 경우)

![image](https://user-images.githubusercontent.com/63354527/176658540-9afe2dfc-4db7-4952-8488-a0d601480756.png)

Pre-rendering 방식을 제공하는 Next.js는 우선 HTML 파일을 통해 정적인 화면을 먼저 보여준다. 이후 JS 파일을 로드해와서 화면에서의 클릭 등의 이벤트 처리가 이뤄질 수 있는 반응하는 화면으로 전환된다. 화면은 먼저 보이지만, 반응 할 수 있는 시점까지 다소 시간이 걸릴 수 있다.

pre-rendering 이란 SSR(Server Side Rendering)을 구현하는 Next.js의 특징.

예전에 MPA(Multi Page App)이라고 비슷한 방식이 존재했습니다. 아까 들었던 의문처럼 이 멀티페이지 앱은 페이지 이동할 때마다 다시 서버에 요청하고 받아오는 방식이었기 때문에 화면 깜빡임이 많아서 사용자 경험이 좋지 않았습니다.

Next.js는 최소한의 JavaScript를 이용한 Rendering을 하고 나머지는 차차 JavaScript 파일들을 받아와 클라이언트 측에서 JavaScript를 해석하는 즉 CSR과 같은 비슷한 방식으로 진행된다.

요점은 Next.js는 처음에는 SSR, 이후엔 CSR 방식이라는 뜻이다.

Next.js에서는 두가지 pre-rendering 방식을 제공한다.

1. Static Generation(정적 생성 방식)
2. Server-Side Rendering 방식

- Next.js는 기본적으로 모든 페이지를 pre-render.
- 대부분의 페이지는 Static Generation으로 수행하고 최신 컨텐츠가 필요한 페이지는 Server Side Render으로 수행
- 기본적으로 Next.js는 모든 페이지를 Pre-render을 수행

![image](https://user-images.githubusercontent.com/63354527/176647877-68aeef19-420b-4d28-a12d-58ba73894c2c.png)

hydation

- js 파일을 서버로부터 받고 Initial load html에서 로드된 HTML과 연결 시키는 과정
- React 컴포넌트들이 초기화되고 사용자와 상호작용을 준비한다.

![image](https://user-images.githubusercontent.com/63354527/176648267-d0844909-4bde-4867-aa2a-790f4d7e9c0a.png)

SSR
페이지를 요청받을 때마다 HTML을 새로 생성

![image](https://user-images.githubusercontent.com/63354527/176652643-b950e796-6235-4e8a-a930-d96c84598fca.png)

Static Site Generation

![image](https://user-images.githubusercontent.com/63354527/176653267-d90ae3ab-c255-4c10-a442-f4de7d514170.png)

- 빌드 시점에 HTML을 생성하고 이 정적 사이트를 유저에게 제공
- 프론트 서버에서 API 서버 & 데이터베이스에 접근을 줄이기 위해 나온 방식
- 빌드 할때만 API서버에 접근하기 때문에 CSR 또는 SSR보다 API서버에 대한 부하가 훨씬 줄어듦
- 데이터가 자주 갱신되지 않는 컨텐츠에 최적

CSR

- 데이터를 미리 렌더링 할 필요가 없는 경우 Client-Side-Rendering 을 사용할 수 있다.
- 외부 데이터가 필요하지 않은 페이지 부분을 정적으로 생성(pre-render)
- 페이지가 로드되고 나서 JS를 사용하여 클라이언트에서 외부 데이터를 가져오고 나머지 부분을 채운다.
- 일반 사용자들에게 노출되지 않고 SEO가 필요하지 않은 경우 사용(관리자 페이지)

![image](https://user-images.githubusercontent.com/63354527/176653993-a5f2cd9c-8e6e-4340-9b6c-87bd86739f2e.png)

getStaticProps는 Server Side에서만 동작한다. Client Side에서는 동작하지 않는다. getStaticProps는 JS Bundle에도 포함되지 않을 것이고 그 말은 데이터베이스에 직접 접근하는 queries도 브라우저에 보내지지 않으니까 코드에 작성해도 아무런 문제가 없다는 뜻이다.

Development 모드에서 getStaticProps는 모든 요청마다 동작한다. 하지만 Production 모드에서 getStaticProps는 오로지 build time에만 동작한다. 그 말인즉슨, request time에만 접근 가능한 데이터, 예를 들어 query parameters나 HTTP headers를 사용하지 못한 다는 뜻이다.
