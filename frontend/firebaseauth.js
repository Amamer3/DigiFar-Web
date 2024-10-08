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
    signUp.addEventListener('click', (event) => {
        event.preventDefault();

        const email = document.getElementById('rEmail').value;
        const password = document.getElementById('rPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const firstName = document.getElementById('fName').value;
        const lastName = document.getElementById('lName').value;

        if (password !== confirmPassword) {
            showMessage('Passwords do not match!', 'errorMess');
            return;
        }

        const validatePassword = (password) => {
            const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
            return regex.test(password);
        };

        if (!validatePassword(password)) {
            showMessage('Password must be at least 8 characters long, contain uppercase, lowercase, and a number.', 'errorMess');
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                const user = userCredential.user;

                const userData = {
                    email: email,
                    firstName: firstName,
                    lastName: lastName,
                };
                await setDoc(doc(db, "users", user.uid), userData);

                const token = await user.getIdToken();
                document.cookie = `authToken=${token}; path=/; max-age=3600; secure; SameSite=Strict; HttpOnly`;

                showMessage('Account Created Successfully', 'goodSign');
                window.location.href = 'login.html';
            })
            .catch((error) => {
                showMessage(getErrorMessage(error.code), 'signUpMessage');
            });
    });
}

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
                showMessage('Login is successful', 'goodSign', 'green');
                
                // Redirect to another page
                window.location.href = 'loggedin.html';
            })
            .catch((error) => {
                // Display error message in red
                showMessage(getErrorMessage(error.code), 'signInMessage', 'red');
            });
    });
}



// Autologout Logic
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
                showMessage('Error signing out. Please try again.', 'logoutMessage', 'red');
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


// // Show Message Function
// function showMessage(message, divId) {
//     const messageDiv = document.getElementById(divId);
//     if (messageDiv) {
//         messageDiv.style.display = "block";
//         messageDiv.innerHTML = message;
//         messageDiv.style.opacity = 1;
//         setTimeout(() => {
//             messageDiv.style.opacity = 0;
//         }, 6000);
//     }
// }


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





// // Logout functionality
// const logoutButton = document.getElementById('logoutButton');
// if (logoutButton) {
//     logoutButton.addEventListener('click', (event) => {
//         event.preventDefault();

//         signOut(auth)
//             .then(() => {
//                 document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Strict; HttpOnly";
//                 localStorage.removeItem('loggedInUserId');

//                 showMessage('You have been logged out successfully.', 'logoutMessage');
//                 window.location.href = 'index.html';
//             })
//             .catch((error) => {
//                 showMessage('Error signing out. Please try again.', 'logoutMessage');
//             });
//     });
// }

// document.addEventListener("DOMContentLoaded", function () {
//     // Get the logout button and message div
//     const logoutButton = document.getElementById('logoutButton');
//     const logoutMessage = document.getElementById('logoutMessage');

//     // Ensure Firebase is properly initialized
//     if (!logoutButton) {
//         console.error("Logout button not found.");
//         return;
//     }

//     // Add click event listener for the logout button
//     logoutButton.addEventListener('click', function (event) {
//         event.preventDefault();  // Prevent the button's default behavior

//         // Sign out the user using Firebase
//         signOut(auth)
//             .then(() => {
//                 // Clear cookies and local storage
//                 document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Strict; HttpOnly";
//                 localStorage.removeItem('loggedInUserId');

//                 // Show logout success message
//                 logoutMessage.innerText = 'You have been logged out successfully.';
//                 logoutMessage.classList.add('success-message');  // Add any success message styles

//                 // Optionally, redirect the user to the login page or homepage
//                 window.location.href = 'index.html';
//             })
//             .catch((error) => {
//                 // Handle errors and display error message
//                 logoutMessage.innerText = 'Error signing out. Please try again.';
//                 logoutMessage.classList.add('error-message');  // Add error message styles
//                 console.error('Logout error: ', error);
//             });
//     });
// });




// // Show Message Function
// function showMessage(message, divId) {
//     const messageDiv = document.getElementById(divId);
//     if (messageDiv) {
//         messageDiv.style.display = "block";
//         messageDiv.innerHTML = message;
//         messageDiv.style.opacity = 1;
//         setTimeout(() => {
//             messageDiv.style.opacity = 0;
//         }, 6000);
//     }
// }

