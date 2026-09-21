const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");

loginForm.addEventListener("submit", async function(event) {
    event.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;

    loginMessage.textContent = "Logging in...";

    try {
        const response = await fetch("http://127.0.0.1:5000/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        const data = await response.json();

        if (data.success) {

            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );

            loginMessage.textContent = "Login successful!";

            setTimeout(() => {
                window.location.href = "sectors.html";
            }, 700);

        } else {
            loginMessage.textContent = data.message;
        }

    } catch (error) {
        console.error(error);

        loginMessage.textContent =
            "Cannot connect to the backend. Make sure Flask is running.";
    }
});