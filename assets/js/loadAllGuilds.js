(async () => {
	if (!localStorage.getItem("authToken")) {

		alert("Please Re-login!");
		location.href = "https://panel.dazai.app";
		return;
	}
	let resData = await fetch("https://discord.com/api/v8/users/@me/guilds", {
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${localStorage.getItem("authToken")}`
			// 'Content-Type': 'application/x-www-form-urlencoded',
		},
		redirect: 'follow', // manual, *follow, error
		referrerPolicy: 'no-referrer',
	});

	if (!resData.ok) {
		localStorage.removeItem("authToken");
		alert("Please Re-login!");
		location.href = "https://panel.dazai.app";
		return;
	}
	resData = await resData.json();
	let nyadData = await fetch("https://api.dazai.app/api/verifyGuilds", {
		method: "POST",
		headers: {
			'Content-Type': 'application/json',
			// 'Authorization': `Bearer ${localStorage.getItem("authToken")}`
			// 'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: JSON.stringify({
			code: localStorage.getItem("authToken"),
			guildsToVerify: resData.map(x => x.id),
		}),
		redirect: 'follow', // manual, *follow, error
		referrerPolicy: 'no-referrer',
	});
	nyadData = await nyadData.json();
	console.log("Nya",nyadData)
	console.log(resData);
	let nyadDataMap = new Map();
	nyadData.forEach(x => nyadDataMap.set(x.id, x));
	resData = resData.filter(x => !!(1 << 35 & x.permissions) || x.owner || (nyadDataMap.get(x.id)));
	document.getElementById("fakeCards").parentNode.removeChild(document.getElementById("fakeCards"));
	resData.filter(x => nyadDataMap.get(x.id) && nyadDataMap.get(x.id).perms).forEach(element => {
		element.name =element.name.replace(/\</g,"&lt;").replace(/\>/g,"&gt;");
		document.getElementById("cardz").innerHTML += `<div class="card" style="width: 100%;border-top-left-radius: 20px;border-top-right-radius: 20px;border-bottom-right-radius: 20px;border-bottom-left-radius: 20px;box-shadow: 5px 5px 16px 2px rgba(0,0,0,0.25);margin: 14px;min-width: 280px;max-width: 16.191709vw;margin-bottom: 20px;">
		<div style="width: 100%;height: 200px;background: url(${element.icon ? `https://cdn.discordapp.com/icons/${element.id}/${element.icon}.png?size=256` : "https://dazai.app/assets/img/dazai-Xtrasmoll256.png"}) center / contain no-repeat;border-top-left-radius: 20px;border-top-right-radius: 20px;"></div>
		<div class="card-body d-flex flex-column" style="height: 262px;">
			<div>
				<h4 class="server-card-header">${element.name}</h4>
				<!--<h6 class="text-muted mb-2">Owner: <code style="color: #cc8aff;">Degenetet#0001</code></h6>-->
				<p class="server-card-body">Server ID : <code>${element.id}</code></p>
			</div><a class="btn btn-primary" role="button" style="padding: 4px;background: #b86868;color: rgb(255,255,255);border-radius: 17px;padding-right: 14px;padding-left: 14px;padding-bottom: 6px;font-family: 'Source Sans Pro', sans-serif;margin-top: auto;margin-left: 50%;" href="/guild.html?guild=${element.id}">Go to Server</a>
		</div>
	</div>`
	});
	// resData.map(x=>nyadDataMap.get(x.id)? console.log(nyadDataMap.get(x.id), nyadDataMap.get(x.id).perms):false);
	resData.filter(x => nyadDataMap.get(x.id) && nyadDataMap.get(x.id).perms === false).forEach(element => {
		// console.
		element.name =element.name.replace(/\</g,"&lt;").replace(/\>/g,"&gt;");
		document.getElementById("cardz").innerHTML += `<div class="card" style="width: 100%;border-radius: 158px;border-top-left-radius: 20px;border-top-right-radius: 20px;border-bottom-right-radius: 20px;border-bottom-left-radius: 20px;box-shadow: 5px 5px 16px 2px rgba(0,0,0,0.25);margin: 14px;min-width: 280px;max-width: 16.191709vw;margin-bottom: 20px;filter: brightness(28%);">
<div style="width: 100%;height: 200px;background: url(${element.icon ? `https://cdn.discordapp.com/icons/${element.id}/${element.icon}.png?size=256` : "https://dazai.app/assets/img/dazai-Xtrasmoll256.png"}) center / contain no-repeat;border-top-left-radius: 20px;border-top-right-radius: 20px;"></div>
<div class="card-body d-flex flex-column" style="height: 262px;">
	<div>
		<h4 class="server-card-header">${element.name}</h4>
		<!--<h6 class="text-muted mb-2">Owner: <code style="color: #cc8aff;">Degenetet#0001</code></h6>-->
		<p class="server-card-body">Server ID : <code>${element.id}</code></p>
	</div><button class="btn btn-primary" type="button" style="padding: 4px;background: #b86868;color: rgb(255,255,255);border-radius: 17px;padding-right: 14px;padding-left: 14px;padding-bottom: 6px;font-family: 'Source Sans Pro', sans-serif;margin-top: auto;margin-left: 20%;">Not Enough Permissions!</button>
</div>
</div>`
	});
	resData.filter(x => !nyadDataMap.get(x.id)).forEach(element => {
		element.name =element.name.replace(/\</g,"&lt;").replace(/\>/g,"&gt;");
		document.getElementById("cardz").innerHTML += `<div class="card" style="width: 100%;border-top-left-radius: 20px;border-top-right-radius: 20px;border-bottom-right-radius: 20px;border-bottom-left-radius: 20px;box-shadow: 5px 5px 16px 2px rgba(0,0,0,0.25);margin: 14px;min-width: 280px;max-width: 16.191709vw;margin-bottom: 20px;">
		<div style="width: 100%;height: 200px;background: url(${element.icon ? `https://cdn.discordapp.com/icons/${element.id}/${element.icon}.png?size=256` : "https://dazai.app/assets/img/dazai-Xtrasmoll256.png"}) center / contain no-repeat;border-top-left-radius: 20px;border-top-right-radius: 20px;"></div>
		<div class="card-body d-flex flex-column" style="height: 262px;">
			<div>
				<h4 class="server-card-header">${element.name}</h4>
				<!--<h6 class="text-muted mb-2">Owner: <code style="color: #cc8aff;">Degenetet#0001</code></h6>-->
				<p class="server-card-body">Server ID : <code>${element.id}</code></p>
			</div><a class="btn btn-primary" role="button" style="padding: 4px;background: #8eb2f9;color: rgb(255,255,255);border-radius: 17px;padding-right: 14px;padding-left: 14px;padding-bottom: 6px;font-family: 'Source Sans Pro', sans-serif;margin-top: auto;margin-left: 50%;" href="https://discord.com/oauth2/authorize?client_id=747901310749245561&amp;scope=bot&amp;permissions=8&amp;guild_id=${element.id}">Invite Dazai</a>
		</div>
	</div>`
	});


})();