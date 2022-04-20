var config = {
    client_id: 'b6b126048b501ac43e6b',
    client_secret: '43e95fd80d06ef060166606266d128e80e7fc422',
    redirect_uri: '',
}

function getCode() {
    var search = window.location.search;
    var code = search.split('code=')[1];
    if(code) {
        code = code.split('&')[0];
        ajax('https://github.com/login/oauth/access_token?client_id=' + config.client_id + '&client_secret=' + config.client_secret + '&code=' + code, 'POST').onreadystatechange = function() {
            if(this.readyState === 4 && this.status === 200) {
                console.log(this.responseText);
            }
        }
    }
    // window.location.href = './index.html'
}

function login() {
    var url = 'https://github.com/login/oauth/authorize?client_id=' + config.client_id;
    window.location.href = url;
}