// ============== ui controls
// ============== for the top of the page
// ------ local volume
var auxcord = new AudioContext();
var gainode = new GainNode(auxcord, {gain:0.2});
gainode.connect(auxcord.destination);

// -------- clockbot things
var clockbot = document.getElementById("clockbot_enable");
var channel_id = document.getElementById("channel_id");

var breadlink = /.*?\/?(\d+)$/;
channel_id.addEventListener('change',ev=>{
  ev.target.value = ev.target.value.replace(breadlink, "$1");
  window.whichStorage["soundboard_clockbot_channel_id"] = ev.target.value;
});

function getinchat(){
  if (clockbot.checked){
    postfetch('getinchat()');
  }
}
function leave_chat(){
  if (clockbot.checked){
    postfetch('leave_chat()');
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

// ------------------ some other love-based ui things --------------------------
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
    ref_el.insertAdjacentElement('afterend',document.getElementById(transit_id));

    lovelist.splice(lovelist.indexOf(real_id(transit_id)),1);

    let insert_place = lovelist.findIndex(el=>el.startsWith(real_id(ref_el.id)));

    lovelist.splice((insert_place+1),0,real_id(transit_id));

    save_lovelist();
  }catch(eee){cog(eee);}
}


function reset_love(){
  document.getElementById('love_children').replaceChildren();
  document.querySelectorAll('button.loved').forEach(kid=>kid.classList.remove('loved'));
}

// ================ this one's kinda important, so don't talk to him
// ============== i need him to focus on what he's doing
function make_group(dad, someboard){
  var somebuttons = someboard.sound.map(s=>`<button id="${someboard.name}/${s}" onclick="beep('${someboard.name}/${s}')" oncontextmenu="event.preventDefault()||love('${someboard.name}/${s}')">${s}</button>`);
  dad.insertAdjacentHTML('beforeend',`
<details id="group_${someboard.name}" class="sb">
  <summary><h2>${someboard.name}</h2></summary>
  <div class="sounds">${somebuttons.join('')}</div>
</details>
`);
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
  whichStorage["soundboard_open"] = JSON.stringify(Array.from(document.querySelectorAll("details.sb[open]"),el=>el.id));
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


