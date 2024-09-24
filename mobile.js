

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





const logoutButton = document.getElementById('logoutButton');

if (logoutButton) {
    logoutButton.addEventListener('click', (event) => {
        event.preventDefault();

        signOut(auth)
            .then(() => {
                // Clear the authentication token (cookie) and localStorage
                document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Strict; HttpOnly";
                localStorage.removeItem('loggedInUserId');

                // Display a logout success message
                showMessage('You have been logged out successfully.', 'logoutMessage');

                // Redirect to the homepage
                window.location.href = 'index.html';
            })
            .catch((error) => {
                // Handle any logout errors
                showMessage('Error signing out. Please try again.', 'logoutMessage');
            });
    });
}

// Function to show messages on the page
function showMessage(message, elementId) {
    const messageElement = document.getElementById(elementId);
    if (messageElement) {
        messageElement.textContent = message;
    }
}






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
  