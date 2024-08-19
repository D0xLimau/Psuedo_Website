document.getElementById("reset-password-form").addEventListener("submit", function(event) {
    event.preventDefault();

    var usernameOrEmail = document.getElementById("username-or-email").value;
    var newPassword = document.getElementById("new-password").value;
    var confirmPassword = document.getElementById("confirm-password").value;
    var resetPasswordMessage = document.getElementById("reset-password-message");

    // Check if the new password and confirm password match
    if (newPassword === confirmPassword) {
        // Perform the password reset logic here, such as storing the new password on the server or in local storage
        // This part of the logic should be implemented based on your specific application requirements

        // Example: Look up matching username or email address in local storage and update the password
        var found = false;
        for (var i = 0; i < localStorage.length; i++) {
            var key = localStorage.key(i);
            var userObject = JSON.parse(localStorage.getItem(key));
            if (key === usernameOrEmail || userObject.email === usernameOrEmail) {
                userObject.password = newPassword;
                localStorage.setItem(key, JSON.stringify(userObject));
                found = true;
                break;
            }
        }

        if (found) {
            // Display a success message for password reset
            resetPasswordMessage.textContent = "Password reset successful!";
            resetPasswordMessage.style.color = "green";

             
             var countdown = 2;
             var countdownMessage = document.createElement("p");
             countdownMessage.textContent = "Return to Login Page in " + countdown + " second...";
             resetPasswordMessage.appendChild(countdownMessage);

            var countdownInterval = setInterval(function() {
            countdown--;
            countdownMessage.textContent = "在Return to Login Page in " + countdown + " second...";
            if (countdown <= 0) {
            clearInterval(countdownInterval);
            
            window.location.href = "login.html";
        }
    }, 1000);
        } else {
            // Display a message when the username or email address is not found
            resetPasswordMessage.textContent = "Username or email not found. Please try again.";
            resetPasswordMessage.style.color = "red";
        }
    } else {
        // Display a message when passwords do not match
        resetPasswordMessage.textContent = "Passwords do not match. Please try again.";
        resetPasswordMessage.style.color = "red";
    }
});
