## 2차 세미나 과제

1. localhost:포트/test 의 url로 접속시 서버는 GET 메소드로 52.78.124.103:3456/homework/2nd 로 request를 보냅니다.
2. 이때 받은 response JSON object를 파싱해 시간값만 response하여 웹페이지에 띄웁니다. Content-Type은 자유입니다.
3. localhost:포트/info 의 url로 접속시 서버는 POST 메소드로 52.78.124.103:3456/homework/2nd 로 request를 보냅니다.
4. 이때 request를 보내는 body는 key값으로 name, phone을 가집니다. value는 자신의 이름과 휴대폰번호 ‘010-xxxx-xxxx’의 스트링입니다.
5. 이름과 휴대폰번호에 해당하는 데이터가 없으면 homework서버는 fail을 응답합니다.
6. 해당하는 데이터가 존재하면 console.log로 데이터를 확인 후 적절히 파싱하여 csv파일에 이름, 학교, 학과, 이메일, 해싱된 휴대폰번호를 저장합니다.
7. 저장성공을 알리는 메세지를 웹페이지에 띄웁니다.