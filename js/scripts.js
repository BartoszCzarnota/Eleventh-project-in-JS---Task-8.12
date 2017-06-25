// plik scripts.js

var gameState = 'notStarted', //started, // ended,
	player = {
        name: ' ',
        score: 0
    },
    computer = {
        score: 0
    };

var newGameElem = document.getElementById('js-newGameElement'),
    pickElem = document.getElementById('js-playerPickElement'),
    resultsElem = document.getElementById('js-resultsTableElement');
    finalCongratsElem = document.getElementById('js-finalCongratsElement'),
    finalCongratsText = document.getElementById('js-finalCongratsText');

function setGameElements() {
    switch (gameState) {
        case 'started':
            newGameElem.style.display = 'none';
            pickElem.style.display = 'block';
            resultsElem.style.display = 'block';
            finalCongratsElem.style.display = 'none';
            break;
        case 'ended':
        	if (player.score > computer.score) {
        		finalCongratsText.innerHTML = ('Gratulacje ' + player.name + ' wygrałeś! ' + player.score + ' : ' + computer.score);
			} else {
				finalCongratsText.innerHTML = ('' + player.name + ' przegrałeś ' + player.score + ' : ' + computer.score + ' Spróbuj jeszcze raz!');
			};
            newGameBtn.innerText = 'Jeszcze raz';
            pickElem.style.display = 'none';
            resultsElem.style.display = 'none';
            newGameElem.style.display = 'block';
            finalCongratsElem.style.display = 'block';         
            break;
        case 'notStarted':
        default:
            newGameElem.style.display = 'block';
            pickElem.style.display = 'none';
            resultsElem.style.display = 'none';
            finalCongratsElem.style.display = 'none';
    }
}
setGameElements();

var newGameBtn = document.getElementById('js-newGameButton');
	newGameBtn.addEventListener('click', newGame);
	playerNameElem = document.getElementById('js-playerName'),
	playerPointsElem = document.getElementById('js-playerPoints'),
	computerPointsElem = document.getElementById('js-computerPoints');

function newGame() {
    player.name = prompt('Graczu, wpisz swoje imię', 'imię gracza');
    playerNameElem.innerHTML = player.name;

    if (player.name) {
        player.score = computer.score = 0;
        gameState = 'started';
        setGameElements();
        setGamePoints();
    }
}

var playerPickElem = document.getElementById('js-playerPick'),
    computerPickElem = document.getElementById('js-computerPick'),
    playerResultElem = document.getElementById('js-playerResult'),
    computerResultElem = document.getElementById('js-computerResult');
	pickRock = document.getElementById('js-playerPick_rock'),
    pickPaper = document.getElementById('js-playerPick_paper'),
    pickScissors = document.getElementById('js-playerPick_scissors');
	
	pickRock.addEventListener('click', function() {
    	playerPick('kamień')
	});
	pickPaper.addEventListener('click', function() {
    	playerPick('papier')
	});
	pickScissors.addEventListener('click', function() {
	    playerPick('nożyce')
	});


function playerPick(playerPick) {
    var computerPick = getComputerPick();

    playerPickElem.innerHTML = playerPick;
    computerPickElem.innerHTML = computerPick;

    checkRoundWinner(playerPick, computerPick);
}

function getComputerPick() {
    var possiblePicks = ['kamień', 'papier', 'nożyce'];
    return possiblePicks[Math.floor(Math.random() * 3)];
}

function setGamePoints() {
    playerPointsElem.innerHTML = player.score;
    computerPointsElem.innerHTML = computer.score;
}

function checkRoundWinner(playerPick, computerPick) {
    playerResultElem.innerHTML = computerResultElem.innerHTML = '';

    var winnerIs = 'player';

    if (playerPick == computerPick) {
        winnerIs = 'none'; // remis
    } else if (
        (computerPick == 'kamień' && playerPick == 'nożyce') ||
        (computerPick == 'nożyce' && playerPick == 'papier') ||
        (computerPick == 'papier' && playerPick == 'kamień')) {

        winnerIs = 'computer';
    }

    if (winnerIs == 'player') {
        playerResultElem.innerHTML = "Wygrana!";
        player.score++;
    } else if (winnerIs == 'computer') {
        computerResultElem.innerHTML = "Wygrana!";
        computer.score++;
    }
    setGamePoints();
    endGame();

    function endGame() {
        if (player.score == 10 || computer.score == 10) {
            gameState = 'ended';
            setGameElements();
        }
    }
}