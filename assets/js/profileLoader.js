(async ()=>{
	let greet = document.getElementById("greetUser");
	if (!localStorage.getItem("userInfo")){
		document.getElementById("topnavbar").remove();
		if (greet){
			greet.innerHTML = `Welcome to the <b>Dazai</b> Dashboard. Lets get you signed in!`
			let greetin = document.getElementById("leadin");
			greetin.innerHTML = `You're just 1 step away from customizing Dazai online!`
			let button = document.getElementById("booton");
			// button.innerHTML+= "To Dashboard";
			button.href = "/auth.html"
			localStorage.setItem("redirBackToURL",location.href)
			// document.getElementById("bgsize").style = "min-height:110vh";
		}
	}else{
		let data = JSON.parse(localStorage.getItem("userInfo"));
		document.getElementById("username").innerHTML = data.username
		document.getElementById("pfp").src = `https://cdn.discordapp.com/avatars/${data.id}/${data.avatar}.png?size=128`;
		
		if (greet){
			greet.innerHTML = `Welcome to the Dashboard <b>${data.username}</b> !`
			let button = document.getElementById("booton");
			button.innerHTML = "To Dashboard";
			button.href = "/guilds.html"
			// document.getElementById("bgsize").style = "min-height:110vh";
		}
	}
	
})()