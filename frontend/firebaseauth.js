// document.addEventListener('DOMContentLoaded', function () {

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


document.addEventListener('DOMContentLoaded', () => {
    // Initialize Firebase Authentication
    const auth = getAuth();

    // Define public and protected pages
    const publicPages = ['/login.html', '/signup.html', '/index.html','/about.html','/services.html','/contact-us.html'];
    const protectedPages = ['/loggedin.html','/About-us.html','/feature.html','/Contact.html','/CCV.html','/momo.html','/airtime-inter.html','/celtis.html','/airtime.html'];  // Add more protected pages here

    // Check user authentication status on page load
    auth.onAuthStateChanged((user) => {
        const currentPage = window.location.pathname;

        if (user) {
            // User is signed in
            console.log('User is signed in:', user.email);

            // Redirect logged-in users away from login or signup page to a protected page
            if (publicPages.includes(currentPage)) {
                window.location.href = protectedPages[0];  // Redirect to the first protected page (loggedin.html)
            }
        } else {
            // No user is signed in
            console.log('No user is signed in');

            // Redirect non-logged-in users trying to access protected pages to login page
            if (protectedPages.includes(currentPage)) {
                window.location.href = '/index.html';  // Redirect to login page
            }
        }
    });
});



// Signup event listener -----------------------------------------------------------------
const signUp = document.getElementById('submitSignUp');
if (signUp) {
  signUp.addEventListener('click', async (event) => {
    event.preventDefault();

    const email = document.getElementById('rEmail').value.trim();
    const password = document.getElementById('rPassword').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();
    const firstName = document.getElementById('fName').value.trim();
    const lastName = document.getElementById('lName').value.trim();

    // Check if any field is empty
    if (!email || !password || !confirmPassword || !firstName || !lastName) {
      showMessage('All fields are required!', 'errorMess', 'white');
      return;
    }

    // Password match validation
    if (password !== confirmPassword) {
      showMessage('Passwords does not match!', 'errorMess', '');
      return;
    }

    // Password complexity validation
    const validatePassword = (password) => {
      const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
      return regex.test(password);
    };

    if (!validatePassword(password)) {
      showMessage('Password must be at least 8 characters long, contain uppercase, lowercase, and a number.', 'errorMess', 'white');
      return;
    }

    try {
      // Send form data to the backend API
      const response = await fetch('http://localhost:3000/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: user.email,
          firstName: firstName,
          lastName: lastName,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        showMessage('Account Created Successfully', 'goodSign');
        window.location.href = 'login.html';  // Redirect to login page after successful signup
      } else {
        showMessage(result.error, 'signUpMessage');
      }
    } catch (error) {
      showMessage('An error occurred during signup. Please try again.', 'signUpMessage');
    }
  });
}




// Signup event listener -----------------------------------------------------------------
// const signUp = document.getElementById('submitSignUp');
// if (signUp) {
//   signUp.addEventListener('click', async (event) => {
//     event.preventDefault();

//     const email = document.getElementById('rEmail').value.trim();
//     const password = document.getElementById('rPassword').value.trim();
//     const firstName = document.getElementById('fName').value.trim();
//     const lastName = document.getElementById('lName').value.trim();

//     // Check if passwords match

//     try {
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;

//       // Call the function to add user to PostgreSQL
//       await addUserToPostgres(user.uid, email, firstName, lastName);

//       showMessage('Account Created Successfully', 'goodSign');
//       window.location.href = 'login.html';
//     } catch (error) {
//       showMessage(getErrorMessage(error.code), 'signUpMessage');
//     }
//   });
// }









// // Signup event listener -----------------------------------------------------------------
// const signUp = document.getElementById('submitSignUp');
// if (signUp) {
//     signUp.addEventListener('click', async (event) => {
//         event.preventDefault();

//         const email = document.getElementById('rEmail').value.trim();
//         const password = document.getElementById('rPassword').value.trim();
//         const confirmPassword = document.getElementById('confirmPassword').value.trim();
//         const firstName = document.getElementById('fName').value.trim();
//         const lastName = document.getElementById('lName').value.trim();

//         // Check if any field is empty
//         if (!email || !password || !confirmPassword || !firstName || !lastName) {
//             showMessage('All fields are required!', 'errorMess', "white");
//             return;
//         }

//         // Password match validation
//         if (password !== confirmPassword) {
//             showMessage('Passwords do not match!', 'errorMess', "");
//             return;
//         }

//         // Password complexity validation
//         const validatePassword = (password) => {
//             const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
//             return regex.test(password);
//         };

