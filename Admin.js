// Add styles directly to the head of the HTML document
const styleElement = document.createElement('style');
styleElement.innerHTML = `
    /* Table Styles */
    table {
        width: 50%;
        border-collapse: collapse;
        margin: 20px auto;
    }

    th, td {
        border: 1px solid black;
        padding: 8px;
        text-align: center;
    }

    th{
        background-color: rgb(35, 166, 218);
        color:white;
        font-weight:bold;
    }
    /* Button Styles */
    .Button {
        color: white;
        background-color: rgb(11, 11, 141);
        border: 1px solid rgb(11, 11, 141);
        transition-duration: 0.3s;
        padding: 8px 20px;
        font-weight: bold;
        border-radius: 4px;
        cursor: pointer;
        margin: 20px auto; /* Center the button horizontally */
        display: block; /* Ensure the button takes the full width */
    }

    .Button:hover {
        background-color: rgb(35, 166, 218);
        border-color: rgb(35, 166, 218);
    }

    /* "Go to Home" Button Styles */
    button {
        color: white;
        background-color: rgb(11, 11, 141);
        border: 1px solid rgb(11, 11, 141);
        transition-duration: 0.3s;
        padding: 8px 20px;
        font-weight: bold;
        border-radius: 4px;
        cursor: pointer;
        margin: 20px auto; /* Center the button horizontally */
        display: block; /* Ensure the button takes the full width */
    }

    button:hover {
        background-color: rgb(35, 166, 218);
        border-color: rgb(35, 166, 218);
    }
`;

// Insert the styles into the head of the HTML document
document.head.insertAdjacentElement('beforeend', styleElement);

// Rest of your existing code
document.getElementById('masterPasswordForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const masterPassword = document.getElementById('masterPassword').value;
    if (masterPassword === 'brecw') {
        toggleVisibility(true);
        displayVoteResults();
    } else {
        alert('Wrong master password. Enter the correct one.');
    }
});

function toggleVisibility(isLoggedIn) {
    const elementsToHide = document.querySelectorAll('.MasterPasswordContainer');
    const elementsToShow = document.querySelectorAll('#votingResults');
    const buttons = document.querySelectorAll('.LoginButton, .AdminButton');
    
    elementsToHide.forEach(el => {
        el.style.display = isLoggedIn ? 'none' : 'block';
    });
    
    elementsToShow.forEach(el => {
        el.style.display = isLoggedIn ? 'block' : 'none';
    });
    
    buttons.forEach(button => {
        button.style.display = isLoggedIn ? 'none' : 'block';
    });
}

// function displayVoteResults() {
//     console.log('Displaying vote results...');
//     const voteCounts = {
//         'Narendra Modi': 0,
//         'Chandrababu Naidu': 0,
//         'Pinarayi Vijayan': 0,
//         'Rahul Gandhi': 0
//     };

//     for (let i = 1; ; i++) {
//         const encryptedVote = localStorage.getItem(`encryptedVote${i}`);
//         if (!encryptedVote) break;
//         const decryptedVote = decryptVote(encryptedVote)
//         //.toLowerCase(); Convert to lower case
//         voteCounts[decryptedVote]++;
//     }

//     console.log('Vote Counts:', voteCounts);

//     const tableContainer = document.getElementById('votingResults');
//     tableContainer.innerHTML = '';

//     const table = document.createElement('table');
//     const headerRow = document.createElement('tr');
//     const header1 = document.createElement('th');
//     header1.textContent = 'Nominees';
//     const header2 = document.createElement('th');
//     header2.textContent = 'No. of Votes Casted';
//     headerRow.appendChild(header1);
//     headerRow.appendChild(header2);
//     table.appendChild(headerRow);

