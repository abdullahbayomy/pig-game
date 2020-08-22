/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let scores, roundScore, activePlayer, gameplaying, lastDise;

init();

document.querySelector('.btn-roll').addEventListener('click', function() {
  if (gameplaying) {
    // 1. Random number
    let dise = Math.floor(Math.random() * 6) + 1;

    // 2. Display the result
    let diseDom = document.querySelector('.dice');
    diseDom.style.display = 'block';
    diseDom.src = `dice-${dise}.png`;

    // 3. Update the round score if the rolled number was Not a 1
    if (lastDise === 6 && dise === 6) {
      // Player loses score
      scores[activePlayer] = 0;
      document.getElementById(`score-${activePlayer}`).textContent =
        scores[activePlayer];
    } else if (dise !== 1) {
      // add score
      roundScore += dise;
      document.querySelector(
        `#current-${activePlayer}`
      ).textContent = roundScore;
    } else {
      // Next Player
      // document.querySelector('.dice').style.display = 'block';
      nextplayer();
    }

    lastDise = dise;
  }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
  if (gameplaying) {
    scores[activePlayer] += roundScore;
    document.getElementById(`score-${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 20) {
      document.getElementById(`name-${activePlayer}`).textContent = 'Winner!';
      document.querySelector('.dice').style.display = 'none';
      document
        .querySelector(`.player-${activePlayer}-panel`)
        .classList.toggle('active');
      document
        .querySelector(`.player-${activePlayer}-panel`)
        .classList.add('winner');
      gameplaying = false;
    } else {
      nextplayer();
    }
  }
});

// Next player
function nextplayer() {
  roundScore = 0;
  document.getElementById(`current-${activePlayer}`).textContent = 0;
  document
    .querySelector(`.player-${activePlayer}-panel`)
    .classList.toggle('active');
  document.querySelector('.dice').style.display = 'none';

  activePlayer === 1 ? (activePlayer = 0) : (activePlayer = 1);

  document
    .querySelector(`.player-${activePlayer}-panel`)
    .classList.toggle('active');
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gameplaying = true;

  document.querySelector('.dice').style.display = 'none';

  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';

  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');

  document.querySelector('.player-0-panel').classList.add('active');
}
