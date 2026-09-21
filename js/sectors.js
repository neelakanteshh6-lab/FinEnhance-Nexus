const userData = localStorage.getItem("user");

if (!userData) {
    window.location.href = "login.html";
}

const user = JSON.parse(userData);

document.getElementById("userName").textContent = user.first_name;

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

                <button>
                    EXPLORE
                </button>
            `;

            card.querySelector("button")
                .addEventListener("click", () => {
                    loadSubSectors(
                        sector.id,
                        sector.name
                    );
                });

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


async function loadSubSectors(sectorId, sectorName) {
    try {
        const response = await fetch(
            `http://127.0.0.1:5000/api/sectors/${sectorId}/sub-sectors`
        );

        const data = await response.json();

        if (!data.success) {
            sectorsGrid.innerHTML =
                "<p>Unable to load sub-sectors.</p>";
            return;
        }

        sectorsGrid.innerHTML = `
            <div class="sub-sector-header">
                <button id="backButton">
                    ← BACK TO SECTORS
                </button>

                <h2>${sectorName}</h2>

                <p>
                    Select a sub-sector
                </p>
            </div>
        `;

        const subSectorGrid =
            document.createElement("div");

        subSectorGrid.className = "sectors-grid";

        data.sub_sectors.forEach(
            (subSector, index) => {

                const card =
                    document.createElement("div");

                card.className = "sector-card";

                card.innerHTML = `
                    <div class="sector-number">
                        ${String(index + 1).padStart(2, "0")}
                    </div>

                    <h3>${subSector.name}</h3>

                    <button>
                        EXPLORE
                    </button>
                `;

                card.querySelector("button")
                    .addEventListener("click", () => {
                        alert(
                            `You selected ${subSector.name} under ${sectorName}.`
                        );
                    });

                subSectorGrid.appendChild(card);
            }
        );

        sectorsGrid.appendChild(subSectorGrid);

        document.getElementById("backButton")
            .addEventListener("click", loadSectors);

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


document.getElementById("logoutButton")
    .addEventListener("click", function() {

        localStorage.removeItem("user");
        localStorage.removeItem("selectedSector");

        window.location.href = "login.html";
    });


loadSectors();