# hydration

hydration은 자바스크립트 프레임워크에서 페이지가 서버에 렌더링된 이후에 브라우저에서 초기화되는 프로세스를 말한다.

대부분의 프레임워크에서 하이드레이션은 페이지를 처음 로드할 때 상당히 큰 비용을 수반한다.  
자바스크립트를 로드하고 하이드레이션이 완료되는데 걸리는 시간이 오래 걸릴 수록 우리는 인터렉티브해보이지만 실제로는 그렇지 않은 페이지를 오랫동안 마주하게 된다. (TTI !== TTV) 이는 사용자 경험에 치명적이며 특히 디바이스의 성능이 좋지 않을수록, 또 네트워크가 느릴수록 이를 경험할 확률이 높습니다.

### **서버사이드 렌더링이 만능 해결책은 아니다.**

서버 사이드 렌더링을 사용한다고 무조건 더 성능이 좋을까.

아니다. 오히려 자바스크립트 코드를 증가시키며, 애플리케이션이 인터렉티브 할 때까지 걸리는 시간이 단순 클라이언트 사이드 렌더링보다 더 길어질 수 있다.

이유는 뭘까?
대부분의 프레임워크에서 하이드레이션 준비 코드는 궁극적으로 두가지 작업을 수행해야 하기 때문에 일반적인 클라이언트 코드보다 양이 많다. 처음에는 하이드레이션만 할지라도 여러분의 프레임워크는 클라이언트 측 렌더링을 허용하기 때문에 그것을 위한 코드도 필요하다.
또한, 데이터를 로드할 때 사용자에게 보여줄 수 있는 HTML 페이지를 보여주는 대신, 서버에서 전체 페이지가 로드되고 렌더링 될 때 까지 기다린다. 이 페이지는 모든 HTML과 애플리케이션 부트스트랩에 필요한 데이터를 포함하고 있기 때문에 훨씬 크다.

일반적으로 브라우저가 자바스크립트를 로드하기 위한 추가 왕복 시간을 기다릴 필요가 없기 때문에 메인 콘텐츠가 더 빨리 보인다. 하지만 애플리케이션을 하이드레이션 하기 위한 자바스크립트를 포함하고 있는 에셋의 로딩을 지연시킨다.