var fs = require('fs');

var path = parsePath(process.argv[2]);

function parsePath(path) {
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
    return dir.join('/');
}

fs.readFile('drive.json', function(err, data){
    if(err){
        return console.error(err);
    }
    var json = JSON.parse(data.toString());
    var dir = path.split('/');
    for(var i = 0, data = json; i < dir.length; i++) {
        if(data[dir[i]] === undefined) {
            return;
        }
        if(i == dir.length - 1) {
            delete data[dir[i]];
        }
        else {
            data = data[dir[i]];
        }
    }
    var str = JSON.stringify(json);
    fs.writeFile('drive.json', str, function(err){
        if(err){
            console.error(err);
        }
    })
})