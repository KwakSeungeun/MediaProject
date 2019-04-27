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
