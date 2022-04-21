var path = window.location.search.substring(1);
var drive = undefined;

function findPath(path, drive) {
    var dir = path.split('/');
    for(var i = 0; i < dir.length; i++) {
        if(dir[i] === '.' || dir[i] === '') {
            dir.splice(i, 1);
            i -= 1;
        }
        else if(dir[i] === '..') {
            if(i > 0) {
                dir.splice(i - 1, 2);
                i -= 2;
            }
            else {
                dir.splice(i, 1);
                i -= 1;
            }
        } 
    }
    var data = drive;
    for(var i = 0; i < dir.length; i++) {
        if(data[dir[i]] === undefined) {
            return [dir.slice(0, i).join('/'), data];
        }
        else {
            data = data[dir[i]];
        }
    }
    return [dir.join('/'), data];
}

window.onload = function() {
    loadPage();
}

function loadPage() {
    setTimeout(function() {
        ajax('https://cdn.jsdelivr.net/gh/CN-traveler/drive@master/drive.json?' + new Date().getTime()).onreadystatechange = function() {
            if(this.readyState === 4 && this.status === 200) {
                if(JSON.stringify(drive) != this.responseText) {
                    drive = JSON.parse(this.responseText);
                    [path, drive] = findPath(path, drive);
                    loadHeader(path);
                    loadMain(drive);
                    loadFooter(drive);
                }
            }
        }
        loadPage();
    }, 1000);
}

function loadHeader(path) {
    var header = document.getElementById('header');
    var headerInnerHTML = '<div class="path"><a href="?">Drive</a>';
    var dir = path.split('/');
    for(var i = 0; i < dir.length; i++) {
        headerInnerHTML += '<a href="?' + dir.slice(0, i + 1).join('/') + '">' + dir[i] + '</a>';
    }
    headerInnerHTML += '</div>';
    header.innerHTML = headerInnerHTML;
}

function loadMain(drive) {
    var main = document.getElementById('main');
    var mainInnerHTML = '';
    if(typeof drive === 'string') {
        main.className = 'list';
        mainInnerHTML += '<a class="item" href="dplayer.html?' + drive + '" title="Dplayer">使用 Dplayer 打开</a>';
    }
    else {
        main.className = 'icon';
        for(var i in drive) {
            mainInnerHTML += '<a class="item ' + (typeof drive[i] === 'string' ? 'file': 'folder') + '" href="?' + path + '/' + i + '" title="' + i + '">' + i + '</a>';
        }
    }
    main.innerHTML = mainInnerHTML;
}

function loadFooter(drive) {
    var footer = document.getElementById('footer');
    var accessToken = getAccessToken();
    var footerInnerHTML = '';
    if(accessToken) {
        footerInnerHTML += '<a>' + accessToken.access_token + '</a>';
    }
    else {
        footerInnerHTML += '<a href="javascript:;" onclick="getAccessToken(true)">Github 登录</a>';
    }
    footer.innerHTML = footerInnerHTML;
}
