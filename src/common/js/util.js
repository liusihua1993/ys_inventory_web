var SIGN_REGEXP = /([yMdhsm])(\1*)/g;
var DEFAULT_PATTERN = 'yyyy-MM-dd';
import CryptoJS from "crypto-js";
 //秘钥
const CRYPTOJSKEY= "abcdefgabcdefg12";
function padding(s, len) {
    var len = len - (s + '').length;
    for (var i = 0; i < len; i++) { s = '0' + s; }
    return s;
};

export default {
    getQueryStringByName: function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        var context = "";
        if (r != null)
            context = r[2];
        reg = null;
        r = null;
        return context == null || context == "" || context == "undefined" ? "" : context;
    },
    formatDate: {
        format: function (date, pattern) {
            pattern = pattern || DEFAULT_PATTERN;
            return pattern.replace(SIGN_REGEXP, function ($0) {
                switch ($0.charAt(0)) {
                    case 'y': return padding(date.getFullYear(), $0.length);
                    case 'M': return padding(date.getMonth() + 1, $0.length);
                    case 'd': return padding(date.getDate(), $0.length);
                    case 'w': return date.getDay() + 1;
                    case 'h': return padding(date.getHours(), $0.length);
                    case 'm': return padding(date.getMinutes(), $0.length);
                    case 's': return padding(date.getSeconds(), $0.length);
                }
            });
        },
        parse: function (dateString, pattern) {
            var matchs1 = pattern.match(SIGN_REGEXP);
            var matchs2 = dateString.match(/(\d)+/g);
            if (matchs1.length == matchs2.length) {
                var _date = new Date(1970, 0, 1);
                for (var i = 0; i < matchs1.length; i++) {
                    var _int = parseInt(matchs2[i]);
                    var sign = matchs1[i];
                    switch (sign.charAt(0)) {
                        case 'y': _date.setFullYear(_int); break;
                        case 'M': _date.setMonth(_int - 1); break;
                        case 'd': _date.setDate(_int); break;
                        case 'h': _date.setHours(_int); break;
                        case 'm': _date.setMinutes(_int); break;
                        case 's': _date.setSeconds(_int); break;
                    }
                }
                return _date;
            }
            return null;
        }

    },
    // 加密
    encrypt(plaintText) {
        var plaintText = plaintText;
        var options = {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        };
        var key = CryptoJS.enc.Utf8.parse(CRYPTOJSKEY);
        var encryptedData = CryptoJS.AES.encrypt(plaintText, key, options);
        var encryptedBase64Str = encryptedData.toString().replace(/\//g, "_");
        encryptedBase64Str = encryptedBase64Str.replace(/\+/g,"-");
        return encryptedBase64Str;
    },
    //解密
    decrypt(encryptedBase64Str) {
        var vals = encryptedBase64Str.replace(/\-/g, '+').replace(/_/g, '/');
        var options = {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        };
        var key = CryptoJS.enc.Utf8.parse(CRYPTOJSKEY);
        var decryptedData = CryptoJS.AES.decrypt(vals, key, options);
        var decryptedStr = CryptoJS.enc.Utf8.stringify(decryptedData);
        return decryptedStr
    },
    // 格式化时间
    formatDates (date, fmt) {
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear()+'').substr(4-RegExp.$1.length));
        }
        let o = {
            'M+': date.getMonth()+1,
            'd+': date.getDate(),
            'h+': date.getHours(),
            'm+': date.getMinutes(),
            's+': date.getSeconds()
        }
        for (let k in o) {
            if (new RegExp(`(${k})`).test(fmt)) {
                let str = o[k] + '';
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
            }
        }
        return fmt
    },
    deepCopy(obj){
        if(typeof obj != 'object'){
           return obj;
         }
         var newobj = {};
         for ( var attr in obj) {
             newobj[attr] = this.deepCopy(obj[attr]);
         }
         return newobj;
    }
};
function padLeftZero(str) {
    return ('00' + str).substr(str.length)
}
