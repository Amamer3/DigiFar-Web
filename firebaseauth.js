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

const db = getFirestore(app);




function setTokenCookie(token) {
    document.cookie = `authToken=${token}; path=/; secure; HttpOnly`;
}

// Function to clear cookie (used for logout)
function clearTokenCookie() {
    document.cookie = `authToken=; Max-Age=0; path=/; secure; HttpOnly`;
}

// Function to display messages
function showMessage(message, divId) {
    var messageDiv = document.getElementById(divId);
    messageDiv.style.display = "block";
    messageDiv.innerHTML = message;
    messageDiv.style.opacity = 1;
    setTimeout(function () {
        messageDiv.style.opacity = 0;
    }, 5000);
}

// Sign-Up Logic
document.getElementById('submitSignUp').addEventListener('click', (event) => {
    event.preventDefault();

    const email = document.getElementById('rEmail').value;
    const password = document.getElementById('rPassword').value;
    const firstName = document.getElementById('fName').value;
    const lastName = document.getElementById('lName').value;

    createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            const user = userCredential.user;

            // Store user data in Firestore
            const userData = {
                email: email,
                firstName: firstName,
                lastName: lastName
            };
            await setDoc(doc(db, "users", user.uid), userData);

            // Get JWT token and store in cookie
            const token = await user.getIdToken();
            setTokenCookie(token);

            showMessage('Account Created Successfully', 'signUpMessage');
            window.location.href = 'index.html';
        })
        .catch((error) => {
            const errorCode = error.code;
            if (errorCode === 'auth/email-already-in-use') {
                showMessage('Email Address Already Exists !!!', 'signUpMessage');
            } else {
                showMessage('Unable to create User', 'signUpMessage');
            }
        });
});

// Sign-In Logic
document.getElementById('submitSignIn').addEventListener('click', (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            const user = userCredential.user;

            // Get JWT token and store in cookie
            const token = await user.getIdToken();
            setTokenCookie(token);

            showMessage('Login is successful', 'signInMessage');
            window.location.href = 'loggedin.html';
        })
        .catch((error) => {
            const errorCode = error.code;
            if (errorCode === 'auth/wrong-password' || errorCode === 'auth/user-not-found') {
                showMessage('Incorrect Email or Password', 'signInMessage');
            } else {
                showMessage('Account does not exist', 'signInMessage');
            }
        });
});

// Logout Logic
document.getElementById('logoutButton').addEventListener('click', () => {
    signOut(auth).then(() => {
        clearTokenCookie(); // Clear the token cookie
        showMessage('Logout successful', 'logoutMessage');
        window.location.href = 'index.html'; // Redirect to homepage or login page
    }).catch((error) => {
        console.error('Error during logout', error);
        showMessage('Logout failed', 'logoutMessage');
    });
});



// document.addEventListener('DOMContentLoaded', () => {
//     // Signup event listener
//     const signUp = document.getElementById('submitSignUp');
//     if (signUp) {
//         signUp.addEventListener('click', (event) => {
//             event.preventDefault();
//             const email = document.getElementById('rEmail').value;
//             const password = document.getElementById('rPassword').value;
//             const firstName = document.getElementById('fName').value;
//             const lastName = document.getElementById('lName').value;

//             const auth = getAuth();
//             // const db = getFirestore();

//             createUserWithEmailAndPassword(auth, email, password)
//                 .then( async (userCredential) => {
//                     const user = userCredential.user;

//                     // Store user data in Firestore
//                     const userData = {
//                         email: email,
//                         firstName: firstName,
//                         lastName: lastName
//                     };
//                     showMessage('Account Created Successfully', 'signUpMessage');
//                     const docRef = doc(db, "users", user.uid);
//                     setDoc(docRef, userData)
//                         .then(() => {
//                             window.location.href = 'login.html';
//                         })
//                         .catch((error) => {
//                             console.error("Error writing document", error);
//                         });
//                 })
//                 .catch((error) => {
//                     const errorCode = error.code;
//                     if (errorCode === 'auth/email-already-in-use') {
//                         showMessage('Email Address Already Exists !!!', 'signUpMessage');
//                     } else {
//                         showMessage('Unable to create user', 'signUpMessage');
//                     }
//                 });
//         });
//     }

//     // Signin event listener
//     const signIn = document.getElementById('submitSignIn');
//     if (signIn) {
//         signIn.addEventListener('click', (event) => {
//             event.preventDefault();
//             const email = document.getElementById('email').value;
//             const password = document.getElementById('password').value;
//             const auth = getAuth();

//             signInWithEmailAndPassword(auth, email, password)
//                 .then((userCredential) => {
//                     showMessage('Login is successful', 'signInMessage');
//                     const user = userCredential.user;
//                     localStorage.setItem('loggedInUserId', user.uid);
//                     window.location.href = 'loggedin.html';
//                 })
//                 .catch((error) => {
//                     const errorCode = error.code;
//                     if (errorCode === 'auth/invalid-credential') {
//                         showMessage('Incorrect Email or Password', 'signInMessage');
//                     } else {
//                         showMessage('Account does not exist', 'signInMessage');
//                     }
//                 });
//         });
//     }
// });

// // Function to display messages
// function showMessage(message, divId) {
//     const messageDiv = document.getElementById(divId);
//     if (messageDiv) {
//         messageDiv.style.display = "block";
//         messageDiv.innerHTML = message;
//         messageDiv.style.opacity = 1;
//         setTimeout(() => {
//             messageDiv.style.opacity = 0;
//         }, 5000);
//     }
// }




// // Logout functionality

// const logoutButton = document.getElementById('logoutButton');
// if (logoutButton) {
//   logoutButton.addEventListener('click', (event) => {
//     event.preventDefault();

//     signOut(auth)
//       .then(() => {
//         localStorage.removeItem('loggedInUserId');
//         showMessage('You have been logged out successfully.', 'logoutMessage');
//         window.location.href = 'login.html';
//       })
//       .catch((error) => {
//         console.error("Error signing out: ", error);
//         showMessage('Error signing out. Please try again.', 'logoutMessage');
//       });
//   });
// }

// // Function to set JWT token as a cookie
// function setTokenCookie(token) {
//     document.cookie = `authToken=${token}; path=/; secure; HttpOnly`;
// }

// // Function to clear cookie (used for logout)
// function clearTokenCookie() {
//     document.cookie = `authToken=; Max-Age=0; path=/; secure; HttpOnly`;
// }


