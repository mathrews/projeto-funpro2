const popups = document.querySelectorAll(".victory-modal-hidden");
const cardContainer = document.querySelector(".card-container");
const attempts = document.querySelector("#attempts[name='attempts']");
const found = document.querySelector("#found[name='found']");

const imageCards = [
  "socrates.svg",
  "platao.svg",
  "aristoteles.svg",
  "zenao.svg",
  "epicuro.svg",
  "talesMileto.svg",
  "locke.svg",
];

let flippedCards = 0;

let targets = [];

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

let cards = [];
const maxPairs = 6;

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

window.onload = function () {
  setupCards();
};

function winGame() {
  if (popups.length > 0) {
    popups[0].id = "victory-modal";
    popups[0].className = "";
  }
}

function restartGame() {
  if (popups.length > 0) {
    popups[0].id = "";
    popups[0].className = "victory-modal-hidden";
  }

  window.location.reload();
}

function turnDownWrongCards(targets) {
  const card1 = document.querySelector(
    `.flip-card-inner[data-id="${targets[0].dataset.id}"]`
  );
  const card2 = document.querySelector(
    `.flip-card-inner[data-id="${targets[1].dataset.id}"]`
  );

  card1.classList.remove("flip-card-inner-animation");
  card2.classList.remove("flip-card-inner-animation");
}

function flipCard(num) {
  const target = document.querySelector(`.flip-card-inner[data-id="${num}"]`);

  if (
    target &&
    !target.classList.contains("flip-card-inner-animation") &&
    flippedCards < 2
  ) {
    targets.push(target);
    target.classList.add("flip-card-inner-animation");
    flippedCards += 1;

    if (flippedCards === 2) {
      setTimeout(() => {
        if (targets[0].dataset.idequal == targets[1].dataset.id) {
          console.log("Par correto!");
          found.value++;
          attempts.value++;

          if (found.value == cards.length / 2) {
            winGame();
          }
        } else {
          turnDownWrongCards(targets);
          console.log("Par errado!");
          attempts.value++;
        }

        // Reset
        flippedCards = 0;
        targets = [];
      }, 1000);
    }
  }
}
