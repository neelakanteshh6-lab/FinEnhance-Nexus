const userData = localStorage.getItem("user");

if (!userData) {
    window.location.href = "login.html";
}

const user = JSON.parse(userData);

document.getElementById("userName").textContent =
    user.first_name;

const sectorsGrid = document.getElementById("sectorsGrid");

async function loadSectors() {

    try {

        const response = await fetch(
            "http://127.0.0.1:5000/api/sectors"
        );

        const data = await response.json();

        if (!data.success) {
            sectorsGrid.innerHTML =
                "<p>Unable to load sectors.</p>";
            return;
        }

        sectorsGrid.innerHTML = "";

        data.sectors.forEach((sector, index) => {

            const card = document.createElement("div");

            card.className = "sector-card";

            card.innerHTML = `
                <div class="sector-number">
                    ${String(index + 1).padStart(2, "0")}
                </div>

                <h3>${sector.name}</h3>

                <button onclick="selectSector(${sector.id}, '${sector.name}')">
                    EXPLORE
                </button>
            `;

            sectorsGrid.appendChild(card);
        });

    } catch (error) {

        console.error(error);

        sectorsGrid.innerHTML = `
            <p>
                Cannot connect to backend.
                Make sure Flask is running.
            </p>
        `;
    }
}

function selectSector(id, name) {

    localStorage.setItem(
        "selectedSector",
        JSON.stringify({
            id: id,
            name: name
        })
    );

    alert(
        `You selected the ${name} sector.`
    );
}

document.getElementById("logoutButton")
    .addEventListener("click", function() {

        localStorage.removeItem("user");
        localStorage.removeItem("selectedSector");

        window.location.href = "login.html";
    });

loadSectors();