// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js"

const firebaseConfig = {
    apiKey: "AIzaSyARo0rthUzXqiHuHBzfrkZpriabCQEIzvM",
    authDomain: "auth-test-f09d6.firebaseapp.com",
    projectId: "auth-test-f09d6",
    storageBucket: "auth-test-f09d6.appspot.com",
    messagingSenderId: "29299407975",
    appId: "1:29299407975:web:0620f7cae1cd3b5816a8c2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth=getAuth();
  const db=getFirestore();

//   onAuthStateChanged(auth, (user)=>{
//     const loggedInUserId=localStorage.getItem('loggedInUserId');
//     if(loggedInUserId){
//         console.log(user);
//         const docRef = doc(db, "users", loggedInUserId);
//         getDoc(docRef)
//         .then((docSnap)=>{
//             if(docSnap.exists()){
//                 const userData=docSnap.data();
//                 document.getElementById('loggedUserFName').innerText=userData.firstName;
//                 document.getElementById('loggedUserEmail').innerText=userData.email;
//                 document.getElementById('loggedUserLName').innerText=userData.lastName;

//             }
//             else{
//                 console.log("no document found matching id")
//             }
//         })
//         .catch((error)=>{
//             console.log("Error getting document");
//         })
//     }
//     else{
//         console.log("User Id not Found in Local storage")
//     }
//   })

  const logoutButton=document.getElementById('logout');

  logoutButton.addEventListener('click',()=>{
    localStorage.removeItem('loggedInUserId');
    signOut(auth)
    .then(()=>{
        window.location.href='home-two.html';
    })
    .catch((error)=>{
        console.error('Error Signing out:', error);
    })
  })