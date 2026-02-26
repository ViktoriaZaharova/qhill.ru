


/* фиксирование шапки */
var element = document.getElementById('header');
window.addEventListener('scroll', function () {
	if (window.scrollY > 50) {
		element.classList.add("scroll");
	} else {
		element.classList.remove("scroll");
	}
});

/* cursor */
var cursor = {
	delay: 8,
	_x: 0,
	_y: 0,
	endX: (window.innerWidth / 2),
	endY: (window.innerHeight / 2),
	cursorVisible: true,
	cursorEnlarged: false,
	$dot: document.querySelector('.cursor-dot'),
	$outline: document.querySelector('.cursor-dot-outline'),

	init: function () {
		this.dotSize = this.$dot.offsetWidth;
		this.outlineSize = this.$outline.offsetWidth;

		this.setupEventListeners();
		this.animateDotOutline();
	},

	setupEventListeners: function () {
		var self = this;

		document.querySelectorAll('a').forEach(function (el) {
			el.addEventListener('mouseover', function () {
				self.cursorEnlarged = true;
				self.toggleCursorSize();
			});
			el.addEventListener('mouseout', function () {
				self.cursorEnlarged = false;
				self.toggleCursorSize();
			});
		});

		document.addEventListener('mousedown', function () {
			self.cursorEnlarged = true;
			self.toggleCursorSize();
		});
		document.addEventListener('mouseup', function () {
			self.cursorEnlarged = false;
			self.toggleCursorSize();
		});

		document.addEventListener('mousemove', function (e) {
			self.cursorVisible = true;
			self.toggleCursorVisibility();

			self.endX = e.clientX;
			self.endY = e.clientY;
			self.$dot.style.top = self.endY + 'px';
			self.$dot.style.left = self.endX + 'px';
		});

		document.addEventListener('mouseenter', function (e) {
			self.cursorVisible = true;
			self.toggleCursorVisibility();
			self.$dot.style.opacity = 1;
			self.$outline.style.opacity = 1;
		});

		document.addEventListener('mouseleave', function (e) {
			self.cursorVisible = true;
			self.toggleCursorVisibility();
			self.$dot.style.opacity = 0;
			self.$outline.style.opacity = 0;
		});
	},

	animateDotOutline: function () {
		var self = this;

		self._x += (self.endX - self._x) / self.delay;
		self._y += (self.endY - self._y) / self.delay;
		self.$outline.style.top = self._y + 'px';
		self.$outline.style.left = self._x + 'px';

		requestAnimationFrame(this.animateDotOutline.bind(self));
	},

	toggleCursorSize: function () {
		var self = this;

		if (self.cursorEnlarged) {
			self.$dot.style.transform = 'translate(-50%, -50%) scale(4)';
			self.$outline.style.transform = 'translate(-50%, -50%) scale(0)';
		} else {
			self.$dot.style.transform = 'translate(-50%, -50%) scale(1)';
			self.$outline.style.transform = 'translate(-50%, -50%) scale(1)';
		}
	},

	toggleCursorVisibility: function () {
		var self = this;

		if (self.cursorVisible) {
			self.$dot.style.opacity = 1;
			self.$outline.style.opacity = 1;
		} else {
			self.$dot.style.opacity = 0;
			self.$outline.style.opacity = 0;
		}
	}
}
//cursor.init();

/* прикрепить файл */
document.addEventListener("DOMContentLoaded", () => {

	const inputFile = document.querySelectorAll(".upload-file__input");

	/////////// Кнопка «Прикрепить файл» ///////////
	inputFile.forEach(function (el) {
		let textSelector = document.querySelector(".upload-file__text");
		let fileList;

		// Событие выбора файла(ов)
		el.addEventListener("change", function (e) {

			// создаём массив файлов
			fileList = [];
			for (let i = 0; i < el.files.length; i++) {
				fileList.push(el.files[i]);
			}

			// вызов функции для каждого файла
			fileList.forEach(file => {
				uploadFile(file);
			});
		});

		// Проверяем размер файлов и выводим название
		const uploadFile = (file) => {

			// файла <5 Мб
			if (file.size > 5 * 1024 * 1024) {
				alert("Файл должен быть не более 5 МБ.");
				return;
			}

			// Показ загружаемых файлов
			if (file && file.length > 1) {
				if (file.length <= 4) {
					textSelector.textContent = `Выбрано ${file.length} файла`;
				}
				if (file.length > 4) {
					textSelector.textContent = `Выбрано ${file.length} файлов`;
				}
			} else {
				textSelector.textContent = file.name;
			}
		}

	});

});

