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
  getDoc

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

window.register = async function(){

  var fullname =
  document.getElementById("fullname").value;

  var email =
  document.getElementById("email").value;

  var phone =
  document.getElementById("phone").value;

  var password =
  document.getElementById("password").value;

  var message =
  document.getElementById("message");

  if(
    fullname === "" ||
    email === "" ||
    phone === "" ||
    password === ""
  ){

    message.innerHTML =
    "تمام فیلدها را پر کنید";

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

        fullname: fullname,
        email: email,
        phone: phone

      }
    );

    localStorage.setItem(
      "fullname",
      fullname
    );

    showDashboard();

  }

  catch(error){

    message.innerHTML =
    error.message;

  }

}

window.login = async function(){

  var email =
  document.getElementById("email").value;

  var password =
  document.getElementById("password").value;

  var message =
  document.getElementById("message");

  try{

    const userCredential =
    await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const docRef =
    doc(
      db,
      "students",
      userCredential.user.uid
    );

    const docSnap =
    await getDoc(docRef);

    localStorage.setItem(
      "fullname",
      docSnap.data().fullname
    );

    showDashboard();

  }

  catch(error){

    message.innerHTML =
    "ایمیل یا رمز اشتباه است";
	

  }

}

function showDashboard(){

  var fullname =
  localStorage.getItem("fullname");

  document.body.innerHTML = `

  <div class="container">

    <h1>
      خوش آمدی ${fullname}
    </h1>

    <p
    style="
    text-align:center;
    margin-bottom:20px;
    ">
      برنامه امتحانی پایان ترم شما
      به شرح ذیل است
    </p>

    <img
    src="exam.jpg"
    style="
    width:100%;
    border-radius:15px;
    ">

  </div>

  `;

}
