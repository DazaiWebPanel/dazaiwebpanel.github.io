function getJsonFromUrl(url) {
  if(!url) url = location.href;
  let question = url.indexOf("?");
  let hash = url.indexOf("#");
  if(hash==-1 && question==-1) return {};
  if(hash==-1) hash = url.length;
  let query = question==-1 || hash==question+1 ? url.substring(hash) : 
  url.substring(question+1,hash);
  let result = {};
  query.split("&").forEach(function(part) {
    if(!part) return;
    part = part.split("+").join(" "); // replace every + with space, regexp-free version
    let eq = part.indexOf("=");
    let key = eq>-1 ? part.substr(0,eq) : part;
    let val = eq>-1 ? decodeURIComponent(part.substr(eq+1)) : "";
    let from = key.indexOf("[");
    if(from==-1) result[decodeURIComponent(key)] = val;
    else {
      let to = key.indexOf("]",from);
      let index = decodeURIComponent(key.substring(from+1,to));
      key = decodeURIComponent(key.substring(0,from));
      if(!result[key]) result[key] = [];
      if(!index) result[key].push(val);
      else result[key][index] = val;
    }
  });
  return result;
}
let jsonFromURL = getJsonFromUrl(window.location.href);
(async ()=>{
console.log(jsonFromURL);
  let token = localStorage.getItem("authToken");
  if (!token || !jsonFromURL.guild){
    localStorage.setItem("redirBackToURL",localStorage.href);
    // location.replace();
    location.href = "https://panel.dazai.app";
    
  }
  // console.log({
  //   code: localStorage.getItem("authToken"),
  //     guildID: jsonFromURL.guild,
  // })
  let data = await fetch("https://api.dazai.app/api/getGuildStats", {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json',
      // 'Authorization': `Bearer ${localStorage.getItem("authToken")}`
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body:JSON.stringify({
      code: localStorage.getItem("authToken"),
      guildID: jsonFromURL.guild,
    })
  });
  if (data.ok){
    let jsonData = await data.json();
    if (jsonData === "no permission!"){
      alert("You do not have permission to view this guild!");
      location.href = "https://panel.dazai.app";
      return;
    }
    console.log(jsonData);
    let aiMleft = document.getElementById("aiMessagesLeft");
    aiMleft.style = "";
    aiMleft.innerHTML = jsonData.gdata.AImessagesLeft;
    Array.from(document.getElementsByClassName("dummyDel")).forEach(x=>x.parentNode.removeChild(x));
    let tbody = document.getElementById("tbody");
    for (let i =0 ; i < jsonData.channels.length;i++){
      tbody.innerHTML+= `<tr> <td> <a  style="background: rgba(0,0,0,0);border-width: 0px;" href="https://panel.dazai.app/channel.html?id=${jsonData.channels[i].id}">#${jsonData.channels[i].name}</a></td> </tr>`
    }
    let wmsg = document.getElementById("welcomeMsg");
    let dmsg = document.getElementById("dmMessage");
    let gmsg = document.getElementById("goodbyeMsg");
    let lmsg = document.getElementById("levelupMsg");
    
    if (jsonData.gdata.joinmsg !== "none"){
      wmsg.value = jsonData.gdata.joinmsg;
    }
    if (jsonData.gdata.joindmmsg !== "none"){
      dmsg.value = jsonData.gdata.joindmmsg;
    }
    if (jsonData.gdata.leavemsg !== "none"){
      gmsg.value = jsonData.gdata.leavemsg;
    }
    if (jsonData.gdata.levelmsgs !== "none"){
      lmsg.value = jsonData.gdata.levelmsgs;
    }
    
    
    
  }
})();