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
  } catch (err){
    // just let it do nothing
  }
}

async function beep(fname: string){
  try {
    const clockbot_enable = document.getElementById("clockbot_enable") as HTMLInputElement | null;
    if (clockbot_enable?.checked){
      postfetch(fname);
    } else {
      // either we couldnt find clockbot_enable or it is not checked
      await mediaPlayer.beep(fname);
    }
  } catch(err){
    // yelling
  }
}

function Bev_click(ev: Event){
  try {
    let evto = ev.target as HTMLElement;
    let fname =  evto.dataset['fname'];
    if (fname) {
      beep(fname);
    } else {
      // fname is missing for some reason.
    }
  } catch(err) {}
}

// ====================== The Sounds You Love ==================================

function init_love(){
  try {    
    document.getElementById('love_children')?.addEventListener("drop", lovelist_drop);
  } catch(err){
    console.error("Error initializing love:", err);
  }
}

var has_username = false;

// var love_children = document.getElementById("love_children");
function save_lovelist(){
  localStorage.setItem("soundboard_lovelist", JSON.stringify(lovelist));
  if (has_username){
    post_love();
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
    const button = document.createElement('button');
    button.id = `love_${fname}`;
    button.dataset['fname'] = fname;
    let fname_perchance = fname.split('/')[1];
    button.textContent = fname_perchance??fname;
    button.setAttribute('draggable', 'true');
    button.addEventListener('click', Bev_click);
    button.addEventListener('contextmenu', Bev_contextmenu);
    button.addEventListener('dragstart', love_dragstart);
    return button;
  }
}

function Bev_contextmenu(ev: Event){
  try {
    let evto = ev.target as HTMLElement;
    if (evto) {
      // button is ok
      let fname =  evto.dataset['fname'];
      if (fname) {
        // only prevent default if we're not gonna fail
        ev.preventDefault();
        love(fname);
      } else {
        // WHY ARE YOU GONE?
      }
    } else {
      // wya
    }
  }catch(err){

  }
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
        if (newLove instanceof HTMLElement) {
          love_children.appendChild(newLove);
        } else {
          love_children.insertAdjacentHTML('beforeend', newLove);
        }
        document.getElementById(`love_${fname}`)?.addEventListener('dragstart', love_dragstart);
        lovelist.push(fname);
      }
      document.getElementById(fname)?.classList.toggle("loved");
      save_lovelist();
    } else {
      // love children is missing
    }
  } catch(err) {

  }
}
// this is done once on initialization
function write_lovelist(){
  var somelove = lovelist.map(fname=>{
    document.getElementById(fname)?.classList.add("loved");
    return insert_love(fname);
  });
  let love_children = document.getElementById("love_children");
  if (love_children) {
    love_children.append(...somelove);
  } else {
    // no love_children. sad.
  }
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

function init_shelf_controls() {
  let nukeControlArm_L = document.getElementById('nukeControlArm_L') as HTMLButtonElement | null;
  if (nukeControlArm_L) {
    nukeControlArm_L.addEventListener('click', () => nukeControl.arm('L'));
  }
  let nukeControlArm_R = document.getElementById('nukeControlArm_R') as HTMLButtonElement | null;
  if (nukeControlArm_R) {
    nukeControlArm_R.addEventListener('click', () => nukeControl.arm('R'));
  }
  let killShelf = document.getElementById('killShelf') as HTMLButtonElement | null;
  if (killShelf) {
    killShelf.addEventListener('click', kill_shelf);
  }
  let addShelf = document.getElementById('addShelf') as HTMLButtonElement | null;
  if (addShelf) {
    addShelf.addEventListener('click', add_shelf);
  }
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
function rui(k: number): number{
  return Math.trunc(Math.random() * k);
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

// ----------- what categories are open and not
function setup_open(){
  try {
    // set them open or not
    var shouldnt_open = localStorage.getItem('soundboard::shouldnt_open');
    if (shouldnt_open) {
      // has it in localstorage
      const sto_shouldntOpen = JSON.parse(shouldnt_open) as string[];
      sto_shouldntOpen.forEach(man=>document.getElementById(man)?.removeAttribute("open"));
    } else {
      // missing from localstorage, so make it blank
      localStorage.setItem('soundboard::shouldnt_open', '[]');
    }

    // add event listeners for all of the details
    var all_details = document.querySelectorAll("details.sb");
    all_details.forEach(node=>node.addEventListener('toggle',record_closed));
  }catch(err){
    console.error("Error setting up open categories:", err);
  }
}
function record_closed(ev: Event){
  try {
    localStorage.setItem('soundboard::shouldnt_open',
      JSON.stringify(Array.from(document.querySelectorAll("details.sb:not([open])"), el => el.id))
    );
  } catch(err) {
  }
}

function actual_init_open(){
  var booba_real = document.getElementById('booba');
  if (window.board && booba_real && booba_real.childElementCount) {
    setup_open();
  } else {
		window.requestAnimationFrame(actual_init_open);
  }
}
// setTimeout(actual_init_open);

function init_full() {
  try {
    var booba_real = document.getElementById('booba');
    if (window.board && booba_real?.childElementCount) {
    
    }
  } catch(err){

  }
}

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



