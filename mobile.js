

// Mobile screen logot logic

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAuth, signOut,} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
// import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js"

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
// const db = getFirestore(app);





// Logout functionality
function handleLogout() {
    // Firebase logout logic
    signOut(auth) // Make sure Firebase is initialized correctly
        .then(() => {
            // Clear auth token and local storage
            document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Strict; HttpOnly";
            localStorage.removeItem('loggedInUserId');
            
            // Show logout message
            document.getElementById('logoutMessage').innerText = 'You have been logged out successfully.';
            
            // Redirect to the home page
            window.location.href = 'index.html';
        })
        .catch((error) => {
            // Show error message
            document.getElementById('logoutMessage').innerText = 'Error signing out. Please try again.';
            console.error('Logout error: ', error);
        });
}



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


// // Function to show messages on the page
// function showMessage(message, elementId) {
//     const messageElement = document.getElementById(elementId);
//     if (messageElement) {
//         messageElement.textContent = message;
//     }
// }






// the new code
document.addEventListener("DOMContentLoaded", function () {
    const toggleButton = document.querySelector(".mobile-nav-toggle");
    const sidebar = document.querySelector(".menu-sidebar");
    const overlay = document.querySelector(".sidebar-overlay");

    if (!toggleButton || !sidebar || !overlay) {
        console.error("One or more essential elements not found.");
        return;
    }

    function toggleSidebar() {
        sidebar.classList.toggle("active");
        overlay.classList.toggle("active");
    }

    overlay.addEventListener("click", function () {
        sidebar.classList.remove("active");
        overlay.classList.remove("active");
    });

    toggleButton.addEventListener("click", function () {
        toggleSidebar();
    });

    const sidebarLinks = document.querySelectorAll(".menu-sidebar a");
    sidebarLinks.forEach((link) => {
        link.addEventListener("click", function () {
            sidebar.classList.remove("active");
            overlay.classList.remove("active");
        });
    });

    // SME Dropdown Toggle
    const smeDropdownParent = document.querySelector(".mobile-nav-list-parent");
    const smeDropdownMenu = document.querySelector(".mobile-nav-list");

    if (!smeDropdownParent || !smeDropdownMenu) {
        console.error("Dropdown elements not found.");
        return;
    }

    smeDropdownParent.addEventListener("click", function () {
        smeDropdownMenu.classList.toggle("expanded");

        // Toggle inline styles
        if (smeDropdownMenu.classList.contains("expanded")) {
            smeDropdownMenu.style.maxHeight = smeDropdownMenu.scrollHeight + "px";
            smeDropdownMenu.style.opacity = "1";
            smeDropdownMenu.style.transform = "translateY(0)";
        } else {
            smeDropdownMenu.style.maxHeight = "0";
            smeDropdownMenu.style.opacity = "0";
            smeDropdownMenu.style.transform = "translateY(-10px)";
        }
    });
});















// The old script 


// document.addEventListener("DOMContentLoaded", function () {
//     const toggleButton = document.querySelector(".mobile-nav-toggle");
//     const sidebar = document.querySelector(".menu-sidebar");
//     const overlay = document.querySelector(".sidebar-overlay");

//     // Check if essential elements are found
//     if (!toggleButton || !sidebar || !overlay) {
//         console.error("One or more essential elements not found.");
//         return;
//     }

//     // Function to toggle sidebar visibility
//     function toggleSidebar() {
//         sidebar.classList.toggle("active");
//         overlay.classList.toggle("active");
//     }

//     // Close the sidebar when clicking outside (on the overlay)
//     overlay.addEventListener("click", function () {
//         sidebar.classList.remove("active");
//         overlay.classList.remove("active");
//     });

//     // Toggle sidebar when clicking on the hamburger icon
//     toggleButton.addEventListener("click", function () {
//         toggleSidebar();
//     });

//     // Close sidebar when clicking on any sidebar link
//     const sidebarLinks = document.querySelectorAll(".menu-sidebar a");
//     sidebarLinks.forEach((link) => {
//         link.addEventListener("click", function () {
//             sidebar.classList.remove("active");
//             overlay.classList.remove("active");
//         });
//     });

//     // SME Dropdown Toggle
//     const smeDropdownParent = document.querySelector(".mobile-nav-list-parent");
//     const smeDropdownMenu = document.querySelector(".mobile-nav-list");

//     // Check if dropdown elements are found
//     if (!smeDropdownParent || !smeDropdownMenu) {
//         console.error("Dropdown elements not found.");
//         return;
//     }

//     smeDropdownParent.addEventListener("click", function () {
//         // Check if dropdown is expanded
//         const isExpanded = smeDropdownMenu.style.maxHeight && smeDropdownMenu.style.maxHeight !== "0px";
        
//         if (isExpanded) {
//             smeDropdownMenu.style.maxHeight = "0"; // Close the dropdown
//             smeDropdownMenu.style.opacity = "0";
//             smeDropdownMenu.style.transform = "translateY(-10px)";
//         } else {
//             smeDropdownMenu.style.maxHeight = smeDropdownMenu.scrollHeight + "px"; // Open the dropdown
//             smeDropdownMenu.style.opacity = "1";
//             smeDropdownMenu.style.transform = "translateY(0)";
//         }
//     });
// });















