const suits = ["h","c","s","d"]
const values = ["2","3","4","5","6","7","8","9","10","J","Q","K","A"]

const suit_symbols = {"h":"&hearts;","c":"&clubs;","s":"&spades;","d":"&diamondsuit;"}

const deck = suits.flatMap(suit => values.map(value => ({suit, value})));

const named_hands = ["Royal Flush", "Straight Flush", "Four of a Kind", "Full House", "Flush", "Straight", "Three of a Kind", "Two Pair", "One Pair", "High Card"];
const named_hand_rankings = {"Royal Flush": 10, "Straight Flush": 9, "Four of a Kind": 8, "Full House": 7, "Flush": 6, "Straight": 5, "Three of a Kind": 4, "Two Pair": 3, "One Pair": 2, "High Card": 1};

class Hand {
    constructor() {
        this.deck = [...deck];
        this.dealt_hand = [];
    }

    dealHand() {
        for (let i = 0; i < 5; i++) {
            const randomIndex = Math.floor(Math.random() * this.deck.length);
            const card = this.deck.splice(randomIndex, 1)[0];
            this.dealt_hand.push(card);
        }
    }
}

// #region Hand Checks
function checkRoyalFlush(hand) {
    const values = hand.map(card => card.value);
    const royalFlushValues = ["10", "J", "Q", "K", "A"];
    return checkStraightFlush(hand) && values.every(value => royalFlushValues.includes(value));
}

function checkStraightFlush(hand) {
    return checkStraight(hand) && checkFlush(hand);
}

function checkFourOfAKind(hand) {
    const values = hand.map(card => card.value);
    const valueCounts = values.reduce((acc, value) => {
        acc[value] = (acc[value] || 0) + 1;
        return acc;
    }, {});
    return Object.values(valueCounts).includes(4);
}

function checkFullHouse(hand) {
    const values = hand.map(card => card.value);
    const valueCounts = values.reduce((acc, value) => {
        acc[value] = (acc[value] || 0) + 1;
        return acc;
    }, {});
    return Object.values(valueCounts).includes(3) && Object.values(valueCounts).includes(2);
}

function checkFlush(hand) {
    const suits = hand.map(card => card.suit);
    return suits.every(suit => suit === suits[0]);
}

function checkStraight(hand) {
    const values = hand.map(card => card.value);
    const valueRanks = values.map(value => {
        if (value === "J") return 11;
        if (value === "Q") return 12;
        if (value === "K") return 13;
        if (value === "A") return 14;
        return parseInt(value);
    });
    valueRanks.sort((a, b) => a - b);
    return valueRanks.every((rank, index) => rank === valueRanks[0] + index);
}

function checkThreeOfAKind(hand) {
    const values = hand.map(card => card.value);
    const valueCounts = values.reduce((acc, value) => {
        acc[value] = (acc[value] || 0) + 1;
        return acc;
    }, {});
    return Object.values(valueCounts).includes(3);
}

function checkTwoPair(hand) {
    const values = hand.map(card => card.value);
    const valueCounts = values.reduce((acc, value) => {
        acc[value] = (acc[value] || 0) + 1;
        return acc;
    }, {});
    return Object.values(valueCounts).filter(count => count === 2).length === 2;
}

function checkOnePair(hand) {
    const values = hand.map(card => card.value);
    const valueCounts = values.reduce((acc, value) => {
        acc[value] = (acc[value] || 0) + 1;
        return acc;
    }, {});
    return Object.values(valueCounts).includes(2);
}

function checkHighCard(hand) {
    return true;
}

function checkHand(hand) {
    if (checkRoyalFlush(hand)) return "Royal Flush";
    if (checkStraightFlush(hand)) return "Straight Flush";
    if (checkFourOfAKind(hand)) return "Four of a Kind";
    if (checkFullHouse(hand)) return "Full House";
    if (checkFlush(hand)) return "Flush";
    if (checkStraight(hand)) return "Straight";
    if (checkThreeOfAKind(hand)) return "Three of a Kind";
    if (checkTwoPair(hand)) return "Two Pair";
    if (checkOnePair(hand)) return "One Pair";
    if (checkHighCard(hand)) return "High Card";

}

// #endregion

