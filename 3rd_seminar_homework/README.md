## 3차 세미나 과제

1. Express 프로젝트를 만들어주세요.
2. 아래와 같이 요청 시 parameter로 받은 이름, 나이값을 응답합니다.
	* URL : /homework/echo/:name/:age
	* Method : GET
3. 아래와 같이 요청 시 body로 받은 이름, 나이값을 응답합니다.
	* URL : /homework/echo
	* Method : POST
	* Body : name(string), age(int)
4. 아래와 같이 요청 시 Body로 받은 pwd를 해싱하여 CSV 파일에 이름, 해싱된 pwd, salt, age 를 저장하는 코드를 흐름제어 없이 작성해주세요.
	* URL : /homework/signupdemo
	* Method : POST
	* Body : name(string), pwd(string), age(int)
	* CSV파일을 read없이 바로 write하면 기존의 CSV를 덮어쓰기합니다. 기존의 CSV의 데이터가 날아가지 않게 작업해주세요!
5. 아래와 같이 요청 시 Body로 받은 pwd를 해싱하여 CSV 파일에 이름, 해싱된 pwd, salt, age 를 저장하는 코드를 async 모듈을 사용해 작성합니다.
	* URL : /flowcontrol/async
	* Method : POST
	* Body : name(string), pwd(string), age(int)
6. 아래와 같이 요청 시 Body로 받은 pwd를 해싱하여 CSV 파일에
이름, 해싱된 pwd, salt, age 를 저장하는 코드를 promise를 사용해 작성합니다.
	* URL : /flowcontrol/promise
	* Method : POST
	* Body : name(string), pwd(string), age(int)
7. 5와 6은 4와 동일한 코드를 async, promise를 사용해 재작성하시면 됩니다.
8. 이 프로젝트를 AWS EC2에 올려서 PM2를 사용해 구동해주세요.