// document.addEventListener("DOMContentLoaded", function () {
//     const toggleButton = document.querySelector(".mobile-nav-toggle");
//     const sidebar = document.querySelector(".menu-sidebar");
//     const overlay = document.querySelector(".sidebar-overlay");
  
//     // Function to toggle sidebar visibility
//     function toggleSidebar() {
//       sidebar.classList.toggle("active");
//       overlay.classList.toggle("active");
//     }
  
//     // Close the sidebar when clicking outside (on the overlay)
//     overlay.addEventListener("click", function () {
//       sidebar.classList.remove("active");
//       overlay.classList.remove("active");
//     });
  
//     // Toggle sidebar when clicking on the hamburger icon
//     toggleButton.addEventListener("click", function () {
//       toggleSidebar();
//     });
  
//     // Close sidebar when clicking on any sidebar link
//     const sidebarLinks = document.querySelectorAll(".menu-sidebar a");
//     sidebarLinks.forEach((link) => {
//       link.addEventListener("click", function () {
//         sidebar.classList.remove("active");
//         overlay.classList.remove("active");
//       });
//     });
  
//     // SME Dropdown Toggle
//     const smeDropdownParent = document.querySelector(".mobile-nav-list-parent");
//     const smeDropdownMenu = document.querySelector(".mobile-nav-list");
  
//     smeDropdownParent.addEventListener("click", function () {
//       // Check if dropdown is expanded
//       if (smeDropdownMenu.style.maxHeight) {
//         smeDropdownMenu.style.maxHeight = null; // Close the dropdown
//         smeDropdownMenu.style.opacity = 0;
//         smeDropdownMenu.style.transform = "translateY(-10px)";
//       } else {
//         smeDropdownMenu.style.maxHeight = smeDropdownMenu.scrollHeight + "px"; // Open the dropdown
//         smeDropdownMenu.style.opacity = 1;
//         smeDropdownMenu.style.transform = "translateY(0)";
//       }
//     });
//   });
  


























// document.addEventListener("DOMContentLoaded", function () {
//     const toggleButton = document.querySelector(".mobile-nav-toggle");
//     const sidebar = document.querySelector(".menu-sidebar");
//     const overlay = document.querySelector(".sidebar-overlay");
  
//     // Function to toggle sidebar visibility
//     function toggleSidebar() {
//       sidebar.classList.toggle("active");
//       overlay.classList.toggle("active");
//     }
  
//     // Close the sidebar when clicking outside (on the overlay)
//     overlay.addEventListener("click", function () {
//       sidebar.classList.remove("active");
//       overlay.classList.remove("active");
//     });
  
//     // Toggle sidebar when clicking on the hamburger icon
//     toggleButton.addEventListener("click", function () {
//       toggleSidebar();
//     });
  
//     // Close sidebar when clicking on any sidebar link
//     const sidebarLinks = document.querySelectorAll(".menu-sidebar a");
//     sidebarLinks.forEach((link) => {
//       link.addEventListener("click", function () {
//         sidebar.classList.remove("active");
//         overlay.classList.remove("active");
//       });
//     });
  
//     // SME Dropdown Toggle
//     const smeDropdownParent = document.querySelector(".mobile-nav-list-parent");
//     const smeDropdownMenu = document.querySelector(".mobile-nav-list");
  
//     smeDropdownParent.addEventListener("click", function () {
//       const isExpanded = smeDropdownMenu.classList.contains("expanded");
//       if (isExpanded) {
//         smeDropdownMenu.style.maxHeight = 0;
//         smeDropdownMenu.style.opacity = 0;
//         smeDropdownMenu.style.transform = "translateY(-10px)";
//       } else {
//         smeDropdownMenu.style.maxHeight = smeDropdownMenu.scrollHeight + "px";
//         smeDropdownMenu.style.opacity = 1;
//         smeDropdownMenu.style.transform = "translateY(0)";
//       }
//       smeDropdownMenu.classList.toggle("expanded");
//     });
//   });
  







// JavaScript to handle the mobile navigation toggle
// document.addEventListener("DOMContentLoaded", function () {
//     const toggleButton = document.querySelector(".mobile-nav-toggle");
//     const sidebar = document.querySelector(".menu-sidebar");
//     const overlay = document.querySelector(".sidebar-overlay");
  
//     // Function to toggle sidebar visibility
//     function toggleSidebar() {
//       sidebar.classList.toggle("active");
//       overlay.classList.toggle("active");
//     }
  
//     // Close the sidebar when clicking outside (on the overlay)
//     overlay.addEventListener("click", function () {
//       sidebar.classList.remove("active");
//       overlay.classList.remove("active");
//     });
  
//     // Toggle sidebar when clicking on the hamburger icon
//     toggleButton.addEventListener("click", function () {
//       toggleSidebar();
//     });
  
//     // Close sidebar when clicking on any sidebar link
//     const sidebarLinks = document.querySelectorAll(".menu-sidebar a");
//     sidebarLinks.forEach((link) => {
//       link.addEventListener("click", function () {
//         sidebar.classList.remove("active");
//         overlay.classList.remove("active");
//       });
//     });
//   });
  