let refresh = document.getElementById('reset');
window.addEventListener('load', () => {
  refresh.addEventListener('click', () => {
    console.log("nya");
    reloadData();
  });
});
async function reloadData(){
  localStorage.clear();
}
