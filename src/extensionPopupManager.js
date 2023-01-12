
function fetchLatestUpdate() { 
    let range = "metadata!A1:B1"
    let url =  `https://sheets.googleapis.com/v4/spreadsheets/1hW-bfeFKSkEDzfjaDMjDQmgsupEZz3gysXpG0mrf6QE/values/${range}?key=AIzaSyDDAE3rf1fjLGKM0FUHQeTcsmS6fCQjtDs`
    fetch(url)
    .then(data => data.json())
    .then(data => parseData(data))
    .then(data => setTextToElement(data))
}

function parseData(data) { 
    return data["values"][0][1]
}

function setTextToElement(text) { 
    document.getElementById("latest-update-date").textContent = text
}

fetchLatestUpdate()