// Dice matching Regex: /(\d*)d(\d+)([+-]?)(\d*)/gmi
// Full matching for repeating dice: /(\+|\-)?(\d)*d(\d)+|(\+|\-)?(\d)*/gmi

/*
- Go through list
- Check if list item is empty, if so, move on.
- Check if item has letter "d" in it, if so:
    - Check if first character is a number, or +/-
    - If number, check rest of chars until you reach "d" to get coefficient
    - Get all numbers after "d" to get die
    - Add or subtract from total depending on sign
- If not:
    - Check if first character is a number, or +/-
    - If number, check rest of chars until you reach end to get value
    - Add or subtract from total depending on sign
*/


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function parsedice(dicestring) {
    var total = 0
    dicestring = dicestring.toLowerCase();
    var parsed = dicestring.match(/(\+|\-)?(\d)*d(\d)+|(\+|\-)?(\d)*/gmi)

    for (let group = 0; group < parsed.length; group++) {
        var aors = ""
        if (parsed[group] != "") {
            if (parsed[group].indexOf('d') > -1) {
                console.log("DIE")
                if ((parsed[group].charAt(0) == "+") || (parsed[group].charAt(0) == "-")) {
                    console.log("ADD/SUBTRACT DIE")
                    aors = parsed[group].charAt(0);
                    var currentcoefficient = ""
                    var currentnum = ""
                    var whered = 0

                    for (let char = 1; char < parsed[group].length; char++) {
                        if (parsed[group].charAt(char) != "d") {
                            currentcoefficient += parsed[group].charAt(char)
                        } else {
                            whered = char;
                            break
                        }
                    }

                    for (let pchar = (whered + 1); pchar < parsed[group].length; pchar++) {
                        currentnum += parsed[group].charAt(pchar);
                    }

                    currentcoefficient = Number(currentcoefficient)
                    currentnum = Number(currentnum)
                    if (aors == "+") {
                        total = total + (currentcoefficient * getRandomInt(1, currentnum))
                        console.log("ADD")
                    } else if (aors == "-") {
                        total = Number(total - (currentcoefficient * getRandomInt(1, currentnum)))
                        console.log("SUBTRACT")
                    }
                } else {
                    console.log("PURE DIE")
                    var currentnum = "";
                    var currentcoefficient = "";
                    var whered = 0;
                    for (let char = 0; char < parsed[group].length; char++) {
                        if (parsed[group].charAt(char) != "d") {
                            currentcoefficient += parsed[group].charAt(char)
                            console.log(currentcoefficient)
                        } else {
                            whered = char;
                            break
                        }
                    }

                    for (let pchar = whered + 1; pchar < parsed[group].length; pchar++) {
                        currentnum += parsed[group].charAt(pchar);
                        console.log(currentnum)
                    }

                    currentcoefficient = Number(currentcoefficient);
                    currentnum = Number(currentnum);
                    total = total + (currentcoefficient * getRandomInt(1, currentnum));
                }
            } else {
                console.log("MODIFIER")
                if ((parsed[group].charAt(0) == "+") || (parsed[group].charAt(0) == "-")) {
                    aors = parsed[group].charAt(0)
                    console.log(aors)
                    var currentnum = ""
                    for (let char = 1; char < parsed[group].length; char++) {
                        currentnum += parsed[group].charAt(char)
                    }
                    currentnum = Number(currentnum)
                    if (aors == "+") {
                        total = total + currentnum
                    } else if (aors == "-") {
                        total = total - currentnum
                    }
                } else {
                    currentnum = ""
                    for (let char = 0; char < parsed[group].length; char++) {
                        currentnum += parsed[group].charAt(char)
                    }
                    currentnum = Number(currentnum)
                    total = total + currentnum
                }
            }
            }
        }
    return total
}