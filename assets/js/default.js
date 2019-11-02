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
			var activate = $('#profile-header').hasClass('activate') ? '' : activateStyle1() ;
			//var carousel = $('#carousel-scanned-image').length == 1 ? '' : activeCarousel() ;
			componentLoader($(this).attr('data-target'));
            $(this).addClass('active');
		});
	});

});

function navJs(){
	$('.fas.smaller').on('click', function(){
		var target = $(this).attr('data-target');
		$('#profile-menu a[data-target='+target+']').trigger('click');
	});
}

function clearTooltip(){
	$('div.tooltip').hide();
}

function activateStyle1(){
    $('#profile-header').addClass('activate') ;
    $('#profile-content').fadeIn('slow');
	$('#profile-name').appendTo('#profile-header .wrapper');
	$('#profile-menu').appendTo('#profile-header .wrapper');
}

function activeCarousel(){
	$('#carousel').load('component/carousel-scanned-image.html');
}

function copyToClipboard(element) {
	var $temp = $("<input>");
	$("body").append($temp);
	$temp.val($(element).html()).select();
	document.execCommand("copy");
	$temp.remove();
}

function componentLoader(content){
	$('#track').load('component/'+content+'.html', function(response, status, xhr){
		if( xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0) ){
			if( content === 'education' ) tooltipLocation();
			clearTooltip();
			navJs();
			console.log('success loading ' + content);
		}
	});
}

function tooltipLocation(){
	$('#accordion-education button').each(function(){
		var place = $(this).text();
		$(this).tooltip({
			html: true,
			placement: 'right', 
			title: '<a href="https://www.google.com/maps/d/embed?mid=1sa78AXwGoj2j48qsjvpCxSli6_6ElatR" target="_blank" class="maps-lnk">open my maps</a>',
			delay: {'show': 300, 'hide': 500}
		});
	});
}


/* maps links
portofolio-education-maps
https://www.google.com/maps/d/embed?mid=1sa78AXwGoj2j48qsjvpCxSli6_6ElatR
*/