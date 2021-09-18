/**
 * The maximum length for an IPv6 is 39, but there is an exception
 * for IPv4-mapped IPv6. Although the likelihood of such an event
 * happening is extremely low, considering it is better than not.
 */
const MAX_IP_LENGTH = 45;

const MAIN_API_URL = "https://twin.sh/api/v1/ip";
const FALLBACK_API_URL = "http://ip-api.com/line?fields=query";

window.onload = function() {
    fetchClientIP();
};

document.getElementById("refresh-btn").addEventListener("click", fetchClientIP, false);
document.getElementById("copy-btn").addEventListener("click", copyToClipboard, false);

function fetchClientIP() {
    callAjax(MAIN_API_URL, handler, false);
}

function callAjax(url, callback, isFallback) {
    let xhr = new XMLHttpRequest();
    if (!isFallback) {
        xhr.timeout = 1000;
    }
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                callback(xhr.responseText, isFallback);
            } else {
                callback(null, isFallback);
            }
        }
    };
    xhr.open("GET", url, true);
    xhr.send();
}

function handler(content, isFallback) {
    if (!content && !isFallback) {
        callAjax(FALLBACK_API_URL, handler, true);
    } else {
        displayContent(content, isFallback);
    }
}

function displayContent(content, isFallback) {
    let ip = 'ERROR';
    if (content && content.length <= MAX_IP_LENGTH) {
        ip = sanitize(content);
    }
    document.getElementById("ip-address").style.color = isFallback ? "red" : "black";
    document.getElementById("ip-address").innerText = ip;
}

function copyToClipboard() {
    let ip = document.getElementById("ip-address").innerText;
    navigator.clipboard.writeText(ip);
}

/**
 * Removes characters that shouldn't be in an IPv4 or an IPv6
 * @param s String to sanitize
 * @returns sanitized string
 */
function sanitize(s) {
    return s.replace(/[^0-9:a-fA-F.]/g, '');
}
