const cheerio = require("cheerio")
const axios = require("axios")

async function performScraping() {
    // downloading the target web page
    // by performing an HTTP GET request in Axios
    const axiosResponse = await axios.request({
        method: "GET",
        url: "https://www.e-estekhdam.com/همه-ی-استخدام-های-امروز",
        //mode: 'no-cors',
        headers: {
            'Access-Control-Allow-Origin': '*',
        }
    });
    const result = document.getElementById('result');
    const $ = cheerio.load(axiosResponse.data);
    $(".list-anchor").find("a").each((index, element) => {
        var content = $(element).attr('href');
        var text = $(element).find("span > span:first");
        result.innerHTML += `<a class="job-url" target="_blank" href="${'https://www.e-estekhdam.com' + content}">${text}</a>`;
    });
}

//loading page screen until the data load
document.onreadystatechange = function () {
    if (document.readyState !== "complete") {
        document.querySelector("body").style.visibility = "hidden";
        document.getElementById("loading_indicator").style.visibility = "visible";
    } else {
        setTimeout(() => {
            document.getElementById("loading_indicator").style.display = "none";
            document.querySelector("body").style.visibility = "visible";
        }, 3000)
    }
};

//run scraping function
performScraping();