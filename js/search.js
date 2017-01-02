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

function resetSearchBtn() {
    jQuery("#btnSearchDocs").html('<i class="fa fa-search"></i>');
}
function resetSearchBtnMobile() {
    jQuery("#btnSearchDocsMobile").html('<i class="fa fa-search"></i>');
}
