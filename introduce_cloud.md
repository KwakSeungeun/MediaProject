<h2>클라우드 컴퓨팅</h2>
분산시스템 유형의 하나로 로컬 컴퓨터 리소스(on-premise)가 아닌 인터넷 환경에서 연결된 원격지의 컴퓨터 리소스(off-premise)를 이용한 컴퓨팅 기술.  
클라우드 플랫폼이 구축된 데이터 센터로부터 제공하는 서비스를 언제 어디서든 이용할 수 있다.  

<h4>기존의 서버 호스팅 방식과의 차이</h4>
클라우드 서비스 이용자는 on demand방식의 elastic한 컴퓨팅 리소스 사용할 수 있다.  
대부분의 클라우드 서비스 사업자는 pay as you go(Pay-Go) 방식의 요금제를 바탕으로 하며 이용자는 사용한 만큼 비용을 지불하면 된다.  

<h4>클라우드 공개 범위와 유형에 따른 분류</h4>
#.Public : 아마존AWS, 구글GCP, Microsoft Azure, SK 클라우드Z 등 제 3자가 가진 데이터 센터의 하드웨어 자원을 통해 클라우드 서비스를 이용하는 것  

#.Private : 사내의 자체 데이터 센터의 하드웨어 자원을 이용해서 사내에서만 접근 가능한 클라우드 플랫폼을 구축하고 이용하는 것  

#.Hybrid : Public Cloud와 Private Cloud가 결합된 방식, 워크로드를 각각으로 분산해서 실행할 수 있고 두 환경의 리소스를 호출해서 상호 운용할 수 있는 형태.  

#.Multi : 여러 클라우드 벤더가 제공하는 2개 이상의 동일한 public/private 유형으로 구축된 클라우드, 여러 벤더가 제공하는 서비스를 통합, 확장하여 사용하는 형태  

<h4>클라우드 서비스</h4>
#.Iaas (infrastructure as a service) : 데이터 센터의 하드웨어 자원을 가상화하여 CPU, Memory, Storagge, Network 등의 리소스 제공을 통한 인프라 서비스 제공, 원하는 성능의 하드웨어 자원으로 가상 머신을 이용할 수 있다.  
대표적인 예) 아마존AWS의 EC2 등  

#.Paas (Platform as a service) : 앱 개발에 필요한 플랫폼을 제공하는 서비스로 개발 언어, 웹 프레임워크, DB 서버, 웹 서버 등을 제공한다. API도 PaaS 서비스의 일종이다.  
대표적인 예) 아마존AWS의 BlockChain template, SK CLOUDZ의 AIBRIL 등  

#.Saas (Service as a service) : on demand software로, 클라우드 환경에서 동작하는 애플리케이션 서비스를 클라이언트에게 제공한다. 
대표적인 예) 구글Docs, 구글 스타디아의 게임 스트리밍 서비스, 구글 드라이브 등  

※참고  
AWS EBS를 사용하는 경우 단지 대용량 스토리지를 빌리는 것으로 IaaS에 해당한다고 볼 수 있으나, 이런 스토리지를 통해 유저에게 저장 서비스(클라우드 스토리지 서비스, 예) 구글 드라이브)를 제공하는 형태로 가공된 경우 SaaS라고 할 수 있다.

<h4>가상화 기술(Virtualization)</h4>
가상화 : 컴퓨터에서 컴퓨터 리소스의 추상화를 일컫는 광범위한 용어이다. "물리적인 컴퓨터 리소스의 특징을 다른 시스템, 응용 프로그램, 최종 사용자들이 리소스와 상호 작용하는 방식으로부터 감추는 기술"로 정의, 쉽게 말해 없는 것을 있는 것처럼 보이게 하는 기술  
<h5>Hypervisor 설치 방식에 따른 분류</h5>
#.Type1(Bare Metal, Native VMM)  
VM / VMM(Hypervisor) / HW 순서의 레이어  

#.Type2(Hosted VMM)  
VM / VMM / OS / HW  

#.Type3  
VM / OS - VMM / HW  

#.Process VM  
Runtime system / OS / HW  
ex)java virtaul machine  

#.Container  
Containers / OS / HW : 하나의 OS에 동일한 OS를 사용하는 여러 환경을 구축, APP / OS / HW 방식의 기존 구조와 동일한 구조의 레이어를 가짐, 빠르다.  
애플리케이션을 실제 구동 환경으로부터 추상화  

"가상 머신은 하드웨어 스택을 가상화하지만, 컨테이너는 이와 달리 운영체제 수준에서 가상화를 실시하여 다수의 컨테이너를 OS 커널에서 직접 구동합니다.  
컨테이너는 훨씬 가볍고 운영체제 커널을 공유하며, 시작이 훨씬 빠르고 운영체제 전체 부팅보다 메모리를 훨씬 적게 차지합니다."  

