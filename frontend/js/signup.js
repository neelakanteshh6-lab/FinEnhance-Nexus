const signupForm = document.getElementById("signupForm");
const signupMessage = document.getElementById("signupMessage");

signupForm.addEventListener("submit", async function(event) {
    event.preventDefault();

    const first_name = document.getElementById("first_name").value.trim();
    const last_name = document.getElementById("last_name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    signupMessage.textContent = "Creating account...";

    try {
        const response = await fetch("http://127.0.0.1:5000/api/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                first_name,
                last_name,
                email,
                password
            })
        });

        const data = await response.json();

        signupMessage.textContent = data.message;

        if (data.success) {
            signupForm.reset();

            setTimeout(() => {
                window.location.href = "login.html";
            }, 1200);
        }

    } catch (error) {
        console.error(error);

        signupMessage.textContent =
            "Cannot connect to the backend. Make sure Flask is running.";
    }
});