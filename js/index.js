function goToSignup() {
    window.location.href = "signup.html";
}

window.addEventListener("load", () => {
    const beatText = document.getElementById("beatText");
    const landingContent = document.getElementById("landingContent");

    setTimeout(() => {
        beatText.classList.add("show");
    }, 300);

    setTimeout(() => {
        beatText.classList.add("move-up");
        landingContent.classList.add("show");
    }, 2200);
});