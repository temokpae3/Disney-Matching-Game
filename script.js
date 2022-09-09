function appendNewCard(parentElement) {
  let cardElement = document.createElement("div");
  
  cardElement.classList.add("card");
  
  cardElement.innerHTML = "<div class=card-down></div> <div class=card-up></div>";
  
  parentElement.appendChild(cardElement);
  
  return(cardElement);
}

appendNewCardTest();

function shuffleCardImageClasses() {
  let cardImages = [
    "image-1", "image-1", 
    "image-2", "image-2",
    "image-3", "image-3",
    "image-4", "image-4",
    "image-5", "image-5",
    "image-6", "image-6"
  ];

  result = _.shuffle(cardImages);

  return(result);
}

shuffleCardImageClassesTest();

function createCards(parentElement, shuffledImageClasses) {
  let cardObject = [];
  for (let i = 0; i < 12; i++){
    let newCard = appendNewCard(parentElement);
    
    newCard.classList.add(shuffledImageClasses[i]);
    
    var newObject = {
      index: i,
      element: newCard,
      imageClass: shuffledImageClasses[i]
    }
    
    cardObject.push(newObject);
  }
  
  return (cardObject);
}

createCardsTest();

function doCardsMatch(cardObject1, cardObject2) {
  if (cardObject1.imageClass === cardObject2.imageClass) {
    return true;
  } else {
    return false;
  }
}

doCardsMatchTest();

let counters = {
  "match": 0,
  "flip": 0
};

function incrementCounter(counterName, parentElement) {
  if (!counters.hasOwnProperty(counterName)) {
    counters[counterName] = 0;
  }
  
  counters[counterName]++;
  parentElement.innerHTML = counters[counterName];
}

incrementCounterTest();

let clickAudio = new Audio('audio/click.wav');
let matchAudio = new Audio('audio/match.wav');
let winAudio = new Audio('audio/win.wav');

function flipCardWhenClicked(cardObject) {
  cardObject.element.onclick = function() {
    if (cardObject.element.classList.contains("flipped")) {
      return;
    }
    
    clickAudio.play();
    cardObject.element.classList.add("flipped");
    setTimeout(function() {
      onCardFlipped(cardObject);
    }, 500);
  };
}

let lastCardFlipped = null;

function onCardFlipped(newlyFlippedCard) {
  incrementCounter("flip", document.getElementById("flip-count"));
  
  if (lastCardFlipped == null) {
    lastCardFlipped = newlyFlippedCard;
    return;
  }
  else if (!doCardsMatch(lastCardFlipped, newlyFlippedCard)) {
    lastCardFlipped.element.classList.remove("flipped");
    newlyFlippedCard.element.classList.remove("flipped");
    lastCardFlipped = null;
    return;
  }

  else {
    incrementCounter("match", document.getElementById("match-count"));
    lastCardFlipped.element.classList.add("glow");
    newlyFlippedCard.element.classList.add("glow");
  }

  if (counters.match == 6) {
    winAudio.play ();
    showMessage("win-message")
  } else {
    matchAudio.play ();
  }
  
  lastCardFlipped = null;
}

let cardObjects =
  createCards(document.getElementById("card-container"), shuffleCardImageClasses());
  
  if (cardObjects != null) {
  for (let i = 0; i < cardObjects.length; i++) {
    flipCardWhenClicked(cardObjects[i]);
  }
    
  hideAllMessages();
}

function hideAllMessages() {
  let messages = document.querySelectorAll("#message-container > *");
  
  for (let i = 0; i < messages.length; i++) {
    messages[i].classList.add("hidden");
  }
}

function showMessage(id) {
  hideAllMessages();

  let message = document.getElementById(id);
  if (message != null) {
    message.classList.remove("hidden");
  } else {
    console.log(`${id} does not exist.`);
  }
}

function playAgain() {
  window.location.reload();
}
