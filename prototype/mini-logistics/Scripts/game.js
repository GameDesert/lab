wagons = {
    "vehicle_enclosed":"&#xF1B2D;",
    "boxcar":"&#xF1B2E;",
    "full_open_boxcar":"&#xF1B2F;",
    "empty_open_boxcar":"&#xF1B30;",
    "caboose":"&#xF1B31;",
    "centerbeam":"&#xF1B32;",
    "full_centerbeam":"&#xF1B33;",
    "container":"&#xF1B34;",
    "flatbed":"&#xF1B35;",
    "vehicle":"&#xF1B36;",
    "tank":"&#xF1B37;",
    "gondola":"&#xF1B38;",
    "full_gondola":"&#xF1B39;",
    "hopper":"&#xF1B3A;",
    "covered_hopper":"&#xF1B3A;",
    "full_hopper":"&#xF1B3C;",
    "intermodal":"&#xF1B3D;",
    "passenger":"&#xF1733;",
    "closed_door_passenger":"&#xF1734;",
    "open_door_passenger":"&#xF1735;",
    "alt_passenger":"&#xF1736;",
    "liquid_tank":"&#xF1B3E;"
}

cargo_icon = "&#xF0E9E;"

goods = {
    "passengers":{
        "full":"passenger",
        "empty":"passenger",
        "icon":"&#xF1571;",
        "car_cost":100,
        "max_cars":10
    },
    "oil":{
        "full":"liquid_tank",
        "empty":"liquid_tank",
        "icon":"&#xF0074;",
        "car_cost":80,
        "max_cars":15
    },
    "grain":{
        "full":"full_hopper",
        "empty":"hopper",
        "icon":"&#xF0073;",
        "car_cost":50,
        "max_cars":20
    },
    "vehicle":{
        "full":"vehicle",
        "empty":"flatbed",
        "icon":"&#xF010B;",
        "car_cost":120,
        "max_cars":5
    },
    "lumber":{
        "full":"full_centerbeam",
        "empty":"centerbeam",
        "icon":"&#xF0405;",
        "car_cost":40,
        "max_cars":20
    },
    "mail":{
        "full":"full_open_boxcar",
        "empty":"empty_open_boxcar",
        "icon":"&#xF0EE7;",
        "car_cost":30,
        "max_cars":20
    }
}

places = [
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    ""
]

place_suffixes = [
    "bury",
    "-On-Sea",
    "ham",
    "-By-The-Sea",
    "well",
    "minster",
    "field",
    "gate",
    "ford",
    "cester",
    "ton",
    "borough",
    "stead",
    "worth",
    "chester",
    "caster",
    "dale",
    "field",
    "port"
]

place_prefixes = [
    "North ",
    "East ",
    "South ",
    "West ",
    "Royal ",
    "St ",
    "New ",
    "Old "
]

vowels = [ // Plus "Y"
    "a","e","i","o","u","y"
]

consonants = [ // Plus & minus a few more
    "b","c","d","f","g","h","k","l","m","n","p","r","s","t","v","w" , "ch","sh","th","tr"
]

// CONFIG
//major_currency = "&Oslash;"
major_currency = "&#xF0C65;"
decimal_currency = "&cent;"
starting_currency = 100
// END CONFIG

// TEMPLATES
template_journey = {
    "start_timestamp":0, // Timestamp for start
    "end_timestamp":0, // Timestamp for end
    "journey_length":0, // In seconds
    "journey_reward":0,
    "title":"", // The name of the contract
    "goods":{
        "passengers":0,
        "oil":0,
        "grain":0,
        "vehicle":0,
        "lumber":0,
        "mail":0,
    },
    "cars":[
        // Example Entry:
        // {
        //     "type":"",
        //     "carrying":0
        // }

    ]

}
// END TEMPLATES

// GAME VARIABLES
balance = 0
owned_cars = {
    "passengers":{
        "qty":0
    },
    "oil":{
        "qty":0
    },
    "grain":{
        "qty":0
    },
    "vehicle":{
        "qty":0
    },
    "lumber":{
        "qty":0
    },
    "mail":{
        "qty":0
    }
}

