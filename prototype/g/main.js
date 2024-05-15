async function getHtmlBody(url) {
    try {
        const response = await fetch(`https://prox.kotla.eu/?url=${encodeURIComponent(url)}`, {
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        });
        const html = await response.text();
        return html;
    } catch (error) {
        console.error('Error fetching HTML:', error);
        return null;
    }
}

function extractUrlsFromHtml(html) {
    try {
        const regex = /<a[^>]+class="search-listing__link"[^>]+href="([^"]+)"/g;
        const matches = html.match(regex);
        const urls = matches.map(match => match.match(/href="([^"]+)"/)[1]);
        return urls;
    } catch (error) {
        var love = setInterval(spawnHeart, 50);

        // Clear existing hearts before starting a new interval
        clearHearts();
        heartCount = 0;
        love = setInterval(spawnHeart, 50);

        document.body.className = 'happy';
        return [];
    }
}


function checkHtml(html) {
    const tagRegex = /<a[^>]+class="tag-button"[^>]+href="\/your-visit\/free-things-to-do">Level G<\/a>/i;
    const curveRegex = /<a[^>]+href="#venue"[^>]+class="sticky-tabs__link-manual"[^>]*>The Curve<\/a>/i;
    const artGalleryRegex = /<a[^>]+href="#venue"[^>]+class="sticky-tabs__link-manual"[^>]*>Art Gallery<\/a>/i;


    const hasTag = tagRegex.test(html);
    const hasCurve = curveRegex.test(html);
    const hasArtGallery = artGalleryRegex.test(html);

    if (hasCurve && hasArtGallery && hasTag) {
        return 2;
    } else if (hasCurve && hasTag) {
        return 1;
    } else if (hasTag) {
        return 1;
    } else if (hasArtGallery) {
        return 2;
    } else {
        return 0;
    }
}


barbicanurl = "https://www.barbican.org.uk/whats-on?calendar_ranges%5B1%5D=1&dates%5Bmin%5D=2024-05-15&dates%5Bmax%5D=2024-05-15&af%5B1%5D=1"


function getDateInputValue() {
    const dateInput = document.getElementById('dateInput');
    const dateValue = dateInput.value;
    const formattedDate = new Date(dateValue).toISOString().split('T')[0];
    return formattedDate;
}

function createURL() {
    const date = getDateInputValue();
    return `https://www.barbican.org.uk/whats-on?calendar_ranges%5B1%5D=1&dates%5Bmin%5D=${date}&dates%5Bmax%5D=${date}&af%5B1%5D=1`
}

function test() {
    barbicanurl = createURL();
    floorstatus = 0;

    try {
        getHtmlBody(barbicanurl).then(html => {
            const urls = extractUrlsFromHtml(html);
            console.log(urls);
            const filteredUrls = urls.filter(url => url.startsWith('/whats-on'));
            const fullUrls = filteredUrls.map(url => `https://www.barbican.org.uk${url}`);
            console.log(fullUrls)

            const promises = fullUrls.map(url => getHtmlBody(url).then(html => checkHtml(html)));

            Promise.all(promises).then(stats => {
                stats.forEach(stat => {
                    if (floorstatus < stat) {
                        floorstatus = stat;
                    }

                    if (floorstatus == 0) {
                        var love = setInterval(spawnHeart, 50);

                        // Clear existing hearts before starting a new interval
                        clearHearts();
                        heartCount = 0;
                        love = setInterval(spawnHeart, 50);

                        document.body.className = 'happy';
                    } else if (floorstatus == 1) {
                        document.body.className = 'warn';
                    } else if (floorstatus == 2) {
                        document.body.className = 'sad';
                    }
                });

                document.getElementById('status').innerHTML = floorstatus.toString();
            });
        });
    } catch (error) {
        var love = setInterval(spawnHeart, 50);

        // Clear existing hearts before starting a new interval
        clearHearts();
        heartCount = 0;
        love = setInterval(spawnHeart, 50);

        document.body.className = 'happy';
    }
}

let heartCount = 0; // Variable to keep track of the number of hearts spawned
const maxHearts = 10; // Maximum number of hearts to spawn

function spawnHeart() {
    if (heartCount >= maxHearts) {
        clearInterval(love); // Stop the interval once the desired number of hearts is reached
        return;
    }

    var r_num = Math.floor(Math.random() * 40) + 1;
    var r_size = Math.floor(Math.random() * 65) + 10;
    var r_left = Math.floor(Math.random() * 100) + 1;
    var r_bg = Math.floor(Math.random() * 25) + 100;
    var r_time = Math.floor(Math.random() * 5) + 5;

    document.body.insertAdjacentHTML("beforeend", "<div class='heart' style='width:" + r_size + "px;height:" + r_size + "px;left:" + r_left + "%;background:rgba(255," + (r_bg - 25) + "," + r_bg + ",1);-webkit-animation:love " + r_time + "s ease;-moz-animation:love " + r_time + "s ease;-ms-animation:love " + r_time + "s ease;animation:love " + r_time + "s ease'></div>");

    document.body.insertAdjacentHTML("beforeend", "<div class='heart' style='width:" + (r_size - 10) + "px;height:" + (r_size - 10) + "px;left:" + (r_left + r_num) + "%;background:rgba(255," + (r_bg - 25) + "," + (r_bg + 25) + ",1);-webkit-animation:love " + (r_time + 5) + "s ease;-moz-animation:love " + (r_time + 5) + "s ease;-ms-animation:love " + (r_time + 5) + "s ease;animation:love " + (r_time + 5) + "s ease'></div>");

    heartCount++; // Increment the heart count
}

function clearHearts() {
    const hearts = document.getElementsByClassName('heart');
    while (hearts.length > 0) {
        hearts[0].remove();
    }
}

document.getElementById('dateInput').addEventListener('change', test);