// Error Handling Function





// document.addEventListener('DOMContentLoaded', () => {
//     // Initialize Firebase Authentication
//     const auth = getAuth();

//     // Public pages that do not require authentication
//     const publicPages = ['/signup.html', '/login.html', '/index.html'];
    
//     // Check user authentication status on page load
//     auth.onAuthStateChanged((user) => {
//         const currentPage = window.location.pathname;

//         if (user) {
//             // User is signed in
//             console.log('User is signed in:', user.email);
            
//             // Redirect logged-in users away from login or signup page
//             if (publicPages.includes(currentPage)) {
//                 window.location.href = 'loggedin.html';
//             }
//         } else {
//             // No user is signed in
//             console.log('No user is signed in');

//             // Redirect non-logged-in users trying to access protected pages
//             if (!publicPages.includes(currentPage)) {
//                 window.location.href = 'login.html';
//             }
//         }
//     });
// });


// // Signup event listener
// const signUp = document.getElementById('submitSignUp');
// if (signUp) {
//     signUp.addEventListener('click', (event) => {
//         event.preventDefault();
        
//         // Get the form inputs
//         const email = document.getElementById('rEmail').value;
//         const password = document.getElementById('rPassword').value;
//         const confirmPassword = document.getElementById('confirmPassword').value;
//         const firstName = document.getElementById('fName').value;
//         const lastName = document.getElementById('lName').value;

//         // Check if passwords match
//         if (password !== confirmPassword) {
//             showMessage('Passwords do not match!', 'signUpMessage');
//             return; // Prevent form submission if passwords do not match
//         }

//         // Password strength validation
//         const validatePassword = (password) => {
//             const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
//             return regex.test(password);
//         };

//         if (!validatePassword(password)) {
//             showMessage('Password must be at least 8 characters long, contain uppercase, lowercase, and a number.', 'signUpMessage');
//             return;
//         }

//         // Firebase auth
//         createUserWithEmailAndPassword(auth, email, password)
//             .then(async (userCredential) => {
//                 const user = userCredential.user;

//                 // Store user data in Firestore
//                 const userData = {
//                     email: email,
//                     firstName: firstName,
//                     lastName: lastName,
//                 };
//                 await setDoc(doc(db, "users", user.uid), userData);

//                 // Set session cookie with additional security flags
//                 const token = await user.getIdToken();
//                 document.cookie = `authToken=${token}; path=/; max-age=3600; secure; SameSite=Strict; HttpOnly`;

//                 showMessage('Account Created Successfully', 'signUpMessage');
//                 window.location.href = 'login.html'; // Redirect to login after signup
//             })
//             .catch((error) => {
//                 showMessage(getErrorMessage(error.code), 'signUpMessage');
//             });
//     });
// }

// // Signin event listener
// const signIn = document.getElementById('submitSignIn');
// if (signIn) {
//     signIn.addEventListener('click', (event) => {
//         event.preventDefault();
//         const email = document.getElementById('email').value;
//         const password = document.getElementById('password').value;

//         signInWithEmailAndPassword(auth, email, password)
//             .then(async (userCredential) => {
//                 const user = userCredential.user;

//                 // Set session cookie with additional security flags
//                 const token = await user.getIdToken();
//                 document.cookie = `authToken=${token}; path=/; max-age=3600; secure; SameSite=Strict; HttpOnly`;

//                 showMessage('Login is successful', 'signInMessage');
//                 window.location.href = 'loggedin.html';
//             })
//             .catch((error) => {
//                 showMessage(getErrorMessage(error.code), 'signInMessage');
//             });
//     });
// }

// // Function to toggle password visibility
// // function toggleVisibility(toggleElementId, passwordFieldId) {
// //     const passwordField = document.getElementById(passwordFieldId);
// //     const togglePasswordIcon = document.querySelector(`#${toggleElementId} i`);

// //     if (passwordField.type === 'password') {
// //         passwordField.type = 'text';
// //         togglePasswordIcon.classList.remove('fa-eye');
// //         togglePasswordIcon.classList.add('fa-eye-slash');
// //     } else {
// //         passwordField.type = 'password';
// //         togglePasswordIcon.classList.remove('fa-eye-slash');
// //         togglePasswordIcon.classList.add('fa-eye');
// //     }
// // }

