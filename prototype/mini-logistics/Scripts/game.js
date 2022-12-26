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
        "car_cost":1000,
        "max_cars":10
    },
    "oil":{
        "full":"liquid_tank",
        "empty":"liquid_tank",
        "icon":"&#xF0074;",
        "car_cost":500,
        "max_cars":15
    },
    "grain":{
        "full":"full_hopper",
        "empty":"hopper",
        "icon":"&#xF0073;",
        "car_cost":100,
        "max_cars":20
    },
    "vehicle":{
        "full":"vehicle",
        "empty":"flatbed",
        "icon":"&#xF010B;",
        "car_cost":1500,
        "max_cars":5
    },
    "lumber":{
        "full":"full_centerbeam",
        "empty":"centerbeam",
        "icon":"&#xF0405;",
        "car_cost":50,
        "max_cars":20
    },
    "mail":{
        "full":"full_open_boxcar",
        "empty":"empty_open_boxcar",
        "icon":"&#xF0EE7;",
        "car_cost":25,
        "max_cars":20
    }
}



place_suffixes = [
    "bury",
    "ham",
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
    "port",
    "don",
    "ley",
    "mouth",
    "nd",
    "mpton"
]

place_prefixes = [
    "North ",
    "East ",
    "South ",
    "West ",
    "Royal ",
    "St ",
    "New ",
    "Old ",
    "Upper ",
    "Lower "
]

place_infixes = [
    " upon ",
    " & "
]

vowels = [ // Plus "Y"
    "a","e","i","o","u","y"
]

consonants = [ // Plus & minus a few more
    "b","c","d","f","g","h","k","l","m","n","p","r","s","t","w" , "ch","sh","th","tr"
]

// CONFIG
//major_currency = "&Oslash;"
major_currency = "&#xF0C65;"
decimal_currency = "&cent;"
starting_currency = 100
version = "0.1"
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

function getRndFloat(min, max, decimals) {
    const str = (Math.random() * (max - min) + min).toFixed(decimals);
    return parseFloat(str);
  }

function generatePlaceName(){
    var namelength = getRndInteger(0, 1)
    if (namelength == 0) {
        var rootword = consonants[Math.floor(Math.random()*consonants.length)] + vowels[Math.floor(Math.random()*vowels.length)] + consonants[Math.floor(Math.random()*consonants.length)] + vowels[Math.floor(Math.random()*vowels.length)]
    } else {
        var rootword = consonants[Math.floor(Math.random()*consonants.length)] + vowels[Math.floor(Math.random()*vowels.length)] + consonants[Math.floor(Math.random()*consonants.length)] + vowels[Math.floor(Math.random()*vowels.length)] + consonants[Math.floor(Math.random()*consonants.length)] + vowels[Math.floor(Math.random()*vowels.length)]
    }

    rootword = rootword.replace(/^./, rootword[0].toUpperCase());
    rootword = rootword + place_suffixes[Math.floor(Math.random()*place_suffixes.length)] // Suffixes are mandatory now.

    if (getRndInteger(0,1) == 0) { // Prefix?
        rootword = place_prefixes[Math.floor(Math.random()*place_prefixes.length)] + rootword
    }

    if (getRndInteger(0,1) == 0) { // Infix?
        infix_decider = getRndInteger(0,2)
        if (infix_decider == 0) {
            var secondNamelength = getRndInteger(0, 1)
            if (secondNamelength == 0) {
                var secondword = consonants[Math.floor(Math.random()*consonants.length)] + vowels[Math.floor(Math.random()*vowels.length)] + consonants[Math.floor(Math.random()*consonants.length)]
            } else {
                var secondword = consonants[Math.floor(Math.random()*consonants.length)] + vowels[Math.floor(Math.random()*vowels.length)] + consonants[Math.floor(Math.random()*consonants.length)] + vowels[Math.floor(Math.random()*vowels.length)] + consonants[Math.floor(Math.random()*consonants.length)]
            }

            secondword = secondword.replace(/^./, secondword[0].toUpperCase());
            rootword = rootword + place_infixes[Math.floor(Math.random()*place_infixes.length)] + secondword
        } else if (infix_decider == 1) {
            rootword = rootword + "-by-the-Sea"
        } else {
            rootword = rootword + "-on-Sea"
        }
    }
    return rootword
}

function startSetup() {
    balance = starting_currency
    updateBalanceDisplay();
    // Set version info:
    document.getElementById("version").innerHTML = version
}

function setCurrencyDisplays() {
    document.querySelectorAll('span[id=currency]').forEach(function(node){
        node.innerHTML = major_currency
    });
}

function powerOfTen(number) {
    var currentlyOn = 0
    for (var startingValue = 1; startingValue <= number;) {
        currentlyOn = startingValue
        //console.log(startingValue)
        startingValue = startingValue*10
    }
    return currentlyOn
}

