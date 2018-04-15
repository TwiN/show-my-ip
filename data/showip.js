/**
 * The maximum length for an IPv6 is 39, but there is an exception
 * for IPv4-mapped IPv6. Although the likelyhood of such an event
 * happening, it's better to consider it than ignore it.
 */
const MAX_IP_LENGTH = 45;


window.onload = function() {
  fetchClientIP();
};


function fetchClientIP() {
  callAjax("https://twinnation.org/api/ip", displayContent);
}


function callAjax(url, callback) {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.withCredentials = true;
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      callback(xmlhttp.responseText);
    }
  }
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
}


function displayContent(content) {
  if (content && content.length <= MAX_IP_LENGTH) {
    document.getElementById("ip-address").innerHTML = content;
  } else {
    document.getElementById("ip-address").innerHTML = "ERROR";
  }
}
