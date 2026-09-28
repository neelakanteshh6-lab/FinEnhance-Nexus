/* =========================================
   FINENHANCE NEXUS
   STOCK MARKET INTERFACE
========================================= */

const API_BASE_URL = "http://127.0.0.1:5000";

const params = new URLSearchParams(window.location.search);

const sectorId = params.get("sector_id");
const sectorName = params.get("sector");
const subSectorId = params.get("sub_sector_id");
const subSectorName = params.get("sub_sector");


const subSectorTitle =
    document.getElementById("subSectorName");

const sectorTitle =
    document.getElementById("sectorName");

const stocksTableBody =
    document.getElementById("stocksTableBody");

const stockCount =
    document.getElementById("stockCount");

const advancingCount =
    document.getElementById("advancingCount");

const decliningCount =
    document.getElementById("decliningCount");

const lastUpdated =
    document.getElementById("lastUpdated");

const stockSearch =
    document.getElementById("stockSearch");

const stockSort =
    document.getElementById("stockSort");

const backButton =
    document.getElementById("backButton");

const marketStatusText =
    document.getElementById("marketStatusText");

const marketStatusDot =
    document.getElementById("marketStatusDot");

const chartStockName =
    document.getElementById("chartStockName");

const chartPrice =
    document.getElementById("chartPrice");

const chartChange =
    document.getElementById("chartChange");

const chartLine =
    document.getElementById("chartLine");


let stocks = [];

let selectedStock = null;


/* =========================================
   DISPLAY SECTOR INFORMATION
========================================= */

if (sectorName) {
    sectorTitle.textContent = sectorName;
}

if (subSectorName) {
    subSectorTitle.textContent = subSectorName;
}


/* =========================================
   LOAD STOCKS
========================================= */

async function loadStocks() {

    stocksTableBody.innerHTML = `
        <tr>
            <td colspan="10" class="loading-cell">
                Loading stock market data...
            </td>
        </tr>
    `;

    try {

        const url =
            `${API_BASE_URL}/api/stocks` +
            `?sector_id=${encodeURIComponent(sectorId)}` +
            `&sub_sector_id=${encodeURIComponent(subSectorId)}`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(
                `HTTP error ${response.status}`
            );
        }

        const data = await response.json();

        if (!data.success) {

            throw new Error(
                data.message || "Unable to load stocks"
            );
        }

        stocks = data.stocks || [];

        renderStocks();

        updateMarketSummary();

        updateLastUpdated();

        marketStatusText.textContent =
            "LIVE MARKET DATA";

        marketStatusDot.classList.add("active");

    }

    catch (error) {

        console.error(error);

        stocksTableBody.innerHTML = `
            <tr>
                <td colspan="10" class="loading-cell">
                    Unable to load stock market data.
                    Make sure Flask is running.
                </td>
            </tr>
        `;

        marketStatusText.textContent =
            "DATA UNAVAILABLE";

        marketStatusDot.classList.remove("active");
    }
}


/* =========================================
   RENDER STOCKS
========================================= */

function renderStocks() {

    const searchValue =
        stockSearch.value
            .trim()
            .toLowerCase();


    let filteredStocks =
        stocks.filter(stock => {

            return (
                stock.company_name
                    .toLowerCase()
                    .includes(searchValue)
                ||
                stock.symbol
                    .toLowerCase()
                    .includes(searchValue)
            );

        });


    const sortValue =
        stockSort.value;


    if (sortValue === "name") {

        filteredStocks.sort(
            (a, b) =>
                a.company_name.localeCompare(
                    b.company_name
                )
        );

    }


    else if (sortValue === "price") {

        filteredStocks.sort(
            (a, b) =>
                b.last_price - a.last_price
        );

    }


    else if (sortValue === "change") {

        filteredStocks.sort(
            (a, b) =>
                b.change_percent -
                a.change_percent
        );

    }


    else if (sortValue === "volume") {

        filteredStocks.sort(
            (a, b) =>
                b.volume - a.volume
        );

    }


    if (filteredStocks.length === 0) {

        stocksTableBody.innerHTML = `
            <tr>
                <td colspan="10" class="loading-cell">
                    No stocks found.
                </td>
            </tr>
        `;

        return;
    }


    stocksTableBody.innerHTML = "";


    filteredStocks.forEach(
        (stock, index) => {

            const row =
                document.createElement("tr");


            const positive =
                stock.change >= 0;


            const changeClass =
                positive
                    ? "positive"
                    : "negative";


            row.innerHTML = `

                <td>
                    ${index + 1}
                </td>

                <td>

                    <button
                        class="company-button"
                    >
                        ${escapeHTML(
                            stock.company_name
                        )}
                    </button>

                </td>

                <td>
                    ${escapeHTML(
                        stock.symbol
                    )}
                </td>

                <td>
                    ₹${formatNumber(
                        stock.last_price
                    )}
                </td>

                <td
                    class="${changeClass}"
                >
                    ${positive ? "+" : ""}
                    ${formatNumber(
                        stock.change
                    )}
                </td>

                <td
                    class="${changeClass}"
                >
                    ${positive ? "+" : ""}
                    ${formatNumber(
                        stock.change_percent
                    )}%
                </td>

                <td>
                    ₹${formatNumber(
                        stock.open
                    )}
                </td>

                <td>
                    ₹${formatNumber(
                        stock.high
                    )}
                </td>

                <td>
                    ₹${formatNumber(
                        stock.low
                    )}
                </td>

                <td>
                    ${formatVolume(
                        stock.volume
                    )}
                </td>

            `;


            row
                .querySelector(".company-button")
                .addEventListener(
                    "click",
                    () => {

                        selectStock(stock);

                    }
                );


            stocksTableBody.appendChild(row);

        }
    );
}


