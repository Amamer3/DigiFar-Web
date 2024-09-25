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
            const logoutMessage = document.getElementById('logoutMessage');
            logoutMessage.innerText = 'You have been logged out successfully.';
            logoutMessage.style.display = 'block';
            
            // Redirect to the home page
            window.location.href = 'index.html';
        })
        .catch((error) => {
            // Show error message
            const logoutMessage = document.getElementById('logoutMessage');
            logoutMessage.innerText = 'Error signing out. Please try again.';
            logoutMessage.style.display = 'block';
            console.error('Logout error: ', error);
        });
}

// Add event listener to the logout button
document.addEventListener("DOMContentLoaded", function () {
    const logoutButton = document.getElementById('logoutButtonMobile');
    if (logoutButton) {
        logoutButton.addEventListener('click', handleLogout);
    } else {
        console.error("Logout button not found.");
    }

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

//this is the new code from main js 
const currentUrl = window.location.pathname;
let withoutSlash;
if (currentUrl.length > 1) {
    withoutSlash = currentUrl.split("/")[1];
} else {
    withoutSlash = currentUrl;
}
const singleMenu = document.querySelectorAll(".single-menu");
const menuItems = document.querySelectorAll(".menu li a");

menuItems.forEach((item) => {
    const menuItemUrl = item.getAttribute("href");
    if (withoutSlash === menuItemUrl) {
        item.parentElement.classList.add("active-nav", "parent-nav-active");
        item.parentElement.parentElement.parentElement.querySelector("li p").classList.add("parent-nav-active");
    }
});

singleMenu.forEach((item) => {
    const menuItemUrl = item.getAttribute("href");
    if (withoutSlash === menuItemUrl) {
        item.classList.add("parent-nav-active");
    }
});

const menuToggleButton = document.querySelector(".mobile-nav-toggle");
const mobileMenuOverlay = document.querySelector(".sidebar-overlay");
menuToggleButton?.addEventListener("click", sidebarToggle);
mobileMenuOverlay?.addEventListener("click", sidebarToggle);

function sidebarToggle() {
    const menuSidebar = document.querySelector(".menu-sidebar");
    menuSidebar?.classList.toggle("menu-sidebar-active");
    mobileMenuOverlay?.classList.toggle("menu-sidebar-overlay-active");
}

const mobileNavListParent = document.querySelectorAll(".mobile-nav-dropdown");
const allList = document.querySelectorAll(".mobile-menu-container .mobile-nav-list");

mobileNavListParent.forEach((item) => {
    item.addEventListener("click", function() {
        allList.forEach((item2) => {
            item2.classList.remove("mobile-nav-list-active");
        });
        const mobileNavList = item.querySelector(".mobile-nav-list");
        mobileNavList?.classList.toggle("mobile-nav-list-active");
    });
});

const mobileMenus = document.querySelectorAll(".mobile-nav-list-parent");
mobileMenus.forEach((mobileMenu) => {
    const nextSibling = mobileMenu.nextElementSibling;
    if (nextSibling) {
        const mobileMenuItems = nextSibling.querySelectorAll(".mobile-nav-item a");
        mobileMenuItems.forEach((item) => {
            const menuItemUrl = item.getAttribute("href");
            if (withoutSlash === menuItemUrl) {
                item.parentElement.classList.add("mobile-nav-active");
                mobileMenu.classList.add("parent-nav-active");
            }
        });
    } else {
        console.log("Next sibling not found for", mobileMenu);
    }
});



















// // Mobile screen logot logic

// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
// import { getAuth, signOut,} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
// // import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js"

// const firebaseConfig = {
//     apiKey: "AIzaSyARo0rthUzXqiHuHBzfrkZpriabCQEIzvM",
//     authDomain: "auth-test-f09d6.firebaseapp.com",
//     projectId: "auth-test-f09d6",
//     storageBucket: "auth-test-f09d6.appspot.com",
//     messagingSenderId: "29299407975",
//     appId: "1:29299407975:web:0620f7cae1cd3b5816a8c2"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// // const db = getFirestore(app);





// // Logout functionality
// function handleLogout() {
//     // Firebase logout logic
//     signOut(auth) // Make sure Firebase is initialized correctly
//         .then(() => {
//             // Clear auth token and local storage
//             document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Strict; HttpOnly";
//             localStorage.removeItem('loggedInUserId');
            
//             // Show logout message
//             document.getElementById('logoutMessage').innerText = 'You have been logged out successfully.';
            
//             // Redirect to the home page
//             window.location.href = 'index.html';
//         })
//         .catch((error) => {
//             // Show error message
//             document.getElementById('logoutMessage').innerText = 'Error signing out. Please try again.';
//             console.error('Logout error: ', error);
//         });
// }






// // the new code
// document.addEventListener("DOMContentLoaded", function () {
//     const toggleButton = document.querySelector(".mobile-nav-toggle");
//     const sidebar = document.querySelector(".menu-sidebar");
//     const overlay = document.querySelector(".sidebar-overlay");

//     if (!toggleButton || !sidebar || !overlay) {
//         console.error("One or more essential elements not found.");
//         return;
//     }

//     function toggleSidebar() {
//         sidebar.classList.toggle("active");
//         overlay.classList.toggle("active");
//     }

//     overlay.addEventListener("click", function () {
//         sidebar.classList.remove("active");
//         overlay.classList.remove("active");
//     });

//     toggleButton.addEventListener("click", function () {
//         toggleSidebar();
//     });

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

//     if (!smeDropdownParent || !smeDropdownMenu) {
//         console.error("Dropdown elements not found.");
//         return;
//     }

//     smeDropdownParent.addEventListener("click", function () {
//         smeDropdownMenu.classList.toggle("expanded");

//         // Toggle inline styles
//         if (smeDropdownMenu.classList.contains("expanded")) {
//             smeDropdownMenu.style.maxHeight = smeDropdownMenu.scrollHeight + "px";
//             smeDropdownMenu.style.opacity = "1";
//             smeDropdownMenu.style.transform = "translateY(0)";
//         } else {
//             smeDropdownMenu.style.maxHeight = "0";
//             smeDropdownMenu.style.opacity = "0";
//             smeDropdownMenu.style.transform = "translateY(-10px)";
//         }
//     });
// });






// //this is the new code from main js 
// const currentUrl = window.location.pathname;
//   let withoutSlash;
//   if (currentUrl.length > 1) {
//     withoutSlash = currentUrl.split("/")[1];
//   } else {
//     withoutSlash = currentUrl;
//   }
//   const singleMenu = document.querySelectorAll(".single-menu");
// const menuItems = document.querySelectorAll(".menu li a");



// menuItems.forEach((item) => {
//   const menuItemUrl = item.getAttribute("href");
//   if (withoutSlash === menuItemUrl) {
//     item.parentElement.classList.add("active-nav", "parent-nav-active");
//     item.parentElement.parentElement.parentElement.querySelector("li p").classList.add("parent-nav-active");
//   }
// });

// singleMenu.forEach((item) => {
//   const menuItemUrl = item.getAttribute("href");
//   if (withoutSlash === menuItemUrl) {
//     item.classList.add("parent-nav-active");
//   }
// });

// const menuToggleButton = document.querySelector(".mobile-nav-toggle");
// const mobileMenuOverlay = document.querySelector(".sidebar-overlay");
// menuToggleButton?.addEventListener("click", sidebarToggle);
// mobileMenuOverlay?.addEventListener("click", sidebarToggle);

// function sidebarToggle() {
//   const menuSidebar = document.querySelector(".menu-sidebar");
//   menuSidebar?.classList.toggle("menu-sidebar-active");
//   mobileMenuOverlay?.classList.toggle("menu-sidebar-overlay-active");
// }

// const mobileNavListParent = document.querySelectorAll(".mobile-nav-dropdown");
// const allList = document.querySelectorAll(".mobile-menu-container .mobile-nav-list");

// mobileNavListParent.forEach((item) => {
//   item.addEventListener("click", function() {
//     allList.forEach((item2) => {
//       item2.classList.remove("mobile-nav-list-active");
//     });
//     const mobileNavList = item.querySelector(".mobile-nav-list");
//     mobileNavList?.classList.toggle("mobile-nav-list-active");
//   });
// });

// const mobileMenus = document.querySelectorAll(".mobile-nav-list-parent");
// mobileMenus.forEach((mobileMenu) => {
//   const nextSibling = mobileMenu.nextElementSibling;
//   if (nextSibling) {
//     const mobileMenuItems = nextSibling.querySelectorAll(".mobile-nav-item a");
//     mobileMenuItems.forEach((item) => {
//       const menuItemUrl = item.getAttribute("href");
//       if (withoutSlash === menuItemUrl) {
//         item.parentElement.classList.add("mobile-nav-active");
//         mobileMenu.classList.add("parent-nav-active");
//       }
//     });
//   } else {
//       console.log("Next sibling not found for", mobileMenu);
//     }
//   });



