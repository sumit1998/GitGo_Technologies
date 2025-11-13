  // Enable hover for dropdowns on desktop
document.addEventListener("DOMContentLoaded", function() {
  // ==================== MULTI-LEVEL SUBMENU (CLICK ON MOBILE) ====================
  const dropdownSubmenus = document.querySelectorAll('.dropdown-submenu > a');

  dropdownSubmenus.forEach(function(el) {
    el.addEventListener('click', function(e) {
      const submenu = el.nextElementSibling;

      // Only handle clicks for mobile
      if (window.innerWidth <= 991 && submenu) {
        e.preventDefault();
        e.stopPropagation();

        // Toggle the clicked submenu
        submenu.classList.toggle('show');
        el.parentElement.classList.toggle('open');

        // Close other open submenus at same level
        el.closest('.dropdown-menu').querySelectorAll('.dropdown-menu.show').forEach(function(menu) {
          if (menu !== submenu) {
            menu.classList.remove('show');
            menu.parentElement.classList.remove('open');
          }
        });
      }
    });
  });

  // Close all submenus when parent dropdown closes
  const dropdowns = document.querySelectorAll('.dropdown');
  dropdowns.forEach(function(dd) {
    dd.addEventListener('hidden.bs.dropdown', function () {
      dd.querySelectorAll('.dropdown-menu.show').forEach(function(menu) {
        menu.classList.remove('show');
        menu.parentElement.classList.remove('open');
      });
    });
  });

  // ==================== HOVER DROPDOWNS (DESKTOP ONLY) ====================
  document.querySelectorAll('.dropdown').forEach(function (dropdown) {
    dropdown.addEventListener('mouseenter', function () {
      if (window.innerWidth > 991) {
        const menu = this.querySelector('.dropdown-menu');
        if (menu) menu.classList.add('show');
      }
    });

    dropdown.addEventListener('mouseleave', function () {
      if (window.innerWidth > 991) {
        const menu = this.querySelector('.dropdown-menu');
        if (menu) menu.classList.remove('show');
      }
    });
  });

  // Optional: Close open dropdowns when resizing from mobile ↔ desktop
  window.addEventListener('resize', function() {
    if (window.innerWidth > 991) {
      document.querySelectorAll('.dropdown-menu.show').forEach(menu => menu.classList.remove('show'));
      document.querySelectorAll('.dropdown-submenu.open').forEach(item => item.classList.remove('open'));
    }
  });
});


// 🎯 Add event listener to handle the password reset form submission
document.getElementById("resetForm").addEventListener("submit", function (e) {
  e.preventDefault(); // Stop form from refreshing the page

  // 📝 Get user input (email or phone number)
  const input = document.getElementById("resetInput").value.trim();

  // 📩 Get the success message element
  const successMsg = document.getElementById("resetSuccess");

  // ✅ Define patterns to check if the input is an email or a 10-digit phone number
  const isEmail = /\S+@\S+\.\S+/.test(input); // Simple email pattern
  const isPhone = /^[0-9]{10}$/.test(input);  // 10-digit phone pattern

  // 📢 Display a success or error message based on the input type
  if (isEmail) {
    successMsg.textContent = "✅ A reset link has been sent to your registered email address.";
  } else if (isPhone) {
    successMsg.textContent = "✅ A reset code has been sent to your registered mobile number.";
  } else {
    successMsg.textContent = "⚠️ Please enter a valid email or 10-digit phone number.";
  }

  // 🔔 Show the message area
  successMsg.classList.remove("d-none");

  // ⏳ If valid email or phone, automatically switch back to login modal after 3 seconds
  if (isEmail || isPhone) {
    setTimeout(() => {
      // Close the Forgot Password modal
      const forgotModal = bootstrap.Modal.getInstance(
        document.getElementById("forgotPasswordModal")
      );
      forgotModal.hide();

      // Open the Login modal again
      const loginModal = new bootstrap.Modal(
        document.getElementById("loginModal")
      );
      loginModal.show();

      // 🧹 Clear input field and hide message
      document.getElementById("resetInput").value = "";
      successMsg.classList.add("d-none");
    }, 3000); // Wait for 3 seconds before switching modals
  }
});