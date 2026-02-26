const myISO = new Intl.Locale(navigator.language).region;
const data = window.phoneMasks.map(({ name, code, iso, mask }) => {
	return {
		id: iso,
		country: name,
		code: code,
		mask: Array.isArray(mask) ? mask[0] : mask,
		selected: iso === myISO,
	}
});
const byISO = Object.fromEntries(data.map((item) => [item.id, item]));
let currentCountry = byISO[myISO];

function templateSelection({ id }) {
	return $(`<div><span class="flag:${id}"></span></div>`)
}

function templateResult({ id, country }) {
	return $(`<div><span class="flag:${id}"></span> <span>${country}</span></div>`)
}

function matcher({ term }, data) {
	if (!term?.trim())
		return data

	const { id, country, code } = data
	const termLowerCase = term.toLowerCase();
	if (id.toLowerCase().includes(termLowerCase))
		return data

	if (country.toLowerCase().includes(termLowerCase))
		return data

	if (code.toLowerCase().includes(termLowerCase))
		return data

	return null
}

//returns formatted phone and placeholder
function formatPhone(phone) {
	if (typeof phone === 'string' && phone.startsWith(currentCountry.code)) {
		phone = phone.substring(currentCountry.code.length);
	}
	if (typeof phone !== 'string') {
		return ['', '']; // Возвращаем пустые строки или другое значение по умолчанию
	}
	const digits = phone.match(/\d/g) ?? [];
	const mask = currentCountry.mask.replaceAll('#', '_');
	let prefix = [...currentCountry.code];
	let suffix = mask.split('');
	while (digits.length && suffix.length) {
		const ch = suffix.shift();
		if (ch === '_')
			prefix.push(digits.shift());
		else
			prefix.push(ch);
	}
	return [prefix.join(''), suffix.join('')]
}

let prevValue = ''
function updateInput() {
	const value = $('.phone-input__phone-number').val();
	const [prefix, suffix] = formatPhone(value);
	$('.phone-input__phone-placeholder').attr('placeholder', prefix + suffix);
	$('.phone-input__phone-number').val(prefix);
}

$('.phone-input__country')
	.select2({
		data,
		matcher,
		templateSelection,
		templateResult,
		dropdownAutoWidth: true,
		width: 'style',
	})
	.val(currentCountry)
	.change(function () {
		currentCountry = byISO[$(this).val()];
		$('.phone-input__phone-number').val('');
		updateInput();
	});

$('.phone-input__phone')
	.on('input', function () {
		updateInput();
	});

updateInput();
