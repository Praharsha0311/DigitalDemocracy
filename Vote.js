document.addEventListener('DOMContentLoaded', function() {
    // Retrieve full name from wherever it's stored (e.g., URL parameter, session, local storage)
    const urlParams = new URLSearchParams(window.location.search);
    const fullName = urlParams.get('fullName');

    // Display greeting message with full name
    const greetingDiv = document.getElementById('greetingMessage');
    greetingDiv.textContent = `Hey! ${fullName} ,  choose your option:`;
});

// function encryptVote(vote) {
//     const key = 'PraharshaSathvikaVaishnavi';
//     let encryptedVote = '';
//     vote = vote.trim();
//     for (let i = 0; i < vote.length; i++) {
//         encryptedVote += String.fromCharCode(vote.charCodeAt(i) ^ key);
//     }
//     return btoa(encryptedVote); 
// }


async function encryptVote(vote) {
    const secretKey = "PraharshaSathvikaVaishnavi";
    const enc = new TextEncoder();

    // Import key (AES-256 from first 32 bytes of your passphrase)
    const key = await crypto.subtle.importKey(
        "raw",
        enc.encode(secretKey).slice(0, 32),
        { name: "AES-GCM" },
        false,
        ["encrypt"]
    );

    const iv = crypto.getRandomValues(new Uint8Array(12)); // Random IV
    const encodedVote = enc.encode(vote.trim());

    const ciphertext = await crypto.subtle.encrypt(
        { name: "AES-GCM", iv },
        key,
        encodedVote
    );

    // Combine IV + ciphertext
    const combined = new Uint8Array(iv.length + ciphertext.byteLength);
    combined.set(iv);
    combined.set(new Uint8Array(ciphertext), iv.length);

    return btoa(String.fromCharCode(...combined)); // Base64 encode
}

function submitVote() {
    const urlParams = new URLSearchParams(window.location.search);
    const fullName = urlParams.get('fullName');
    
    const voterInfo = localStorage.getItem(fullName);
    if (voterInfo) {
        alert(`Sorry, ${fullName}. You have already voted. Thank you!`);
        window.location.href = 'http://localhost/OnlineVotingSystem/index.html';
        return; 
    }

    const selectedOption = document.querySelector('input[name="vote"]:checked');

    if (selectedOption) {
        const selectedValue = selectedOption.value;
        const encryptedVote = encryptVote(selectedValue);
        
        let voteIndex = 1;
        while (localStorage.getItem(`encryptedVote${voteIndex}`)) {
            voteIndex++;
        }

        localStorage.setItem(`encryptedVote${voteIndex}`, encryptedVote);
        localStorage.setItem(fullName, 'voted');
        
        alert('You voted: ' + selectedValue);
        window.location.href = 'http://localhost/OnlineVotingSystem/index.html';
        document.getElementById('voteForm').reset();
        document.getElementById('voteForm').disabled = true;
        console.log("Redirecting to index.html...");
    } else {
        alert('Please select an option to cast your vote.');
    }
}
