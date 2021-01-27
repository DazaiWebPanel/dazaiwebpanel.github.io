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

  let token = localStorage.getItem("authToken");
  if (!token){
    localStorage.setItem("redirBackToURL",localStorage.href);
    location.replace();
    
  }
})();