// // Signup event listener
// const signUp = document.getElementById('submitSignUp');
// if (signUp) {
//     signUp.addEventListener('click', event => {
//         event.preventDefault();

//         const email = document.getElementById('rEmail').value.trim();
//         const password = document.getElementById('rPassword').value.trim();
//         const confirmPassword = document.getElementById('confirmPassword').value.trim();
//         const firstName = document.getElementById('fName').value.trim();
//         const lastName = document.getElementById('lName').value.trim();

//         // Disable the signup button during processing
//         signUp.disabled = true;

//         // Check if passwords match
//         if (password !== confirmPassword) {
//             showMessage('Passwords do not match!', 'errorMess');
//             signUp.disabled = false;
//             return;
//         }

//         // Password validation
//         const validatePassword = password => {
//             const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
//             return regex.test(password);
//         };

//         if (!validatePassword(password)) {
//             showMessage(
//                 'Password must be at least 8 characters long, contain uppercase, lowercase, and a number.',
//                 'errorMess'
//             );
//             signUp.disabled = false;
//             return;
//         }

//         // Firebase Create User (replace this part with your Firebase code)
//         // Example: createUserWithEmailAndPassword(auth, email, password)
//         // Simulating Firebase call for this example:
//     createUserWithEmailAndPassword(auth, email, password)
//         .then(async userCredential => {
//             const user = userCredential.user

//             // Save user data to Firestore
//             const userData = { email, firstName, lastName }
//             await setDoc(doc(db, 'users', user.uid), userData)

//             // Retrieve token and set secure cookie
//             const token = await user.getIdToken()
//             document.cookie = `authToken=${token}; path=/; max-age=3600; secure; SameSite=Strict; HttpOnly`

//             showMessage('Account Created Successfully', 'signUpMessage')

//             // Redirect to login page
//             window.location.href = 'login.html'
//         })
//         .catch(error => {
//             // Show error message
//             const errorMessage = error.code === 'auth/email-already-in-use' 
//                 ? 'This email is already in use!' 
//                 : 'An error occurred during registration.';
//             showMessage(errorMessage, 'errorMess');
//         })
//         .finally(() => {
//             // Re-enable signup button
//             signUp.disabled = false;
//         });
//     });
// }