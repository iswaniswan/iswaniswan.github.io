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

	// note guest
	visitors();

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

function visitors(){
	var api_key = '4dca3e0255a186a433fd6880f42c06c90d92525e40e5219c1d693e01';
	$.get('https://api.ipdata.co/?api-key='+api_key, function(response){
		var data = buildJson(response);
		sendFirebase(data);
	});
	// console.log(ids);
	// console.log(data);
}

var firebaseGuestIds = function(ids){
	return strToday() + '-' + ids;
}

function buildJson(data){
	var asn = data.asn;
	var time = data.time_zone;
	var threat = data.threat;
	var id = strToday() + '-' + data.count;
	var dData = {
		"id": id,
		"country": data.country_name,
		"region": data.region,
		"city": data.city,
		"ip": data.ip,
		"lat": data.latitude,
		"lng": data.longitude,
		"asn":{
			"asn": asn.asn,
			"name": asn.name,
			"domain": asn.domain
		},
		"time_zone": {
			"name": time.name,
			"abbr": time.abbr,
			"offset": time.offset,
			"current_time": time.current_time
		},
		"threat": {
			"is_tor": threat.is_tor,
			"is_proxy": threat.is_proxy,
			"is_anonymous": threat.is_anonymous,
			"is_known_attacker": threat.is_known_attacker,
			"is_known_abuser": threat.is_known_abuser,
			"is_threat": threat.is_threat,
			"is_bogon": threat.is_bogon
		},
	}
	return dData;
}

function strToday(){
	var today = new Date();
	var dd = String(today.getDate()).padStart(2, '0');
	var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
	var yyyy = today.getFullYear();
	return yyyy+mm+dd;
}

var responseExample = {
    "ip": "114.5.215.36",
    "is_eu": false,
    "city": "Jakarta",
    "region": "Jakarta",
    "region_code": "JK",
    "country_name": "Indonesia",
    "country_code": "ID",
    "continent_name": "Asia",
    "continent_code": "AS",
    "latitude": -6.1741,
    "longitude": 106.8296,
    "postal": null,
    "calling_code": "62",
    "flag": "https://ipdata.co/flags/id.png",
    "emoji_flag": "🇮🇩",
    "emoji_unicode": "U+1F1EE U+1F1E9",
    "asn": {
        "asn": "AS4761",
        "name": "INDOSAT Internet Network Provider",
        "domain": "indosatooredoo.com",
        "route": "114.5.215.0/24",
        "type": "isp"
    },
    "languages": [
        {
            "name": "Indonesian",
            "native": "Bahasa Indonesia"
        }
    ],
    "currency": {
        "name": "Indonesian Rupiah",
        "code": "IDR",
        "symbol": "Rp",
        "native": "Rp",
        "plural": "Indonesian rupiahs"
    },
    "time_zone": {
        "name": "Asia/Jakarta",
        "abbr": "WIB",
        "offset": "+0700",
        "is_dst": false,
        "current_time": "2019-11-23T21:29:45.777124+07:00"
    },
    "threat": {
        "is_tor": false,
        "is_proxy": false,
        "is_anonymous": false,
        "is_known_attacker": false,
        "is_known_abuser": false,
        "is_threat": false,
        "is_bogon": false
    },
    "count": "12"
}

var firebaseConfig = {
	apiKey: "AIzaSyDuQ2vzFemq_6pqpedSjxoUzST4Mn99z18",
	authDomain: "hello-firebase-6bd12.firebaseapp.com",
	databaseURL: "https://hello-firebase-6bd12.firebaseio.com",
	projectId: "hello-firebase-6bd12",
	storageBucket: "hello-firebase-6bd12.appspot.com",
	messagingSenderId: "354690179662",
	appId: "1:354690179662:web:cbfcbed861f73722"
};

function sendFirebase(data){
	
	// Initialize Firebase
	firebase.initializeApp(firebaseConfig);
	var db = firebase.database();
	var path = 'jobstreet/iswaniswan/';
	db.ref(path).push(data);

}


/* maps links
portofolio-education-maps
https://www.google.com/maps/d/embed?mid=1sa78AXwGoj2j48qsjvpCxSli6_6ElatR
*/