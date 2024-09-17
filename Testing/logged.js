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

  // Backupcode for Authentications
  // Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

document.addEventListener("DOMContentLoaded", () => {
    const auth = getAuth();

    const publicPages = [
        "/login.html", "/signup.html", "/index.html",
        "/about.html", "/services.html", "/contact-us.html"
    ];
    const protectedPages = [
        "/loggedin.html", "/About-us.html", "/feature.html",
        "/Contact.html", "/CCV.html"
    ];

    auth.onAuthStateChanged((user) => {
        const currentPage = window.location.pathname;

        if (user) {
            startSessionTimer();  // Start session timer for logged-in users

            console.log("User is signed in:", user.email);
            if (publicPages.includes(currentPage)) {
                window.location.href = protectedPages[0]; // Redirect to protected page
            }
        } else {
            console.log("No user is signed in");
            if (protectedPages.includes(currentPage)) {
                window.location.href = "/index.html";  // Redirect to login
            }
        }
    });
});

// Signup event listener
const signUp = document.getElementById("submitSignUp");
if (signUp) {
    signUp.addEventListener("click", (event) => {
        event.preventDefault();

        const email = document.getElementById("rEmail").value;
        const password = document.getElementById("rPassword").value;
        const confirmPassword = document.getElementById("confirmPassword").value;
        const firstName = document.getElementById("fName").value;
        const lastName = document.getElementById("lName").value;

        if (password !== confirmPassword) {
            showMessage("Passwords do not match!", "errorMess");
            return;
        }

        const validatePassword = (password) => {
            const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
            return regex.test(password);
        };

        if (!validatePassword(password)) {
            showMessage(
                "Password must be at least 8 characters long, contain uppercase, lowercase, and a number.",
                "errorMess"
            );
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                const user = userCredential.user;

                const userData = { email, firstName, lastName };
                await setDoc(doc(db, "users", user.uid), userData);

                const token = await user.getIdToken();
                document.cookie = `authToken=${token}; path=/; max-age=3600; secure; SameSite=Strict; HttpOnly`;

                showMessage("Account Created Successfully", "signUpMessage");
                window.location.href = "login.html";
            })
            .catch((error) => {
                showMessage(getErrorMessage(error.code), "signUpMessage");
            });
    });
}

// Sign-in event listener
const signIn = document.getElementById("submitSignIn");
if (signIn) {
    signIn.addEventListener("click", (event) => {
        event.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        signInWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                const user = userCredential.user;

                const token = await user.getIdToken();
                document.cookie = `authToken=${token}; path=/; max-age=960; secure; SameSite=Strict; HttpOnly`;

                startSessionTimer();  // Start session timer after login
                showMessage("Login is successful", "signInMessage", "green");
                window.location.href = "loggedin.html"; // Redirect to protected page
            })
            .catch((error) => {
                showMessage(getErrorMessage(error.code), "signInMessage", "red");
            });
    });
}

// Logout functionality
const logoutButton = document.getElementById("logoutButton");
if (logoutButton) {
    logoutButton.addEventListener("click", (event) => {
        event.preventDefault();

        signOut(auth)
            .then(() => {
                clearTimeout(sessionTimeout); // Clear session timeout on manual logout
                document.cookie =
                    "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Strict; HttpOnly";
                showMessage("You have been logged out successfully.", "logoutMessage");
                window.location.href = "index.html";
                cleanupSessionListeners();  // Remove session event listeners
            })
            .catch((error) => {
                showMessage("Error signing out. Please try again.", "logoutMessage");
            });
    });
}

let sessionTimeout;
const SESSION_DURATION = 16 * 60 * 1000; // 16 minutes in milliseconds

// Start the session timer on login
function startSessionTimer() {
    resetSessionTimer(); // Reset the session timer when starting

    document.addEventListener("mousemove", resetSessionTimer);
    document.addEventListener("keypress", resetSessionTimer);

    sessionTimeout = setTimeout(() => {
        autoLogout(); // Log out after session duration
    }, SESSION_DURATION);
}

// Reset session timer on user activity
function resetSessionTimer() {
    clearTimeout(sessionTimeout);
    sessionTimeout = setTimeout(() => {
        autoLogout();
    }, SESSION_DURATION);
}

// Auto logout and redirect the user to the login page
function autoLogout() {
    console.log("Session expired. Logging out...");
    signOut(auth)
        .then(() => {
            document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Strict; HttpOnly";
            window.location.href = "index.html"; // Redirect to login page
            cleanupSessionListeners();  // Remove session event listeners
        })
        .catch((error) => {
            console.log("Error signing out:", error);
        });
}

// Cleanup event listeners when the session ends or on logout
function cleanupSessionListeners() {
    document.removeEventListener("mousemove", resetSessionTimer);
    document.removeEventListener("keypress", resetSessionTimer);
}

// Show Message Function
function showMessage(message, divId, color = 'black') {
    const messageDiv = document.getElementById(divId);
    if (messageDiv) {
        messageDiv.style.display = "block";
        messageDiv.innerHTML = message;
        messageDiv.style.color = color;
        setTimeout(() => {
            messageDiv.style.opacity = 0;
        }, 6000);
    }
}

// Error Handling Function
function getErrorMessage(errorCode) {
    switch (errorCode) {
        case "auth/wrong-password":
            return "The password is incorrect. Please try again.";
        case "auth/user-not-found":
            return "No user found with this email address.";
        case "auth/email-already-in-use":
            return "This email is already in use. Please log in.";
        case "auth/invalid-email":
            return "Please enter a valid email and password.";
        default:
            return "Please check your email and password.";
    }
}
