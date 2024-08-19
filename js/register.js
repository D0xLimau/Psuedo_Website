document.getElementById("signup-form").addEventListener("submit", function(event) {
    event.preventDefault();

    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var email = document.getElementById("email").value;
    var phoneNo = document.getElementById("phoneNo").value;
    var registerMessage = document.getElementById("signup-message");

    // Check if all fields are provided and phoneNo matches the pattern and email is valid
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!username || !password || !email || !phoneNo) {
        registerMessage.textContent = "Please provide all required information!";
        registerMessage.style.color = "red";
    } else if (!email.match(emailPattern)) {
        registerMessage.textContent = "Please provide a valid email address!";
        registerMessage.style.color = "red";
    } else if (!phoneNo.match(/^\d{3}-\d{7,8}$/)) {
        registerMessage.textContent = "Please provide a valid phone number!";
        registerMessage.style.color = "red";
    } else {
        var userObject = {
            username: username,
            password: password,
            email: email,
            phoneNo: phoneNo
        };

        // Check if the username is already registered
        if (!localStorage.getItem(username)) {
            // Store the user information in local storage
            localStorage.setItem(username, JSON.stringify(userObject));
            registerMessage.textContent = "Sign up successful!";
            registerMessage.style.color = "green";

             // Display countdown timer
            var countdown = 2;
            var countdownMessage = document.createElement("p");
            countdownMessage.textContent = "Return to Login Page in " + countdown + " seconds...";
            registerMessage.appendChild(countdownMessage);

            // Update countdown every second
            var countdownInterval = setInterval(function() {
                countdown--;
                countdownMessage.textContent = "Return to Login Page in " + countdown + " seconds...";
                if (countdown <= 0) {
                    clearInterval(countdownInterval);
                    // Redirect to the login page
                    window.location.href = "login.html";
                }
            }, 1000);
        } else {
            registerMessage.textContent = "Username already exists";
            registerMessage.style.color = "red";
        }
    }
});
