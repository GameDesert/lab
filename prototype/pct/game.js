const etor = {
"Const.svg":"Constable",
"Srgt.svg":"Sergeant",
"Insp.svg":"Inspector",
"CInsp.svg":"Chief Inspector",
"Supt.svg":"Superintendent",
"CSupt.svg":"Chief Superintendent",
"Commdr.svg":"Commander",
"DAComm.svg":"Deputy Assistant Commissioner",
"AComm.svg":"Assistant Commissioner",
"DComm.svg":"Deputy Commissioner",
"Comm.svg":"Commissioner",
"SpecConst.svg":"Special Constable",
"SpecSrgt.svg":"Special Sergeant",
"SpecInsp.svg":"Special Inspector",
"SpecCInsp.svg":"Special Chief Inspector",
"AChOff.svg":"Assistant Chief Officer",
"ChOff.svg":"Chief Officer"
}

const rtoe = {
"Constable":"Const.svg",
"Sergeant":"Srgt.svg",
"Inspector":"Insp.svg",
"Chief Inspector":"CInsp.svg",
"Superintendent":"Supt.svg",
"Chief Superintendent":"CSupt.svg",
"Commander":"Commdr.svg",
"Deputy Assistant Commissioner":"DAComm.svg",
"Assistant Commissioner":"AComm.svg",
"Deputy Commissioner":"DComm.svg",
"Commissioner":"Comm.svg",
"Special Constable":"SpecConst.svg",
"Special Sergeant":"SpecSrgt.svg",
"Special Inspector":"SpecInsp.svg",
"Special Chief Inspector":"SpecCInsp.svg",
"Assistant Chief Officer":"AChOff.svg",
"Chief Officer":"ChOff.svg"
}

const ranks = [
"Constable",
"Sergeant",
"Inspector",
"Chief Inspector",
"Superintendent",
"Chief Superintendent",
"Commander",
"Deputy Assistant Commissioner",
"Assistant Commissioner",
"Deputy Commissioner",
"Commissioner",
"Special Constable",
"Special Sergeant",
"Special Inspector",
"Special Chief Inspector",
"Assistant Chief Officer",
"Chief Officer"
]

var complete = []

function Rand_Rank() { 
    var random_rank = ranks[Math.floor(Math.random() * ranks.length)];
    return random_rank
}

function endcheck() {
    if (complete.includes("Constable") && complete.includes("Sergeant") && complete.includes("Inspector") && complete.includes("Chief Inspector") && complete.includes("Superintendent") && complete.includes("Chief Superintendent") && complete.includes("Commander") && complete.includes("Deputy Assistant Commissioner") && complete.includes("Assistant Commissioner") && complete.includes("Deputy Commissioner") && complete.includes("Commissioner") && complete.includes("Special Constable") && complete.includes("Special Sergeant") && complete.includes("Special Inspector") && complete.includes("Special Chief Inspector") && complete.includes("Assistant Chief Officer") && complete.includes("Chief Officer") == true) {
        return true;
    } else {
        return false;
    }
}

function fin() {
    document.getElementById("epaulette_img").setAttribute("src", "images/complete.svg")
    document.getElementById("check").setAttribute("disabled","true");
    document.getElementById("Ranks").setAttribute("disabled","true");
}

function new_epaulette() {
    if (endcheck() == true) {
        fin();
        return true
    }
    var rank = Rand_Rank();
    var new_rank = false;
    while (new_rank == false) {
        if (complete.includes(rank) == true) {
            var rank = Rand_Rank();
            console.log(rank + " | Trying Again");
            console.log(complete);
        } else {
            console.log(rank + " | Ready");
            console.log(complete);
            var new_rank = true;
            break
        }
    }
    var epaulette_icon = "images/" + rtoe[rank];
    document.getElementById("epaulette_img").setAttribute("src", epaulette_icon)
}

function check_answer() {
    var selected_rank = document.getElementById("Ranks").value;
    var current_rank = etor[document.getElementById("epaulette_img").getAttribute("src").replace("images/","")]
    if (selected_rank == current_rank) {
        complete.push(current_rank);
        new_epaulette();
    } else {
        alert("Incorrect, try again.")
    }
}

// Process:
// 1- Select random rank
// 2- Get file name for that rank
// 3- Show file and selection box
// 4- Check input against file name
// 5- If correct, repeat indefinitely
// 6- If incorrect, ask to repeat