active_journeys = []
// END GAME VARIABLES

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function generatePlaceName(){
    var namelength = getRndInteger(0, 1)
    if (namelength == 0) {
        var rootword = consonants[Math.floor(Math.random()*consonants.length)] + vowels[Math.floor(Math.random()*vowels.length)] + consonants[Math.floor(Math.random()*consonants.length)] + vowels[Math.floor(Math.random()*vowels.length)]
    } else {
        var rootword = consonants[Math.floor(Math.random()*consonants.length)] + vowels[Math.floor(Math.random()*vowels.length)] + consonants[Math.floor(Math.random()*consonants.length)] + vowels[Math.floor(Math.random()*vowels.length)] + consonants[Math.floor(Math.random()*consonants.length)] + vowels[Math.floor(Math.random()*vowels.length)]
    }

    rootword = rootword.replace(/^./, rootword[0].toUpperCase());
    if (getRndInteger(0,1) == 0) { // Suffix?
        rootword = rootword + place_suffixes[Math.floor(Math.random()*place_suffixes.length)]
    }

    if (getRndInteger(0,1) == 0) { // Prefix?
        rootword = place_prefixes[Math.floor(Math.random()*place_prefixes.length)] + rootword
    }
    return rootword
}

function startSetup() {
    balance = starting_currency
    updateBalanceDisplay();
}

function setCurrencyDisplays() {
    document.querySelectorAll('span[id=currency]').forEach(function(node){
        node.innerHTML = major_currency
    });
}

function purchase_car(cartype) {
    if (owned_cars[cartype]["qty"]+1 > goods[cartype]["max_cars"]) {
        alert("You own the maximum amount of these cars.")
    } else if (balance-goods[cartype]["car_cost"] <= 0){
        alert("You cannot afford this car.")
    } else {
        balance = balance-goods[cartype]["car_cost"]
        owned_cars[cartype]["qty"] = owned_cars[cartype]["qty"] + 1
        updateBalanceDisplay()
    }
}

function updateBalanceDisplay() {
    document.getElementById("value").innerHTML = balance;
    if (balance <= 0){
        failGame("bankruptcy");
    }
}

function failGame(condition) {
    alert("You lose: " + condition)
}

function generateContract() {
    // Randomly pick one of four contract grades.
    // For low grades, use only ~1/4 of the player's total cars.
    // High grades should go up to 80-100% (rounded down).
    // DON'T account for cars currently on other contracts, make the player wait to finish those first.
    // Times & Payout:
    // Grade 1: 5-15 minutes & 10-15% of player's current balance.
    // Grade 2: 15-45 minutes & 15-30% of player's current balance.
    // Grade 3: 45-90 minutes & 30-50% of player's current balance.
    // Grade 4: 90-180 minutes & 50-65% of player's current balance.

    // Don't generate a start time, just the contract length. Make sure start time is calculated upon despatch.
    // Use place name generator for start and end.
    // Calculate random encounter upon despatch.
}


/* 
PLAN:
- User starts off with minimal funds
- They can purchase more carriages
- They can accept contracts, but only if they have the necessary carriages
- Sometimes, a journey will have a random encounter
    - Negative
    - Positive
    - (V. Rare) Some sort of story
- For encounters with proportional rewards/penalties, calculate the value as a percentage (defined under currency_reward/currency_penalty as a decimal [% divided by 100]) of the player's current balance.
- If an encounter is not marked "proportional", but is marked "cargo_penalty", the percentage will be taken from the starting reward for the cargo delivery.
- If an encounter is marked as "reroll", it has a 50/50 chance of actually occurring (¹⁄ₓ*½ chance).

- Figure out how to store (as a cookie or localstorage):
    - Active journeys:
        - Contract Name
        - Set Reward
        - Cargo
        - Carriages
            - Carriage Contents
        - Selected Random Encounter
        - Data Hash (To Prevent Tampering)
    - Current Balance
    - Purchased Perks
    - Acheivements
- Allow users to export total progress as base64.
- Some actions, such as random encounters, or purchasing a combo of perks, will result in an achievement.
*/