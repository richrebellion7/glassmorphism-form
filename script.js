document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const emailInput = document.querySelector("input[type='email']");
    const passwordInput = document.querySelector("input[type='password']");
    const rememberMe = document.querySelector("input[type='checkbox']");
    const toggleModeButton = document.createElement("button");
    toggleModeButton.textContent = "Toggle Mode";
    toggleModeButton.classList.add("toggle-mode");
    document.body.appendChild(toggleModeButton);

    // Dark Mode Toggle
    toggleModeButton.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");
        localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
    });

    if (localStorage.getItem("darkMode") === "true") {
        document.body.classList.add("dark-mode");
    }

    // Form Submission Handling
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        if (!validateEmail(email)) {
            showAlert("Invalid email format", "error");
            return;
        }

        if (password.length < 6) {
            showAlert("Password must be at least 6 characters long", "error");
            return;
        }

        if (rememberMe.checked) {
            localStorage.setItem("savedEmail", email);
        } else {
            localStorage.removeItem("savedEmail");
        }

        showAlert("Login successful!", "success");
    });

    // Load saved email if Remember Me was checked previously
    if (localStorage.getItem("savedEmail")) {
        emailInput.value = localStorage.getItem("savedEmail");
        rememberMe.checked = true;
    }

    // Function to Validate Email Format
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Function to Show Alerts
    function showAlert(message, type) {
        const alertBox = document.createElement("div");
        alertBox.textContent = message;
        alertBox.classList.add("alert", type);
        document.body.appendChild(alertBox);

        setTimeout(() => {
            alertBox.remove();
        }, 3000);
    }
});
x