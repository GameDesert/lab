wagons = {
    "vehicle_enclosed":"&#xF1B2D;",
    "boxcar":"&#xF1B2E;",
    "full_open_boxcar":"&#xF1B2F;",
    "empty_open_boxcar":"&#xF1B30;",
    "caboose":"&#xF1B31;",
    "centerbeam":"&#xF1B32;",
    "full_centerbeam":"&#xF1B33;",
    "container":"&#xF1B34;",
    "flatbead":"&#xF1B35;",
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

// CONFIG
major_currency = "&Oslash;"
decimal_currency = "&cent;"
starting_currency = 100
// END CONFIG

var modal = document.querySelector("dialog")

document.querySelector(".button-container button").addEventListener("click", () => {
    modal.showModal();
});

const closeBtns = document.getElementsByClassName("close");

for (btn of closeBtns) {
    btn.addEventListener("click", () => {
        modal.close();
    })
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
*/