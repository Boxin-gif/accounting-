const apiUrl = "你的 Google Apps Script 網址";

const form = document.getElementById("recordForm");
const recordsContainer = document.getElementById("records");

// 載入記錄
async function loadRecords() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        recordsContainer.innerHTML = "";
        for (let i = 1; i < data.length; i++) {
            const [date, category, amount, note] = data[i];
            const recordElement = document.createElement("div");
            recordElement.classList.add("record");
            recordElement.innerHTML = `
                <p><strong>日期：</strong>${date}</p>
                <p><strong>類別：</strong>${category}</p>
                <p><strong>金額：</strong>${amount}</p>
                <p><strong>備註：</strong>${note}</p>
            `;
            recordsContainer.appendChild(recordElement);
        }
    } catch (error) {
        console.error("讀取紀錄錯誤：", error);
    }
}

// 新增記錄
form.addEventListener("submit", async function (e) {
    e.preventDefault();
    const date = document.getElementById("date").value;
    const category = document.getElementById("category").value;
    const amount = Number(document.getElementById("amount").value);
    const note = document.getElementById("note").value;

    const newRecord = { date, category, amount, note };

    await fetch(apiUrl, {
        method: "POST",
        body: JSON.stringify(newRecord),
        headers: { "Content-Type": "application/json" },
        mode: "no-cors"
    });

    form.reset();
    alert("記帳成功！");
    setTimeout(loadRecords, 2000);
});

window.addEventListener("load", loadRecords);
