/**
 * The maximum length for an IPv6 is 39, but there is an exception
 * for IPv4-mapped IPv6. Although the likelyhood of such an event
 * happening, it's better to consider it than ignore it.
 */
const MAX_IP_LENGTH = 45;

const MAIN_API_URL = "https://twinnation.org/api/ip";
const FALLBACK_API_URL = "http://ip-api.com/line?fields=query";


window.onload = function() {
    fetchClientIP();
};


document.getElementById("refresh-btn").addEventListener("click", fetchClientIP, false);


function fetchClientIP() {
    callAjax(MAIN_API_URL, handler, false);
}


function callAjax(url, callback, isFallback) {
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                callback(xhr.responseText, isFallback);
            } else {
                callback(null, isFallback);
            }
        }
    }
    xhr.open("GET", url, true);
    xhr.send();
}


function handler(content, isFallback) {
    if (content === null && !isFallback) {
        callAjax(FALLBACK_API_URL, handler, true);
    } else {
        displayContent(content, isFallback);
    }
}


function displayContent(content, isFallback) {
    var ip = 'ERROR';
    if (content && content.length <= MAX_IP_LENGTH) {
        ip = content;
    }
    ip = isFallback ? "<span style='color:red'>" + ip + "</span>" : ip;
    document.getElementById("ip-address").innerHTML = ip;
}