//     for (const nominee in voteCounts) {
//         const row = document.createElement('tr');
//         const cell1 = document.createElement('td');
//         cell1.textContent = nominee;
//         const cell2 = document.createElement('td');
//         cell2.textContent = voteCounts[nominee];
//         row.appendChild(cell1);
//         row.appendChild(cell2);
//         table.appendChild(row);
//     }

//     table.style.width = '50%';
//     table.style.borderCollapse = 'collapse';
//     table.style.margin = '20px auto';

//     const thElements = table.querySelectorAll('th, td');
//     thElements.forEach(element => {
//         element.style.border = '1px solid black';
//         element.style.padding = '8px';
//         element.style.textAlign = 'center';
//     });

//     const goToHomeButton = document.createElement('button');
//     goToHomeButton.textContent = 'Go to Home';
//     goToHomeButton.addEventListener('click', function () {
//         window.location.href = 'http://localhost/OnlineVotingSystem/index.html';
//     });

//     tableContainer.appendChild(table);
//     tableContainer.appendChild(goToHomeButton);
// }

// function decryptVote(encryptedVote) {
//     const key = 'PraharshaSathvikaVaishnavi';
//     const decodedEncryptedVote = atob(encryptedVote);
//     let decryptedVote = '';
//     for (let i = 0; i < decodedEncryptedVote.length; i++) {
//         decryptedVote += String.fromCharCode(decodedEncryptedVote.charCodeAt(i) ^ key);
//     }
//     return decryptedVote.trim();
// }

async function displayVoteResults() {
    console.log('Displaying vote results...');
    const voteCounts = {
        'Narendra Modi': 0,
        'Chandrababu Naidu': 0,
        'Pinarayi Vijayan': 0,
        'Rahul Gandhi': 0
    };

    for (let i = 1; ; i++) {
        const encryptedVote = localStorage.getItem(`encryptedVote${i}`);
        if (!encryptedVote) break;

        const decryptedVote = await decryptVote(encryptedVote); // ✅ await here
        if (voteCounts.hasOwnProperty(decryptedVote)) {
            voteCounts[decryptedVote]++;
        }
    }

    console.log('Vote Counts:', voteCounts);

    const tableContainer = document.getElementById('votingResults');
    tableContainer.innerHTML = '';

    const table = document.createElement('table');
    const headerRow = document.createElement('tr');
    const header1 = document.createElement('th');
    header1.textContent = 'Nominees';
    const header2 = document.createElement('th');
    header2.textContent = 'No. of Votes Casted';
    headerRow.appendChild(header1);
    headerRow.appendChild(header2);
    table.appendChild(headerRow);

    for (const nominee in voteCounts) {
        const row = document.createElement('tr');
        const cell1 = document.createElement('td');
        cell1.textContent = nominee;
        const cell2 = document.createElement('td');
        cell2.textContent = voteCounts[nominee];
        row.appendChild(cell1);
        row.appendChild(cell2);
        table.appendChild(row);
    }

    tableContainer.appendChild(table);

    const goToHomeButton = document.createElement('button');
    goToHomeButton.textContent = 'Go to Home';
    goToHomeButton.addEventListener('click', function () {
        window.location.href = 'http://localhost/OnlineVotingSystem/index.html';
    });

    tableContainer.appendChild(goToHomeButton);
}


async function decryptVote(encryptedVote) {
    const secretKey = "PraharshaSathvikaVaishnavi";
    const enc = new TextEncoder();
    const dec = new TextDecoder();

    // Import key
    const key = await crypto.subtle.importKey(
        "raw",
        enc.encode(secretKey).slice(0, 32),
        { name: "AES-GCM" },
        false,
        ["decrypt"]
    );

    const data = Uint8Array.from(atob(encryptedVote), c => c.charCodeAt(0));
    const iv = data.slice(0, 12);
    const ciphertext = data.slice(12);

    const decrypted = await crypto.subtle.decrypt(
        { name: "AES-GCM", iv },
        key,
        ciphertext
    );

    return dec.decode(decrypted).trim();
}