// function toggleVisibility(toggleElementId, passwordFieldId) {
//     const passwordField = document.getElementById(passwordFieldId);
//     const togglePasswordIcon = document.querySelector(`#${toggleElementId} i`);

//     if (passwordField) { // Check if password field exists
//         if (passwordField.type === 'password') {
//             passwordField.type = 'text';
//             togglePasswordIcon.classList.remove('fa-eye');
//             togglePasswordIcon.classList.add('fa-eye-slash');
//         } else {
//             passwordField.type = 'password';
//             togglePasswordIcon.classList.remove('fa-eye-slash');
//             togglePasswordIcon.classList.add('fa-eye');
//         }
//     } else {
//         console.error(`Element with ID ${passwordFieldId} not found.`);
//     }
// }






// // Toggle password visibility for the password and confirm password fields
// // document.getElementById('togglePassword').addEventListener('click', () => {
// //     toggleVisibility('togglePassword', 'rPassword');
// // });
// // document.getElementById('toggleConfirmPassword').addEventListener('click', () => {
// //     toggleVisibility('toggleConfirmPassword', 'confirmPassword');
// // });
// document.addEventListener('DOMContentLoaded', () => {
//     const togglePassword = document.getElementById('togglePassword');
//     if (togglePassword) {
//         togglePassword.addEventListener('click', () => {
//             toggleVisibility('togglePassword', 'rPassword');
//         });
//     }

//     const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
//     if (toggleConfirmPassword) {
//         toggleConfirmPassword.addEventListener('click', () => {
//             toggleVisibility('toggleConfirmPassword', 'confirmPassword');
//         });
//     }
// });

// // Logout functionality
// const logoutButton = document.getElementById('logoutButton');
// if (logoutButton) {
//     logoutButton.addEventListener('click', (event) => {
//         event.preventDefault();

//         signOut(auth)
//             .then(() => {
//                 // Clear session cookie
//                 document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Strict; HttpOnly";
//                 localStorage.removeItem('loggedInUserId');

//                 showMessage('You have been logged out successfully.', 'logoutMessage');
//                 window.location.href = 'index.html';
//             })
//             .catch((error) => {
//                 console.error("Error signing out: ", error);
//                 showMessage('Error signing out. Please try again.', 'logoutMessage');
//             });
//     });
// }

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

// // Error message handling based on Firebase error codes
// function getErrorMessage(errorCode) {
//     switch (errorCode) {
//         case 'auth/wrong-password':
//             return 'The password is incorrect. Please try again.';
//         case 'auth/user-not-found':
//             return 'No user found with this email address.';
//         case 'auth/email-already-in-use':
//             return 'This email is already in use. Please log in.';
//         case 'auth/invalid-email':
//             return 'The email address is invalid. Please enter a valid email.';
//         default:
//             return 'An unexpected error occurred. Please try again later.';
//     }
// }

























// document.addEventListener('DOMContentLoaded', () => {
//     // Initialize Firebase Authentication
//     const auth = getAuth();

//     // Check user authentication status on page load
//     auth.onAuthStateChanged((user) => {
//         const currentPage = window.location.pathname;

//         if (user) {
//             // User is signed in
//             console.log('User is signed in:', user.email);
            
//             // Redirect logged-in users away from login or signup page
//             if (currentPage === '/login.html' || currentPage === '/signup.html') {
//                 window.location.href = 'loggedin.html';
//             }
//         } else {
//             // No user is signed in
//             console.log('No user is signed in');

//             // Redirect non-logged-in users trying to access protected pages
//             if (currentPage !== '/signup.html' && currentPage !== '/login.html' && currentPage !== '/index.html') {
//                 window.location.href = 'login.html';
//             }
//         }
//     });
// });





//     // Signup event listener
//     const signUp = document.getElementById('submitSignUp');
//     if (signUp) {
//         signUp.addEventListener('click', (event) => {
//             event.preventDefault();
            
//             // Get the form inputs
//             const email = document.getElementById('rEmail').value;
//             const password = document.getElementById('rPassword').value;
//             const confirmPassword = document.getElementById('confirmPassword').value; // Confirmation password field
//             const firstName = document.getElementById('fName').value;
//             const lastName = document.getElementById('lName').value;
    
//             // Check if passwords match
//             if (password !== confirmPassword) {
//                 showMessage('Passwords do not match!', 'signUpMessage');
//                 return; // Prevent form submission if passwords do not match
//             }
    
