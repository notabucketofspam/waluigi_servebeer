if (!document.getElementById('welcome_steak'))
document.documentElement.insertAdjacentHTML("afterbegin",
`<a href="/" id="return_steak" class="steak_corner">
Return to the 
<img src="/resource/steak8.gif" alt="STEAK" class="steak_gif">
zone
</a>`);
document.documentElement.insertAdjacentHTML("beforeend",
`<footer>
<hr/>
<div style="text-align: center;">
Bar Stool Committee &#169; 2020&ndash;2024
<br/>
Site maintained by not.a.bucket.of.spam, @ me if something's up
<br/>
<br/>
Last-Modified: <span id="Last-Modified"></span>
</div>
</footer>`);
document.getElementById("Last-Modified").innerText = document.lastModified;
document.documentElement.insertAdjacentHTML('beforeend',
`<button popovertarget="burgmenu" id="burger">
  <img alt="BURGER" src="/resource/retro_burger.png" />
</button>
<div id="burgmenu" popover>
  <meta class="meta_party" id="burgmenu_mp" />
</div>`);
burgmenu.addEventListener("beforetoggle", ev=> {
  var imp = document.getElementById("index_mp");
  var bmp = document.getElementById("burgmenu_mp");
  var party_zone = document.getElementById("party_zone");
  
  if (event.newState === "open") {
    if (imp) {
      // take the party and hoist it up to the menu
      burgmenu.insertBefore(party_zone, bmp);
    }
  } else {
    if (imp) {
      // put the party back where it belongs
      imp.parentNode.insertBefore(party_zone, imp);
    }
  }
});
if (location.pathname !== "/"&&!location.pathname.includes("dex")){
  burgmenu.insertAdjacentHTML("beforeend", 
`<div style="text-align:center;font-family:monospace;">
This is where we put the party stuff. You need to<br><br>
<div id="outdexportal" style="float:none;margin:auto;">
<span id="outdextoptext">try the new</span><br>
<a id="outdexbottomtext" title="Single Page App Mode" href="/outdex.html#${location.pathname}">S.P.A.M.</a><br>
<input id="roboslider" value="0" type="range" oninput="if (this.value >99) location.assign('/outdex.html#${location.pathname}')" />
<br />
<code id="imnotarobot" style="top:-7px;left:4px;">I'm not a robot</code>
</div><br>
to bring the party with you.
</div>`);
}
var cog = console.log;
/**@param{number}k*/
function rui (k) {
  return Math.random() / Number.EPSILON % k;
}

