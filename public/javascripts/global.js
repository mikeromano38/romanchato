// All global functions actually are confined to namespace Romanchato

var Romanchato = {

    setCookie: function(c_name, value, exdays){
        var exdate = new Date();
        exdate.setDate(date.getDate() + exdays);
        var c_value = escape(value) + ((exdays == null) ? '' : '; expires=' + exdate.toUTCString());
        document.cookie = c_name + "=" + c_value;
    },

    getCookie: function(c_name){
        var ARRcookies = document.cookie.split(";");
        var i, x, y;

        for (i = 0; i < ARRcookies.length; i++) {
            x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
            y = ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
            x = x.replace(/^\s+|\s+$/g,"");

            if (x == c_name) {
                return unescape(y);
            }
        }
    }

}

var User = {
    name: ''
}