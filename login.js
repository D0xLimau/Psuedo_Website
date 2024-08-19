document.addEventListener("DOMContentLoaded", function() {
    // Define a session variable for recording password error attempts
    var errorCount = sessionStorage.getItem("errorCount") || 0;

    // Get the error timestamp
    var errorTimestamp = sessionStorage.getItem("errorTimestamp");

    // Declare the remainingTime variable
    var remainingTime = 0;

    // If the error timestamp exists and the time difference from the current time is more than 20 seconds, reset the error count and timestamp
    if (errorTimestamp) {
        var currentTime = new Date();
        var storedTimestamp = new Date(errorTimestamp);

        // Calculate the time difference (in milliseconds)
        var timeDifference = currentTime - storedTimestamp;

        // If the time difference is more than 20 seconds, reset the error count and timestamp
        if (timeDifference > 20000) { // 20 seconds is equal to 20000 milliseconds
            errorCount = 0;
            sessionStorage.removeItem("errorTimestamp");
        } else {
            // If the time difference is within 20 seconds, calculate the remaining time
            remainingTime = 20000 - timeDifference;
        }
    }

    // Handle form submission
    document.getElementById("login-form").addEventListener("submit", function(event) {
        event.preventDefault();

        var usernameOrEmail = document.getElementById("usernameOrEmail").value;
        var password = document.getElementById("password").value;
        var loginMessage = document.getElementById("login-message");
        var countdownMessage = document.getElementById("countdown-message");

        // Check cookies for remembered user
        window.onload = function() {
            var rememberedUser = getCookie("rememberedUser");
            if (rememberedUser) {
                document.getElementById("usernameOrEmail").value = rememberedUser;
            }
        };

        // Get cookie value
        function getCookie(name) {
            var cookieName = name + "=";
            var cookies = document.cookie.split(";");
            for (var i = 0; i < cookies.length; i++) {
                var cookie = cookies[i].trim();
                if (cookie.indexOf(cookieName) === 0) {
                    return cookie.substring(cookieName.length, cookie.length);
                }
            }
            return null;
        }

        // Check if the number of password errors exceeds 3
        if (errorCount >= 3) {
            loginMessage.textContent = "Too many password errors.";
            loginMessage.style.color = "red";
            return; // Do not execute further login logic
        }

        // Check if username/email and password are provided
        if (usernameOrEmail && password) {
            // Get saved user data from local storage
            var storedUserData = null;

            // Check if the input is in email format
            if (usernameOrEmail.includes("@")) {
                // If it looks like an email, try to find a user by email
                for (var i = 0; i < localStorage.length; i++) {
                    var key = localStorage.key(i);
                    var userObject = JSON.parse(localStorage.getItem(key));
                    if (userObject.email === usernameOrEmail) {
                        storedUserData = userObject;
                        break;
                    }
                }
            } else {
                // If it doesn't look like an email, try to find a user by username
                storedUserData = JSON.parse(localStorage.getItem(usernameOrEmail));
            }

            if (storedUserData) {
                var storedPassword = storedUserData.password;
                var loggedInUsername = storedUserData.username;
                // Check if the password matches
                if (storedPassword === password) {
                    // Reset the error count on successful login
                    localStorage.setItem("loggedInUsername", loggedInUsername);
                    sessionStorage.setItem("errorCount", 0);
                    loginMessage.textContent = "Login successful!";
                    loginMessage.style.color = "green";

                    // Check if Remember Me is checked
                    var rememberMeCheckbox = document.getElementById("rememberMe");
                    if (rememberMeCheckbox.checked) {
                        // Set a cookie to remember the user
                        var expirationDate = new Date();
                        expirationDate.setDate(expirationDate.getDate() + 30); // Remember for 30 days

                        var cookieValue = usernameOrEmail; // Set the cookie value to the username or email
                        var cookieString = "rememberedUser=" + cookieValue + "; expires=" + expirationDate.toUTCString() + "; path=/; SameSite=None; Secure";

                        document.cookie = cookieString;
                    }

                    // If matches, go to the next page
                    window.location.href = "account.html";
                } else {
                    // Password does not match, increase error count
                    errorCount++;
                    sessionStorage.setItem("errorCount", errorCount);

                    if (errorCount == 1) {
                        countdownMessage.textContent = "2 chances left";
                        countdownMessage.style.color = "red";
                    }

                    if (errorCount == 2) {
                        countdownMessage.textContent = "1 chance left";
                        countdownMessage.style.color = "red";
                    }

                    if (errorCount >= 3) {
                        remainingTime = 20; // Set to the waiting time in seconds (20 seconds)

                        // Set a timestamp to track the start of the waiting time
                        var currentTimestamp = new Date();
                        sessionStorage.setItem("errorTimestamp", currentTimestamp);

                        // Display countdown message
                        countdownMessage.textContent = "Too many password errors. Please wait " + remainingTime + " seconds and try again";
                        countdownMessage.style.color = "red";

                        // Start the countdown timer
                        var countdownInterval = setInterval(function() {
                            remainingTime--;
                            countdownMessage.textContent = "Please wait " + remainingTime + " seconds before trying again";

                            if (remainingTime <= 0) {
                                clearInterval(countdownInterval); // Stop the timer when the countdown ends
                                countdownMessage.textContent = ""; // Clear the message

                                // Clear error count and timestamp from the session
                                sessionStorage.setItem("errorCount", 0);
                                sessionStorage.removeItem("errorTimestamp");

                                // Redirect to the login.html page
                                window.location.href = "login.html";
                            }
                        }, 1000); // Update every second
                    } else {
                        loginMessage.textContent = "Invalid password";
                        loginMessage.style.color = "red";
                    }
                }
            } else {
                loginMessage.textContent = "Invalid username, email, or password";
                loginMessage.style.color = "red";
            }
        } else {
            loginMessage.textContent = "Please provide a username or email and password for login";
            loginMessage.style.color = "red";
        }
    });
});

document.addEventListener("DOMContentLoaded", function() {
    // Show/Hide Password Toggle
    const togglePassword = document.querySelector("#togglePassword");
    const password = document.querySelector("#password");

    togglePassword.addEventListener("click", function (e) {
        // Toggle the type attribute
        const type = password.getAttribute("type") === "password" ? "text" : "password";
        password.setAttribute("type", type);

        // Toggle the eye slash icon
        this.classList.toggle("fa-eye-slash");
    });

    // Existing login logic...
    // (Rest of your login.js code)
});