//             // Firebase auth
//             createUserWithEmailAndPassword(auth, email, password)
//                 .then(async (userCredential) => {
//                     const user = userCredential.user;
    
//                     // Store user data in Firestore
//                     const userData = {
//                         email: email,
//                         firstName: firstName,
//                         lastName: lastName,
//                     };
//                     await setDoc(doc(db, "users", user.uid), userData);
    
//                     // Set session cookie or local storage with auth token
//                     const token = await user.getIdToken();
//                     document.cookie = `authToken=${token}; path=/; max-age=3600; secure`;
    
//                     showMessage('Account Created Successfully', 'signUpMessage');
//                     window.location.href = 'login.html'; // Redirect to login after signup
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
    




// // login
//     // Signin event listener
//     const signIn = document.getElementById('submitSignIn');
//     if (signIn) {
//         signIn.addEventListener('click', (event) => {
//             event.preventDefault();
//             const email = document.getElementById('email').value;
//             const password = document.getElementById('password').value;

//             signInWithEmailAndPassword(auth, email, password)
//                 .then(async (userCredential) => {
//                     const user = userCredential.user;

//                     // Set session cookie or local storage with auth token
//                     const token = await user.getIdToken();
//                     document.cookie = `authToken=${token}; path=/; max-age=3600; secure`;

//                     showMessage('Login is successful', 'signInMessage');
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









//     // Toggle password visibility for the password field
//     document.getElementById('togglePassword').addEventListener('click', () => {
//     const passwordField = document.getElementById('rPassword');
//     const togglePasswordIcon = document.querySelector('#togglePassword i');

//     if (passwordField.type === 'password') {
//         passwordField.type = 'text';
//         togglePasswordIcon.classList.remove('fa-eye');
//         togglePasswordIcon.classList.add('fa-eye-slash');
//     } else {
//         passwordField.type = 'password';
//         togglePasswordIcon.classList.remove('fa-eye-slash');
//         togglePasswordIcon.classList.add('fa-eye');
//     }
// });

// // Toggle password visibility for the confirm password field
// document.getElementById('toggleConfirmPassword').addEventListener('click', () => {
//     const confirmPasswordField = document.getElementById('confirmPassword');
//     const toggleConfirmPasswordIcon = document.querySelector('#toggleConfirmPassword i');

//     if (confirmPasswordField.type === 'password') {
//         confirmPasswordField.type = 'text';
//         toggleConfirmPasswordIcon.classList.remove('fa-eye');
//         toggleConfirmPasswordIcon.classList.add('fa-eye-slash');
//     } else {
//         confirmPasswordField.type = 'password';
//         toggleConfirmPasswordIcon.classList.remove('fa-eye-slash');
//         toggleConfirmPasswordIcon.classList.add('fa-eye');
//     }
// });

    


//     // Logout functionality
//     const logoutButton = document.getElementById('logoutButton');
//     if (logoutButton) {
//         logoutButton.addEventListener('click', (event) => {
//             event.preventDefault();

//             signOut(auth)
//                 .then(() => {
//                     // Clear session cookie
//                     document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
//                     localStorage.removeItem('loggedInUserId');

//                     showMessage('You have been logged out successfully.', 'logoutMessage');
//                     window.location.href = 'index.html';
//                 })
//                 .catch((error) => {
//                     console.error("Error signing out: ", error);
//                     showMessage('Error signing out. Please try again.', 'logoutMessage');
//                 });
//         });
//     }

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
//                 .then(async (userCredential) => {
//                     const user = userCredential.user;

//                     // Store user data in Firestore
//                     const userData = {
//                         email: email,
//                         firstName: firstName,
//                         lastName: lastName
//                     };
//                     const docRef = doc(db, "users", user.uid);
//                     await setDoc(docRef, userData);

//                     // Get JWT token and store in cookie
//                     const token = await user.getIdToken();
//                     setTokenCookie(token);

//                     showMessage('Account Created Successfully', 'signUpMessage');
//                     window.location.href = 'login.html';
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
//                 .then(async (userCredential) => {
//                     const user = userCredential.user;
//                     const token = await user.getIdToken();
                    
//                     // Set token cookie after login
//                     setTokenCookie(token);
//                     localStorage.setItem('loggedInUserId', user.uid);
                    
