//@ts-ignore
import "/page/soundboard/opodes/boards.js";

import { post_storage, get_storage, check_online, rui } from "../NEO.js";

import MediaPlayer from "../extern/MediaPlayer.js";
const mediaPlayer = new MediaPlayer();

// ============== ui controls
// ============== for the top of the page

// ------- some stuff for controlling the local volume

export function init_localVolume() {
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
    let somevolume = document.getElementById("somevolume") as HTMLInputElement | null;
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

export function init_clockbot_things() {
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
      // didnt have clockbot_enable on the page
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

/**make clockbot play the sound*/
function postfetch(abode: string){
  try {
    const channel_id = document.getElementById("channel_id") as HTMLInputElement | null;
    if (channel_id) {
      window.fetch(`${window.origin}/cmd?q=${channel_id.value}&f=${window.encodeURIComponent(abode)}`,{
        headers: {
          "Content-Type": "text/plain"
        },
        cache:"no-store"
      });
    } else {
      // couldnt find channel_id
    }
  } catch (err){ }
}

/**when you click the button to play a sound*/
export async function beep(fname: string){
  try {
    const clockbot_enable = document.getElementById("clockbot_enable") as HTMLInputElement | null;
    if (clockbot_enable?.checked){
      postfetch(fname);
    } else {
      // either we couldnt find clockbot_enable or it is not checked
      await mediaPlayer.beep(`/page/soundboard/opodes/${fname}.opus`);
    }
  } catch(err){}
}

function Bev_click(ev: Event){
  try {
    let evto = ev.target as HTMLElement;
    let fname =  evto.dataset['fname'];
    if (fname) {
      beep(fname);
    } 
  } catch(err) {}
}

// ======================= this section deals with love ========================
// =========================== and its repurcussions ===========================

export function init_love(){
  try {
    const kiddos = document.getElementById('love_children');
    kiddos?.addEventListener("drop", lovelist_drop);
    kiddos?.addEventListener("dragover", ev=>ev.preventDefault());
    write_lovelist();
    const love_zone = document.getElementById('love_zone');
    love_zone?.addEventListener("toggle", record_closed);
    love_zone?.setAttribute('open', '');
  } catch(err){
    console.error("Error initializing love:", err);
  }
}

var has_username = false;

function save_lovelist(){
  localStorage.setItem("soundboard_lovelist", JSON.stringify(lovelist));
  if (has_username){
    post_storage({lovelist});
  }
}

function update_shelf(someshelf: HTMLTextAreaElement){
  let x = lovelist.findIndex(el=>el.startsWith(someshelf.id));
  lovelist[x] = someshelf.id + someshelf.value;
  save_lovelist();
}
function TAev_change(ev: Event){
  let evtar = ev.target as HTMLTextAreaElement;
  if (evtar && evtar.id && evtar.value){
    update_shelf(evtar);
  } else {
    // missing
  }
}

declare var lovelist: string[];

var lovelist = JSON.parse(localStorage.getItem('soundboard_lovelist') ?? '[]') as string[];
// window.lovelist = lovelist;

function insert_love(fname:string){
  if (fname.startsWith('<')){
    // we are inserting a shelf
    const textarea = document.createElement('textarea');
    textarea.classList.add('lovesec');
    textarea.id = fname.substring(0,6);
    textarea.value = fname.substring(6);
    textarea.addEventListener("change", TAev_change);
    return textarea;
  } else {
    return createButton(fname, true);
  }
}

function Bev_contextmenu(ev: Event){
  try {
    let evto = ev.target as HTMLElement;
    let fname =  evto.dataset['fname'];
    if (fname) {
      // only prevent default if we're not gonna fail
      ev.preventDefault();
      love(fname);
    }
  }catch(err){}
}

function love(fname: string){
  try {    
    let love_children = document.getElementById("love_children");
    if (love_children) {
      // love children exists
      let fav = document.getElementById(`love_${fname}`);
      if (fav){
        // this one is already loved, so remove it
        fav.remove();
        lovelist.splice(lovelist.indexOf(fname), 1);
      } else {
        // new love
        const newLove = insert_love(fname);
        love_children.appendChild(newLove);
        lovelist.push(fname);
      }
      document.getElementById(fname)?.classList.toggle("loved");
      save_lovelist();
    } else {
      // love children is missing
    }
  } catch(err) {  }
}

/** this is done once on initialization,
 *  but it might be called a second time, if the user is logged in*/
function write_lovelist(){
  const somelove = lovelist.map(fname=>{
    document.getElementById(fname)?.classList.add("loved");
    return insert_love(fname);
  });
  document.getElementById("love_children")?.append(...somelove);
}

// ------------------ lovezone drag-and-drop buttons ---------------------------
function love_dragstart(ev: DragEvent){
  if (ev.dataTransfer && ev.target){
    ev.dataTransfer.clearData();
    ev.dataTransfer.setData('text/plain', (ev.target as HTMLElement).id);
    ev.dataTransfer.effectAllowed = 'move';
    // cog(ev);
  }
}
function lovelist_drop(ev: DragEvent){
  ev.preventDefault();
  if (!ev.dataTransfer)
    return;
  var transit_id = ev.dataTransfer.getData('text/plain');
  
  var cox = ev.x;
  var ref_el: HTMLElement | null = null;
  do {
    if (cox < 0)
      break;
    ref_el = document.elementFromPoint(cox, ev.y) as HTMLElement;
    cox -=10;
  } while (ref_el.tagName !== 'BUTTON' && ref_el.tagName !== 'TEXTAREA');

  var real_id = (x: string)=> x.startsWith("love_")?x.slice(5):x;
  try{
    ref_el = ref_el as HTMLElement;
    // they're the same picture
    if (ref_el.id === transit_id)
      return;
    
    // that isn't a valid drop point
    // (sometimes it shows up as 'HTML' or 'BODY')
    if (ref_el.tagName !== 'BUTTON' && ref_el.tagName !== 'TEXTAREA')
      return;
    
    let lx_ref = lovelist.findIndex(el=>el.startsWith(real_id(ref_el?.id ?? '')));
    //cog("ref:", ref_el.id, lx_ref);
    let lx_transit = lovelist.findIndex(el=>el.startsWith(real_id(transit_id)));
    //cog("transit:",transit_id, lx_transit);
    
    let where_to_put: 'beforebegin' | 'afterend' = 'afterend';
    if (lx_ref < lx_transit){
      let who_is_this = document.elementFromPoint(ev.x, ev.y);
      if (who_is_this?.tagName === 'BUTTON'){
        where_to_put = 'beforebegin';
      }
    }
    
    let el_tid = document.getElementById(transit_id);
    if (el_tid){
      ref_el.insertAdjacentElement(where_to_put, el_tid);
    }

    lovelist.splice(lx_transit,1);

    let insert_place = lx_ref;
    if (where_to_put === 'afterend'){
      insert_place++;
    }

    lovelist.splice(insert_place,0,real_id(transit_id));

    save_lovelist();
  }catch(eee){
    console.log(eee);
  }
}

function reset_love(){
  document.getElementById('love_children')?.replaceChildren();
  document.querySelectorAll('button.loved').forEach(kid=>kid.classList.remove('loved'));
}

// -------------------------- GENERATING THE BUTTONS -----------------------------

/**how to make the button*/
function createButton(fname: string, isLove: boolean){
  const button = document.createElement('button');
  button.dataset['fname'] = fname;
  let fname_perchance = fname.split('/')[1];
  button.textContent = fname_perchance??fname;
  button.addEventListener('click', Bev_click);
  button.addEventListener('contextmenu', Bev_contextmenu);
  if (isLove) {
    button.id = `love_${fname}`;
    button.setAttribute('draggable', 'true');
    button.addEventListener('dragstart', love_dragstart);
  } else {
    button.id = `${fname}`;
  }
  return button;
}

/**this is used for making each board*/
function makegroup_III(someboard: Board) {
  // all thos buttons
  const somebuttons = someboard.sound.map(s => {
    const button = document.createElement('button');
    button.id = `${someboard.name}/${s}`;
    button.dataset['fname'] = `${someboard.name}/${s}`;
    button.addEventListener('click', Bev_click);
    button.addEventListener('contextmenu', Bev_contextmenu);
    button.textContent = s;
    return button;
  });
  // the thing to have sounds in it
  const divSounds = document.createElement('div');
  divSounds.classList.add('sounds');
  divSounds.append(...somebuttons);
  // the summary et al
  const anotherH2 = document.createElement('h2');
  anotherH2.textContent = someboard.name;
  anotherH2.id = `group_${someboard.name}_h2`;
  const summary = document.createElement('summary');
  summary.appendChild(anotherH2);
  // the actual details holding it all together
  const sonDetails = document.createElement('details');
  sonDetails.id = `group_${someboard.name}`;
  sonDetails.classList.add('sb', 'sef', 'lard');
  sonDetails.appendChild(summary);
  sonDetails.appendChild(divSounds);
  sonDetails.setAttribute('open', '');
  sonDetails.addEventListener('toggle', record_closed);
  return sonDetails;
}

function record_closed(ev: Event){
  try {
    localStorage.setItem('soundboard::shouldnt_open',
      JSON.stringify(Array.from(document.querySelectorAll("details.sb:not([open])"), el => el.id))
    );
  } catch(err) {}
}

// --------- show the total number of sounds at the top of the page
function show_booba_size() {
  var pisces = document.querySelectorAll('div#booba button').length;
  var toppo = document.querySelector('div#topstuff>h2') as HTMLElement | null;
  if (toppo) {
    toppo.innerText = pisces + 'pcs set';
  }
}

/** put the actual soundboards on the page */
export function init_booba(){
  try {
    const booba = document.getElementById('booba') as HTMLDivElement | null;
    if (booba) {
      const allgroups = window.board.map(makegroup_III);
      booba.append(...allgroups);
      show_booba_size();
    } else {
      // booba missing
    }
  } catch(err){}
}

// -------------------------------- shelf controls -----------------------------

class NukeControl {
  starttime = 0;
  L = false;
  R = false;
  constructor() {
    this.anim_cb = this.anim_cb.bind(this);
  }
  get display() {
    return document.getElementById('arm_nuke_display') as HTMLDivElement | null;
  }
  get timer() {
    return document.getElementById('arm_nuke_timer') as HTMLSpanElement | null;
  }
  get meter() {
    return document.getElementById('arm_nuke_meter') as HTMLMeterElement | null;
  }
  detonate() {
    lovelist.length = 0;
    save_lovelist();
    reset_love();
  }
  setnt() {
    this.display?.setAttribute('hidden', '');
    this.L = false;
    this.R = false;
  }
  arm(which_side: 'L' | 'R') {
    if (this[which_side]) return;
    this[which_side] = true;
    if (this.L && this.R) {
      this.detonate();
      this.setnt();
      return;
    }
    this.display?.removeAttribute('hidden');
    this.starttime = Number(window.document.timeline.currentTime??0);
    window.requestAnimationFrame(this.anim_cb);
  }
  anim_cb(timestamp: number) {
    const display_time = (this.starttime - timestamp) + 5000;
    if (display_time < 0) {
      this.setnt();
      return;
    }
    if (this.meter)
      this.meter.value = display_time;
    if (this.timer)
      this.timer.innerText = (display_time / 1000).toFixed(2);
    window.requestAnimationFrame(this.anim_cb);
  }
}
var nukeControl = new NukeControl();

export function init_shelf_controls() {
  // arm left
  let nukeControlArm_L = document.getElementById('nukeControlArm_L') as HTMLButtonElement | null;
  nukeControlArm_L?.addEventListener('click', () => nukeControl.arm('L'));
  // arm right
  let nukeControlArm_R = document.getElementById('nukeControlArm_R') as HTMLButtonElement | null;
  nukeControlArm_R?.addEventListener('click', () => nukeControl.arm('R'));
  // kill a shelf
  let killShelf = document.getElementById('killShelf') as HTMLButtonElement | null;
  killShelf?.addEventListener('click', kill_shelf);
  // add a shelf
  let addShelf = document.getElementById('addShelf') as HTMLButtonElement | null;
  addShelf?.addEventListener('click', add_shelf);
}
 
function kill_shelf(){
  let kill_this = lovelist.findLastIndex(x=>x.startsWith('<'));
  if (kill_this >= 0){
    let killme = document.getElementById((lovelist.at(kill_this) ?? '').substring(0,6));
    if (killme) {
      killme.remove();
    }
    lovelist.splice(kill_this,1);
    save_lovelist();
  }
}

function add_shelf(){
  let freshelf = `<${String(rui(0xffff)).padStart(5,'0')}sample_text`;
  love(freshelf);
  setTimeout(function(){
    let the_man = document.getElementById(freshelf.substring(0,6));
    if (the_man instanceof HTMLTextAreaElement){
      the_man.focus();
      the_man.selectionStart = 0;
      the_man.selectionEnd = the_man.textLength;
    }
  });
}

// ----- network functions

function get_love(){
  get_storage()
  .then(the_store=>{
    if (the_store?.storage?.lovelist){
      lovelist = the_store.storage.lovelist;
      localStorage.setItem("soundboard_lovelist", JSON.stringify(lovelist));
      reset_love();
      write_lovelist();
    }
  });
}

export function init_networkality() {
  has_username = false;
  check_online(dat => {
    if (dat.username) {
      var username_perchance = document.getElementById("username_perchance");
      if (username_perchance) {
        username_perchance.innerHTML = "Logged in as <div><b>" + dat.username + "</b></div>";
      }
      has_username = true;
      get_love();
    }
  });
}

