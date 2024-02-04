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

function emailReg(text) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return re.test(String(text).toLowerCase());
}

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

  if (emailReg(userEmail.value) && pwReg(userPassword.value)) {
    if (userEmail.value === user.id && userPassword.value === user.pw) {
      loginSuccess();
    } else {
      alert(
        " 아이디 또는 비밀번호를 잘못 입력했습니다. 입력하신 내용을 다시 확인해주세요."
      );
    }
  }
}

const loginSuccess = () => (location.href = "welcome.html");

// 이벤트 핸들러

userEmail.addEventListener("input", handleCheckEmail);
userPassword.addEventListener("input", handleCheckPassword);
loginSubmit.addEventListener("click", handleSubmit);
