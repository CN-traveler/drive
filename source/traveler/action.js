var config = {
    client_id: 'b6b126048b501ac43e6b',
    redirect_uri: '',
}

function login() {
    var url = 'https://github.com/login/oauth/authorize?client_id=' + config.client_id;
    window.location.href = url;
}