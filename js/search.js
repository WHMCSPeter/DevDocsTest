(function() {
    var cx = '006275421004365382826:qast12uenhu';
    var gcse = document.createElement('script');
    gcse.type = 'text/javascript';
    gcse.async = true;
    gcse.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') +
        '//cse.google.com/cse.js?cx=' + cx;
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(gcse, s);
})();

jQuery(document).ready(function() {
    jQuery("#docsSearch").submit(function(e) {
        e.preventDefault();
        jQuery("#btnSearchDocs").html('<i class="fa fa-spinner fa-spin"></i>');
        window.setTimeout(resetSearchBtn, 3000);
        jQuery(".gsc-input").val(jQuery("#docsQuery").val());
        jQuery(".gsc-search-button").click();
    });
    jQuery("#docsSearchMobile").submit(function(e) {
        e.preventDefault();
        jQuery("#btnSearchDocsMobile").html('<i class="fa fa-spinner fa-spin"></i>');
        window.setTimeout(resetSearchBtnMobile, 3000);
        jQuery(".gsc-input").val(jQuery("#docsQueryMobile").val());
        jQuery(".gsc-search-button").click();
    });
});

function resetSearchBtn() {
    jQuery("#btnSearchDocs").html('<i class="fa fa-search"></i>');
}
function resetSearchBtnMobile() {
    jQuery("#btnSearchDocsMobile").html('<i class="fa fa-search"></i>');
}
