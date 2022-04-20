function ajax(url, method = 'GET') {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.send();
    return xhr;
}

