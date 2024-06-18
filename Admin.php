    <!-- <?php
    function decryptVote($encryptedVote) {
        $key = 42;
        $decodedEncryptedVote = base64_decode($encryptedVote);
        $decryptedVote = '';
        for ($i = 0; $i < strlen($decodedEncryptedVote); $i++) {
            $decryptedVote .= chr(ord($decodedEncryptedVote[$i]) ^ $key);
        }
        $decryptedVote = trim($decryptedVote);
        return $decryptedVote;
    }

    if (!isset($_POST['encryptedVote'])) {
        echo "No votes casted yet.";
    } else {
        $votes = $_POST['encryptedVote'];
        $votesArr = explode("\n", $votes);

        echo '<h2>Vote Results</h2>';
        echo '<table>';
        echo '<tr><th>Encrypted Vote</th><th>Voter</th></tr>';

        for ($i = 0; $i < count($votesArr); $i += 2) {
            $encryptedVote = trim($votesArr[$i]); 
            $voterInfo = trim($votesArr[$i + 1]); 

            $decryptedVote = decryptVote($encryptedVote);

            echo "<tr><td>$decryptedVote</td><td>$voterInfo</td></tr>";
        }

        echo '</table>';
    }
    ?> -->
