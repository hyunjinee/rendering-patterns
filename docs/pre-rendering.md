# Pre-rendering

기본적으로 Next.js는 모든 페이지를 pre-render한다.
client-side JavaScript가 페이지의 HTML을 다 그리는 것이 아니라 미리 각 페이지를 위한 HTML을 생성한다.

각각 생성된 HTML페이지는 최소한의 자바스크립트와 연관되어있는데, Client Side에서는 브라우저에 페이지가 로드되었을 때, 자바스크립트가 페이지를 완전히 완성시킨다. 이 과정을 hydration이라고 한다.

![image](https://user-images.githubusercontent.com/63354527/176647877-68aeef19-420b-4d28-a12d-58ba73894c2c.png)

> hydration
>
> 페이지가 브라우저에 로드되고 자바스크립트 코드가 실행되면서 페이지가 인터렉티브 하게 동작하는 상태가 되는 과정

Pre-rendering 방식을 제공하는 Next.js는 우선 HTML 파일을 통해 정적인 화면을 먼저 보여준다. 이후 JS 파일을 로드해와서 화면에서의 클릭 등의 이벤트 처리가 이뤄질 수 있도록 연결한다. 화면은 먼저 보이지만, 반응 할 수 있는 시점까지 다소 시간이 걸릴 수 있다. 이를 TTI와 TTV가 다르다(TTI !== TTV)라고 한다.

- TTI(Time To Interact): 페이지가 로드되고 자바스크립트 코드가 실행되면서 페이지가 인터렉티브 하게 동작하는 걸리는 시간을 의미한다. (사용자와 상호작용 가능할 때까지의 시간)
- TTV(Time To View): 페이지가 사용자에게 보여지는데까지 걸리는 시간.

Next.js의 pre-rendering 형태는 Static Generation과 Server Side Rendering으로 나뉜다. 이 둘의 차이점은 HTML을 생성할 때에 있다. 즉, 페이지의 일부는 클라이언트 측 JavaScript로 완전히 렌더링 될 수 있음을 의미한다.

![image](https://user-images.githubusercontent.com/63354527/176658540-9afe2dfc-4db7-4952-8488-a0d601480756.png)

여러분의 페이지에서 pre-render가 필요없는 페이지는 (SEO 필요없어) CSR로 처리하면 된다. **또한 여러분의 컨텐츠가 빈번하게 바뀐다면 CSR로 처리하는 것이 성능상 더욱 좋다.**

Client Side에서 data를 fetching 하는 것은 fetch를 사용하는것과 swr이나 react-query를 사용할 수 있다.

우선 fetch api를 사용해서 아래와 같이 데이터를 받아올 수 있다.

```js
function Profile() {
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch("/api/profile-data")
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })
  }, [])

  if (isLoading) return <p>Loading...</p>
  if (!data) return <p>No profile data</p>

  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.bio}</p>
    </div>
  )
}
```

또는 swr이나 react-query와 같은 라이브러리를 이용해 아래와 같이 데이터를 받아올 수 있다.

```js
import useSWR from "swr"

const fetcher = (...args) => fetch(...args).then((res) => res.json())

function Profile() {
  const { data, error } = useSWR("/api/profile-data", fetcher)

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>

  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.bio}</p>
    </div>
  )
}
```

swr, react-query같은 라이브러리는 caching, revalidation, focus tracking, refetching on intervals등을 제공하기 때문에 라이브러리를 사용하는 것이 권장된다.

## Static Generation

Next.js는 기본적으로 Static Generation을 권장한다.

- `getStaticProps`
- build time에 생성되는 html 페이지

![image](https://user-images.githubusercontent.com/63354527/176653267-d90ae3ab-c255-4c10-a442-f4de7d514170.png)

Next.js에서는 대부분의 페이지를 Static Generation으로 구현하고 나머지를 Server Side Rendering으로 구현할 것을 제안한다. Next.js를 이용해 정적으로 생성된 페이지는 성능 향상을 위한 추가 구성 없이 CDN에 캐시할 수 있다.

데이터가 계속 바뀌는 경우는 Static Generation을 활용하지 못할 수 있다.

Next.js에서는 Client Side Rendering을 Static Generation 또는 Server Side Rendering과 함께 사용할 수 있다. 페이지의 일부분은 Client Side JavaScript에 의해 렌더링 될 수 있다는 뜻이다. (사용자의 선택에 따른 Data Fetching의 경우)

다음은 SG(Static Generation)의 특징이다.

- getStaticProps는 Server Side에서만 동작한다. Client Side에서는 동작하지 않는다. getStaticProps는 JS Bundle에도 포함되지 않는다.

- Development 모드에서 getStaticProps는 모든 요청마다 동작한다. 하지만 Production 모드에서 getStaticProps는 오로지 build time에만 동작한다. 이 뜻은, request time에만 접근 가능한 데이터, 예를 들어 query parameters나 HTTP headers를 사용하지 못한 다는 뜻이다.
- 빌드 시점에 HTML을 생성하고 이 정적 사이트를 유저에게 제공
- 프론트 서버에서 API 서버 & 데이터베이스에 접근을 줄이기 위해 나온 방식
- 빌드 할때만 API서버에 접근하기 때문에 CSR 또는 SSR보다 API서버에 대한 부하가 훨씬 줄어듦
- 데이터가 자주 갱신되지 않는 컨텐츠에 최적

Next.js의 SG에는 두가지 상황이 존재한다.

- 데이터가 필요 없는 경우
- 페이지 렌더링에 데이터가 필요한 경우

### Static Generation without data (데이터가 필요 없는 경우)

아래와 같은 컴포넌트를 렌더링한다고 하자.

```js
export default function About() {
  return <div>hyunjin</div>
}
```

이와 같은 컴포넌트의 경우 Next.js는 HTML 페이지를 build 타임에 그냥 만들어 버린다.

### Static Generation with data (데이터가 필요한 경우)

페이지가 pre-rendering을 수행하기 위해 데이터를 받아와야 한다고 하자.

- `getStaticProps`: 페이지의 컨텐츠가 외부 데이터를 가져와야 하는 경우.
- `getStaticPaths`: 페이지의 경로가 외부 데이터에 의존하는 경우.

아래는 getStaticProps의 예제이다.

```js
function Blog({ posts }) {
  // Render posts...
}

// 빌드타임에 함수 실행
export async function getStaticProps() {
  const res = await fetch("https://.../posts")
  const posts = await res.json()
  return {
    props: {
      posts,
    },
  }
}

export default Blog
```

Next.js에서는 폴더기반 dynamic 라우팅을 지원한다. post 1이 데이터베이스에 있고 빌드 time에 `posts/1` 페이지를 pre-render 했다고 하자. 시간이 지나고 여러분이 post 2를 작성했고 db에 등록했다. 이 때 여러분은 `posts/2`또한 pre-render하기를 원한다.

위 상황이 pre-render된 페이지 경로가 데이터에 의존하는 경우이다. 해결하려면 `getStaticPaths` 함수를 사용하면된다.

```js
function Post({ post }) {
  // Render post...
}
// This function gets called at build time
export async function getStaticPaths() {
  const res = await fetch("https://.../posts")
  const posts = await res.json()
  // Get the paths we want to pre-render based on posts
  const paths = posts.map((post) => ({
    params: { id: post.id },
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}
// This also gets called at build time
export async function getStaticProps({ params }) {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  const res = await fetch(`https://.../posts/${params.id}`)
  const post = await res.json()

  // Pass post data to the page via props
  return { props: { post } }
}
```

## Server Side Rendering

전통적인 웹페이지에 MPA(Multi Page Application)이라는 방식이 존재했다. 이는 페이지를 이동할 때마다 서버에 요청하고 html을 받아오는 방식을 말한다. 따라서 화면의 깜빡임이 많아서 사용자 경험이 좋지 않았다.

Next.js는 최소한의 JavaScript를 이용한 Rendering을 하고 나머지는 차차 JavaScript 파일들을 받아와 클라이언트 측에서 JavaScript를 해석하는 즉 CSR과 같은 비슷한 방식으로 진행된다.

요점은 Next.js는 처음에는 SSR, 이후엔 CSR 방식이라는 뜻이다.

- 최신 컨텐츠가 필요한 페이지는 Server Side Render으로 수행
- 페이지를 요청받을 때마다 HTML을 새로 생성

<!-- ![image](https://user-images.githubusercontent.com/63354527/176648267-d0844909-4bde-4867-aa2a-790f4d7e9c0a.png) -->

![image](https://user-images.githubusercontent.com/63354527/176652643-b950e796-6235-4e8a-a930-d96c84598fca.png)

## CSR

- 데이터를 미리 렌더링 할 필요가 없는 경우 Client-Side-Rendering 을 사용할 수 있다.
- 외부 데이터가 필요하지 않은 페이지 부분을 정적으로 생성(pre-render)
- 페이지가 로드되고 나서 JS를 사용하여 클라이언트에서 외부 데이터를 가져오고 나머지 부분을 채운다.
- 일반 사용자들에게 노출되지 않고 SEO가 필요하지 않은 경우 사용(관리자 페이지)

![image](https://user-images.githubusercontent.com/63354527/176653993-a5f2cd9c-8e6e-4340-9b6c-87bd86739f2e.png)
