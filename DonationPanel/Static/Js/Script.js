function bodyloaded(){
    jQuery('img.svg').each(function(){
        var $img = jQuery(this);
        var imgID = $img.attr('id');
        var imgStyle = $img.attr('style');
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');

        jQuery.get(imgURL, function(data) {
            // Get the SVG tag, ignore the rest
            var $svg = jQuery(data).find('svg');

            // Add replaced image's ID to the new SVG
            if(typeof imgID !== 'undefined') {
                $svg = $svg.attr('id', imgID);
            }
            // Add replaced image's classes to the new SVG
            if(typeof imgClass !== 'undefined') {
                $svg = $svg.attr('class', imgClass+' replaced-svg');
            }
            if(typeof imgStyle !== 'undefined') {
                $svg = $svg.attr('style', imgStyle);
            }

            // Remove any invalid XML tags as per http://validator.w3.org
            $svg = $svg.removeAttr('xmlns:a');

            // Replace image with new SVG
            $img.replaceWith($svg);

        }, 'xml');

    });
}
function amountchanged(obj){

    if (obj.value!="") {
        objvalue=obj.value.replace(",", "");
        objvalue=objvalue.replace(",", "");
        if (parseInt(objvalue)<9999999999) {
            obj.value=parseInt(objvalue).toLocaleString();
        }

    }

}
function nameAmountCheck(obj){
    document.getElementById("showdesc").disabled = !obj.checked;
    document.getElementById("showdesc").checked =obj.checked;
}
function onscroll(){
    if (document.body.clientWidth>900) {
        document.getElementById("header").style.transform="translate3d(0px, "+((document.body.scrollTop)/3)+"px, 0px)";
        document.getElementById("footer").style.transform="translate3d(0px, -"+(((document.getElementById("footer").clientHeight+document.getElementById("footer").offsetTop)-(document.body.scrollTop+window.innerHeight))/3)+"px, 0px)";
        document.getElementById("footer").style.margin="-50px 0 "+(((document.getElementById("footer").clientHeight+document.getElementById("footer").offsetTop)-(document.body.scrollTop+window.innerHeight))/3)+"px";
        document.getElementById("navbar").style.top=(document.body.scrollTop/2);
        document.getElementById("navbar").style.opacity=(1-((document.body.scrollTop/(document.getElementById("header").clientHeight/2.5))));
        document.getElementById("headercontent").style.opacity=(1-((document.body.scrollTop/document.getElementById("header").clientHeight)));
        $('.mainpage').css("background-position","0px "+((document.body.scrollTop)/2)+"px");
    }else{
        document.getElementById("header").style.transform="translate3d(0px, 0px, 0px)";
        document.getElementById("footer").style.transform="translate3d(0px, 0px, 0px)";
        document.getElementById("footer").style.margin="-50px 0 0px";
        document.getElementById("navbar").style.top="0";
        document.getElementById("navbar").style.opacity="1";
        document.getElementById("headercontent").style.opacity="1";
    }
}

$(document).ready(function(){
    $('.payform .userdesc').css('font-size','13px');
    setTimeout(function(){ $('.payform .userdesc').css('font-size','13.5px'); }, 100);
});

var defaultSettings = 'fa';
(function( $ ){

    $.fn.persiaNumber = function(settings) {
        if(typeof(settings) == 'string' && settings.length > 0)
            defaultSettings = settings;
        var range = 1728;
        if(settings == 'ar'){
            range = 1584;
        }
        window.persiaNumberedDOM = this;
        convert(this, range);
        $(document).ajaxComplete(function(){
            var thisObj = window.persiaNumberedDOM;
            convert(thisObj, range);
        });
        function convert(obj, range){
            obj.find("*").andSelf().contents().each(function() {
                if (this.nodeType === 3 && this.parentNode.localName != "style" && this.parentNode.localName != "script") {
                    this.nodeValue = this.nodeValue.replace(this.nodeValue.match(/[0-9]*\.[0-9]+/), function(txt){
                        return txt.replace(/\./,',');
                    });
                    this.nodeValue = this.nodeValue.replace(/\d/g, function(v) {
                        return String.fromCharCode(v.charCodeAt(0) + range);
                    });
                }
            });
        }
    };
})( jQuery );
origParseInt = parseInt;
parseInt = function(str) {
    str = str && str.toString().replace(/[\u06F0\u06F1\u06F2\u06F3\u06F4\u06F5\u06F6\u06F7\u06F8\u06F9]/g, function(v){return String.fromCharCode(v.charCodeAt(0) - 1728)}).replace(/[\u0660\u0661\u0662\u0663\u0664\u0665\u0666\u0667\u0668\u0669]/g, function(v){return String.fromCharCode(v.charCodeAt(0) - 1584)}).replace(/[\u066B]/g, '.');
    return origParseInt(str);
};
origParseFloat = parseFloat;
parseFloat = function(str) {
    str = str && str.toString().replace(/[\u06F0\u06F1\u06F2\u06F3\u06F4\u06F5\u06F6\u06F7\u06F8\u06F9]/g, function(v){return String.fromCharCode(v.charCodeAt(0) - 1728)}).replace(/[\u0660\u0661\u0662\u0663\u0664\u0665\u0666\u0667\u0668\u0669]/g, function(v){return String.fromCharCode(v.charCodeAt(0) - 1584)}).replace(/[\u066B]/g, '.');
    return origParseFloat(str);
};
