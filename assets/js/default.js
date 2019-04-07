$(document).ready(function(){
	$('.slideleft a').each(function(index){
		$(this).hover(function(){
			var envelope = $(this).children('i').hasClass('fa-envelope') ? $(this).children('i').removeClass('fa-envelope').addClass('fa-envelope-open') : '';
			var whatsapp = $(this).children('i').hasClass('fa-whatsapp') ? $(this).children('i').removeClass('fa-whatsapp').addClass('fa-whatsapp-square') : '';
			var phone = $(this).children('i').hasClass('fa-phone') ? $(this).children('i').removeClass('fa-phone').addClass('fa-phone-square') : ''; 
			$(this).parent('.slideleft').addClass('played');
		}, function(){
		$(this).parent('.slideleft').children().find('span').fadeIn('slow').removeClass('d-none');
		});
	});
	$('.cust-lnk span').each(function(){
		$(this).tooltip({
			placement: 'bottom', title: 'click to copy to clipboard', delay: {'show': 300, 'hide': 300}
		}).on('click', function(){
			copyToClipboard($(this));
			$(this).attr('title', 'copied!').tooltip('_fixTitle').tooltip('show').attr('data-original-title', '').tooltip('_fixTitle');	
		});
    });

	$('a.nav-link').each(function(){
		$(this).on('click', function(){
            $('a.nav-link').removeClass('active');
            activateStyle1();
            $(this).addClass('active');
            loadProfileContent($(this).attr('data-target'));
		});
	});

});

function activateStyle1(){
    var activate = $('#profile-header').hasClass('activate') ? '' : $('#profile-header').addClass('activate') ;
    var carousel = $('#profile-content').attr('display') == 'block' ? '' : $('#profile-content').fadeIn('slow');
	$('#profile-name').appendTo('#profile-header .wrapper');
	$('#profile-menu').appendTo('#profile-header .wrapper');
}

function copyToClipboard(element) {
	var $temp = $("<input>");
	$("body").append($temp);
	$temp.val($(element).html()).select();
	document.execCommand("copy");
	$temp.remove();
}

function loadProfileContent(content){
    $('#profile-content .loadable').load(content+'.html');
}