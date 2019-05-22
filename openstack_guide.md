<h3>오픈스택 설치 가이드</h3>  
※ 우리 프로젝트를 기준으로 작성하였다.  
※ openstack 공식 설치 가이드를 기준으로 하되, 겪은 시행착오와 Tip, 설치 구성 요소의 의미를 중심으로 작성하였다.  
※ Ubuntu 18.04 server LTS, openstack rocky 버전을 사용함.
(https://docs.openstack.org/keystone/rocky/install/keystone-install-ubuntu.html)    

<h4>PREREQUISITES</h4>
<h5>Host networking</h5>
노드마다 네트워크 인터페이스를 설정하고 노드의 privateIP주소에 hostname을 등록하는 과정
https://docs.openstack.org/install-guide/environment-networking.html
※Configure network interface 키워드 의미
https://unix.stackexchange.com/questions/128439/good-detailed-explanation-of-etc-network-interfaces-syntax

<h5>NTP</h5>
노드간 synchronization을 위한 과정
controller 노드는 정확한 time server를 reference하고, 
그 외 노드들이 controller 노드를 reference 하도록 설정한다.
https://docs.openstack.org/install-guide/environment-ntp.html





<h4>KEYSTONE</h4>  
Keystone은 openstack 서비스를 이용하기 위한 인증과 관리 등을 제공하는 서비스이다.  
※Swift만 사용하는 경우, Swift는 TempAuth를 제공하여 독자적인 서비스가 가능하기 때문에 굳이 설치하지 않아도 상관없다.  





<h4>linux command</h4>

파일시스템확인
df -T

설치된 패키지 리스트
apt list --installed


<h2>openstack setting guide</h2>
ec2 인스턴스에 파일시스템 추가방법
새로운 EBS를 인스턴스에 추가하고 연결 > 해당 EBS 파일시스템 설정 > 인스턴스와 EBS 마운트 > /etc/fstab 설정에 디바이스 등록해서 재부팅할 때마다 연결된 EBS 볼륨을 탑재하도록 함

<h2>conf 링크 주소</h2>
>> vim /etc/swift/account, container, object-server.conf >>
https://opendev.org/openstack/swift/raw/branch/stable/rocky/etc/account-server.conf-sample
https://opendev.org/openstack/swift/raw/branch/stable/rocky/etc/container-server.conf-sample
https://opendev.org/openstack/swift/raw/branch/stable/rocky/etc/object-server.conf-sample

>>  /etc/swift/swift.conf >> 
https://opendev.org/openstack/swift/raw/branch/stable/rocky/etc/swift.conf-sample

>> /etc/swift/proxy-server.conf >>
https://opendev.org/openstack/swift/raw/branch/stable/rocky/etc/proxy-server.conf-sample


ec2 인스턴스간 통신 > 각각의 인스턴스가 포함된 보안그룹의 인바운드 규칙 수정 > 모든icmp ipv4 > 통신을 원하는 인스턴스가 속한 보안 그룹 추가 ( 두 인스턴스가 같은 보안 그룹에 속해있는 경우 인바운드 규칙에 해당 보안 그룹을 포함해주어야 통신 가능 > ping 확인


ls -l 파일 권한 정보
https://conory.com/blog/19194

<scp를 이용한 인스턴스간 파일 전송>

scp -i pem파일(디렉토리 포함) / 전송할 파일 / 원격지 유저이름@ip주소(public):~/저장위치
(-i 옵션: Specifies an alternate identification file to use for public key authentication. )
(https://stackoverflow.com/questions/11388014/using-scp-to-copy-a-file-to-amazon-ec2-instance)

>>원격지의 다운로드 위치의 소유자와 유저이름이 일치해야 함 > chown 
>>permission denied > 디렉토리 권한 확인 ex)700?????

