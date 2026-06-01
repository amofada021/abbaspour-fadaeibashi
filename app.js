import { initializeApp }
from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";

import {

  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword

}
from "https://www.gstatic.com/firebasejs/12.14.0/firebase-auth.js";

import {

  getFirestore,
  doc,
  setDoc,
  getDocs,
  collection

}
from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

const firebaseConfig = {

  apiKey: "AIzaSyDwRmPafLDyWGtP8BZrJqEgl8DEB4NsdQg",

  authDomain:
  "abbaspour-fadaeibashi.firebaseapp.com",

  projectId:
  "abbaspour-fadaeibashi",

  storageBucket:
  "abbaspour-fadaeibashi.firebasestorage.app",

  messagingSenderId:
  "243435480318",

  appId:
  "1:243435480318:web:ccd54c5cb45de708f471af"

};

const app =
initializeApp(firebaseConfig);

const auth =
getAuth(app);

const db =
getFirestore(app);

window.showRegister = function(){

  document.getElementById("formArea")
  .innerHTML = `

  <input
  type="text"
  id="username"
  placeholder="نام کاربری"
  >

  <input
  type="email"
  id="email"
  placeholder="ایمیل"
  >

  <input
  type="text"
  id="phone"
  placeholder="شماره تلفن"
  >

  <input
  type="password"
  id="password"
  placeholder="رمز عبور"
  >

  <button onclick="register()">
    ثبت نام
  </button>

  `;

}

window.showLogin = function(){

  document.getElementById("formArea")
  .innerHTML = `

  <input
  type="text"
  id="loginUsername"
  placeholder="نام کاربری"
  >

  <input
  type="password"
  id="loginPassword"
  placeholder="رمز عبور"
  >

  <button onclick="login()">
    ورود
  </button>

  `;

}

window.register = async function(){

  let username =
  document.getElementById("username").value;

  let email =
  document.getElementById("email").value;

  let phone =
  document.getElementById("phone").value;

  let password =
  document.getElementById("password").value;

  let message =
  document.getElementById("message");

  if(
    username === "" ||
    email === "" ||
    phone === "" ||
    password === ""
  ){

    message.innerHTML =
    "تمام فیلدها الزامی هستند";

    return;

  }

  try{

    const userCredential =
    await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await setDoc(
      doc(
        db,
        "students",
        userCredential.user.uid
      ),
      {

        username: username,
        email: email,
        phone: phone

      }
    );

    localStorage.setItem(
      "username",
      username
    );

    showDashboard();

  }

  catch(error){

    message.innerHTML =
    error.message;

  }

}

window.login = async function(){

  let username =
  document.getElementById("loginUsername").value;

  let password =
  document.getElementById("loginPassword").value;

  let message =
  document.getElementById("message");

  try{

    const querySnapshot =
    await getDocs(
      collection(db, "students")
    );

    let foundEmail = "";

    querySnapshot.forEach((doc) => {

      if(
        doc.data().username === username
      ){

        foundEmail =
        doc.data().email;

      }

    });

    if(foundEmail === ""){

      message.innerHTML =
      "نام کاربری یافت نشد";

      return;

    }

    await signInWithEmailAndPassword(
      auth,
      foundEmail,
      password
    );

    localStorage.setItem(
      "username",
      username
    );

    showDashboard();

  }

  catch(error){

    message.innerHTML =
    "رمز عبور اشتباه است";

  }

}

function showDashboard(){

  let username =
  localStorage.getItem("username");

  document.body.innerHTML = `

  <div class="container">

    <h1>
      خوش آمدی ${username}
    </h1>

    <p style="
    text-align:center;
    margin-bottom:20px;
    ">

      برنامه امتحانی پایان ترم شما
      به شرح ذیل است

    </p>

    <img
    src="./exam.jpg"
    style="
    width:100%;
    border-radius:15px;
    ">

  </div>

  `;

}
