const popups = document.querySelectorAll(".victory-modal-hidden");
const cardContainer = document.querySelector(".card-container");

let cards = [
  { id: 0, img: "assets/coringa.jpg", idEqual: 7 },
  { id: 1, img: "assets/coringa.jpg", idEqual: 4 },
  { id: 2, img: "assets/coringa.jpg", idEqual: 9 },
  { id: 3, img: "assets/coringa.jpg", idEqual: 5 },
  { id: 4, img: "assets/coringa.jpg", idEqual: 1 },
  { id: 5, img: "assets/coringa.jpg", idEqual: 3 },
  { id: 6, img: "assets/coringa.jpg", idEqual: 8 },
  { id: 7, img: "assets/coringa.jpg", idEqual: 0 },
  { id: 8, img: "assets/coringa.jpg", idEqual: 6 },
  { id: 9, img: "assets/coringa.jpg", idEqual: 2 },
];

let flippedCards = 0;

let targets = [];

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

window.onload = function () {
  for (let i = 0; i < 10; i++) {
    cardId = getRandomInt(cards.length);
    let e = cards[cardId];
    cards.splice(cardId, 1);

    cardContainer.innerHTML += `
			<div class="flip-card" onClick="trigger(${e.id})">
						<div class="flip-card-inner" data-id="${e.id}" data-idEqual="${e.idEqual}">
							<div class="flip-card-front">
								<h1>?</h1>
							</div>
							<div class="flip-card-back">
								<img src="${e.img}"/>
							</div>
						</div>
			</div>
			`;
  }
};

function toggleWin() {
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

function trigger(num) {
  const target = document.querySelector(`.flip-card-inner[data-id="${num}"]`);

  if (target && !target.classList.contains("flip-card-inner-animation") && flippedCards < 2) {
    targets.push(target);
    target.classList.add("flip-card-inner-animation");
    flippedCards += 1;

    if (flippedCards === 2) {
      setTimeout(() => {
        if (targets[0].dataset.idEqual === targets[1].dataset.id) {
          console.log("Par correto!");
        } else {
          turnDownWrongCards(targets);
        }

        // Reset
        flippedCards = 0;
        targets = [];
      }, 1000);
    }
  }
}
