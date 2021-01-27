const darkSwitch = document.getElementById('darkSwitch');
let lm = Array.from(document.getElementsByTagName("link")).filter(x => x.href.includes("lightmode"))[0];
const lmhref = lm.href + "";
document.head.removeChild(lm);
let dm = Array.from(document.getElementsByTagName("link")).filter(x => x.href.includes("darkmode"))[0];
const dmhref = dm.href + "";
window.addEventListener('load', () => {
  if (darkSwitch) {
    initTheme();
    darkSwitch.addEventListener('change', () => {
      resetTheme();
    });
  }
});


/**
 * Summary: function that adds or removes the attribute 'data-theme' depending if
 * the switch is 'on' or 'off'.
 *
 * Description: initTheme is a function that uses localStorage from JavaScript DOM,
 * to store the value of the HTML switch. If the switch was already switched to
 * 'on' it will set an HTML attribute to the body named: 'data-theme' to a 'dark'
 * value. If it is the first time opening the page, or if the switch was off the
 * 'data-theme' attribute will not be set.
 * @return {void}
 */
function initTheme() {
  const darkThemeSelected =
    localStorage.getItem('darkSwitch') !== null &&
    localStorage.getItem('darkSwitch') === 'dark';

  darkSwitch.checked = darkThemeSelected;
  if (!darkThemeSelected)
    dm.href = lmhref;
  // document.head.removeChild(lm);
  // document.head.removeChild(dm);
}


/**
 * Summary: resetTheme checks if the switch is 'on' or 'off' and if it is toggled
 * on it will set the HTML attribute 'data-theme' to dark so the dark-theme CSS is
 * applied.s
 * @return {void}
 */
function resetTheme() {
  if (darkSwitch.checked) {
    // document.body.setAttribute('data-theme', 'dark');
    // lm = Array.from(document.getElementsByTagName("link")).filter(x => x.href.includes("lightmode"))[0];
    // if (lm)
    //   document.head.removeChild(lm);
    dm.href = dmhref;
    // document.head.innerHTML += `<link rel="stylesheet" href = "${dmhref}"`

    localStorage.setItem('darkSwitch', 'dark');
  } else {
    dm.href = lmhref
    localStorage.removeItem('darkSwitch');
  }
}
