const popups = document.querySelectorAll(".victory-modal-hidden");
const cardContainer = document.querySelector(".card-container");
const attempts = document.querySelector("#attempts[name='attempts']");
const found = document.querySelector("#found[name='found']");


let flippedCards = 0;

let targets = [];

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

let cards = [
  { id: 0, img: "assets/socrates.svg", idEqual: 12 },
  { id: 1, img: "assets/platao.svg", idEqual: 7 },
  { id: 2, img: "assets/aristoteles.svg", idEqual: 8 },
  { id: 3, img: "assets/zenao.svg", idEqual: 9 },
  { id: 4, img: "assets/epicuro.svg", idEqual: 10 },
  { id: 5, img: "assets/talesMileto.svg", idEqual: 11 },
  { id: 6, img: "assets/locke.svg", idEqual: 13 },
  { id: 7, img: "assets/platao.svg", idEqual: 1 },
  { id: 8, img: "assets/aristoteles.svg", idEqual: 2 },
  { id: 9, img: "assets/zenao.svg", idEqual: 3 },
  { id: 10, img: "assets/epicuro.svg", idEqual: 4 },
  { id: 11, img: "assets/talesMileto.svg", idEqual: 5 },
  { id: 12, img: "assets/socrates.svg", idEqual: 0 },
  { id: 13, img: "assets/locke.svg", idEqual: 6 }
];

function setupCards() {
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

  cardContainer.innerHTML = '';
  setupCards();
}

function restartGame() {
  if (popups.length > 0) {
    popups[0].id = "";
    popups[0].className = "victory-modal-hidden";
  }
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

  if (target && !target.classList.contains("flip-card-inner-animation") && flippedCards < 2) {
    targets.push(target);
    target.classList.add("flip-card-inner-animation");
    flippedCards += 1;

    if (flippedCards === 2) {
      setTimeout(() => {
        if (targets[0].dataset.idequal == targets[1].dataset.id) {
          console.log("Par correto!");
          found.value++
          attempts.value++

          if (found.value == cards.length / 2) {
            winGame();
          }
        } else {
          turnDownWrongCards(targets);
          console.log("Par errado!");
          attempts.value++
        }

        // Reset
        flippedCards = 0;
        targets = [];
      }, 1000);
    }
  }
}
