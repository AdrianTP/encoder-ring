var Util = (function () {

    // returns the actual type of the tested item
    var _typeof = function (item) {
        return Object.prototype.toString.call(item).replace("[object ","").replace("]","").toLowerCase();
    };

    // rounds a float to a specific number of decimal places
    var decRound = function (input, digits) {
        var dec = Math.pow(10, digits);
        return (Math.round(input * dec) / dec).toFixed(digits);
    };

    // truncates a float to a specific number of decimal places
    var decTruncate = function (input, digits) {
        var output = (input.toString.substr(0, 1 + input.indexOf(".") + digits)).toFixed(digits);
        if (isNaN(output)) output = 0;
        return parseFloat(output);
    };

    // returns an object representing the character types found within the tested string
    var strType = function (input) {
        var ALPHA = "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
            SPECIAL = "~!@#$%^&*()_+{}|:\"<>?`-=[]\\;',./ ",
            NUMERIC = "0123456789",
            isAlpha = false,
            isSpecial = false,
            isNumeric = false,
            isAlphaNumeric = false,
            isMixed = false,
            kind = "blank";
        if (_typeof(input) === "string") {
            var test = input.toUpperCase().split("");
            while (test.length > 0) {
                var current = test.shift();
                isAlpha = (!isAlpha) ? (ALPHA.indexOf(current) !== -1) : isAlpha;
                isSpecial = (!isSpecial) ? (SPECIAL.indexOf(current) !== -1) : isSpecial;
                isNumeric = (!isNumeric) ? (NUMERIC.indexOf(current) !== -1) : isNumeric;
                isAlphaNumeric = (isAlpha && isNumeric);
                isMixed = (isAlpha && isNumeric && isSpecial);
                kind = (isMixed) ? "mixed" : (isAlphaNumeric) ? "alphanumeric" : (isNumeric) ? "numeric" : (isSpecial) ? "special" : (isAlpha) ? "alpha" : "blank";
            }
        }
        return {
            alpha: isAlpha,
            numeric: isNumeric,
            special: isSpecial,
            alphaNumeric: isAlphaNumeric,
            mixed: isMixed,
            kind: kind
        };
    };

    return {
        typeof: _typeof,
        decRound: decRound,
        decTruncate: decTruncate,
        strType: strType
    };

})();