const save = document.getElementById("save");
const revert = document.getElementById("revert");
function getJsonFromUrl(url) {
	if (!url) url = location.href;
	let question = url.indexOf("?");
	let hash = url.indexOf("#");
	if (hash == -1 && question == -1) return {};
	if (hash == -1) hash = url.length;
	let query = question == -1 || hash == question + 1 ? url.substring(hash) :
	  url.substring(question + 1, hash);
	let result = {};
	query.split("&").forEach(function (part) {
	  if (!part) return;
	  part = part.split("+").join(" "); // replace every + with space, regexp-free version
	  let eq = part.indexOf("=");
	  let key = eq > -1 ? part.substr(0, eq) : part;
	  let val = eq > -1 ? decodeURIComponent(part.substr(eq + 1)) : "";
	  let from = key.indexOf("[");
	  if (from == -1) result[decodeURIComponent(key)] = val;
	  else {
		let to = key.indexOf("]", from);
		let index = decodeURIComponent(key.substring(from + 1, to));
		key = decodeURIComponent(key.substring(0, from));
		if (!result[key]) result[key] = [];
		if (!index) result[key].push(val);
		else result[key][index] = val;
	  }
	});
	return result;
  }
function parsePermissions(){
	let permsData = {
		everyonePerms: Array.from(document.getElementById("tab-1").childNodes[1].childNodes[1].childNodes[3].childNodes).map(x=>x.childNodes[1].innerHTML),
		djRolePerms: Array.from(document.getElementById("tab-2").childNodes[1].childNodes[1].childNodes[3].childNodes).map(x=>x.childNodes[1].innerHTML),
		extraRolePerms: Array.from(document.getElementById("tab-3").childNodes[1].childNodes[1].childNodes[3].childNodes).map(x=>x.childNodes[1].innerHTML),
		modRolePerms: Array.from(document.getElementById("tab-4").childNodes[1].childNodes[1].childNodes[3].childNodes).map(x=>x.childNodes[1].innerHTML),
		extraRole2Perms: Array.from(document.getElementById("tab-5").childNodes[1].childNodes[1].childNodes[3].childNodes).map(x=>x.childNodes[1].innerHTML),
		djRole: document.getElementById("tab-2").childNodes[2].childNodes[1].value,
		extraRole: document.getElementById("tab-3").childNodes[2].childNodes[1].value,
		modRole: document.getElementById("tab-4").childNodes[2].childNodes[1].value,
		extraRole2: document.getElementById("tab-5").childNodes[2].childNodes[1].value,
		adminRole: document.getElementById("tab-6").childNodes[2].childNodes[1].value,

	};
	return permsData;
}
save.addEventListener("click", async ()=>{
	if (!localStorage.getItem("authToken"))
	return;
	//Aggragate Data
	let wmsg = document.getElementById("welcomeMsg");
    let dmsg = document.getElementById("dmMessage");
    let gmsg = document.getElementById("goodbyeMsg");
	let lmsg = document.getElementById("levelupMsg");
	let gdata = {
		joinmsg: wmsg.value,
		joindmmsg: dmsg.value,
		leavemsg: gmsg.value,
		levelmsgs: lmsg.value,
		beta: parseInt(document.getElementById("Smode").value) <2 && parseInt(document.getElementById("Smode").value) >= 0 ?  parseInt(document.getElementById("Smode").value) : 0,
		id: getJsonFromUrl(window.location.href).guild,
	};
	Object.assign(gdata,parsePermissions());
	let ress = await fetch("https://api.dazai.app/api/updateGuildStats",{
		method: "POST",
		body: JSON.stringify({
			auth: localStorage.getItem("authToken"),
			guildData: gdata,
		})
	})
	if (ress.ok){
		ress = await ress.json();
		if (ress !== "done!"){
			location.reload(alert("There was an error trying to update the guild object"));
			return;
		}
		location.reload(alert("Settings saved!"));
	}
	// return gdata();
});
revert.addEventListener("click",async ()=>{
	location.reload();
})