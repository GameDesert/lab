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

function parsedice(dicestring) {
    var total = 0
    dicestring = dicestring.toLowerCase();
    var parsed = dicestring.match(/(\+|\-)?(\d)*d(\d)+|(\+|\-)?(\d)*/gmi)

    for (let group = 0; group < parsed.length; group++) {
        var aors = ""
        if (parsed[group] != "") {
            if (parsed[group].indexOf('d') > -1) {
                if ((parsed[group].charAt(0) == "+") || (parsed[group].charAt(0) == "-")) {
                    aors = parsed[group].charAt(0)
                    currentnum = ""
                    for (let char = 1; char < parsed[group].length; char++) {
                        currentnum += parsed[group].charAt(char)
                    }
                    currentnum = Number(currentnum)
                    total = total + currentnum
                } else {
                    currentnum = ""
                    for (let char = 0; char < parsed[group].length; char++) {
                        currentnum += parsed[group].charAt(char)
                    }
                    currentnum = Number(currentnum)
                    if (aors == "+") {
                        total = total + currentnum
                    } else if (aors == "-") {
                        total = total - currentnum
                    }
                }
            } else {
                if ((parsed[group].charAt(0) == "+") || (parsed[group].charAt(0) == "-")) {
                    aors = parsed[group].charAt(0);

                    for (let char = 1; char < parsed[group].length; char++) {
                        if (parsed[group].charAt(char) != "d") {
                            currentnum += parsed[group].charAt(char)
                        } else {
                            break
                        }
                    }
                    currentnum = Number(currentnum)
                    if (aors == "+") {
                        total = total + currentnum
                    } else if (aors == "-") {
                        total = total - currentnum
                    }
                } else {
                    var currentnum = ""
                    for (let char = 0; char < parsed[group].length; char++) {
                        if (parsed[group].charAt(char) != "d") {
                            currentnum += parsed[group].charAt(char)
                        } else {
                            break
                        }
                    }
                    currentnum = Number(currentnum)
                    total = total + currentnum
                }
            }
            }
        }
    return total
}

/* Most of this is wrong. Add in the bits where it calculates the randomness from the thing after the "d", and take out the bits where it adds the coefficients directly to the total.*/