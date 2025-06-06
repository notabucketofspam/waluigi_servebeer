/*
    INSERT HTML    INSERT HTML    INSERT HTML    INSERT HTML    INSERT HTML    INSERT HTML    INSERT HTML    INSERT HTML
*/
if (!document.getElementById('welcome_steak'))
document.body.insertAdjacentHTML("afterbegin",
`<a href="/" id="return_steak" class="steak_corner">
Return to the 
<img src="/resource/steak8.gif" alt="STEAK" class="steak_gif">
zone
</a>`);
document.documentElement.insertAdjacentHTML("beforeend",
`<footer>
<hr/>
<div style="text-align: center;">
Bar Stool Committee &#169; 2017&ndash;2025
<br/>
Site maintained by not.a.bucket.of.spam, @ me if something's up
<br/>
<br/>
Last-Modified: <span id="Last-Modified"></span>
</div>
</footer>`);
document.getElementById("Last-Modified").innerText = document.lastModified;

/*
    BURGER    BURGER    BURGER    BURGER    BURGER    BURGER    BURGER    BURGER    BURGER    BURGER    BURGER    BURGER
*/
document.body.insertAdjacentHTML('beforeend',
`<button popovertarget="burgmenu" id="burger">
  <img alt="BURGER" src="/resource/retro_burger.png" />
</button>
<div id="burgmenu" popover>
  <meta class="meta_party" id="burgmenu_mp" />
</div>`);
var breadstick = /^\/outdex.html/;
if (breadstick.test(location.pathname)){
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
} else {
  burgmenu.insertAdjacentHTML("beforeend", 
`<div style="text-align:center;font-family:monospace;">
This is where we put the party stuff. You need to<br><br>
<div id="outdexportal" style="float:none;margin:auto;">
<span id="outdextoptext">try the new</span><br>
<a class id="outdexbottomtext" title="Single Page App Mode" href="/outdex.html#${location.pathname}">S.P.A.M.</a><br>
<div id="singlepageappmode">Single Page App Mode</div>
<input id="roboslider" value="0" type="range" oninput="if (this.value >99) location.assign('/outdex.html#${location.pathname}')" />
<br />
<code id="imnotarobot" style="top:-7px;left:6px;">I'm not a robot</code>
</div><br>
to bring the party with you.
</div>`);
}

/*
    MORE STUFF    MORE STUFF    MORE STUFF    MORE STUFF    MORE STUFF    MORE STUFF    MORE STUFF    MORE STUFF
*/
var cog = console.log;
/**@param{number}k*/
function rui (k) {
  return Math.random() / Number.EPSILON % k;
}
Object.defineProperty(window, "at_outdex",{
    get(){
        return Boolean(document.getElementById("this_is_outdex"));
    }
})
function popsize(win, hin){
  return `popup,width=${win},height=${hin},left=${(window.screen.availWidth - win)/2},top=${(window.screen.availHeight - hin)/2}`;
}
function xfsub() {
  let great = window.open('', 'result',popsize(800, 600));
  if (great) {
    goto_smart('/page/personality-exam/end-screen.html');
  } else {
    window.alert('no popup window. sad.');
  }
}
function goto_smart(url){
  if (at_outdex) {
    location.hash = url;
    consume(url);
  } else {
    location.assign(url);
  }
}

/*
    STORAGE    STORAGE    STORAGE    STORAGE    STORAGE    STORAGE    STORAGE    STORAGE    STORAGE    STORAGE
*/
class WhichStorage {
  // true: use localStorage
  // false: use sessionStorage
  __defaultitem = {
    "username": false,
    "used": true,
    "jukebox_track_index": false,
    "audio_player_volume": false,
    "selch-index": false,
    "loop": false,
    "shuffle": false,
    "show_cowtools": false,
    "gain": false,
    "seinfeld_src": false,
    "seinfeld_ep": false,
    "seinfeld_volume": false,
    "seinfeld_time": false,
    "seinfeld_size": false,
    "somelinks": true,
    "settings": true,
    "soundboard_gain": true,
  };
  __item = JSON.parse(localStorage.getItem("settings")??sessionStorage.getItem("settings"))??this.__defaultitem;
  // jank api
  __make_etters = (name) => {
    return {
      [name]:{
        get(){
          return this.__item[name]?localStorage[name]:sessionStorage[name];
        },
        set(value){
          this.__item[name]?(localStorage[name] = value):(sessionStorage[name] = value);
        },
        enumerable:true
      }
    };
  };
  __update = (name, boolv) => {
    if (name in this.__item){
      var tmp = this.getItem(name);
      // cog(tmp)
      this.removeItem(name);
      this.__item[name] = boolv;
      this.setItem(name, tmp);
    }
    this.setItem("settings", JSON.stringify(this.__item));
  };
  constructor(){
    // reset all settings if it's missing any keys
    let keystr = (o)=>Object.keys(o).sort().join();
    if (keystr(this.__item) !== keystr(this.__defaultitem)) {
      this.__item = this.__defaultitem;
    }
    for (const name in this.__item){
      Object.defineProperties(this, this.__make_etters(name));
    }
    Object.defineProperties(this, {
      "__item": {enumerable:false, writable:false},
      "__make_etters": {enumerable:false, writable:false},
      "__update": {enumerable:false, writable:false}
    });
    this.__update();
  }
  // sane api
  get length(){
    return Object.keys(this.__item).length;
  }
  clear(){
    localStorage.clear();
    sessionStorage.clear();
  }
  getItem(keyName){
    return this.__item[keyName]?localStorage.getItem(keyName):sessionStorage.getItem(keyName);
  }
  key(index){
    return Object.keys(this.__item)[index];
  }
  removeItem(keyName){
    localStorage.removeItem(keyName);
    sessionStorage.removeItem(keyName);
  }
  setItem(keyName, keyValue){
    this.__item[keyName]?localStorage.setItem(keyName, keyValue):sessionStorage.setItem(keyName, keyValue);
  }
}
var whichStorage = new WhichStorage();

