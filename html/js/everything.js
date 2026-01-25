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
Bar Stool Committee &#169; 2017&ndash;${new Date().getFullYear()}
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
function move_party(ev){
  var imp = document.getElementById("index_mp");
  var bmp = document.getElementById("burgmenu_mp");
  var party_zone = document.getElementById("party_zone");
  
  if (ev.newState === "open") {
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
}
var breadstick = /^\/outdex.html/;
if (breadstick.test(location.pathname)){
  burgmenu.addEventListener("beforetoggle", move_party);
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
  return Math.trunc(Math.random() * k);
}
/**@param {string} msg*/
function alert_II(msg){
  var dog = document.createElement('dialog');
  dog.innerHTML = msg;
  dog.insertAdjacentHTML('beforeend', `<button class="alert_II" onclick="this.parentElement.close()">ok</button>`);
  dog.classList.add("alert_II");
  dog.onclose = ev=>ev.target.remove();
  window.document.body.appendChild(dog);
  dog.showModal();
}
Object.defineProperty(window, "at_outdex",{
  get(){
    return Boolean(document.getElementById("this_is_outdex"));
  }
});
function popsize(win, hin){
  return `popup,width=${win},height=${hin},left=${(window.screen.availWidth - win)/2},top=${(window.screen.availHeight - hin)/2}`;
}
function xfsub() {
  let great = window.open('', 'result',popsize(800, 600));
  if (great) {
    goto_smart('/page/personality-exam/end-screen.html');
  } else {
    alert_II('no popup window. sad.');
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

var some_json = response=>response.status<400&&response.json();

function check_online(callback){
  if (window.location.hostname !== 'localhost')
  fetch('/api/users/info',{cache:"no-store"})
  .then(some_json)
  .then(jah=>typeof(callback)==='function'&&callback(jah))
  .catch(console.error);
}

function post_storage(the_store){
  return fetch('/api/users/storage',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify(the_store)
  })
  .catch(console.error);
}

function get_storage(){
  return fetch('/api/users/storage',{
    cache:'no-store'
  })
  .then(some_json)
  .catch(console.error);
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
    "soundboard_open": true,
    "soundboard_lovelist": true,
    "soundboard_clockbot_enable": true,
    "soundboard_clockbot_channel_id": true,
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