/* =========================================
   SELECT STOCK
========================================= */

function selectStock(stock) {

    selectedStock = stock;

    chartStockName.textContent =
        stock.company_name;

    chartPrice.textContent =
        `₹${formatNumber(stock.last_price)}`;


    const positive =
        stock.change >= 0;


    chartChange.textContent =
        `${positive ? "+" : ""}` +
        `${formatNumber(
            stock.change
        )} ` +
        `(${positive ? "+" : ""}` +
        `${formatNumber(
            stock.change_percent
        )}%)`;


    chartChange.className =
        positive
            ? "positive"
            : "negative";


    drawPriceChart(stock);

}


/* =========================================
   PRICE CHART
========================================= */

function drawPriceChart(stock) {

    if (
        !stock.price_history ||
        stock.price_history.length === 0
    ) {

        chartLine.setAttribute(
            "points",
            ""
        );

        return;

    }


    const prices =
        stock.price_history;


    const width = 1000;

    const height = 350;

    const padding = 25;


    const minPrice =
        Math.min(...prices);

    const maxPrice =
        Math.max(...prices);


    const range =
        maxPrice - minPrice || 1;


    const points =
        prices.map(
            (price, index) => {

                const x =
                    padding +
                    (
                        index /
                        (prices.length - 1)
                    ) *
                    (
                        width -
                        padding * 2
                    );


                const y =
                    height -
                    padding -
                    (
                        (
                            price -
                            minPrice
                        ) /
                        range
                    ) *
                    (
                        height -
                        padding * 2
                    );


                return `${x},${y}`;

            }
        );


    chartLine.setAttribute(
        "points",
        points.join(" ")
    );

}


/* =========================================
   MARKET SUMMARY
========================================= */

function updateMarketSummary() {

    stockCount.textContent =
        stocks.length;


    const advancing =
        stocks.filter(
            stock =>
                stock.change > 0
        ).length;


    const declining =
        stocks.filter(
            stock =>
                stock.change < 0
        ).length;


    advancingCount.textContent =
        advancing;


    decliningCount.textContent =
        declining;

}


/* =========================================
   LAST UPDATED
========================================= */

function updateLastUpdated() {

    const now =
        new Date();


    lastUpdated.textContent =
        now.toLocaleTimeString(
            "en-IN",
            {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit"
            }
        );

}


/* =========================================
   SEARCH
========================================= */

stockSearch.addEventListener(
    "input",
    renderStocks
);


/* =========================================
   SORT
========================================= */

stockSort.addEventListener(
    "change",
    renderStocks
);


/* =========================================
   BACK BUTTON
========================================= */

backButton.addEventListener(
    "click",
    function() {

        window.history.back();

    }
);


/* =========================================
   LOGOUT
========================================= */

document
    .getElementById("logoutButton")
    .addEventListener(
        "click",
        function() {

            localStorage.removeItem(
                "user"
            );

            localStorage.removeItem(
                "selectedSector"
            );

            window.location.href =
                "login.html";

        }
    );


/* =========================================
   HTML SAFETY
========================================= */

function escapeHTML(value) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}


/* =========================================
   NUMBER FORMATTING
========================================= */

function formatNumber(value) {

    const number =
        Number(value);


    if (!Number.isFinite(number)) {
        return "--";
    }


    return number.toLocaleString(
        "en-IN",
        {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }
    );

}


/* =========================================
   VOLUME FORMATTING
========================================= */

function formatVolume(value) {

    const number =
        Number(value);


    if (!Number.isFinite(number)) {
        return "--";
    }


    if (number >= 10000000) {

        return (
            number / 10000000
        ).toFixed(2) + " Cr";

    }


    if (number >= 100000) {

        return (
            number / 100000
        ).toFixed(2) + " L";

    }


    if (number >= 1000) {

        return (
            number / 1000
        ).toFixed(2) + " K";

    }


    return number.toString();

}


/* =========================================
   INITIAL LOAD
========================================= */

loadStocks();


/*
    TEMPORARY REFRESH

    This will later be replaced by
    genuine WebSocket market streaming.

    For now it refreshes the API every
    5 seconds.
*/

setInterval(
    loadStocks,
    5000
);