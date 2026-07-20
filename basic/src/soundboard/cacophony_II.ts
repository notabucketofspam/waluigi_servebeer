import MediaPlayer from "../extern/MediaPlayer.js";
const mediaPlayer = new MediaPlayer();

// ============== ui controls
// ============== for the top of the page

// ------- some stuff for controlling the local volume

function init_volume() {
  try {
    let gainReal = 0.20;
    // check localStorage for a saved volume setting
    let vol_perchance = localStorage.getItem("soundboard_gain");
    if (vol_perchance) {
      gainReal = Number.parseFloat(vol_perchance);
    } else {
      localStorage.setItem("soundboard_gain", String(gainReal));
      vol_perchance = String(gainReal);
    }
    // set the gain on the media player
    setgain(gainReal);
    let somevolume = document.getElementById("soundboard_volume") as HTMLInputElement | null;
    if (somevolume) {
      somevolume.value = vol_perchance;
      somevolume.addEventListener('input', ev => {
        const target = ev.target as HTMLInputElement;
        const value = target.valueAsNumber;
        if (!isNaN(value)) {
          setgain(value);
        }
      });
    } else {
      // couldnt find somevolume
    }
  } catch(err) {
    console.error("Error initializing volume:", err);
  }
}

function setgain(g: number) {
  mediaPlayer.setGain(g);
  localStorage.setItem("soundboard_gain", String(g));
}

// -------- clockbot things

function init_clockbot_things() {
  try {
    // add event listeners for clockbot_enable
    let clockbot_enable = document.getElementById("clockbot_enable") as HTMLInputElement | null;
    if (clockbot_enable) {
      // try to read localStorage for clockbot_enable
      let cbe_perchance = localStorage.getItem("soundboard_clockbot_enable");
      if (cbe_perchance) {
        // we have it
        clockbot_enable.checked = Boolean(Number(cbe_perchance));
      } else {
        // we dont
        localStorage.setItem("soundboard_clockbot_enable", "0");
        clockbot_enable.checked = false;
      }

      // the event listener for clockbot_enable
      clockbot_enable.addEventListener('input', ev => {
        // write it to disk
        localStorage.setItem("soundboard_clockbot_enable", String(Number(clockbot_enable.checked)));
        // disable the volume slider if clockbot is enabled, enable it if clockbot is disabled
        const somevolume = document.getElementById("soundboard_volume") as HTMLInputElement | null;
        if (somevolume) {
          somevolume.disabled = clockbot_enable.checked;
        } else {
          // no somevolume
        }
      });

      // maybe disable the volume slider if clockbot is enabled
      const somevolume = document.getElementById("soundboard_volume") as HTMLInputElement | null;
      if (somevolume) {
        somevolume.disabled = clockbot_enable.checked;
      }
      
      // event listener for joining chat
      let Bget_in_chat = document.getElementById("Bget_in_chat") as HTMLButtonElement | null;
      if (Bget_in_chat) {
        Bget_in_chat.addEventListener('click', ev => {
          if (clockbot_enable.checked) {
            postfetch('getinchat()');
          }
        });
      } else {
        // no Bget_in_chat?
      }
      
      // event listener for leaving chat
      let Bleave_chat = document.getElementById("Bleave_chat") as HTMLButtonElement | null;
      if (Bleave_chat) {
        Bleave_chat.addEventListener('click', ev => {
          if (clockbot_enable.checked) {
            postfetch('leave_chat()');
          }
        });
      } else {
        // no Bleave_chat?
      }
    } else {
      // didnt have clockbot_enable
    }

    // similar for channel_id
    let channel_id = document.getElementById("channel_id") as HTMLInputElement | null;
    if (channel_id) {
      // try to read localStorage for channel_id
      let cid_perchance = localStorage.getItem("soundboard_clockbot_channel_id");
      if (cid_perchance) {
        channel_id.value = cid_perchance;
      } else {
        localStorage.setItem("soundboard_clockbot_channel_id", "");
      }
      // his event listener
      channel_id.addEventListener('change',ev=>{
        let breadlink = /.*?\/?(\d+)$/;
        let ev_target = ev.target as HTMLInputElement;
        ev_target.value = ev_target.value.replace(breadlink, "$1");
        localStorage.setItem("soundboard_clockbot_channel_id", ev_target.value);
      });
    } else {
      // couldnt find channel_id
    }
  } catch(err) {
    console.error("Error initializing clockbot things:", err);
  }
}

