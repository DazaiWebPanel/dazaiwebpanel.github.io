let refres = document.getElementById('reset');
window.addEventListener('load', () => {
  refres.addEventListener('click', () => {
    console.log("nya");
    reloadData();
  });
});
async function reloadData(){
  localStorage.clear();
  
}
