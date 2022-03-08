// 随机名称用于用户昵称和图片名称
// A的ASCII码是65，a的ASCII码是97
function getuserA() {
    var result = [];
    for (var i = 0; i < 8; i++) {
        var ranNum = Math.ceil(Math.random() * 25); //生成一个0到25的数字
        result.push(String.fromCharCode(65 + ranNum));
    }
    return result.join('');
}
function getuserB() {
    var result = [];
    for (var i = 0; i < 8; i++) {
        var ranNum = Math.ceil(Math.random() * 25); //生成一个0到25的数字
        result.push(String.fromCharCode(97 + ranNum));
    }
    return result.join('');
}
const getuserC = Math.ceil(Math.random() * (100000000 - 1) + 1)
const getusers = getuserA() + getuserB() + getuserC
module.exports = getusers