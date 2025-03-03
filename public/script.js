document.getElementById('addField').addEventListener('click', (event) => {
    event.preventDefault(); 

    const divContainer = document.getElementById('options');

    // Create a new div to hold each field
    const fieldDiv = document.createElement("div");
    fieldDiv.classList.add("field-container");

    fieldDiv.innerHTML = `
        <input type="text" placeholder="Column Name" class="col-name" required> 
        <select class="col-type">
            <option value="VARCHAR(255)">STRING</option>
            <option value="INT">INT</option>
            <option value="FLOAT">FLOAT</option>
            <option value="BIGINT">BIGINT</option>
        </select>
       
    `;
    divContainer.appendChild(fieldDiv);
   
});
document.getElementById('createTable').addEventListener('click',()=>{
     const tableName = document.getElementById('tableName').value
     let fields = [];
     document.querySelectorAll('.field-container').forEach((field)=>{
        let columnName = field.querySelector(".col-name").value.trim();
            let columnType = field.querySelector(".col-type").value;
            if (columnName) {
                fields.push({ columnName, columnType });
            }
     })
     fetch("http://localhost:3000/createTable", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ tableName, fields })
    })
    .then(response => response.json())
    .then(data => alert(data.message))
    .catch(error => console.error("Error:", error));

})


