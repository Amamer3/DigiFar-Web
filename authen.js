// Your Firebase config
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyASR5sSx3R4qQVqV9PHOwWMlUmD8seBwjg",
  authDomain: "digifarweb.firebaseapp.com",
  projectId: "digifarweb",
  storageBucket: "digifarweb.appspot.com",
  messagingSenderId: "941696375364",
  appId: "1:941696375364:web:ad91dc42dacf7092dd3a11"
};

// Initialize Firebase
//const app = initializeApp(firebaseConfig);
//firebase.initializeApp(firebaseConfig);
//const auth = firebase.auth();
//const db = firebase.firestore(); // Initialize Firestore

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


// Signup logic
document.addEventListener('DOMContentLoaded', () => {
    const signupBtn = document.getElementById('signup-btn');
    
signupBtn.addEventListener('click', () => {
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const userName = document.getElementById('signup-username').value;

    auth.createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
            const user = userCredential.user;

            // Store user data in Firestore
            return db.collection('users').doc(user.uid).set({
                uid: user.uid,
                email: user.email,
                displayName: userName,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            }).then(() => {
                // Update user's displayName in Firebase Auth profile
                return user.updateProfile({
                    displayName: userName
                });
            });
        })
        .then(() => {
            // Show success message
            alert('Account successfully created!');
            
            // Redirect to loggedin.html after successful signup
            window.location.href = 'loggedin.html';
        })
        .catch(error => {
            // Show error message
            alert('Error creating account: ' + error.message);
        });
})});

// Get popup elements
const successPopup = document.getElementById('success-popup');
const successPopupClose = document.getElementById('success-popup-close');
const errorPopup = document.getElementById('error-popup');
const errorPopupClose = document.getElementById('error-popup-close');
const errorMessage = document.getElementById('error-message');

// Close popups when the close buttons are clicked
successPopupClose.addEventListener('click', () => {
    successPopup.style.display = 'none';
});

errorPopupClose.addEventListener('click', () => {
    errorPopup.style.display = 'none';
});




// Signup logic

signupBtn.addEventListener('click', () => {
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const userName = document.getElementById('signup-username').value;
   

    auth.createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
            const user = userCredential.user;

            // Store user data in Firestore
            return db.collection('users').doc(user.uid).set({
                uid: user.uid,
                email: user.email,
                displayName: userName,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            }).then(() => {
                // Update user's displayName in Firebase Auth profile
                return user.updateProfile({
                    displayName: userName
                });
            });
        })
        .then(() => {
            // Show success popup
            successPopup.style.display = 'flex';
            
            // Redirect to loggedin.html after a short delay
            setTimeout(() => {
                window.location.href = 'loggedin.html';
            }, 2000);
        })
        .catch(error => {
            // Show error popup and display the error message
            errorMessage.textContent = 'Error creating account: ' + error.message;
            errorPopup.style.display = 'flex';
        });
});
















  // Initialize Firebase
//   firebase.initializeApp(firebaseConfig);
//   const auth = firebase.auth();


// Signup logic
// signupBtn.addEventListener('click', () => {
//     const email = document.getElementById('signup-email').value;
//     const password = document.getElementById('signup-password').value;
//     const userName = document.getElementById('signup-username').value;

//     auth.createUserWithEmailAndPassword(email, password)
//         .then(userCredential => {
//             const user = userCredential.user;

//             // Store user data in Firestore
//             return db.collection('users').doc(user.uid).set({
//                 uid: user.uid,
//                 email: user.email,
//                 displayName: userName,
//                 createdAt: firebase.firestore.FieldValue.serverTimestamp()
//             }).then(() => {
//                 // Update user's displayName in Firebase Auth profile
//                 return user.updateProfile({
//                     displayName: userName
//                 });
//             });
//         })
//         .then(() => {
//             // Redirect to loggedin.html after successful signup
//             window.location.href = 'loggedin.html';
//         })
//         .catch(error => {
//             signupErrorMessage.textContent = error.message;
//         });
// });

