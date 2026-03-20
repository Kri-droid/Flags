const country = document.getElementById("country");
const from = document.getElementById("from");
const to = document.getElementById("to");
const prophei = document.getElementById("prophei");
const propwid = document.getElementById("propwid");
const showlangcont = document.getElementById("showlang");
const settingsBtn = document.getElementById("settingsBtn");
const langflag = document.getElementsByClassName("langimg");

let jezyk = localStorage.getItem("jezyk") || "en";

setLanguage(jezyk);
deleteValue();

function deleteValue() {
	country.value = ""
	from.value = ""
	to.value = ""
	prophei.value = ""
	propwid.value = ""
}
function setLanguage(lang) {
    localStorage.setItem("jezyk", lang);
    jezyk = lang;

	document.querySelectorAll(".result").forEach(el => el.remove());
	
	const title = document.querySelector("title");
	const langtext = document.getElementById("langtext");
	const textlanf = document.getElementsByClassName("textlanf"); 
	const search = document.getElementById("search");
	
	if (lang === "en") {
		title.innerHTML = "Flags - Search"
		langtext.innerHTML = "Language:"
		langflag[0].alt = "English"
		langflag[1].alt = "Polish"
		textlanf[0].innerHTML = "Country:"
		textlanf[1].innerHTML = "Years:"
		textlanf[2].innerHTML = "Aspect ratio:"
		prophei.placeholder = "Height"
		propwid.placeholder = "Width"
		textlanf[3].innerHTML = "Variant:"
		textlanf[4].innerHTML = "Most popular"
		textlanf[5].innerHTML = "All official"
		textlanf[6].innerHTML = "Unstandarized"
		search.innerHTML = "Search"
	} else if (lang === "pl") {
		title.innerHTML = "Flagi - Wyszukiwarka"
		langtext.innerHTML = "Język:"
		langflag[0].alt = "Angielski"
		langflag[1].alt = "Polski"
		textlanf[0].innerHTML = "Państwo:"
		textlanf[1].innerHTML = "Lata:"
		textlanf[2].innerHTML = "Proporcje:"
		prophei.placeholder = "Wysokość"
		propwid.placeholder = "Szerokość"
		textlanf[3].innerHTML = "Wariant:"
		textlanf[4].innerHTML = "Najpopularniejszy"
		textlanf[5].innerHTML = "Wszystkie oficjalne"
		textlanf[6].innerHTML = "Nieustandaryzowane"
		search.innerHTML = "Wyszukaj"
	}
	deleteValue();
}
function bisible(butId, diverhidenid, editparam) {
	const hiddenElement = document.getElementById(diverhidenid);
	const buttonElement = document.getElementById(butId);

	let visible = (getComputedStyle(hiddenElement).display === "none");

	if (visible) {
		hiddenElement.style.display = "block";
		if(!editparam) buttonElement.textContent = "▲";
	} else {
		hiddenElement.style.display = "none";
		if(!editparam) buttonElement.textContent = "▼";
	}
}
function search() {
	
	const fromVal = from.value.trim() ? Number(from.value) : null;
	const toVal = to.value.trim() ? Number(to.value) : null;
	const propWidVal = propwid.value.trim() ? Number(propwid.value) : null;
	const propHeiVal = prophei.value.trim() ? Number(prophei.value) : null;
	const variantVal = document.getElementById("variantSelect").value;
	// KRYTERIUM TEXT  -  const newTextVal = newTextInput.value.trim().toLowerCase();
	// KRYTERIUM OPTION  -  const newOptionVal = newOptionSelect.value;

	const countryVal = country.value
		.trim()
		.toLowerCase()
		.replace(/\s+/g, "");


	const results = data.filter(item => {

		if (countryVal && (!Array.isArray(item.country) || !item.country.some(c => c.toLowerCase().replace(/\s+/g, "").startsWith(countryVal))))
			return false;

		const itemFrom = Number(item.from);
		const itemTo = item.to === null ? Infinity : Number(item.to);
		if ((fromVal !== null && itemTo < fromVal) || (toVal !== null && itemFrom > toVal))
			return false;

		if ((propWidVal !== null && item.propwid !== propWidVal) || 
			(propHeiVal !== null && item.prophei !== propHeiVal))
			return false;

		if (variantVal === "P" && item.variant[0] !== "P")
			return false;

		if (variantVal === "O" && item.variant[0] === "N")
			return false;

		if (variantVal === "N" && item.variant[0] !== "N")
			return false;
		return true;
	});
	
	// KRYTERIUM TEXT  -  if (newTextVal && !item.name.toLowerCase().includes(newTextVal)) return false;
	// KRYTERIUM OPTION  -  if (newOptionVal && item.category !== newOptionVal) return false;
	sort(results);
	resvis(results);
	return results;
}
function sort(resultlist) {
    resultlist.sort((a, b) => {

        let nameA = jezyk === "pl" ? a.country[0] : a.engcountry[0];
        let nameB = jezyk === "pl" ? b.country[0] : b.engcountry[0];

        if (nameA.toLowerCase() < nameB.toLowerCase()) return -1;
        if (nameA.toLowerCase() > nameB.toLowerCase()) return 1;


        let toA = a.to === null ? Infinity : Number(a.to);
        let toB = b.to === null ? Infinity : Number(b.to);

        return toB - toA;
    });
    return resultlist;
}
function resvis(resultlist) {
	document.querySelectorAll(".result").forEach(el => el.remove());
	
	let hr = document.createElement("hr");
	hr.style.color = "white";
	hr.classList.add("result")
	document.body.appendChild(hr);
			
	for (let i = 0; i < resultlist.length; i++) {
		let wynik = document.createElement("div");
		wynik.classList.add("result");
		wynik.style.width = "225px";
		wynik.style.border = "1px solid black";
		wynik.style.marginTop = "1%";
		wynik.style.marginLeft = "1%"
		wynik.style.padding = "1%";
		wynik.style.cursor = "pointer";
		wynik.style.textAlign = "center";
		wynik.style.borderRadius = "5%";
		wynik.style.boxShadow = "3px 5px 4px #dedfe0"
		wynik.addEventListener("click", () => {
			window.open(resultlist[i].link, "_blank");
		});
		document.body.appendChild(wynik);

		let name = document.createElement("p");
		name.style.margin = "0 0 4px 0";
		name.style.fontSize = "40px";
		name.style.fontWeight = "bold";

		if (jezyk === "pl") {
			name.textContent = resultlist[i].country[0];
		} else {
			name.textContent = resultlist[i].engcountry[0];
		}
		wynik.appendChild(name);

		let officialname = document.createElement("p");
		officialname.style.margin = "0 0 16px 0";
		officialname.style.fontStyle = "italic";
				
		if (jezyk === "pl") {
			officialname.textContent = resultlist[i].ofcountry[0];
		} else {
			officialname.textContent = resultlist[i].ofcountry[1];
		}
		wynik.appendChild(officialname);

		let lata = document.createElement("p");
		lata.style.margin = "0";
		if (resultlist[i].to !== null) {
			if (resultlist[i].from === resultlist[i].to) {
				lata.textContent = resultlist[i].from;
			} else {
				lata.textContent = resultlist[i].from + " - " + resultlist[i].to;
			}
		} else if (jezyk === "pl") {
			lata.textContent = resultlist[i].from + " - Dziś";
		} else {
			lata.textContent = resultlist[i].from + " - Today";
		}
		wynik.appendChild(lata);		
					
		let variant = document.createElement("p");
		if (jezyk === "pl") {
			variant.textContent = "Wariant: " + resultlist[i].variant[1];
		} else {
			variant.textContent = "Variant: " + resultlist[i].variant[2];
		}
		variant.style.fontSize = "12px";
		variant.style.marginBottom = "0px";
		wynik.appendChild(variant);
	}
}
function numonly(inputElement, allowMinus, allowZero) {
	let val = inputElement.value;
	if (allowMinus) {
		if (val.startsWith('-')) {
		val = '-' + val.slice(1).replace(/[^0-9]/g, '');
		} else {
			val = val.replace(/[^0-9]/g, '');
		}
	} else {
		val = val.replace(/[^0-9]/g, '');
	}
	if (val === '-0') {
		val = allowZero ? '0' : '';
	}

	if (val.startsWith('-')) {
		val = '-' + val.slice(1).replace(/^0+(?=\d)/, '');
	} else {
		val = val.replace(/^0+(?=\d)/, '');
	}
	if (!allowZero && val === '0') val = '';
	inputElement.value = val;
}
async function loadChangelog(lang) {
	let url = "";

	if (lang === "pl") {
		url = "https://raw.githubusercontent.com/Kri-droid/Flags/main/CHANGELOGpl.html";
	} else {
		url = "https://raw.githubusercontent.com/Kri-droid/Flags/main/CHANGELOG.html";
	}

	try {
		const res = await fetch(url);
		const text = await res.text();
		document.getElementById("changelog").innerHTML = text;
	} catch (err) {
		console.error("Błąd ładowania:", err);
	}
}

if (!jezyk) {
    jezyk = "en";
    localStorage.setItem("jezyk", "en");
}
document.addEventListener("click", (e) => {
	if (!showlangcont.contains(e.target) && e.target !== settingsBtn) {
		showlangcont.classList.remove("active");
	}
});
document.addEventListener("click", (e) => {
	if (!changelog.contains(e.target) && e.target !== changelogbtn) {
		changelog.classList.remove("active");
	}
});
for (let i = 0; i < langflag.length; i++) {
    langflag[i].addEventListener("click", () => {
        showlangcont.classList.remove("active");
    });
}
settingsBtn.addEventListener("click", () => {
	showlangcont.classList.toggle("active");
});
changelogbtn.addEventListener("click", () => {
	changelog.classList.toggle("active");
	loadChangelog(jezyk);
});
