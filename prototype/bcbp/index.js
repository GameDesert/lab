airline_codes = {
    "A3":"Aegean Airlines",
    "AC":"Canada",
    "CA":"Air China",
    "AI":"Air India",
    "NZ":"Air New Zealand",
    "NH":"All Nippon Airways",
    "OZ":"Asiana Airlines",
    "OS":"Austrian Airlines",
    "AV":"Avianca",
    "SN":"Brussels Airlines",
    "CM":"Copa Airlines",
    "OU":"Croatia Airlines",
    "MS":"Egyptair",
    "ET":"Ethiopian Airlines",
    "BR":"EVA Air",
    "LO":"LOT Polish Airlines",
    "LH":"Lufthansa",
    "SK":"Scandinavian Airlines",
    "ZH":"Shenzhen Airlines",
    "SQ":"Singapore Airlines",
    "SA":"South African Airways",
    "LX":"SWISS",
    "TP":"TAP Air Portugal",
    "TG":"THAI",
    "TK":"Turkish Airlines",
    "UA":"United Airlines",
    "AS":"Alaska Airlines",
    "AA":"American Airlines",
    "BA":"British Airways",
    "CX":"Cathay Pacific",
    "":"",
    "":"",
    "":"",
    "":"",
    "":""
}

function decodeBCBP(barcode_data) {
    luggage_license_plate = ""
    
    passenger_name = barcode_data.substring(2,22).trim()
    pnr = barcode_data.substring(23,30).trim()
    origin_airport = barcode_data.substring(30,33).trim()
    destination_airport = barcode_data.substring(33,36).trim()
    carrier = barcode_data.substring(36,39).trim()
    flight = barcode_data.substring(39,44).trim()
    date = barcode_data.substring(44,47).trim()
    class_code = barcode_data.substring(47,48).trim()
    seat = barcode_data.substring(48,52).trim()
    sequence = barcode_data.substring(52,57).trim()
    
// Optional Data (Enclose in IF statement when done)
    if (barcode_data.length > 60) {
        issue_date = barcode_data.substring(67,71).trim()
        luggage_license_plate = barcode_data.substring(75,88).trim()

        frequent_flier = barcode_data.substring(111,127).trim()
        baggage_allowance = barcode_data.substring(128,131).trim()

        console.log(issue_date)
        // document.getElementById("sequence_text_value").innerHTML = sequence

        console.log(frequent_flier)
        // document.getElementById("sequence_text_value").innerHTML = sequence

        console.log(luggage_license_plate)
        document.getElementById("license_text_tag_value").innerHTML = luggage_license_plate
    
        console.log(baggage_allowance)
        document.getElementById("weight_text_tag_value").innerHTML = baggage_allowance
    
    }

    console.log(passenger_name)
    if ((passenger_name.length < 13)) {
        document.getElementById("name_text_svg").style.fontSize = "7.46204px"
    } else if ((passenger_name.length >= 13) && (passenger_name.length < 16)) {
        document.getElementById("name_text_svg").style.fontSize = "6.46204px"
    } else if ((passenger_name.length >= 16) && (passenger_name.length < 19)) {
        document.getElementById("name_text_svg").style.fontSize = "5.46204px"
    } else if ((passenger_name.length >= 19) && (passenger_name.length <= 20)) {
        document.getElementById("name_text_svg").style.fontSize = "4.46204px"
    }
    document.getElementById("name_text_value").innerHTML = passenger_name
    document.getElementById("name_text_tag_value").innerHTML = passenger_name

    console.log(pnr)
    document.getElementById("pnr_text_value").innerHTML = pnr
    document.getElementById("pnr_text_tag_value").innerHTML = pnr

    console.log(origin_airport)
    document.getElementById("origin_airport_text_value").innerHTML = origin_airport
    document.getElementById("origin_text_tag_value").innerHTML = origin_airport

    console.log(destination_airport)
    document.getElementById("destination_airport_text_value").innerHTML = destination_airport
    document.getElementById("destination_text_tag_value").innerHTML = destination_airport

    console.log(carrier)
    document.getElementById("airline_text_value").innerHTML = carrier
    document.getElementById("carrier_text_tag_value").innerHTML = carrier

    console.log(flight)
    document.getElementById("flight_text_value").innerHTML = carrier + " " + flight
    document.getElementById("flight_text_tag_value").innerHTML = carrier + flight

    console.log(date)

    var bp_year = new Date();
    var bp_init_date = new Date(bp_year.getFullYear(), 0); // initialize a date in `year-01-01`
    var bp_set_date = new Date(bp_init_date.setDate(date)); // add the number of days
    var bp_full_date = bp_set_date.toLocaleDateString("en-GB", {month: 'short', day: 'numeric' })

    document.getElementById("date_text_value").innerHTML = bp_full_date

    var tag_year = new Date();
    var tag_init_date = new Date(tag_year.getFullYear(), 0); // initialize a date in `year-01-01`
    var tag_set_date = new Date(tag_init_date.setDate(date)); // add the number of days
    var tag_full_date = tag_set_date.toLocaleDateString("en-GB", {month: 'short', day: 'numeric', year: 'numeric' })

    document.getElementById("date_text_tag_value").innerHTML = tag_full_date

    console.log(class_code)
    document.getElementById("class_text_value").innerHTML = class_code

    console.log(seat)
    document.getElementById("seat_text_value").innerHTML = seat

    console.log(sequence)
    document.getElementById("sequence_text_value").innerHTML = sequence
    document.getElementById("sequence_text_tag_value").innerHTML = sequence

    document.getElementById("boardingpass").style.display = "block";
    setTimeout(function(){
        document.getElementById("boardingpasssvg").style.opacity = 1;
    },1);

    if (luggage_license_plate != "") {
        document.getElementById("luggagetag").style.display = "block";
        setTimeout(function(){
            document.getElementById("luggagetagsvg").style.opacity = 1;
        },1);
    }
}

function submitBCBP(data) {
    decodeBCBP(data)
}


// Upload image to get data.
// check compatibility
if (!("BarcodeDetector" in window)) {
    console.log("Barcode Detector is not supported by this browser.");
  } else {
    console.log("Barcode Detector supported!");
  
    // create new detector to detect only 2D codes (rather than barcodes)
    const barcodeDetector = new BarcodeDetector({
      formats: [
        'aztec',
        'data_matrix',
        'pdf417',
        'qr_code'
      ],
    });
  }
  

// TODO:
// - Finish boarding pass graphic using samples from resolution 792 document
// - Finish parsing of BCBP (decodeBCBP())
// - Display boarding pass with BCBP info
// - Change ticket stub colour based on airline
// - Finish list of known airline codes
// - Create graphic representation of luggage tag where applicable __DONE__ 