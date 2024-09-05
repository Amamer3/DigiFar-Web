// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAuth, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
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

const auth = getAuth(app);

// function showMessage(message, divId) {
//     var messageDiv = document.getElementById(divId);
//     messageDiv.style.display = "block";
//     messageDiv.innerHTML = message;
//     messageDiv.style.opacity = 1;
//     setTimeout(function () {
//         messageDiv.style.opacity = 0;
//     }, 5000);
// }


// document.addEventListener('DOMContentLoaded', () => {
//     const signUp = document.getElementById('submitSignUp');
//     if (signUp) {
//         signUp.addEventListener('click', (event) => {
//             // rest of your JavaScript code


//             const email = document.getElementById('rEmail').value;
//             const password = document.getElementById('rPassword').value;
//             const firstName = document.getElementById('fName').value;
//             const lastName = document.getElementById('lName').value;

//             const auth = getAuth();
//             const db = getFirestore();

//             createUserWithEmailAndPassword(auth, email, password)
//                 .then((userCredential) => {
//                     const user = userCredential.user;
//                     const userData = {
//                         email: email,
//                         firstName: firstName,
//                         lastName: lastName
//                     };
//                     showMessage('Account Created Successfully', 'signUpMessage');
//                     const docRef = doc(db, "users", user.uid);
//                     setDoc(docRef, userData)
//                         .then(() => {
//                             window.location.href = 'home-two.html';
//                         })
//                         .catch((error) => {
//                             console.error("error writing document", error);

//                         });
//                 })
//                 .catch((error) => {
//                     const errorCode = error.code;
//                     if (errorCode == 'auth/email-already-in-use') {
//                         showMessage('Email Address Already Exists !!!', 'signUpMessage');
//                     }
//                     else {
//                         showMessage('unable to create User', 'signUpMessage');
//                     }
//                 })





//         });
//     }
// });


//  const signUp=document.getElementById('DOMContentLoaded','submitSignUp');
//  signUp.addEventListener('click', (event)=>{
//     // event.preventDefault();
//     const email=document.getElementById('rEmail').value;
//     const password=document.getElementById('rPassword').value;
//     const firstName=document.getElementById('fName').value;
//     const lastName=document.getElementById('lName').value;

//     const auth=getAuth();
//     const db=getFirestore();

//     createUserWithEmailAndPassword(auth, email, password)
//     .then((userCredential)=>{
//         const user=userCredential.user;
//         const userData={
//             email: email,
//             firstName: firstName,
//             lastName:lastName
//         };
//         showMessage('Account Created Successfully', 'signUpMessage');
//         const docRef=doc(db, "users", user.uid);
//         setDoc(docRef,userData)
//         .then(()=>{
//             window.location.href='home-two.html';
//         })
//         .catch((error)=>{
//             console.error("error writing document", error);

//         });
//     })
//     .catch((error)=>{
//         const errorCode=error.code;
//         if(errorCode=='auth/email-already-in-use'){
//             showMessage('Email Address Already Exists !!!', 'signUpMessage');
//         }
//         else{
//             showMessage('unable to create User', 'signUpMessage');
//         }
//     })
//  });





// const signIn = document.getElementById('submitSignIn');
// signIn.addEventListener('DOMContentLoaded','click', (event) => {
//     event.preventDefault();
//     const email = document.getElementById('email').value;
//     const password = document.getElementById('password').value;
//     const auth = getAuth();

//     signInWithEmailAndPassword(auth, email, password)
//         .then((userCredential) => {
//             showMessage('login is successful', 'signInMessage');
//             const user = userCredential.user;
//             localStorage.setItem('loggedInUserId', user.uid);
//             window.location.href = 'loggedin.html';
//         })
//         .catch((error) => {
//             const errorCode = error.code;
//             if (errorCode === 'auth/invalid-credential') {
//                 showMessage('Incorrect Email or Password', 'signInMessage');
//             }
//             else {
//                 showMessage('Account does not Exist', 'signInMessage');
//             }
//         })
// })

