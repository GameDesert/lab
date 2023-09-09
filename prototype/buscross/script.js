// Get all bus routes: https://api.tfl.gov.uk/line/mode/bus
// Get specific bus route: https://api.tfl.gov.uk/line/{route}
// Get all stops on a route: https://api.tfl.gov.uk/line/{route}/stoppoints

alert("This is still in development and does not currently function.")

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

routes = [""] //ROUTES HERE

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
            if ((letter != null) || (letter != "")) {
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

async function crossRefRoutes(routes, letter) {
    if ((letter == null) || (letter == "")) {
        letter = prompt("Please provide a stop letter to narrow down results.")
        if ((letter == null) || (letter == "")) {
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
    for (let stopindex = 0; stopindex < finalStops.length; stopindex++) {
        list.innerHTML += '<li>' + finalStops[stopindex]["commonName"] + '</li>';
        
    }
}