let refresh = document.getElementById('refreshData');
window.addEventListener('load', () => {
  refresh.addEventListener('click', () => {
    console.log("nya");
    reloadData();
  });
});
async function reloadData(){
  let data = await fetch("https://discord.com/api/v8/users/@me", {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("authToken")}`
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  });
  if (!data.ok) {
    alert("Invalid authorization! Please re-authenticate");
    localStorage.setItem("redirBackToURL",location.href);
    localStorage.removeItem("authToken");
    location.href = "https://panel.dazai.app"
  }
  data = await data.json();
  console.log(data);
  localStorage.setItem("userInfo", JSON.stringify(data));
  alert("Data Reloaded!")
  location.reload();
}
