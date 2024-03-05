const user = {
  id: "naranim@naver.com",
  pw: "spdlqj123!",
};

/*

1. email 정규표현식을 사용한 validation
2. pw 정규표현식을 사용한 validation
3. 상태 변수 관리
4. 로그인 버튼을 클릭시 조건처리

*/

// querySelector
// 진혁멘토님: $idInput, $pwInput(요소 노드를 의미하는 $) 추천

const userEmail = document.querySelector("#userEmail");
const userPassword = document.querySelector("#userPassword");
const loginSubmit = document.querySelector(".btn-login");

// 상태 변수

let isInputValid = {
  email: false,
  password: false,
};

// email, pw 정규표현식을 사용한 validation

function handleCheckEmail() {
  if (emailReg(this.value)) {
    hideErrorMessage(userEmail);
    isInputValid.email = true;
  } else {
    showErrorMessage(userEmail);
    isInputValid.email = false;
  }
}

function handleCheckPassword() {
  if (pwReg(this.value)) {
    hideErrorMessage(userPassword);
    isInputValid.password = true;
  } else {
    showErrorMessage(userPassword);
    isInputValid.password = false;
  }
}

// @ 기호 포함, .이후 2글자 이상

function emailReg(text) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return re.test(String(text).toLowerCase());
}

// 최소 6글자 이상, 0~9이상 숫자 1개 이상, 특수기호 1개 이상 포함

function pwReg(text) {
  const re = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^*+=-]).{6,16}$/;
  return re.test(String(text).toLowerCase());
}

function showErrorMessage(element) {
  element.classList.add("is--invalid");
  if (element === userEmail) {
    isInputValid.email = false;
  } else {
    isInputValid.password = false;
  }
}

function hideErrorMessage(element) {
  element.classList.remove("is--invalid");
  if (element === userEmail) {
    isInputValid.email = true;
  } else {
    isInputValid.password = true;
  }
}

// 로그인 버튼 클릭시 조건처리

function handleSubmit(e) {
  e.preventDefault();

  if (!isInputValid.email) {
    showErrorMessage(userEmail);
  }

  if (!isInputValid.password) {
    showErrorMessage(userPassword);
  }

  // 서버와 통신을 할 때는 try...catch문 사용할 것
  // 상태관리 변수를 통해 조건처리 추가

  if (isInputValid.email && isInputValid.password) {
    if (userEmail.value === user.id && userPassword.value === user.pw) {
      loginSuccess();
    } else {
      alert(
        " 아이디 또는 비밀번호를 잘못 입력했습니다. 입력하신 내용을 다시 확인해주세요."
      );
    }
  }
}

const loginSuccess = () => (window.location.href = "welcome.html");

// 이벤트 핸들러

userEmail.addEventListener("input", handleCheckEmail);
userPassword.addEventListener("input", handleCheckPassword);
loginSubmit.addEventListener("click", handleSubmit);
