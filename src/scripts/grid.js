const popups = document.querySelectorAll(".victory-modal-hidden");
const cardContainer = document.querySelector(".card-container")

let cards = [
	"assets/coringa.jpg",
	"assets/coringa.jpg",
	"assets/coringa.jpg",
	"assets/coringa.jpg",
	"assets/coringa.jpg",
	"assets/coringa.jpg",
	"assets/coringa.jpg",
	"assets/coringa.jpg",
	"assets/coringa.jpg",
	"assets/coringa.jpg",
]

window.onload = function() {
	cards.forEach((e, index) => {
		cardContainer.innerHTML += `
		<div class="flip-card" onClick="trigger(${index})">
					<div class="flip-card-inner" >
						<div class="flip-card-front">
							<h1>?</h1>
						</div>
						<div class="flip-card-back">
							<img src="${e}"/>
						</div>
					</div>
		</div>
	`
	})
}

function toggleWin() {
  	if (popups.length > 0) {
		popups[0].id = "victory-modal";
		popups[0].className = ""
  	}
}

function restart() {
  	if (popups.length > 0) {
    	popups[0].id = ""; 
		popups[0].className = "victory-modal-hidden"
  	}
}

function trigger(num) {
	let el = document.getElementsByClassName("flip-card-inner")
	el[num].classList.add('flip-card-inner-animation')
}