// // Login logic
// loginBtn.addEventListener('click', () => {
//     const email = document.getElementById('login-email').value;
//     const password = document.getElementById('login-password').value;

//     auth.signInWithEmailAndPassword(email, password)
//         .then(userCredential => {
//             const user = userCredential.user;

//             // Redirect to loggedin.html after successful login
//             window.location.href = 'loggedin.html';
//         })
//         .catch(error => {
//             loginErrorMessage.textContent = error.message;
//         });
// });

// // Logout logic
// logoutBtn.addEventListener('click', () => {
//     auth.signOut().then(() => {
//         console.log('User logged out');
//         window.location.href = 'index.html';  // Redirect back to the login page after logout
//     }).catch(error => {
//         console.error('Logout Error:', error);
//     });
// });

// // Auth state observer
// auth.onAuthStateChanged(user => {
//     if (user) {
//         // If user is authenticated, redirect them to loggedin.html
//         window.location.href = 'loggedin.html';
//     }
// });












////This is different from te one above


///////

// References to DOM elements
// const loginBtn = document.getElementById('login-btn');
// const signupBtn = document.getElementById('signup-btn');
// const logoutBtn = document.getElementById('logout-btn');
// const loginSection = document.getElementById('login-section');
// const signupSection = document.getElementById('signup-section');
// const welcomeSection = document.getElementById('log');
// const userNameSpan = document.getElementById('user-name');
// const signupErrorMessage = document.getElementById('signup-error-message');
// const loginErrorMessage = document.getElementById('login-error-message');

// // Signup logic
// // Signup logic with Firestore user data storage
// signupBtn.addEventListener('click', () => {
//     const email = document.getElementById('signup-email').value;
//     const password = document.getElementById('signup-password').value;
//     const userName = document.getElementById('signup-username').value;

//     auth.createUserWithEmailAndPassword(email, password)
//         .then(userCredential => {
//             const user = userCredential.user;

//             // Store additional user data in Firestore
//             return db.collection('users').doc(user.uid).set({
//                 uid: user.uid,
//                 email: user.email,
//                 displayName: userName,
//                 createdAt: firebase.firestore.FieldValue.serverTimestamp()
//             }).then(() => {
//                 // Optionally, update the displayName in the Firebase Authentication profile
//                 return user.updateProfile({
//                     displayName: userName
//                 });
//             });
//         })
//         .then(() => {
//             console.log('User signed up and data stored in Firestore.');
//         })
//         .catch(error => {
//             signupErrorMessage.textContent = error.message;
//         });
// });

// // Login logic
// loginBtn.addEventListener('click', () => {
//     const email = document.getElementById('login-email').value;
//     const password = document.getElementById('login-password').value;

//     auth.signInWithEmailAndPassword(email, password)
//         .then(userCredential => {
//             const user = userCredential.user;
//             console.log('User logged in:', user);
//         })
//         .catch(error => {
//             loginErrorMessage.textContent = error.message;
//         });
// });

// // Logout logic
// logoutBtn.addEventListener('click', () => {
//     auth.signOut().then(() => {
//         console.log('User logged out');
//     }).catch(error => {
//         console.error('Logout Error:', error);
//     });
// });

// // Auth state observer
// auth.onAuthStateChanged(user => {
//     if (user) {
//         // Fetch additional user data from Firestore
//         db.collection('users').doc(user.uid).get().then(doc => {
//             if (doc.exists) {
//                 const userData = doc.data();
//                 userNameSpan.textContent = userData.displayName || user.email;
//             }
//         }).catch(error => {
//             console.error('Error fetching user data:', error);
//         });

//         loginSection.style.display = 'none';
//         signupSection.style.display = 'none';
//         welcomeSection.style.display = 'block';
//     } else {
//         loginSection.style.display = 'block';
//         signupSection.style.display = 'block';
//         welcomeSection.style.display = 'none';
//     }
// });
