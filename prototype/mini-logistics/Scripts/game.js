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

cargo_icon = "&#xF0E9E;"

goods = {
    "passengers":{
        "full":"passenger",
        "empty":"passenger",
        "icon":"&#xF1571;"
    },
    "oil":{
        "full":"liquid_tank",
        "empty":"liquid_tank",
        "icon":"&#xF0074;"
    },
    "grain":{
        "full":"full_hopper",
        "empty":"hopper",
        "icon":"&#xF0073;"
    },
    "vehicle":{
        "full":"vehicle",
        "empty":"flatbed",
        "icon":"&#xF010B;"
    },
    "lumber":{
        "full":"full_centerbeam",
        "empty":"centerbeam",
        "icon":"&#xF0405;"
    },
    "mail":{
        "full":"full_open_boxcar",
        "empty":"empty_open_boxcar",
        "icon":"&#xF0EE7;"
    }
}

// CONFIG
major_currency = "&Oslash;"
decimal_currency = "&cent;"
starting_currency = 100
// END CONFIG

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