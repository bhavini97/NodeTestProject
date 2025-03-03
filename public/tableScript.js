console.log("Script Loaded!");

window.addEventListener("DOMContentLoaded", function () {
    fetch("http://localhost:3000/getTables")
        .then(response => response.json())
        .then(data => {
            console.log("Tables API Response:", data); 

            const tablesDiv = document.getElementById("tables");
            tablesDiv.innerHTML = "<h3>Available Tables</h3>";

            if (!data.tables || data.tables.length === 0) {
                tablesDiv.innerHTML += "<p>No tables found.</p>";
                return;
            }

            const ul = document.createElement("ul");
            ul.style.listStyleType = "none";
            ul.style.padding = "0";

            data.tables.forEach(table => {
                const li = document.createElement("li");
                li.textContent = table;
                li.style.background = "#fff";
                li.style.padding = "8px";
                li.style.margin = "4px";
                li.style.border = "1px solid #ddd";
                li.style.borderRadius = "5px";

                ul.appendChild(li);
            });

            tablesDiv.appendChild(ul);
        })
        .catch(error => console.error("Error fetching tables:", error));
});