//         if (!validatePassword(password)) {
//             showMessage('Password must be at least 8 characters long, contain uppercase, lowercase, and a number.', 'errorMess', "white");
//             return;
//         }

//         try {
//             const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//             const user = userCredential.user;

//             const userData = {
//                 email: email,
//                 firstName: firstName,
//                 lastName: lastName,
//             };
//             await setDoc(doc(db, "users", user.uid), userData);

//             const token = await user.getIdToken();
//             document.cookie = `authToken=${token}; path=/; max-age=3600; secure; SameSite=Strict; HttpOnly`;

//             showMessage('Account Created Successfully', 'goodSign');
//             window.location.href = 'login.html';
//         } catch (error) {
//             showMessage(getErrorMessage(error.code), 'signUpMessage');
//         }
//     });
// }


// Signin event listener --------------------------------------------------------




//login logic
const signIn = document.getElementById('submitSignIn');
if (signIn) {
    signIn.addEventListener('click', (event) => {
        event.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        signInWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                const user = userCredential.user;

                const token = await user.getIdToken();
                document.cookie = `authToken=${token}; path=/; max-age=3600; secure; SameSite=Strict; HttpOnly`;

                // Display success message in green
                showMessage('Login is successful', 'goodSign', '');
                
                // Redirect to another page
                window.location.href = 'loggedin.html';
            })
            .catch((error) => {
                // Display error message in red
                showMessage(getErrorMessage(error.code), 'signInMessage', '');
            });
    });
}



// Autologout_Logic
document.addEventListener('DOMContentLoaded', async () => {
    const auth = getAuth();  // Make sure auth is initialized outside

    // Check user authentication status
    auth.onAuthStateChanged(async (user) => {
        if (user) {
            try {
                const tokenResult = await user.getIdTokenResult();
                const expirationTime = new Date(tokenResult.expirationTime).getTime();
                const currentTime = new Date().getTime();

                // Set auto logout timer based on token expiration
                const timeUntilExpiration = expirationTime - currentTime;

                // If the token is about to expire, log out the user automatically
                setTimeout(() => {
                    logoutUser();  // Call the logout function
                }, timeUntilExpiration);

            } catch (error) {
                console.error("Error retrieving token expiration time: ", error);
            }
        } else {
            console.log("No user is signed in.");
        }
    });

    // Logout function
    async function logoutUser() {
        try {
            await signOut(auth);  // Log out the user
            // Clear cookies or any session info
            document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            localStorage.removeItem('loggedInUserId');

            // Redirect to the login page or homepage
            window.location.href = 'login.html';
        } catch (error) {
            console.error("Error signing out: ", error);
        }
    }
});

// Manual Logout with Logout Button Logic
document.addEventListener("DOMContentLoaded", function () {
    const auth = getAuth();  // Ensure Firebase auth is initialized here

    // Get the logout button and message div
    const logoutButton = document.getElementById('logoutButton');
    const logoutMessage = document.getElementById('logoutMessage');

    if (!logoutButton) {
        console.log("Logout button not found.");
        return;  // Exit if the logout button is not available
    }

    // Add click event listener for the logout button
    logoutButton.addEventListener('click', function (event) {
        event.preventDefault();  // Prevent the default behavior of the button

        signOut(auth)
            .then(() => {
                // Clear cookies and local storage
                document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Strict; HttpOnly";
                localStorage.removeItem('loggedInUserId');

                // Show logout success message
                showMessage('You have been logged out successfully.', 'successgreet', 'green');

                // Redirect the user to the login page or homepage
                window.location.href = 'index.html';
            })
            .catch((error) => {
                // Handle any errors that occur during the sign-out process
                showMessage('Error signing out. Please try again.', 'logoutMessage', '');
                console.error('Logout error: ', error);
            });
    });
});

// Helper function to display messages
function showMessage(message, divId, color = 'black') {
    const messageDiv = document.getElementById(divId);
    if (messageDiv) {
        messageDiv.style.display = "block";
        messageDiv.innerHTML = message;
        messageDiv.style.color = color;
        messageDiv.style.opacity = 1;
        setTimeout(() => {
            messageDiv.style.opacity = 0;
        }, 5000);
    }
}




function getErrorMessage(errorCode) {
    switch (errorCode) {
        case 'auth/wrong-password':
            return 'The password is incorrect. Please try again.';
        case 'auth/user-not-found':
            return 'No user found with this email address.';
        case 'auth/email-already-in-use':
            return 'This email is already in use. Please use different credentials or log in.';
        case 'auth/invalid-email':
            return 'Please enter a valid email address.';
        default:
            return 'Please check your email and password.';
    }
}




