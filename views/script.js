function sendData() {
    title = document.getElementById("pasteTitle").value.toString();
    input = document.getElementById("pasteInput").value.toString();
    console.log("title = " + title + " " + "input = " + input);
    fetch("http://localhost:5000/pastelocal", {
        method: "POST",
        body: JSON.stringify({
            pasteTitle: title,
            pasteInput: input
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then(response => response.json())
    .then(json => console.log(json))
    .catch(error => console.log(error));
}

async function deleteRow(id) {
    try {
        const deletePaste = await fetch(`http://localhost:5000/pastelocal/${id}`, {
            method: "DELETE"
        });
        console.log(deletePaste);
    } catch (error) {
        console.error(error.message);
    }
}

async function getUsers() {
    let url = 'http://localhost:5000/pastelocal';
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

async function renderUsers() {
    let users = await getUsers();
    let tableHTML = '';

    users.forEach((data) => {
        let htmlSegment = `<tr>
                                <td>${data.id}</td>
                                <td>${data.pastetitle}</td>
                                <td>${data.pasteinput}</td>
                                <td>${new Date(data.created_at).toLocaleString()}</td>
                                <td><button onclick= "deleteRow(${data.id}); location.reload();">Delete</button></td>
                            </tr>`;
        tableHTML += htmlSegment;
    });
    const table = document.getElementById("tableBody");
    table.innerHTML = tableHTML;
}

renderUsers();