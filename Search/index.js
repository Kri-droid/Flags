function resvis(resultlist) {
	const container = document.getElementById("results");
	container.innerHTML = "";
			
	for (let i = 0; i < resultlist.length; i++) {
		let pair = document.createElement("div");
		pair.classList.add("result");
		pair.style.width = "40vw";
		pair.style.height = "28vh";
		pair.style.display = "flex";
		pair.style.marginBottom = "1vh";
		pair.style.alignItems = "center";

		
		let flaga = document.createElement("div");
		flaga.classList.add("result");
		flaga.style.width = "19.3vw";
		flaga.style.height = "100%";
		flaga.style.backgroundImage = 'url("' + resultlist[i].link + '")';
		flaga.style.backgroundSize = "cover";
		flaga.style.backgroundRepeat = "no-repeat";
		flaga.style.border = "1px solid black";
		flaga.style.cursor = "pointer";
		flaga.addEventListener("click", () => {
			window.open(resultlist[i].link, "_blank");
		});

		let wynik = document.createElement("div");
		wynik.classList.add("result");
		wynik.style.width = "16.4vw";
		wynik.style.height = "93.8%";
		wynik.style.border = "1px solid black";
		wynik.style.padding = "1%";
		wynik.style.cursor = "pointer";
		wynik.style.textAlign = "center";
		wynik.style.borderRadius = "0% 6% 6% 0%";
		wynik.style.boxShadow = "3px 0px 4px #dedfe0"
		wynik.addEventListener("click", () => {
			window.open(resultlist[i].link, "_blank");
		});

		let name = document.createElement("p");
		name.style.margin = "0 0 0.4vw 0";
		name.style.fontSize = "2.5vw";
		name.style.fontWeight = "bold";
		if (jezyk === "pl") {
			name.textContent = resultlist[i].country[0];
		} else {
			name.textContent = resultlist[i].engcountry[0];
		}

		let officialname = document.createElement("p");
		officialname.style.margin = "0 0 1vw 0";
		officialname.style.fontStyle = "italic";
		officialname.style.fontSize = "1.2vw";
		if (jezyk === "pl") {
			officialname.textContent = resultlist[i].ofcountry[0];
		} else {
			officialname.textContent = resultlist[i].ofcountry[1];
		}

		let lata = document.createElement("p");
		lata.style.margin = "0";
		lata.style.fontSize = "1.2vw";
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
					
		let variant = document.createElement("p");
		variant.style.marginTop = "0.5vw";
		variant.style.fontSize = "1.1vw";
		if (jezyk === "pl") {
			variant.textContent = "Wariant: " + resultlist[i].variant[1];
		} else {
			variant.textContent = "Variant: " + resultlist[i].variant[2];
		}

		container.appendChild(pair);
		pair.appendChild(flaga);
		pair.appendChild(wynik);
		wynik.appendChild(name);
		wynik.appendChild(officialname);
		wynik.appendChild(lata);
		wynik.appendChild(variant);
	}
}
