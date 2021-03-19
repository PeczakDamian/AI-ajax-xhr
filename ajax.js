
let Bundle = {
	id: {type: 'json', file: 'firma.json', url: 'http://localhost/xhr/' }
}
let res = 'id';
let data = null;

let getBundle = ()=> {
	console.log("Hello world!");
	// stworzenie obiektu XHR
	const xhr = new XMLHttpRequest();
	// ustawienie formatu danych odpowiedzi
	xhr.responseType = Bundle.id.type; // domyślnie text formaty: {text, arraybufer, blob, documnet, json}

	// skonfigurować połączenie
	xhr.open('GET', Bundle.id.url + Bundle.id.file, async=true);
	xhr.send(); // "wysłać połączenie"
	console.log(xhr.response);

	// wymagany nasłuch zdarzaenia (zmiany statusu połączenie)
	xhr.addEventListener('readystatechange', (e) => {
		if (xhr.readyState !== 4) {
			// komunikaty dla użytkownika
			console.log(xhr.readyState);
		}
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
					console.log('są ... są');
					console.log(xhr.response);
			}
			if (xhr.status === 404) {
				console.log('Brak zasobu / błędny URL');
			}
			if (xhr.status === 500) {
				console.log('Serwer skonał');
			}
			if (xhr.status === 503) {
				console.log('Retry later');
			}
		}
	}, false);
	// nasłuchujemy obiktu XHR kiedy obierze dokument: load
	xhr.addEventListener('load', (e) => {
		console.log(xhr.response);
		data = xhr.response;
		if (data != null) {
			let i = 1;
			let timeInt = 500; // ms (0,5s)
			let t1 = setInterval( function() {
				if (i === data.length-1) {
					clearInterval(t1);
				}
				insItem(i++, data[i-1]);
			}, timeInt);

			// data.forEach( item => insItem(i++, item));
			// setStatusBar();
		}
	}, false);
}
let insItem = (i, item)=> {
	let main = document.querySelector('#main');
	let tpl = document.querySelector('#rowTplt');
	let r2 = tpl.content.cloneNode(true);
	let rid = r2.querySelector('#row-');
		rid.id = rid.id+i;// <div id="row-1" ... -2 -3
	let cells = r2.querySelectorAll('p');
		cells[0].textContent = i;
		cells[1].textContent = item.imie;
		cells[2].textContent = item.nazwisko;
		cells[3].textContent = item.stanowisko;
		main.appendChild(r2);
	setStatusBar(i);
	addNavItems(i);
}
let addNavItems = (i)=> {
	let navy = document.querySelector('#navy');
	let a = document.createElement('a');
	a.href = '#row-' + i;
	a.textContent = i;
	navy.appendChild(a);
}
let setStatusBar = (i)=> {
	let dType = document.getElementById('dType');
		dType.textContent = Bundle.id.type;
	let rows = document.querySelector('#rows');
		rows.textContent = i ;
}
window.addEventListener('load', getBundle, false);




