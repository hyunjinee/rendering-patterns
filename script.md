# 발표 스크립트

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
