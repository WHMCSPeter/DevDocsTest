jQuery(document).ready(function() {

    jQuery('.sub-success-message').hide().removeClass('hidden');
    jQuery('.sub-error-message').hide().removeClass('hidden');

    jQuery('#frmSubscribe').submit(function(e) {
        e.preventDefault();
        var postdata = jQuery('#frmSubscribe').serialize();
        jQuery.ajax({
            type: 'POST',
            url: 'https://www.whmcs.com/members/subscribe.php',
            data: postdata,
            dataType: 'json',
            success: function(json) {
                if(json.valid == 0) {
                    jQuery('.sub-success-message').hide();
                    jQuery('.sub-error-message').hide();
                    jQuery('.sub-error-message').html(json.message);
                    jQuery('.sub-error-message').fadeIn();
                } else {
                    jQuery('.sub-error-message').hide();
                    jQuery('.sub-success-message').hide();
                    jQuery('#frmSubscribe').hide();
                    jQuery('.sub-success-message').html(json.message);
                    jQuery('.sub-success-message').fadeIn();
                }
            }
        });
    });

    jQuery('[data-toggle="offcanvas"]').click(function () {
        jQuery('.row-offcanvas').toggleClass('active')
    });
});

function getProperty(obj, props, defaultValue) {
    var res, isvoid = function(x) {
        return typeof x === "undefined" || x === null;
    }
    if (!isvoid(obj)) {
        if (isvoid(props)) props = [];
        if (typeof props === "string") props = props.trim().split(".");
        if (props.constructor === Array) {
            res = props.length > 1 ? getProperty(obj[props.shift()], props, defaultValue) : obj[props[0]];
        }
    }
    return typeof res === "undefined" ? defaultValue : res;
}

var client = algoliasearch("365Z1NWVA5", "e7cf44d512da9fe2e4e38c6a41816a71");
var index = client.initIndex('whmcs-devdocs');
$('#inputSearch, #inputSearchMobile').autocomplete({
    hint: false,
    debug: true
}, [{
    source: $.fn.autocomplete.sources.hits(index, {
        hitsPerPage: 5
    }),
    //value to be displayed in input control after user's suggestion selection
    displayKey: 'name',
    //hash of templates used when rendering dataset
    templates: {
        //'suggestion' templating function used to render a single suggestion
        suggestion: function(suggestion) {
            var category = getProperty(suggestion, '_highlightResult.hierarchy.lvl0.value', 'X');
            var title1 = getProperty(suggestion, '_highlightResult.hierarchy.lvl1.value', 'Y');
            var title2 = getProperty(suggestion, '_highlightResult.hierarchy.lvl2.value', '');
            if (title2) {
                title2 = ' > ' + title2;
            }
            var content = getProperty(suggestion, '_snippetResult.content.value', '');
            var url = getProperty(suggestion, 'url', '');
            var urlForDisplay = getProperty(suggestion, 'url_without_anchor', '');
            return '<a href="' + url.replace('/#breadcrumbs', '/') + '">' +
                '<strong>' + category + '</strong>' +
                '<span>' + title1 + '</span>' +
                '<span>' + title2 + '</span>' +
                '<span class="url">' + urlForDisplay + '</span>' +
                '</a>';
        }
    }
}]);
