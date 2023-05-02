/* WIKI VIEWER */

search_url = "https://expanse.kotla.eu/api.php"

function searchWiki(searchquery) {
    var params = new URLSearchParams({
        action: "query",
        list: "search",
        srsearch: searchquery,
        srprop: "titlesnippet",
        format: "json",
        origin: "*" // I can't believe I just had to change this. I spent an hour trying to debug CORS.
    });
    
    fetch(`${search_url}?${params}`)
        .then(function(response){return response.json();})
        .then(function(response) {
            if (response.query.searchinfo.totalhits != 0){
                document.getElementById("wikisearchresultstitle").innerHTML = "Results";
                document.getElementById("wikisearchresultstext").innerHTML = "";
                for (let resultcount = 0; resultcount < response.query.searchinfo.totalhits; resultcount++) {
                    var wikiresultentry = "<li style='cursor: pointer; text-decoration: underline;' onclick='loadWikiPage(" + response.query.search[resultcount].pageid + ", `" + response.query.search[resultcount].title + "`);'>" + response.query.search[resultcount].title + "</li>"
                    console.log(wikiresultentry)
                    document.getElementById("wikisearchresultstext").innerHTML += wikiresultentry;
                } 
            } else {
                document.getElementById("wikisearchresultstext").innerHTML = "<pre>No Results</pre>";
            }
        })
        .catch(function(error){console.log(error);});
    console.log("yo")
}

const parser = new DOMParser();

function loadWikiPage(pageidval, title) {
    var params = new URLSearchParams({
        action: "parse",
        pageid: pageidval,
        redirects: true,
        prop: "text",
        format: "json",
        origin: "*" // I can't believe I just had to change this. I spent an hour trying to debug CORS.
    });
    
    fetch(`${search_url}?${params}`)
        .then(function(response){return response.json();})
        .then(function(response) {
            document.getElementById("wikisearchresultstitle").innerHTML = title;
            var loadedWiki = parser.parseFromString(response.parse.text['*'], 'text/html');
            var loadedText = loadedWiki.getElementsByTagName('p')[0].innerText;
            document.getElementById("wikisearchresultstext").innerHTML = loadedText;
        })
        .catch(function(error){console.log(error);});
}