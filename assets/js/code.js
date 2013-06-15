var Code = (function () {

    var ALPHA = "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        SPECIAL = "~!@#$%^&*()_+{}|:\"<>?`-=[]\\;',./ ",
        NUMERIC = "0123456789";

    var process = function (source, cipher, cipherAllowSpecial, message, messageTranslateSpecial, mode) {
        var cipher = cipher.toUpperCase().split(""),
            message = message.toUpperCase().split(""),
            a = source.split(""),
            b = source.split("");
        while (cipher.length > 0) {
            if (!cipherAllowSpecial && SPECIAL.split("").indexOf(cipher[cipher.length - 1]) !== -1 || !cipherAllowSpecial && NUMERIC.split("").indexOf(cipher[cipher.length - 1]) !== -1) {
                cipher.pop();
            } else {
                b.splice(b.indexOf(cipher[cipher.length - 1]), 1);
                b.unshift(cipher.pop());
            }
        }
        var i = (mode === "decode") ? b : a;
        var o = (mode === "decode") ? a : b;
        console.log(i, o);
        var output = [];
        while (message.length > 0) {
            if (!messageTranslateSpecial && SPECIAL.split("").indexOf(message[0]) !== -1 || !messageTranslateSpecial && NUMERIC.split("").indexOf(message[0]) !== -1) {
                output.push(message.shift());
            } else {
                var temp = i.indexOf(message.shift());
                if (temp !== -1) output.push(o[temp]);
            }
        }
        return output.join("");
    };

    var Vignere = (function () {

        var encode = function (key, message) {
            return process(ALPHA, key, false, message, false, "encode");
        };

        var decode = function (key, message) {
            return process(ALPHA, cipher, false, message, false, "decode");
        };

        return {
            encode: encode,
            decode: decode
        };

    })();

    var Substitution = (function () {

        var encode = function (source, cipher, message) {
            return process(source, cipher, true, message, true, "encode");
        };

        var decode = function (source, cipher, message) {
            return process(source, cipher, true, message, true, "decode");
        };

        return {
            encode: encode,
            decode: decode
        };

    })();

    var Caesar = (function () {

        var makeShiftCipher = function (shift) {
            var temp = ALPHA.split("");
            if (shift > 0) {
                if (shift > temp.length) shift %= temp.length;
                var temp2 = temp.splice(0 - shift, shift);
                return temp2.concat(temp).join("");
            } else {
                if (shift < 0 - temp.length) shift %= temp.length;
                var temp2 = temp.splice(0, 0 - shift);
                return temp.concat(temp2).join("");
            }
        };

        var encode = function (shift, message) {
            var cipher = makeShiftCipher(shift);
            return process(ALPHA, cipher, false, message, false, "encode");
        };

        var decode = function (shift, message) {
            var cipher = makeShiftCipher(shift);
            return process(ALPHA, cipher, false, message, false, "decode");
        };

        return {
            encode: encode,
            decode: decode
        };

    })();

    return {
        Vignere: Vignere,
        Substitution: Substitution,
        Caesar: Caesar
    };

})();