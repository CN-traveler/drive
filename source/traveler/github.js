var config = {
    client_id: 'b6b126048b501ac43e6b',
    client_secret: '43e95fd80d06ef060166606266d128e80e7fc422',
    redirect_uri: 'https://cn-traveler.github.io/drive/redirect.html',
}

function getAccessToken(get = false) {
    var accessToken = getCookie('getAccessToken');
    if(accessToken) {
        return JSON.parse(accessToken);
    }
    if(get) {
        var code = window.location.search.split('code=')[1];
        if(code) {
            code = code.split('&')[0];
            ajax('https://cors-anywhere.herokuapp.com/https://github.com/login/oauth/access_token?client_id=' + config.client_id + '&client_secret=' + config.client_secret + '&code=' + code, 'POST', true, {
                'Accept': 'application/json'
            }).onreadystatechange = function() {
                if(this.readyState === 4 && this.status === 200) {
                    setCookie('getAccessToken', this.responseText);
                    window.location.href = './index.html';
                }
            }
        }
        else {
            window.location.href = 'https://github.com/login/oauth/authorize?client_id=' + config.client_id + '&redirect_uri=' + config.redirect_uri + '&scope=repo';
        }
    }
}

function add(path, url, save) {
    ajax('https://api.github.com/repos/CN-traveler/drive/actions/workflows/add.yml/dispatches', 'POST', true, {
        'accept': 'application/vnd.github.v3+json',
        'Authorization': 'token ' + getAccessToken(true).access_token
    }, {
        ref: 'main',
        inputs: {
            path: path,
            url: url,
            save: save.toString()
        }
    }).onreadystatechange = function() {
        if(this.readyState === 4 && this.status === 200) {
            console.log(this.responseText);
        }
    }
}