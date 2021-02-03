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
async function loadPerms(json) {
  let gdata = json.gdata;
  let perms = await fetch("https://api.dazai.app/api/getPerms");
  if (!perms.ok) {
    return false;
  }
  perms = await perms.json();
  let everyone = document.getElementById("tab-1").childNodes[1].childNodes[1].childNodes[3];
  let dj = document.getElementById("tab-2").childNodes[1].childNodes[1].childNodes[3];
  let extra = document.getElementById("tab-3").childNodes[1].childNodes[1].childNodes[3];
  let mod = document.getElementById("tab-4").childNodes[1].childNodes[1].childNodes[3];
  let extra2 = document.getElementById("tab-5").childNodes[1].childNodes[1].childNodes[3];
  let admin = document.getElementById("tab-6").childNodes[1].childNodes[1].childNodes[3];
  let eperms = gdata.everyonePerms
  eperms = eperms ? eperms.split(",") : [];
  let dperms = gdata.djRolePerms;
  dperms = dperms ? dperms.split(",") : [];
  let erperms = gdata.extraRolePerms;
  erperms = erperms ? erperms.split(",") : [];
  let modperms = gdata.modRolePerms;
  modperms = modperms ? modperms.split(",") : [];
  let er2perms = gdata.extraRole2Perms;
  er2perms = er2perms ? er2perms.split(",") : [];
  eperms.forEach(x => {
    everyone.innerHTML +=
      `<tr>
<td style="vertical-align: middle;">${x}</td>
<td style="text-align: center;"><button class="btn btn-danger" type="button" onclick="this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);">X</button></td>
</tr>`
    dj.innerHTML +=
      `<tr class="inherited">
      <td style="vertical-align: middle;">${x}</td>
      <td style="text-align: center;">Inherited</td>
      </tr>`
    extra.innerHTML +=
      `<tr class="inherited">
        <td style="vertical-align: middle;">${x}</td>
        <td style="text-align: center;">Inherited</td>
        </tr>`
    mod.innerHTML +=
      `<tr class="inherited">
          <td style="vertical-align: middle;">${x}</td>
          <td style="text-align: center;">Inherited</td>
          </tr>`
    extra2.innerHTML +=
      `<tr class="inherited">
            <td style="vertical-align: middle;">${x}</td>
            <td style="text-align: center;">Inherited</td>
            </tr>`
    admin.innerHTML +=
      `<tr class="inherited">
              <td style="vertical-align: middle;">${x}</td>
              <td style="text-align: center;">Inherited</td>
              </tr>`
  });
  dperms.forEach(x => {
    dj.innerHTML +=
      `<tr>
<td style="vertical-align: middle;">${x}</td>
<td style="text-align: center;"><button class="btn btn-danger" type="button" onclick="this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);">X</button></td>
</tr>`
    extra.innerHTML +=
      `<tr class="inherited">
  <td style="vertical-align: middle;">${x}</td>
  <td style="text-align: center;">Inherited</td>
  </tr>`
    mod.innerHTML +=
      `<tr class="inherited">
    <td style="vertical-align: middle;">${x}</td>
    <td style="text-align: center;">Inherited</td>
    </tr>`
    extra2.innerHTML +=
      `<tr class="inherited">
      <td style="vertical-align: middle;">${x}</td>
      <td style="text-align: center;">Inherited</td>
      </tr>`
    admin.innerHTML +=
      `<tr class="inherited">
        <td style="vertical-align: middle;">${x}</td>
        <td style="text-align: center;">Inherited</td>
        </tr>`
  });
  erperms.forEach(x => {
    extra.innerHTML +=
      `<tr>
<td style="vertical-align: middle;">${x}</td>
<td style="text-align: center;"><button class="btn btn-danger" type="button" onclick="this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);">X</button></td>
</tr>`
    mod.innerHTML +=
      `<tr class="inherited">
    <td style="vertical-align: middle;">${x}</td>
    <td style="text-align: center;">Inherited</td>
    </tr>`

  });
  modperms.forEach(x => {
    mod.innerHTML +=
      `<tr>
<td style="vertical-align: middle;">${x}</td>
<td style="text-align: center;"><button class="btn btn-danger" type="button" onclick="this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);">X</button></td>
</tr>`
    extra2.innerHTML +=
      `<tr class="inherited">
      <td style="vertical-align: middle;">${x}</td>
      <td style="text-align: center;">Inherited</td>
      </tr>`
    admin.innerHTML +=
      `<tr class="inherited">
        <td style="vertical-align: middle;">${x}</td>
        <td style="text-align: center;">Inherited</td>
        </tr>`
  });
  er2perms.forEach(x => {
    extra2.innerHTML +=
      `<tr>
<td style="vertical-align: middle;">${x}</td>
<td style="text-align: center;"><button class="btn btn-danger" type="button" onclick="this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);">X</button></td>
</tr>`
    admin.innerHTML +=
      `<tr class="inherited">
        <td style="vertical-align: middle;">${x}</td>
        <td style="text-align: center;">Inherited</td>
        </tr>`
  });

  function imLazyandScopingBad(elementID, eperms, roleID) {
    if (eperms) {
      let tempperms = document.getElementById(elementID).childNodes[3].childNodes[1];
      tempperms.addEventListener("change", function () {
        if (!tempperms.value) return;
        document.getElementById(elementID).childNodes[1].childNodes[1].childNodes[3].innerHTML += `<tr>
      <td style="vertical-align: middle;">${tempperms.value}</td>
      <td style="text-align: center;"><button class="btn btn-danger" type="button" onclick="this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);recalc">X</button></td>
      </tr>`
        eperms = eperms.concat(tempperms.value);
        tempperms.value = null;
        tempperms.innerHTML = "";

        let dupperms = perms.filter(x => !eperms.includes(x));

        dupperms.forEach(x => {
          tempperms.innerHTML += `<option value="${x}">${x}</option>`;
        })
        tempperms.value = null;
      })

      let dupperms = perms.filter(x => !eperms.includes(x));
      dupperms.forEach(x => {
        tempperms.innerHTML += `<option value="${x}">${x}</option>`;
      })
      tempperms.value = null;
    }

    let tempRoles = document.getElementById(elementID).childNodes[2].childNodes[1];
    Object.values(json.guild.roles).forEach(element => {
      tempRoles.innerHTML += `<option value="${element.id}">${element.name}</option>`;
    });
    if (roleID) {
      console.log(tempRoles.value, roleID)
      tempRoles.value = roleID;
      console.log(tempRoles.value, roleID)
    } else {
      tempRoles.value = null;
    }
  }
  function imLazyandScopingBadInherit(elementID, eperms) {
    if (eperms) {
      console.log(eperms);
      let tempperms = document.getElementById(elementID).childNodes[3].childNodes[1];
      tempperms.addEventListener("change", function () {
        if (!tempperms.value) return;
        document.getElementById(elementID).childNodes[1].childNodes[1].childNodes[3].innerHTML += `<tr class="inherited">
      <td style="vertical-align: middle;">${tempperms.value}</td>
      <td style="text-align: center;">Inherited</td>
      </tr>`
        eperms = eperms.concat(tempperms.value);
        tempperms.value = null;
        tempperms.innerHTML = "";

        let dupperms = perms.filter(x => !eperms.includes(x));

        dupperms.forEach(x => {
          tempperms.innerHTML += `<option value="${x}">${x}</option>`;
        })
        tempperms.value = null;
      })

      let dupperms = perms.filter(x => !eperms.includes(x));
      dupperms.forEach(x => {
        tempperms.innerHTML += `<option value="${x}">${x}</option>`;
      })
      tempperms.value = null;
    }
  }
  imLazyandScopingBad("tab-1", eperms);
  imLazyandScopingBad("tab-2", dperms, gdata.djRole);
  imLazyandScopingBad("tab-3", erperms, gdata.extraRole);
  imLazyandScopingBad("tab-4", modperms, gdata.modRole);
  imLazyandScopingBad("tab-5", er2perms, gdata.extraRole2);
  imLazyandScopingBad("tab-6", null, gdata.adminRole);
  imLazyandScopingBadInherit("tab-2", eperms);
  imLazyandScopingBadInherit("tab-3", eperms.concat(dperms));
  imLazyandScopingBadInherit("tab-4", erperms.concat(eperms.concat(dperms)));
  imLazyandScopingBadInherit("tab-5", modperms.concat(erperms.concat(eperms.concat(dperms))));
  // imLazyandScopingBad("tab-6",er2perms.concat());
}
(async () => {
  console.log(jsonFromURL);
  let token = localStorage.getItem("authToken");
  if (!token || !jsonFromURL.guild) {
    localStorage.setItem("redirBackToURL", localStorage.href);
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
    body: JSON.stringify({
      code: localStorage.getItem("authToken"),
      guildID: jsonFromURL.guild,
    })
  });
  if (data.ok) {
    let jsonData = await data.json();
    if (jsonData === "no permission!") {
      alert("You do not have permission to view this guild!");
      location.href = "https://panel.dazai.app";
      return;
    }
    console.log(jsonData);
    let aiMleft = document.getElementById("aiMessagesLeft");
    aiMleft.style = "";
    aiMleft.innerHTML = jsonData.gdata.AImessagesLeft;
    Array.from(document.getElementsByClassName("dummyDel")).forEach(x => x.parentNode.removeChild(x));
    let tbody = document.getElementById("tbody");
    for (let i = 0; i < jsonData.channels.length; i++) {
      tbody.innerHTML += `<tr> <td> <a  style="background: rgba(0,0,0,0);border-width: 0px;" href="https://panel.dazai.app/channel.html?id=${jsonData.channels[i].id}">#${jsonData.channels[i].name}</a></td> </tr>`
    }
    let wmsg = document.getElementById("welcomeMsg");
    let dmsg = document.getElementById("dmMessage");
    let gmsg = document.getElementById("goodbyeMsg");
    let lmsg = document.getElementById("levelupMsg");

    if (jsonData.gdata.joinmsg !== "none") {
      wmsg.value = jsonData.gdata.joinmsg;
    }
    if (jsonData.gdata.joindmmsg !== "none") {
      dmsg.value = jsonData.gdata.joindmmsg;
    }
    if (jsonData.gdata.leavemsg !== "none") {
      gmsg.value = jsonData.gdata.leavemsg;
    }
    // if (jsonData.gdata.levelmsgs !== "none") {
    //   lmsg.value = jsonData.gdata.levelmsgs;
    // }
    if (jsonData.gdata.prefix) {
      document.getElementById("botPrefix").value = jsonData.gdata.prefix|| "daz";
    }
    document.getElementById("serverLvl").innerHTML = jsonData.gdata.premium
    document.getElementById("serverLvl").style = ""
    document.getElementById("Smode").value = jsonData.gdata.beta;
    await loadPerms(jsonData);


  }
})();