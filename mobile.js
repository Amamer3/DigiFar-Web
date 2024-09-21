







document.addEventListener("DOMContentLoaded", function () {
    const toggleButton = document.querySelector(".mobile-nav-toggle");
    const sidebar = document.querySelector(".menu-sidebar");
    const overlay = document.querySelector(".sidebar-overlay");

    // Check if essential elements are found
    if (!toggleButton || !sidebar || !overlay) {
        console.error("One or more essential elements not found.");
        return;
    }

    // Function to toggle sidebar visibility
    function toggleSidebar() {
        sidebar.classList.toggle("active");
        overlay.classList.toggle("active");
    }

    // Close the sidebar when clicking outside (on the overlay)
    overlay.addEventListener("click", function () {
        sidebar.classList.remove("active");
        overlay.classList.remove("active");
    });

    // Toggle sidebar when clicking on the hamburger icon
    toggleButton.addEventListener("click", function () {
        toggleSidebar();
    });

    // Close sidebar when clicking on any sidebar link
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

    // Check if dropdown elements are found
    if (!smeDropdownParent || !smeDropdownMenu) {
        console.error("Dropdown elements not found.");
        return;
    }

    smeDropdownParent.addEventListener("click", function () {
        // Check if dropdown is expanded
        const isExpanded = smeDropdownMenu.style.maxHeight && smeDropdownMenu.style.maxHeight !== "0px";
        
        if (isExpanded) {
            smeDropdownMenu.style.maxHeight = "0"; // Close the dropdown
            smeDropdownMenu.style.opacity = "0";
            smeDropdownMenu.style.transform = "translateY(-10px)";
        } else {
            smeDropdownMenu.style.maxHeight = smeDropdownMenu.scrollHeight + "px"; // Open the dropdown
            smeDropdownMenu.style.opacity = "1";
            smeDropdownMenu.style.transform = "translateY(0)";
        }
    });
});















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
  