/* слайдеры */
$('.news-detailed__slider').slick({
	slidesToShow: 3,
	slidesToScroll: 1,
	arrows: true,
	dots: false,
	infinite: false,
	prevArrow: '.news-detailed__slider-prev',
	nextArrow: '.news-detailed__slider-next',
	responsive: [{
		breakpoint: 992,
		settings: {
			slidesToShow: 2,
		},
	},
	{
		breakpoint: 576,
		settings: {
			slidesToShow: 1,
		},
	}],
});


$('.term__slider').slick({
	slidesToShow: 3,
	slidesToScroll: 1,
	arrows: true,
	dots: false,
	infinite: false,
	prevArrow: '.term__slider-prev',
	nextArrow: '.term__slider-next',
	responsive: [{
		breakpoint: 992,
		settings: {
			slidesToShow: 2,
		},
	},
	{
		breakpoint: 576,
		settings: {
			slidesToShow: 1,
		},
	}],
});


/* видео */
var videoModal = document.getElementById('videoModal');

if (videoModal) {
	videoModal.addEventListener('show.bs.modal', function (event) {
		var button = event.relatedTarget;
		var videoUrl = button.getAttribute('data-video-url');
		var videoIframe = document.getElementById('videoIframe');
		videoIframe.src = videoUrl;
	});

	videoModal.addEventListener('hidden.bs.modal', function () {
		var videoIframe = document.getElementById('videoIframe');
		videoIframe.src = '';
	});
}


$(document).ready(function () {
	if ($('#wpadminbar')[0]) { // fix admin bar
		$('#header').css('margin-top', '32px')
	}


	$('table').each(function () {
		if (!$(this).parent().hasClass('table-responsive')) {
			$(this).wrap('<div class="table-responsive"></div>');
		}
	});


	$('input[name="phone"]').on("input", function () {
		let value = this.value;

		// Разрешаем только цифры и плюс
		value = value.replace(/[^\d+]/g, "");

		// Удаляем все плюсы, кроме первого символа
		const firstPlus = value.startsWith("+") ? "+" : "";
		value = firstPlus + value.replace(/[+]/g, "");

		this.value = value;
	});


});

$('.smtp_form').submit(function (e) {
	e.preventDefault();

	var form = $(this);

	
		const formData = new FormData(form[0]);

	var btn = form.find('button[type="submit"]');

	btn.prop('disabled', true);

		sendAjax(formData, function (data) {
		if (data.status) {
			form[0].reset();
			$('.modal').modal('hide');
			$('#tnxModal').modal('show');
		}
		else {
			alert(data.text);
		}
	}, function () {
		alert('Ошибка, попробуйте еще раз');

	}, function () {
		btn.prop('disabled', false);

	});



});


$(document).on('click', '.careers-faq__link', function(){
	var name = $(this).data('name');
	$('#modal-join-team input[name="form_name"]').val(name);
});


function sendAjax(data, success, error, complete) {
	

	$.ajax({
		url: '/wp-admin/admin-ajax.php',
		type: 'POST',
		data: data,
		processData: false, // обязательно
		contentType: false, // обязательно
		dataType: 'json',
		success: success,
		error: error,
		complete: complete
	});
}


var cf = {
	setJSCookie: function (name, value, days) {
		var expires = "";
		if (days) {
			var date = new Date();
			date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
			expires = "; expires=" + date.toUTCString();
		}
		document.cookie = name + "=" + (value || "") + expires + "; path=/";
	},
	getJSCookie: function (name) {
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for (var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ') c = c.substring(1, c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
		}
		return 0;
	}
}



$(document).on('click', '.cookie__btn', function (e) {
	e.preventDefault();

	cf.setJSCookie('gdpr', 1, 999);

	$('.cookie').remove();
})


var intero = null;

$('input[name="search"]').on('change keyup input', function () {

	var input = $(this);

	if (intero) {
		clearTimeout(intero);
		intero = null;
	}

	intero = setTimeout(() => {
		var query = input.val();

		liveSearch(query);

	}, 300);

});


function liveSearch(query) {

	if (query.length == 0) {
		$('.glossary__group, .glossary__terms').removeClass('d-none');
	}

	else {
		query = query.trim();
		$('.glossary__group, .glossary__terms').addClass('d-none');

		$('.glossary__group').each(function () {
			var par = $(this);
			$(this).find('.glossary__terms').each(function () {
				var txt = $(this).text();

				if (hasSimilarity(txt, query)) {
					$(this).removeClass('d-none');
					$(par).removeClass('d-none');
				}

			});
		});

	}

}

function hasSimilarity(str1, str2) {
	// Приводим строки к нижнему регистру
	str1 = str1.toLowerCase().trim();
	str2 = str2.toLowerCase().trim();

	// Проверяем, содержит ли одна строка другую
	return str1.includes(str2) || str2.includes(str1);
}