function purchase_car(cartype) {
    if (owned_cars[cartype]["qty"]+1 > goods[cartype]["max_cars"]) {
        alert("You own the maximum amount of these cars.")
    } else if (balance-goods[cartype]["car_cost"] <= 0){
        alert("Buying this car would bankrupt you.")
    } else {
        balance = balance-goods[cartype]["car_cost"]
        owned_cars[cartype]["qty"] = owned_cars[cartype]["qty"] + 1
        updateBalanceDisplay()
        document.getElementById(cartype+"-cars").innerHTML = owned_cars[cartype]["qty"]
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
    var grade = getRndInteger(1,4);
    var totalCars = parseInt(owned_cars["oil"]["qty"]) + parseInt(owned_cars["passengers"]["qty"]) + parseInt(owned_cars["vehicle"]["qty"]) + parseInt(owned_cars["grain"]["qty"]) + parseInt(owned_cars["mail"]["qty"]) + parseInt(owned_cars["lumber"]["qty"])
    // For low grades, use only ~1/4 of the player's total cars.
    // High grades should go up to 80-100% (rounded down).
    var contractCars = 0
    // Add check so if player has 5 cars or less, exactly 100% are used (to prevent rounding errors causing 0 cargo contracts).
    var paymentBracket = powerOfTen(balance)
    if (paymentBracket < 10) {
        paymentBracket = 10
    } 
    if (grade == 1) {
        contractCars = Math.floor(getRndFloat(0.1, 0.25, 2) * totalCars)
        duration = getRndInteger(600, 900)
        payout = Math.ceil(paymentBracket*getRndFloat(0.1, 0.15, 2))
    } else if (grade == 2) {
        contractCars = Math.floor(getRndFloat(0.25, 0.45, 2) * totalCars)
        duration = getRndInteger(900, 2700)
        payout = Math.ceil(paymentBracket*getRndFloat(0.15, 0.4, 2))
    } else if (grade == 3) {
        contractCars = Math.floor(getRndFloat(0.45, 0.6, 2) * totalCars)
        duration = getRndInteger(2700, 5400)
        payout = Math.ceil(paymentBracket*getRndFloat(0.4, 0.6, 2))
    } else {
        contractCars = Math.floor(getRndFloat(0.6, 0.9, 2) * totalCars)
        duration = getRndInteger(5400, 10800)
        payout = Math.ceil(paymentBracket*getRndFloat(0.6, 0.75, 2))
    }

    duration = Math.ceil(duration/60)*60;

    if (contractCars == 0) {
        contractCars = totalCars
    }

    // Times & Payout:
    // Grade 1: 5-15 minutes & 10-15% of player's current balance.
    // Grade 2: 15-45 minutes & 15-30% of player's current balance.
    // Grade 3: 45-90 minutes & 30-50% of player's current balance.
    // Grade 4: 90-180 minutes & 50-65% of player's current balance.

    availableCars = []

    for (let passengers_i = 1; passengers_i <= owned_cars["passengers"]["qty"]; passengers_i++) {
        availableCars.push("passengers")
    }
    for (let oil_i = 1; oil_i <= owned_cars["oil"]["qty"]; oil_i++) {
        availableCars.push("oil")
    }
    for (let grain_i = 1; grain_i <= owned_cars["grain"]["qty"]; grain_i++) {
        availableCars.push("grain")
    }
    for (let vehicle_i = 1; vehicle_i <= owned_cars["vehicle"]["qty"]; vehicle_i++) {
        availableCars.push("vehicle")
    }
    for (let lumber_i = 1; lumber_i <= owned_cars["lumber"]["qty"]; lumber_i++) {
        availableCars.push("lumber")
    }
    for (let mail_i = 1; mail_i <= owned_cars["mail"]["qty"]; mail_i++) {
        availableCars.push("mail")
    }

    selectedCars = []
    for (car_i = 0; car_i < contractCars; car_i++) {
        selectionIndex = Math.floor(Math.random()*availableCars.length)
        selectedCars.push(availableCars[selectionIndex])
        availableCars = availableCars.splice(selectionIndex, 1);
    }

    origin_place = generatePlaceName()
    destination_place = generatePlaceName()
    // Create array with all cars as individual objects (maximum 90), select one at random, and remove it from the array. Iterate "contractCars" times.

    // DON'T account for cars currently on other contracts, make the player wait to finish those first.
    

    // Don't generate a start time, just the contract length. Make sure start time is calculated upon despatch.
    // Use place name generator for start and end.
    // Calculate random encounter upon despatch.
    return [payout, selectedCars, duration, origin_place, destination_place, grade]
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