<h2>linux command</h2>

파일시스템확인
df -T

설치된 패키지 리스트
apt list --installed


<h2>openstack setting guide</h2>
ec2 인스턴스에 파일시스템 추가방법
새로운 EBS를 인스턴스에 추가하고 연결 > 해당 EBS 파일시스템 설정 > 인스턴스와 EBS 마운트 > /etc/fstab 설정에 디바이스 등록해서 재부팅할 때마다 연결된 EBS 볼륨을 탑재하도록 함

>> vim /etc/swift/account, container, object-server.conf >> 설정 링크 주소 변경

https://opendev.org/openstack/swift/raw/branch/stable/rocky/etc/account-server.conf-sample
https://opendev.org/openstack/swift/raw/branch/stable/rocky/etc/container-server.conf-sample
https://opendev.org/openstack/swift/raw/branch/stable/rocky/etc/object-server.conf-sample


ec2 인스턴스간 통신 > 각각의 인스턴스가 포함된 보안그룹의 인바운드 규칙 수정 > 모든icmp ipv4 > 통신을 원하는 인스턴스가 속한 보안 그룹 추가 ( 두 인스턴스가 같은 보안 그룹에 속해있는 경우 인바운드 규칙에 해당 보안 그룹을 포함해주어야 통신 가능 > ping 확인


ls -l 파일 권한 정보
https://conory.com/blog/19194

<scp를 이용한 인스턴스간 파일 전송>

scp -i pem파일(디렉토리 포함) / 전송할 파일 / 원격지 유저이름@ip주소(public):~/저장위치
(-i 옵션: Specifies an alternate identification file to use for public key authentication. )
(https://stackoverflow.com/questions/11388014/using-scp-to-copy-a-file-to-amazon-ec2-instance)

>>원격지의 다운로드 위치의 소유자와 유저이름이 일치해야 함 > chown 
>>permission denied > 디렉토리 권한 확인 ex)700?????

>>  /etc/swift/swift.conf >> 설정 링크 주소 변경
https://opendev.org/openstack/swift/raw/branch/stable/rocky/etc/swift.conf-sample