※VMM / OS / HW 순서의 레이어일지라도 VMM이 Priviledged instruction을 이용해서 HW에 직접 접근하는 경우가 있을 수 있다.  
<h4>가상화 방식에 따른 분류</h4>  
#.전가상화(Full Virtualization)  
guest OS에서의 privileged instruction 호출  
> CPU입장에서 유저 모드에서의 호출  
> Exception 발생  
> Exception Handling을 통해 guest OS의 privileged instruction 처리  
(단, CPU가 가상화를 지원해야 함)  

#.반가상화(Para Virtualization)  
guest OS의 Privileged instruction 호출하는 부분을 Host OS의 같은 기능을 호출하는 방식으로 코드를 수정한다.  
(OS 코드를 제공하는 오픈소스 OS의 경우에 가능하다)  
<h4>기타 이슈</h4>  
#.클라우드의 장단점  
클라우드 서비스는 기존 웹 호스팅 방식보다 elastic한 방식으로 리소스를 사용할 수 있다는 장점이 있다. 또한 cloud 서비스 이용자는 수요를 예측하고 리소스를 확충해서 대비할 수 있다. 이런 경우 웹 호스팅 방식처럼 고정된 용량과 성능의 HW를 마련해 일관된 비용을 지불하는 것보다 사용량만큼 지불을 하는 것으로 합리적인 비용 지불이 가능하다. 또한, 인프라를 클릭으로 간편하게 구축이 가능하여, 인프라를 구축하는데 사용되는 시간를 절약할 수 있으며 관리에 대한 비용적, 시간적 부담을 덜 수 있다. 현재 AWS를 필두로 여러 클라우드 서비스 업체는 이용자의 수요에 따라 여러 플랫폼, 방식의 클라우드 서비스를 제공하고 있어 목적에 선택해서 사용하면 된다.  
하지만, 사용량에 따른 비용 지출 방식은 사전에 철저한 계산과 예측을 요구한다. 자칫하면 엄청난 요금 폭탄을 맞을 수 있기 때문이다. 실제로, AWS를 이용하는 업체 중 높은 비용으로 불만을 가지는 업체도 많이 있다고 한다. 또한 인터넷 환경에서 원격지와의 통신으로 이루어지는 서비스인 만큼 인터넷 환경의 영향을 받는다. LAN에 비해 WAN이 더 불안정할 수 밖에 없다. 또한 로컬에서 이루어지는 트랜잭션에 비해 시간이 많이 소요될 수 있다. 데이터 량, 초당 이루어지는 트랜잭션 등을 따져보아 클라우드를 사용하는 것이 옳은 것인지 따져보아야 한다.  
이처럼 비용적, 성능적 측면에서 사전 분석이 필요하다. 코스트에 대한 자세한 계산식은 Maarten van Steen, Andrew S. Tanenbaum의 Distributed System 교재를 참고.

#.기업에서 Public Cloud를 사용하는 경우, 기업 내부 문서가 제 3자의 저장소에 저장된다는 부담이 있다. 하지만, 사내 Private Cloud를 구축하여, 그런 자료는 Private Cloud 내에 저장하는 등의 방법으로 보완이 가능하다. Hybrid Cloud를 구축하면 된다.

#.클라우드 이중화
클라우드에 서버 등을 운영하는 경우 하나의 클라우드 가상 머신(A)에서 failure가 발생하는 경우에 대비하여 동일한 가상 머신 서버(B)를 두고, failure가 발생한 경우 B에서 서비스를 계속 제공한다. 이를 통해 availability, safety, maintainability를 높일 수 있다.

#.클라우드 네이티브
클라우드 컴퓨팅 서비스가 확산되면서 클라우드 컴퓨팅 제공 모델에 최적화된 탄력적이고 분산된 방식의 애플리케이션의 구축과 실행 접근 방법을 의미하며 애플리케이션이 Public Cloud에 위치하는 것을 암시한다.
CNCF(Cloud Native Computing Foundation)에서는 좁은 의미로 컨테이너화되는 오픈소스 소프트웨어 스택을 사용하는 것을 의미한다. 
http://www.itworld.co.kr/news/109679  
#.마이크로서비스
애플리케이션을 느슨히 결합된 서비스의 모임으로 구조화하는 서비스 지향 아키텍처(SOA) 스타일의 일종인 소프트웨어 개발 기법.
https://ko.wikipedia.org/wiki/%EB%A7%88%EC%9D%B4%ED%81%AC%EB%A1%9C%EC%84%9C%EB%B9%84%EC%8A%A4

<h4>참고 자료</h4>
https://www.redhat.com/ko/topics/cloud-computing/what-is-hybrid-cloud
https://aws.amazon.com/ko/what-is-cloud-computing/?nc1=f_cc
Maarten van Steen, Andrew S. Tanenbaum, 「Distributed System」
장현정, 「오픈스택을 다루는 기술」
Rosenberg, Jonathan B, 「클라우드 세상 속으로」
https://ko.wikipedia.org/wiki/%EA%B0%80%EC%83%81%ED%99%94
https://cloud.google.com/containers/?authuser=0&hl=ko
http://www.itworld.co.kr/news/109679
https://ko.wikipedia.org/wiki/%EB%A7%88%EC%9D%B4%ED%81%AC%EB%A1%9C%EC%84%9C%EB%B9%84%EC%8A%A4