//                     showMessage('Login is successful', 'signInMessage');
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

// // Logout functionality
// const logoutButton = document.getElementById('logoutButton');
// if (logoutButton) {
//     logoutButton.addEventListener('click', (event) => {
//         event.preventDefault();
//         const auth = getAuth();

//         signOut(auth)
//             .then(() => {
//                 // Clear token from cookie
//                 clearTokenCookie();
//                 localStorage.removeItem('loggedInUserId');
                
//                 showMessage('You have been logged out successfully.', 'logoutMessage');
//                 window.location.href = 'index.html';
//             })
//             .catch((error) => {
//                 console.error("Error signing out: ", error);
//                 showMessage('Error signing out. Please try again.', 'logoutMessage');
//             });
//     });
// }

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

// // Function to set token in cookies
// function setTokenCookie(token) {
//     document.cookie = `authToken=${token}; path=/; max-age=86400; secure; SameSite=Strict`;
// }

// // Function to clear token cookie on logout
// function clearTokenCookie() {
//     document.cookie = 'authToken=; path=/; max-age=0; secure; SameSite=Strict';
// }









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













































// function setTokenCookie(token) {
//     document.cookie = `authToken=${token}; path=/; secure; HttpOnly`;
// }

// // Function to clear cookie (used for logout)
// function clearTokenCookie() {
//     document.cookie = `authToken=; Max-Age=0; path=/; secure; HttpOnly`;
// }

// // Function to display messages
// function showMessage(message, divId) {
//     var messageDiv = document.getElementById(divId);
//     messageDiv.style.display = "block";
//     messageDiv.innerHTML = message;
//     messageDiv.style.opacity = 1;
//     setTimeout(function () {
//         messageDiv.style.opacity = 0;
//     }, 5000);
// }

// // Sign-Up Logic
// document.getElementById('submitSignUp').addEventListener('click', (event) => {
//     event.preventDefault();

//     const email = document.getElementById('rEmail').value;
//     const password = document.getElementById('rPassword').value;
//     const firstName = document.getElementById('fName').value;
//     const lastName = document.getElementById('lName').value;

//     createUserWithEmailAndPassword(auth, email, password)
//         .then(async (userCredential) => {
//             const user = userCredential.user;

//             // Store user data in Firestore
//             const userData = {
//                 email: email,
//                 firstName: firstName,
//                 lastName: lastName
//             };
//             await setDoc(doc(db, "users", user.uid), userData);

//             // Get JWT token and store in cookie
//             const token = await user.getIdToken();
//             setTokenCookie(token);

//             showMessage('Account Created Successfully', 'signUpMessage');
//             window.location.href = 'index.html';
//         })
//         .catch((error) => {
//             const errorCode = error.code;
//             if (errorCode === 'auth/email-already-in-use') {
//                 showMessage('Email Address Already Exists !!!', 'signUpMessage');
//             } else {
//                 showMessage('Unable to create User', 'signUpMessage');
//             }
//         });
// });

// // Sign-In Logic
// document.getElementById('submitSignIn').addEventListener('click', (event) => {
//     event.preventDefault();

//     const email = document.getElementById('email').value;
//     const password = document.getElementById('password').value;

//     signInWithEmailAndPassword(auth, email, password)
//         .then(async (userCredential) => {
//             const user = userCredential.user;

//             // Get JWT token and store in cookie
//             const token = await user.getIdToken();
//             setTokenCookie(token);

//             showMessage('Login is successful', 'signInMessage');
//             window.location.href = 'loggedin.html';
//         })
//         .catch((error) => {
//             const errorCode = error.code;
//             if (errorCode === 'auth/wrong-password' || errorCode === 'auth/user-not-found') {
//                 showMessage('Incorrect Email or Password', 'signInMessage');
//             } else {
//                 showMessage('Account does not exist', 'signInMessage');
//             }
//         });
// });

// // Logout Logic
// document.getElementById('logoutButton').addEventListener('click', () => {
//     signOut(auth).then(() => {
//         clearTokenCookie(); // Clear the token cookie
//         showMessage('Logout successful', 'logoutMessage');
//         window.location.href = 'index.html'; // Redirect to homepage or login page
//     }).catch((error) => {
//         console.error('Error during logout', error);
//         showMessage('Logout failed', 'logoutMessage');
//     });
// });



