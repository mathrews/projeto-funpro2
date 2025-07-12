// Constantes dos elementos da tela que são manipulados
const popups = document.querySelectorAll(".victory-modal-hidden");
const cardContainer = document.querySelector(".card-container");
const attempts = document.querySelector("#attempts[name='attempts']");
const found = document.querySelector("#found[name='found']");
const minutesEl = document.querySelector("#minutes");
const secondsEl = document.querySelector("#seconds");

// Constante dos pares máximos usados na função de criação de pares de cartas.
const maxPairs = 6;

// Constante da classe que ativa a animação de virar a carta
const flipCardInnerAnimation = "flip-card-inner-animation";

// array com as imagens dos assets
const imageCards = [
  "socrates.svg",
  "platao.svg",
  "aristoteles.svg",
  "zenao.svg",
  "epicuro.svg",
  "talesMileto.svg",
  "locke.svg",
];

// Variáveis auxiliar da função de revelação das cartas e combinação das mesmas.
let flippedCards = 0;
let targets = [];

// Função que gera um numero randomico basiado num máximo.
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

// Função de criação de pares.
function createCardPairs() {
  let cards = [];
  let idCounter = 0;
  let usedAssetIndice = [];

  for (let i = 0; i < maxPairs; i++) {
    let index;

    do {
      index = getRandomInt(imageCards.length);
    } while (usedAssetIndice.includes(index));

    usedAssetIndice.push(index);
    let imageName = imageCards[index];

    const card1 = {
      id: idCounter,
      img: `../assets/${imageName}`,
      idEqual: idCounter + 1
    };

    const card2 = {
      id: idCounter + 1,
      img: `../assets/${imageName}`,
      idEqual: idCounter
    };

    cards.push(card1, card2);
    idCounter += 2;
  }
  return cards;
}

// Função que dispõe as cartas e as contagens na tela.
function setupCards() {
  cards = createCardPairs();
  let cards_copy = cards.slice();
  for (let i = 0; i < cards.length; i++) {
    cardId = getRandomInt(cards_copy.length);
    let e = cards_copy[cardId];
    cards_copy.splice(cardId, 1);

    cardContainer.innerHTML += `
			<div class="flip-card" onClick="flipCard(${e.id})">
						<div class="flip-card-inner" data-id="${e.id}" data-idequal="${e.idEqual}">
							<div class="flip-card-front">
								<h1>?</h1>
							</div>
							<div class="flip-card-back">
								<img src="${e.img}"/>
							</div>
						</div>
			</div>
			`;

    attempts.value = 0;
    found.value = 0;
  }
}

// Função que dispara a disposição de cartas ao haver o reload da tela.
window.onload = function () {
  setupCards();
};

// Função que dispara o modal ao ganhar o jogo;
function winGame() {
  const victoryModal = "victory-modal";

  if (popups.length > 0) {
    popups[0].id = victoryModal;
    popups[0].className = "";
  }
}

// Função do botão de reiniciar o jogo
function restartGame() {
  const victoryModalHidden = "victory-modal-hidden";

  if (popups.length > 0) {
    popups[0].id = "";
    popups[0].className = victoryModalHidden;
  }

  resetTimer();
  window.location.reload();
}

// Função que vira as cartas para baixo caso a combinação esteja errada.
function turnDownWrongCards(targets) {

  const targetDatasetId1 = `.flip-card-inner[data-id="${targets[0].dataset.id}"]`;
  const targetDatasetId2 = `.flip-card-inner[data-id="${targets[1].dataset.id}"]`;

  const card1 = document.querySelector(
    targetDatasetId1
  );
  const card2 = document.querySelector(
    targetDatasetId2
  );

  card1.classList.remove(flipCardInnerAnimation);
  card2.classList.remove(flipCardInnerAnimation);
}

let hasStarted = false;
// Função responsável por virar as cartas e definir se são iguais, ou se a combinação está errada.
function flipCard(num) {
  if (!hasStarted) {
      startTimer();
      hasStarted = true;
  }

  const targetClass = `.flip-card-inner[data-id="${num}"]`;

  const target = document.querySelector(targetClass);

  const oneSecInMls = 1000;

  if (
    target &&
    !target.classList.contains(flipCardInnerAnimation) &&
    flippedCards < 2
  ) {
    targets.push(target);
    target.classList.add(flipCardInnerAnimation);
    flippedCards += 1;

    if (flippedCards === 2) {
      setTimeout(() => {
        if (targets[0].dataset.idequal == targets[1].dataset.id) {
          console.log("Par correto!");
          found.value++;
          attempts.value++;

          if (found.value == cards.length / 2) {
            winGame();
            resetTimer();
          }
        } else {
          turnDownWrongCards(targets);
          console.log("Par errado!");
          attempts.value++;
        }

        // Reset
        flippedCards = 0;
        targets = [];
      }, oneSecInMls);
    }
  }
}

// Variáveis auxiliares para controle do timer.
let minutes = 0;
let seconds = 0;
let interval = null;

// Função responsável por iniciar o timer.
function startTimer() {
  interval = setInterval(() => {
  seconds++;

    if(seconds === 60) {
      minutes++;
      seconds = 0;

    }  
    secondsEl.textContent = seconds.toString().padStart(2, "0");
    minutesEl.textContent = minutes.toString().padStart(2, "0");
  }, 1000);
}

// Função responsável por reiniciar o timer.
function resetTimer() {
  clearInterval(interval);
  minutes = 0;
  seconds = 0;
  minutesEl.textContent = "00";
  secondsEl.textContent = "00";
}