function play() {
    const hand = new Hand();
    hand.dealHand();
    console.log(hand.dealt_hand);

    //Clear the hand, rival_hand, hand_buttons, and beat divs

    document.getElementById("hand").innerHTML = "";
    document.getElementById("rival_hand").innerHTML = "";
    document.getElementById("hand_buttons").innerHTML = "";
    document.getElementById("beat").innerHTML = "";


    //Identify the hand
    const named_hand = checkHand(hand.dealt_hand)
    //Select a random named hand that isnt the dealt hand
    let random_hand = named_hands[Math.floor(Math.random() * named_hands.length)];
    while (random_hand === named_hand) {
        random_hand = named_hands[Math.floor(Math.random() * named_hands.length)];
    }

    //Display the hand in the span with the id of "hand"
    document.getElementById("hand").innerHTML = hand.dealt_hand.map(card => {
        const color = (card.suit === "h" || card.suit === "d") ? "red" : "black";
        return `<span class="card" style="color: ${color}">${suit_symbols[card.suit]}${card.value}</span>`;
    }).join(" ");

    //Display the random hand name in the span with the id of "rival_hand"
    document.getElementById("rival_hand").innerHTML = random_hand;

    //Spawn buttons for each hand in a random order in the div with id hand_buttons (e.g roayl flush, straight flush, etcetera)
    const hand_buttons = document.getElementById("hand_buttons");
    const hand_names = [...named_hands];
    hand_names.splice(hand_names.indexOf(named_hand), 1);
    hand_names.splice(hand_names.indexOf(random_hand), 1);
    hand_names.sort(() => Math.random() - 0.5);
    hand_names.unshift(named_hand);
    hand_names.push(random_hand);
    hand_names.forEach(hand_name => {
        const button = document.createElement("button");
        button.innerHTML = hand_name;
        button.onclick = () => {
            if (hand_name === named_hand) {
                // alert("Correct!");
                disableButtons(hand_buttons);
                checkGameCompletion(hand_buttons, beat);
            } else {
                alert("Incorrect! The correct answer is: " + named_hand);
                play();
            }
        }
        hand_buttons.appendChild(button);
    });

    //Spawn two buttons, one labelled Yes and one No in the div with id "beat". If the random hand has a higher score than the dealt hand, the No button should be correct, otherwise its the yes button
    const beat = document.getElementById("beat");
    const yes_button = document.createElement("button");
    yes_button.innerHTML = "No";
    const no_button = document.createElement("button");
    no_button.innerHTML = "Yes";
    if (named_hand_rankings[named_hand] > named_hand_rankings[random_hand]) {
        yes_button.onclick = () => {
            alert("Incorrect!");
            play();
        }
        no_button.onclick = () => {
            // alert("Correct!");
            disableButtons(beat);
            checkGameCompletion(hand_buttons, beat);
        }
    } else {
        yes_button.onclick = () => {
            // alert("Correct!");
            disableButtons(beat);
            checkGameCompletion(hand_buttons, beat);
        }
        no_button.onclick = () => {
            alert("Incorrect!");
            play();
        }
    }
    beat.appendChild(yes_button);
    beat.appendChild(no_button);

    function disableButtons(container) {
        const buttons = container.getElementsByTagName("button");
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].disabled = true;
        }
    }

    function checkGameCompletion(handContainer, beatContainer) {
        const handButtons = handContainer.getElementsByTagName("button");
        const beatButtons = beatContainer.getElementsByTagName("button");
        let correctHandSelected = false;
        let correctBeatSelected = false;
        for (let i = 0; i < handButtons.length; i++) {
            if (handButtons[i].disabled && handButtons[i].innerHTML === named_hand) {
                correctHandSelected = true;
            }
        }
        for (let i = 0; i < beatButtons.length; i++) {
            if (beatButtons[i].disabled && ((beatButtons[i].innerHTML === "Yes" && named_hand_rankings[named_hand] > named_hand_rankings[random_hand]) || (beatButtons[i].innerHTML === "No" && named_hand_rankings[named_hand] < named_hand_rankings[random_hand]))) {
                correctBeatSelected = true;
            }
        }
        if (correctHandSelected && correctBeatSelected) {
            alert("Congratulations! You won!");
            play();
        }
    }

}

// const hand = new Hand();
// hand.dealHand();
// console.log(hand.dealt_hand);
play()