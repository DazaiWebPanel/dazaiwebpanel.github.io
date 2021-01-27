location.href = localStorage.getItem("redirBackToURL") || location.href.startsWith("http://127.0.0.1:8000") ? "http://127.0.0.1:8000" : "https://panel.dazai.app/";
localStorage.clear();