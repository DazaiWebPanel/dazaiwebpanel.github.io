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
let jsonFromURL = getJsonFromUrl(window.location.href);
function startRedir() {
	if (location.href.startsWith("http://127.0.0.1:8000"))
		location.href = (`https://discord.com/api/oauth2/authorize?client_id=747901310749245561&redirect_uri=http%3A%2F%2F127.0.0.1%3A8000%2Fauth.html&response_type=token&scope=connections%20identify%20guilds`)
	else
		location.href =(`https://discord.com/api/oauth2/authorize?client_id=747901310749245561&redirect_uri=https%3A%2F%2Fpanel.dazai.app%2Fauth.html&response_type=token&scope=connections%20identify%20guilds`)
}
(async () => {
	if (jsonFromURL.access_token) {
		let data = await fetch("https://discord.com/api/v8/users/@me", {
			method: 'GET', // *GET, POST, PUT, DELETE, etc.
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${jsonFromURL.access_token}`
				// 'Content-Type': 'application/x-www-form-urlencoded',
			},
			redirect: 'follow', // manual, *follow, error
			referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
		});
		if (!data.ok) {
			startRedir();
		}
		data = await data.json();
		console.log(data);
		localStorage.setItem("userInfo", JSON.stringify(data));
		localStorage.setItem("authToken", jsonFromURL.access_token);
		if (localStorage.getItem("redirBackToURL")){
			
			location.href = localStorage.getItem("redirBackToURL");
			localStorage.removeItem("redirBackToURL");
		}else{
			if (location.href.startsWith("http://127.0.0.1:8000"))
				location.href = "http://127.0.0.1:8000";
			else
				location.href = "https://panel.dazai.app/";
		}
	}
	else {
		startRedir();
	}
})();