// -------------------------- how to actually play the sounds ------------------
var soundbuffers = new Map();
async function gimmefile(fname){
  var far = await fetch(`/page/soundboard/opodes/${fname}.opus`);
  var bar = await far.arrayBuffer();
  var dar = await auxcord.decodeAudioData(bar);
  soundbuffers.set(fname, dar);
  return dar;
}
function postfetch(abode){
  window.fetch(`${window.origin}/cmd?q=${channel_id.value}&f=${window.encodeURIComponent(abode)}`,{
    headers: {
      "Content-Type": "text/plain"
    },
    cache:"no-store"
  });
}

async function beep(fname){
  if (clockbot.checked){
    postfetch(fname);
  } else {
    var somebuffer = soundbuffers.get(fname);
    if (typeof somebuffer === 'undefined'){
      somebuffer = await gimmefile(fname);
    }
    var someabsn = new AudioBufferSourceNode(auxcord, {buffer:somebuffer});
    someabsn.connect(gainode);
    someabsn.start();
  }
}

// ====================== The Sounds You Love ==================================
var love_children = document.getElementById("love_children");
function save_lovelist(){
  whichStorage.setItem("soundboard_lovelist", JSON.stringify(lovelist));
  if (window.has_username){
    post_love();
  }
}

function update_shelf(someshelf){
  let x = lovelist.findIndex(el=>el.startsWith(someshelf.id));
  lovelist[x] = someshelf.id + someshelf.value;
  save_lovelist();
}

var lovelist = JSON.parse(whichStorage.getItem('soundboard_lovelist'))??[];
window.lovelist = lovelist;

function insert_love(fname){
  if (fname.startsWith('<')){
    return `<textarea class="lovesec" id="${fname.substring(0,6)}" onchange="update_shelf(this)">${fname.substring(6)}</textarea>`;
  } else {
    return `<button id="love_${fname}" onclick="beep('${fname}')" draggable="true" oncontextmenu="event.preventDefault()||love('${fname}')">${fname.split('/')[1]}</button>`;
  }
}
function love(fname){
  let fav = document.getElementById(`love_${fname}`);
  if (fav){
    fav.remove();
    lovelist.splice(lovelist.indexOf(fname), 1);
  } else {
    love_children.insertAdjacentHTML('beforeend',insert_love(fname));
    document.getElementById(`love_${fname}`)?.addEventListener('dragstart', love_dragstart);
    lovelist.push(fname);
  }
  document.getElementById(fname)?.classList.toggle("loved");
  save_lovelist();
}
function write_lovelist(){
  var somelove = lovelist.map(fname=>{
    document.getElementById(fname)?.classList.add("loved");
    return insert_love(fname);
  });
  love_children.insertAdjacentHTML('beforeend', somelove.join(''));
  document.querySelectorAll('#love_children button').forEach(kid=>{
    kid.addEventListener('dragstart', love_dragstart);
  });
}

// -------------------------------- shelf controls -----------------------------

var nuke_control = {
  display: document.getElementById('arm_nuke_display'),
  timer: document.getElementById('arm_nuke_timer'),
  meter: document.getElementById('arm_nuke_meter'),
  starttime:0,
  L: false,
  R: false,
  detonate:function(){
    lovelist.length = 0;
    save_lovelist();
    reset_love();
    return;
  },
  setnt:function(){
    this.display.setAttribute('hidden','');
    this.L = false;
    this.R = false;
    return;
  },
  arm: function (which_side){
    if (this[which_side])
      return;
    this[which_side] = true;
    if (this.L && this.R){
      this.detonate();
      this.setnt();
      return;
    }
    this.display.removeAttribute('hidden');
    this.starttime = window.document.timeline.currentTime;
    window.requestAnimationFrame(this.anim_cb);
  },
  anim_cb: function(timestamp){
    var display_time = (window.nuke_control.starttime - timestamp) + 5000;
    if (display_time<0){
      window.nuke_control.setnt();
      return;
    }
    window.nuke_control.meter.value = display_time;
    window.nuke_control.timer.innerText = (display_time/1000).toFixed(2);
    window.requestAnimationFrame(window.nuke_control.anim_cb);
  }
};
 
