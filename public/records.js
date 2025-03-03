//  Fetch Tables on Page Load
document.addEventListener("DOMContentLoaded", function () {
    fetch("http://localhost:3000/getTables")
        .then(response => response.json())
        .then(data => {
            const dropdown = document.getElementById("tableDropdown");
            data.tables.forEach(table => {
                const option = document.createElement("option");
                option.value = table;
                option.textContent = table;
                dropdown.appendChild(option);
            });
        })
        .catch(error => console.error("Error fetching tables:", error));
});

// Fetch Columns for Selected Table
function fetchColumns() {
    const tableName = document.getElementById("tableDropdown").value;
    if (!tableName) return;

    fetch(`http://localhost:3000/getColumns/${tableName}`)
        .then(response => response.json())
        .then(data => {
            const columnInputs = document.getElementById("columnInputs");
            columnInputs.innerHTML = "";

            data.columns.forEach(column => {
                if (column === "id") return; // Skip ID column

                const label = document.createElement("label");
                label.textContent = column;

                const input = document.createElement("input");
                input.type = "text";
                input.name = column;

                columnInputs.appendChild(label);
                columnInputs.appendChild(input);
                columnInputs.appendChild(document.createElement("br"));
            });
        })
        .catch(error => console.error("Error fetching columns:", error));
}

// Insert Record
document.getElementById("recordForm").addEventListener("submit", function (event) {
    event.preventDefault();
    const tableName = document.getElementById("tableDropdown").value;
    if (!tableName) return alert("Please select a table.");

    const inputs = document.querySelectorAll("#columnInputs input");
    const record = {};

    inputs.forEach(input => {
        if (input.value.trim()) record[input.name] = input.value.trim();
    });

    fetch("http://localhost:3000/insertRecord", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tableName, record })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        fetchRecords(); // Reload records
    })
    .catch(error => console.error("Error inserting record:", error));
});

//  Fetch and Display Records

function fetchRecords() {
    const tableName = document.getElementById("tableDropdown").value;
    if (!tableName) return alert("Please select a table.");

    fetch(`http://localhost:3000/getRecords/${tableName}`)
        .then(response => response.json())
        .then(data => {
            const tableHead = document.getElementById("tableHead");
            const tableBody = document.getElementById("tableBody");

            tableHead.innerHTML = "";
            tableBody.innerHTML = "";

            if (!data.records.length) {
                alert("No records found.");
                return;
            }

            // Create Header Row
            const headers = Object.keys(data.records[0]);
            const headerRow = document.createElement("tr");

            headers.forEach(header => {
                const th = document.createElement("th");
                th.textContent = header;
                headerRow.appendChild(th);
            });

            // Add Delete Column
            const deleteTh = document.createElement("th");
            deleteTh.textContent = "Actions";
            headerRow.appendChild(deleteTh);
            tableHead.appendChild(headerRow);

            // Create Data Rows
            data.records.forEach(record => {
                const tr = document.createElement("tr");

                headers.forEach(header => {
                    const td = document.createElement("td");
                    td.textContent = record[header];
                    tr.appendChild(td);
                });

                // Add Delete Button
                const deleteTd = document.createElement("td");
                const deleteBtn = document.createElement("button");
                deleteBtn.textContent = "Delete";
                deleteBtn.onclick = () => deleteRecord(tableName, record.id);
                deleteTd.appendChild(deleteBtn);
                tr.appendChild(deleteTd);

                tableBody.appendChild(tr);
            });
        })
        .catch(error => console.error("Error fetching records:", error));
}

//  Delete Record Function
function deleteRecord(tableName, id) {
    
    fetch(`http://localhost:3000/deleteRecord/${tableName}/${id}`, {
        method: "DELETE"
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        fetchRecords(); // Reload records after deletion
    })
    .catch(error => console.error("Error deleting record:", error));
}
