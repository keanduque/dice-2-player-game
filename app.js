/**
 * Author : Kean Duque
 * Description : Pig Dice Game 2 Players
 */


var scores,
    roundScore,
    activePlayer,
    gamePlaying,
    prevDice,
    inputScore;

init();

$q('.btn-roll').addEventListener('click', function (){
    if (gamePlaying){
        var dice1 = Math.ceil(Math.random() * 6);
        var dice2 = Math.ceil(Math.random() * 6);

        /*  var diceDOM = $q('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png'; */

        document.getElementById('dice-1').style.display = 'block';
        document.getElementById('dice-2').style.display = 'block';
        document.getElementById('dice-1').src = 'src/dice-' + dice1 + '.png';
        document.getElementById('dice-2').src = 'src/dice-' + dice2 + '.png';

        if (dice1 !== 1 && dice2 !== 1) {
            roundScore += dice1 + dice2;
            $q('#current-'+activePlayer).textContent = roundScore;
        } else {
            nextPlayer();
            //diceDOM.style.display = 'none';
            document.getElementById('dice-1').style.display = 'none';
            document.getElementById('dice-2').style.display = 'none';
        }

    /*====== CODE Challenge for when the dice are equal to 6 the entire score will be 0;
        if(dice === prevDice && prevDice === 6){
            console.log('match 6');
            scores[activePlayer] = 0;
            $q('#score-'+activePlayer).textContent = 0;
            nextPlayer();
        } else if (dice !== 1) {
            roundScore += dice;
            $q('#current-'+activePlayer).textContent = roundScore;
        } else {
            nextPlayer();
            diceDOM.style.display = 'none';
        }
        prevDice = dice;
        console.log('previous dice', prevDice);
        } else {
        prevDice = 0; */
    }
});

$q('.btn-hold').addEventListener('click', function () {
    if (gamePlaying){

        //add current score to Global  score
        scores[activePlayer] += roundScore;

        //update the UI
        document.getElementById('score-'+activePlayer).textContent = scores[activePlayer];

        //check if player won the game
        var nameDOM = document.getElementById('name-'+activePlayer);

        if(scores[activePlayer] >= inputScore) {
            nameDOM.textContent = 'WINNER!';
            $q('#dice-1').style.display = 'none';
            $q('#dice-2').style.display = 'none';
            $q('.player-'+ activePlayer + '-panel').classList.add('winner');
            $q('.player-'+ activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            //next player
            nextPlayer();
        }
    }
});

$q('.btn-new').addEventListener('click', init);

$q('.btn-input-score').addEventListener('click', function () {
    inputScore = document.querySelector('#input-score').value;

    if (inputScore === '0'){
        alert('please enter value greater than 0');
    } else {
        document.querySelector('.target-score').textContent = inputScore;
    }
});

function nextPlayer(){
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;

    $q('.player-0-panel').classList.toggle('active');
    $q('.player-1-panel').classList.toggle('active');
}

function init(){
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    prevDice = 0;
    inputScore = 100;

    $q('#dice-1').style.display = 'none';
    $q('#dice-2').style.display = 'none';
    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    $q('.player-0-panel').classList.remove('winner');
    $q('.player-1-panel').classList.remove('winner');
    $q('.player-0-panel').classList.remove('active');
    $q('.player-1-panel').classList.remove('active');
    $q('.player-0-panel').classList.add('active');

    document.querySelector('#input-score').value = 100;
    document.querySelector('.target-score').textContent = inputScore;
}

function $q(query){
    var retQuery = document.querySelector(query);

    return retQuery;
}