document.addEventListener('DOMContentLoaded', () => {
    // Signup event listener
    const signUp = document.getElementById('submitSignUp');
    if (signUp) {
        signUp.addEventListener('click', (event) => {
            event.preventDefault();
            const email = document.getElementById('rEmail').value;
            const password = document.getElementById('rPassword').value;
            const firstName = document.getElementById('fName').value;
            const lastName = document.getElementById('lName').value;

            const auth = getAuth();
            const db = getFirestore();

            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    const userData = {
                        email: email,
                        firstName: firstName,
                        lastName: lastName
                    };
                    showMessage('Account Created Successfully', 'signUpMessage');
                    const docRef = doc(db, "users", user.uid);
                    setDoc(docRef, userData)
                        .then(() => {
                            window.location.href = 'login.html';
                        })
                        .catch((error) => {
                            console.error("Error writing document", error);
                        });
                })
                .catch((error) => {
                    const errorCode = error.code;
                    if (errorCode === 'auth/email-already-in-use') {
                        showMessage('Email Address Already Exists !!!', 'signUpMessage');
                    } else {
                        showMessage('Unable to create user', 'signUpMessage');
                    }
                });
        });
    }

    // Signin event listener
    const signIn = document.getElementById('submitSignIn');
    if (signIn) {
        signIn.addEventListener('click', (event) => {
            event.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const auth = getAuth();

            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    showMessage('Login is successful', 'signInMessage');
                    const user = userCredential.user;
                    localStorage.setItem('loggedInUserId', user.uid);
                    window.location.href = 'loggedin.html';
                })
                .catch((error) => {
                    const errorCode = error.code;
                    if (errorCode === 'auth/invalid-credential') {
                        showMessage('Incorrect Email or Password', 'signInMessage');
                    } else {
                        showMessage('Account does not exist', 'signInMessage');
                    }
                });
        });
    }
});

// Function to display messages
function showMessage(message, divId) {
    const messageDiv = document.getElementById(divId);
    if (messageDiv) {
        messageDiv.style.display = "block";
        messageDiv.innerHTML = message;
        messageDiv.style.opacity = 1;
        setTimeout(() => {
            messageDiv.style.opacity = 0;
        }, 5000);
    }
}

// document.addEventListener('DOMContentLoaded', () => {
//     const logoutButton = document.getElementById('logoutButton'); // Make sure you have a logout button with this ID

//     if (logoutButton) {
//         logoutButton.addEventListener('click', (event) => {
//             event.preventDefault();
//             const auth = getAuth();

//             signOut(auth)
//                 .then(() => {
//                     // Clear local storage if you stored any user info
//                     localStorage.removeItem('loggedInUserId');
//                     // Optionally, you can redirect the user to the login page after logout
//                     window.location.href = 'login.html';
//                 })
//                 .catch((error) => {
//                     console.error("Error signing out: ", error);
//                     showMessage('Error signing out. Please try again.', 'logoutMessage');
//                 });
//         });
//     }
// });


// Logout functionality



const logoutButton = document.getElementById('logoutButton');
if (logoutButton) {
  logoutButton.addEventListener('click', (event) => {
    event.preventDefault();

    signOut(auth)
      .then(() => {
        localStorage.removeItem('loggedInUserId');
        showMessage('You have been logged out successfully.', 'logoutMessage');
        window.location.href = 'login.html';
      })
      .catch((error) => {
        console.error("Error signing out: ", error);
        showMessage('Error signing out. Please try again.', 'logoutMessage');
      });
  });
}

// logoutButton.addEventListener('click',()=>{
//     localStorage.removeItem('loggedInUserId');
//     signOut(auth)
//     .then(()=>{
//         window.location.href='index.html';
//     })
//     .catch((error)=>{
//         console.error('Error Signing out:', error);
//     })
//   })