function kill_shelf(){
  let kill_this = lovelist.findLastIndex(x=>x.startsWith('<'));
  if (kill_this >= 0){
    let killme = document.getElementById((lovelist[kill_this]).substring(0,6));
    lovelist.splice(kill_this,1);
    killme.remove();
    save_lovelist();
  }
}
function add_shelf(){
  let freshelf = `<${String(rui(0xffff)).padStart(5,'0')}sample_text`;
  love(freshelf);
  setTimeout(function(){
    let the_man = document.getElementById(freshelf.substring(0,6));
    the_man.focus();
    the_man.selectionStart = 0;
    the_man.selectionEnd = the_man.textLength;
  });
}

// ------------------ lovezone drag-and-drop buttons ---------------------------
function love_dragstart(ev){
  ev.dataTransfer.clearData();
  ev.dataTransfer.setData('text/plain', ev.target.id);
  ev.dataTransfer.effectAllowed = 'move';
  // cog(ev);
}
function lovelist_drop(ev){
  ev.preventDefault();
  var transit_id = ev.dataTransfer.getData('text/plain');
  
  var cox = ev.x;
  var ref_el;
  do {
    if (cox < 0)
      break;
    ref_el = document.elementFromPoint(cox, ev.y);
    cox -=10;
  } while (ref_el.tagName !== 'BUTTON' && ref_el.tagName !== 'TEXTAREA');

  var real_id = x=> x.startsWith("love_")?x.slice(5):x;
  try{
    // they're the same picture
    if (ref_el.id === transit_id)
      return;
    
    // that isn't a valid drop point
    // (sometimes it shows up as 'HTML' or 'BODY')
    if (ref_el.tagName !== 'BUTTON' && ref_el.tagName !== 'TEXTAREA')
      return;
    
    let lx_ref = lovelist.findIndex(el=>el.startsWith(real_id(ref_el.id)));
    //cog("ref:", ref_el.id, lx_ref);
    let lx_transit = lovelist.findIndex(el=>el.startsWith(real_id(transit_id)));
    //cog("transit:",transit_id, lx_transit);
    
    let where_to_put = 'afterend';
    if (lx_ref < lx_transit){
      let who_is_this = document.elementFromPoint(ev.x, ev.y);
      if (who_is_this.tagName === 'BUTTON'){
        where_to_put = 'beforebegin';
      }
    }
    
    ref_el.insertAdjacentElement(where_to_put,document.getElementById(transit_id));

    lovelist.splice(lx_transit,1);

    let insert_place = lx_ref;
    if (where_to_put === 'afterend'){
      insert_place++;
    }

    lovelist.splice(insert_place,0,real_id(transit_id));

    save_lovelist();
  }catch(eee){cog(eee);}
}
document.getElementById('love_children').addEventListener("drop", lovelist_drop);

function reset_love(){
  document.getElementById('love_children').replaceChildren();
  document.querySelectorAll('button.loved').forEach(kid=>kid.classList.remove('loved'));
}

// ----------- what categories are open and not
function setup_open(){  
  var all_details = document.querySelectorAll("details.sb");
  
  var should_open = whichStorage.getItem('soundboard_open');
  if (should_open) {
    JSON.parse(should_open).forEach(man=>document.getElementById(man)?.setAttribute("open", true));
    all_details.forEach(node=>node.addEventListener('toggle',record_open));
  } else {
    whichStorage.setItem('soundboard_open', JSON.stringify(Array.from(all_details,el=>el.id)));
    all_details.forEach(node=>{
      node.addEventListener('toggle',record_open);
      node.setAttribute("open", true);
    });
  }
}
function record_open(ev){
  whichStorage["soundboard_open"] = JSON.stringify(Array.from(document.querySelectorAll("details.sb[open]"), el => el.id));
}

function actual_init_open(){
  var booba_real = document.getElementById('booba');
  if (window.board && booba_real && booba_real.childElementCount) {
    setup_open();
  } else {
		window.requestAnimationFrame(actual_init_open);
  }
}
setTimeout(actual_init_open);

// ----- network functions
function post_love(){
  post_storage({lovelist});
}

function get_love(){
  get_storage()
  .then(the_store=>{
    if (the_store?.storage?.lovelist){
      window.lovelist = the_store.storage.lovelist;
      whichStorage.setItem("soundboard_lovelist", JSON.stringify(window.lovelist));
      reset_love();
      write_lovelist();
    }
  });
}



