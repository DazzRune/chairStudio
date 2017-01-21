jQuery(function($) {
	$('.header__burger').click(function(event) {
		$('.products-list').toggle();
	});

	$('.left-paginator ul li a').click(function(event) {
		event.preventDefault();

		$('.left-paginator ul li a').removeClass('active');
		$(this).addClass('active');

		$('.content').removeClass('content--active');
		$('.content:nth-of-type('+$(this).text()+')').addClass('content--active');
	});

	$('form[name=chairOptions] .color label').click(function() {
		$('form[name=chairOptions] .color label').removeClass('active');
		$(this).addClass('active');
	});

	$('form[name=chairOptions] .qty span:first-of-type .inc').click(function(event) {
		var prevChairsQty = $('form[name=chairOptions] .qty input[name=qty]');

		if (prevChairsQty.val() != "") {
			var nextChairsQty = parseInt(prevChairsQty.val()) + 1;
			prevChairsQty.val(nextChairsQty);
		} else {
			prevChairsQty.val(1);
		}

		var price = parseInt(prevChairsQty.val()) * 379;
		$('form[name=chairOptions] .qty span:last-of-type b').text(price);
	});

	$('form[name=chairOptions] .qty span:first-of-type .dec').click(function(event) {
		var prevChairsQty = $('form[name=chairOptions] .qty input[name=qty]');

		if (prevChairsQty.val() == "") {
			prevChairsQty.val(1);
		}

		if (parseInt(prevChairsQty.val()) > 1) {
			var nextChairsQty = parseInt(prevChairsQty.val()) - 1;
			prevChairsQty.val(nextChairsQty);
		}

		var price = parseInt(prevChairsQty.val()) * 379;
		$('form[name=chairOptions] .qty span:last-of-type b').text(price);
	});

	$('form[name=chairOptions] .qty span:first-of-type input[name=qty]').keypress(function(event) {
	    var verified = (event.which == 8 || event.which == undefined || event.which == 0) ? null : String.fromCharCode(event.which).match(/[^0-9]/); // 8 - backspace, 
	    if (verified) {
	    	event.preventDefault();
	    }
	});

	$('form[name=chairOptions] .qty span:first-of-type input[name=qty]').on('change paste keyup', function() {
		var price = parseInt($(this).val()) * 379;
		$('form[name=chairOptions] .qty span:last-of-type b').text(price);
	});

	$('form[name=chairOptions] button').click(function(event) {
		if ($('form[name=chairOptions] .qty input[name=qty]').val() == "") {
			event.preventDefault();
			alert('Введите, пожалуйста, количество товара!');
		}
	});
});