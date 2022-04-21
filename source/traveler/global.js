function ajax(url, method = 'GET', async = true, header = undefined, body = undefined) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url, async);
    if(header !== undefined) {
        for(var i in header) {
            xhr.setRequestHeader(i, header[i]);
        }
    }
    if(body !== undefined) {
        xhr.send(JSON.stringify(body));
    }
    else {
        xhr.send();
    }
    return xhr;
}

function setCookie(key, value, expires = undefined, path = '/') {
    document.cookie = key + '=' + value + (expires === undefined ? '' : ('; expires=' + expires)) + ('; path=' + path);
}

function getCookie(key) {
    var valueRight = document.cookie.split(key + '=')[1];
    return (valueRight === undefined) ? undefined : valueRight.split(';')[0];
}