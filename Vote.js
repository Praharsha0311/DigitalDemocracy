document.addEventListener('DOMContentLoaded', function() {
    // Retrieve full name from wherever it's stored (e.g., URL parameter, session, local storage)
    const urlParams = new URLSearchParams(window.location.search);
    const fullName = urlParams.get('fullName');

    // Display greeting message with full name
    const greetingDiv = document.getElementById('greetingMessage');
    greetingDiv.textContent = `Hey! ${fullName} ,  choose your option:`;
});

function encryptVote(vote) {
    const key = 'PraharshaSathvika';
    let encryptedVote = '';
    vote = vote.trim();
    for (let i = 0; i < vote.length; i++) {
        encryptedVote += String.fromCharCode(vote.charCodeAt(i) ^ key);
    }
    return btoa(encryptedVote); 
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
