jq = jQuery.noConflict();

var handlePages = function (e) {
    if (!jq(e.target).hasClass("active")) {
        jq("nav li, .page").removeClass("active");
        jq(e.target).parent("li").addClass("active");
        jq(jq(e.target).attr("href")).addClass("active");
    }
    e.preventDefault();
};

jq(document).on("click tap", "label.mode", function (e) {
    jq("label.mode").removeClass("active");
    jq(this).addClass("active");
    //jq("input[type='radio'][name='mode'][value='" + jq(this).data("mode") + "']").trigger(e.type);
});

jq(document).on("change", "input[type='radio'][name='mode']", function (e) {
    var radio = jq(this);
    var type = "text-" + jq(this).val();
    var target = "[data-text-" + jq(this).val() + "]";
    jq(target).each(function () {
        jq(this).text(jq(this).data(type));
    });
});

jq(document).on("click tap", "input[type='button'].shift", function (e) {
    var target = jq("#" + jq(this).data("target"));
    //var target = document.getElementById(jq(this).data("target"));
    var value = target.val();
    // var value = target.value;
    switch (jq(this).data("action")) {
        case "increment":
            value++;
            target.val(value);
            //target.stepUp(1);
            break;
        case "decrement":
            value--;
            target.val(value);
            //target.stepDown(1);
            break;
    }
});

jq(document).on("submit.form", "form", function (e) {
    e.preventDefault();
    //console.log(e);
    //console.log(jq(this).serialize());
    //TODO: Intercept form submission values? Use a pair of radio buttons to select encode/decode mode?
    switch (jq(this).attr("id")) {
        case "caesar":
            //Code.Caesar.encode(shift, message);
            jq("#caesarOutput").val(Code.Caesar.encode(jq("#caesarNum").val(), jq("#caesarInput").val()));
            break;
        case "substitution":
            //Code.Substitution.encode(source, cipher, message);
            jq("#subOutput").val(Code.Substitution.encode(jq("#subSource").val(), jq("#subKey").val(), jq("#subInput").val()));
            break;
        case "vignere":
            //Code.Vignere.encode(key, message);
            jq("#vignereOutput").val(Code.Vignere.encode(jq("#vignereKey").val(), jq("#vignereInput").val()));
            break;
        case "mode":
            //switchMode();
            break;
        default:
            return false;
            break;
    }
    return false;
});

jq(document).on("keyup.text", "input[type='text'], textarea", function (e) {
    jq(this).val(jq(this).val().toUpperCase());
});

jq(document).on("click tap", "nav ul li a", handlePages);

jq(document).ready(function () {
    
});