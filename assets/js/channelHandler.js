//Wait im lazy what am i doing lmao
function hookUpListener(text,input,label){
	let textobj = document.getElementById(text);
	let textobjSwitch = document.getElementById(input);
	textobjSwitch.addEventListener("input", async () => {
		if (Number(textobjSwitch.value) < 10) textobjSwitch.value = "0" + textobjSwitch.value;
		if (Number(textobjSwitch.value) < 100) textobjSwitch.value = "0" + textobjSwitch.value;
		textobj.innerHTML = `${label} | ${(Number(textobjSwitch.value) < 10) ? "00" + textobjSwitch.value : (Number(textobjSwitch.value) < 100) ? "0" + textobjSwitch.value : textobjSwitch.value} `;
	});
}
hookUpListener("severetoxicityText","severetoxicityInput","Severe Toxicity");
hookUpListener("toxicityText","toxicityInput","Toxicity");
hookUpListener("identityText","identityInput","Identity Attack");
hookUpListener("insultText","insultInput","Insults");
hookUpListener("profaneText","profaneInput","Profanity");
hookUpListener("threatsText","threatsInput","Threats");
hookUpListener("sexualText","sexualInput","Sexual");
// hookUpListener("severetoxicityText","severetoxicityInput","Severe Toxicity");