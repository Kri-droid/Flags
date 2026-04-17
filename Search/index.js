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

function showevent(button, menu) {
	button.addEventListener("click", (e) => {
		e.stopPropagation();
		menu.classList.toggle("active");
	});

	document.addEventListener("click", () => {
		menu.classList.remove("active");
	});
}
function deleteValue() {
	[country, to, prophei, propwid].forEach(el => el.value = "");
	from.value = new Date().getFullYear();
}
function setLanguage(lang) {
    localStorage.setItem("jezyk", lang);
    jezyk = lang;

	const container = document.getElementById("results");
	container.innerHTML = "";
	
	const title = document.querySelector("title");
	const langtext = document.getElementById("langtext");
	const textlanf = document.getElementsByClassName("textlanf"); 
	const search = document.getElementById("search");
	const changelogtext = document.getElementById("changelogtext");
	
	if (lang === "en") {
		title.innerHTML = "Flags - Search"
		langtext.innerHTML = "Language:"
		langflag[0].alt = "English"
		langflag[1].alt = "Polish"
		changelogtext.innerHTML = "Changelog"
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
		changelogtext.innerHTML = "Dziennik Zmian"
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
	const container = document.getElementById("results");
	container.innerHTML = "";
			
	for (let i = 0; i < resultlist.length; i++) {
		
		let elemI = resultlist[i]
		
		let linkhref = "https://kri-droid.github.io/Flags/Countries/"+elemI.engcountry[0]+" "+elemI.from+" v" + elemI.variantnr + ".svg";

		
		let pair = document.createElement("div");
		pair.classList.add("pair");
		container.appendChild(pair);
				
		let flag = document.createElement("div");
		flag.classList.add("flag");
		flag.style.backgroundImage = 'url("' + linkhref + '")';
		flag.addEventListener("click", () => {
			window.open(linkhref, "_blank");
		});
		pair.appendChild(flag);

		let resultdiv = document.createElement("div");
		resultdiv.classList.add("resultdiv");
		resultdiv.addEventListener("click", () => {
			window.open(linkhref, "_blank");
		});
		pair.appendChild(resultdiv);

		let name = document.createElement("p");
		name.classList.add("name");
		if (jezyk === "pl") {
			name.textContent = elemI.country[0];
		} else {
			name.textContent = elemI.engcountry[0];
		}
		resultdiv.appendChild(name);
		
		let officialname = document.createElement("p");
		officialname.classList.add("officialname");
		if (jezyk === "pl") {
			officialname.textContent = elemI.ofcountry[0];
		} else {
			officialname.textContent = elemI.ofcountry[1];
		}
		resultdiv.appendChild(officialname);
		
		let years = document.createElement("p");
		years.classList.add("years");
		if (elemI.to !== null) {
			if (elemI.from === elemI.to) {
				years.textContent = elemI.from;
			} else {
				years.textContent = elemI.from + " - " + elemI.to;
			}
		} else if (jezyk === "pl") {
			years.textContent = elemI.from + " - Dziś";
		} else {
			years.textContent = elemI.from + " - Today";
		}
		resultdiv.appendChild(years);		
		
		let variant = document.createElement("p");
		variant.classList.add("variant");
		if (jezyk === "pl") {
			variant.textContent = "Wariant: " + elemI.variant[1];
		} else {
			variant.textContent = "Variant: " + elemI.variant[2];
		}
		resultdiv.appendChild(variant);
		
		let nonly = document.createElement("div");
		nonly.classList.add("nonly");
		pair.appendChild(nonly);
		
		let info = document.createElement("a");
		info.classList.add("infobtn");
		nonly.appendChild(info);
		
		info.addEventListener("click", (e) => {
			showInfo(linkhref,elemI,e);
		});
	}
}
function numonly(input, allowMinus, allowZero) {
	let val = input.value.replace(/[^0-9-]/g, "");

	if (!allowMinus) val = val.replace(/-/g, "");
	if (val.startsWith("-")) val = "-" + val.slice(1).replace(/-/g, "");

	val = val.replace(/^(-?)0+(?=\d)/, "$1");

	if (!allowZero && val === "0") val = "";

	input.value = val;
}
function showInfo(url,elem,e) {
	let flaginfo = document.getElementById("flaginfo");
	e.stopPropagation();
	const isSame = flaginfo.src === url;
	if (menu.classList.contains("active") && isSame) {
		menu.classList.remove("active");
		return;
	}
	flaginfo.src = url;
	flaginfo.style.aspectRatio = elem.propwid + " / " + elem.prophei;
	document.getElementById("nameInfo").textContent = elem.country[0]
	menu.classList.add("active");
	flaginfo.onclick = function () {
		window.open(url, "_blank");
	};
}
function pageInfo(n) {
	let InfoList = ["infopage"]
	let InfoElement = document.getElementById(InfoList[n-1]);
	InfoElement.addEventListener("click", () => {
		pageInInfo = n;
		InfoElement.style.borderBottom = 0;
		InfoElement.style.borderBottom = 0;
		InfoElement.style.fontWeight = "bold";
		for (let i = 0; i<InfoList.length;i++) {
			if (i != n-1) {
				let forInfoElement = document.getElementById(InfoList[i]);
				forInfoElement.style.borderBottom = "2px solid black";
				forInfoElement.style.fontWeight = "normal";
			} else {
				continue;
			}
		}
	});
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
		document.getElementById("changecontent").innerHTML = text;
	} catch (err) {
		console.error("Błąd ładowania:", err);
	}
}

let pageInInfo = 1;

document.getElementById("infopage").style.borderBottom = "0";
pageInfo(1);

let menu = document.getElementById("infodiv");
document.addEventListener("click", (e) => {
	if (!menu.contains(e.target)) {
		menu.classList.remove("active");
	}
});

loadChangelog(jezyk);

showevent(settingsBtn, showlangcont);
showevent(changelogbtn, changelog);

for (let i = 0; i < langflag.length; i++) {
    langflag[i].addEventListener("click", () => {
        showlangcont.classList.remove("active");
    });
}
