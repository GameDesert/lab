// Get all bus routes: https://api.tfl.gov.uk/line/mode/bus
// Get specific bus route: https://api.tfl.gov.uk/line/{route}
// Get all stops on a route: https://api.tfl.gov.uk/line/{route}/stoppoints

// alert("This is still in development and does not currently function.")

function updatePointLetterSize() {
    letters = document.getElementById("point-letter").innerText.length
    if (letters == 1) {
        document.getElementById("point-letter").style.fontSize = "8vw";
    } else if (letters == 2) {
        document.getElementById("point-letter").style.fontSize = "4.2vw";
    } else if (letters == 3) {
        document.getElementById("point-letter").style.fontSize = "3vw";
    } else if (letters > 3) {
        document.getElementById("point-letter").style.fontSize = "2vw";
    }
}

async function checkRouteValid(route) {
    const response = await fetch("https://api.tfl.gov.uk/line/" + route.substring(0,4));
    const RouteValidJson = await response.json(); //extract JSON from the http response
    // console.log(RouteValidJson)
    // console.log("test")
    // console.log(RouteValidJson[0]["modeName"])
    if (RouteValidJson[0]["modeName"] == "bus") {
        return true
    } else {
        return false
    }
} // Call as `await checkRouteValid(route)`

async function returnStops(route) {
    const response = await fetch("https://api.tfl.gov.uk/line/" + route.substring(0,4) + "/stoppoints");
    const RouteValidJson = await response.json(); //extract JSON from the http response   
    return RouteValidJson
} // Call as `await checkRouteValid(route)`

let routes = [] //ROUTES HERE

function addRoute(route) {
    route = route.toUpperCase()
    if (routes.length < 6) {
        if (routes.includes(route)) {
            alert("Route already added.")
        } else {
            routes.push(route.toString().substring(0,4))
            console.log("Added " + route)

            updateETiles(routes, "route-num-")
        }
    } else {
        alert("Too many routes added.")
        updateETiles(routes, "route-num-")
    }
}

function removeRoute(route) {
    routes.splice(routes.indexOf(route.toString().substring(0,4)), 1)
    console.log("Removed " + route)
    updateETiles(routes, "route-num-")
}

function updateETiles(routes, idprefix) {
    for (let index = 0; index < 6; index++) {
        document.getElementById(idprefix+index.toString()).innerText = "";
        
    }
    for (let index = 0; index < routes.length; index++) {
        if (index < 6) {
            const element = routes[index];
            document.getElementById(idprefix+index.toString()).innerText = element.toString()
        } else {break}
    }
}

function findCommon(letter, ...arrays) {
    // sort arrays by length so we optimize and iterate first by the shortest array
    arrays.sort((a, b) => {
        return a.length - b.length;
    });
    let results = new Set();
    // for each item in the first array
    for (let item of arrays[0][0]) {
        // look in other arrays for this value
        let found = true;
        for (let i = 1; i < arrays.length; i++) {
            if (!arrays[0][i].includes(item)) {
                found = false;
                break;
            }
        }
        if (found) {
            if ((letter != null) || (letter != "") || (letter != "?")) {
                try {
                    if (letter == item["stopLetter"]) {
                        results.add(item);
                    }
                } catch (error) {
                    if (letter == item["children"]["stopLetter"]) {
                        results.add(item);
                    }
                }
            } else {
                results.add(item);
            }
        }
    }
    console.log(results)
    return results;
}

function setLetter(object) {
    let letter = prompt("Enter stop letter (1-3 Chars): ")
    if ((letter != null) || (letter != "") || (letter != "?")) {
        letter = letter.toUpperCase().substring(0,3)
        object.innerText = letter
    } else {
        alert("Please enter a letter.")
    }
}

function updateNameSize() {
    words = document.getElementById("name-label").innerText.trim().split(/\s+/).length;
    if (words == 1) {
        document.getElementById("name-label").style.fontSize = "2vw";
        document.getElementById("name-label").style.marginTop = "0.5vw";
    } else if (3 >= words >= 2) {
        document.getElementById("name-label").style.fontSize = "1.5vw";
        document.getElementById("name-label").style.marginTop = "0.3vw";
    } else if (letters > 3) {
        document.getElementById("name-label").style.fontSize = "1vw";
        document.getElementById("name-label").style.marginTop = "0vw";
    } else {
        document.getElementById("name-label").style.fontSize = "2vw";
        document.getElementById("name-label").style.marginTop = "0.5vw";
    }
}

async function crossRefRoutes(routes, letter) {
    if ((letter == null) || (letter == "") || (letter == "?")) {
        setLetter(document.getElementById("point-letter"))
        letter = document.getElementById("point-letter").innerText
        if ((letter == null) || (letter == "") || (letter == "?")) {
            alert("You must provide a stop letter. Try again and do this by clicking the red question mark.")
            return
        }
    }

    letter = letter.toUpperCase()
    
    let allStops = {}

    for (let index = 0; index < routes.length; index++) {
        const route = routes[index];
        const routeStops = await returnStops(routes[index])
        allStops[index] = routeStops
    }

    let results = findCommon(letter, allStops);
    console.log(Array.from(results));
    const finalStops = Array.from(results)
    const list = document.getElementById("results-list")
    list.innerHTML = ""
    for (let stopindex = 0; stopindex < finalStops.length; stopindex++) {
        let name = finalStops[stopindex]["commonName"]
        console.log(name);
        let naptan = finalStops[stopindex]["naptanId"]
        console.log(naptan);
        list.innerHTML += `<li onclick="signs('${name}', '${letter}', '${naptan}');" style="cursor: pointer;">${finalStops[stopindex]["commonName"]}</li>`;
        
    }
}
function signs(name, letter, naptan) {
    document.getElementById("name-label").innerText = name;
    document.getElementById("point-letter").innerText = letter;
    document.getElementById("towards-label").innerText = naptan;
    updateNameSize();
    updatePointLetterSize();
}