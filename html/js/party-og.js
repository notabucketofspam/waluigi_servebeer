/*
    SOME HTML
*/
document.querySelector("meta.meta_party").insertAdjacentHTML('beforebegin',
`<div id="party_zone">
  <div id="funk_container" >
    <input id="funk_button" type="button" value="Start the party">
    <div class="div_pad_small scrollable_meter" onwheel="update_cycle_amount(event, null)"></div>
    <div class="funk_meter scrollable_meter" id="another_funk_thing_idk" onwheel="update_cycle_amount(event, null)">
      <input class="funk_meter_button" type="button" value="&#60;" id="funk_less">
      <span id="funk_lvl_outer">Funk level: <span id="funk_level">25</span>%</span>
      <input class="funk_meter_button" type="button" value="&#62;" id="funk_more">
    </div>
    <div class="scrollable_meter" onwheel="update_cycle_amount(event, null)" id="giga_funk_message">
      Right-click to GIGA FUNK
    </div>
    <div id="reset_funk_msg" class="scrollable_meter" onwheel="update_cycle_amount(event, null)">
      Shift+LMB to reset
    </div>
    <div class="scrollable_meter" onwheel="update_cycle_amount(event, null)">
      <div class="funk_meter_box" id="funk_meter_box_prime">
        <div class="funk_meter_bar" id="fmb_num_0"></div>
      </div>
    </div>
    <div id="funk_meter_box_bravo"></div>
  </div>
  <div class="div_pad_small scrollable_meter" onwheel="update_cycle_amount(event, null)" style="height:4px;"></div>
  <div id="jukebox_container">
    <audio id="audio_player" hidden onended="jukebox_change_track(null)"></audio>
    <input id="audio_button" type="button" value="Insert mixtape" onclick="toggle_audio(this)">
    <div class="div_pad_small scrollable_meter" onwheel="update_jukebox_volume(event)"></div>
    <div id="jukebox_track_selection" class="scrollable_meter" onwheel="update_jukebox_volume(event)">
      <input class="jukebox_track_button" type="button" value="&#60;" onclick="jukebox_change_track(this)">
      <span id="change_track">Change track</span>
      <input class="jukebox_track_button" type="button" value="&#62;" onclick="jukebox_change_track(this)">
    </div>
    <div class="div_pad_small scrollable_meter" onwheel="update_jukebox_volume(event)"></div>
    <div id="jukebox_which_track">
      <span class="scrollable_meter white_in_burgmenu" id="jukebox_current_track" onwheel="update_jukebox_volume(event)"></span>
    </div>
    <div class="div_pad_small scrollable_meter" id="singular_jukebox_divider"
         onwheel="update_jukebox_volume(event)"></div>
    <div id="jukebox_volume_element" class="scrollable_meter" onwheel="update_jukebox_volume(event)">
      <div id="jukebox_volume_box">
        <div id="jukebox_volume_bar"></div>
      </div>
    </div>
  </div>
  <div class="div_pad_small scrollable_meter" id="another_jukebox_divider" onwheel="update_jukebox_volume(event)"></div>
  <div id="album_area">
    <span id="scroll_wheel_comment" class="scrollable_meter" onwheel="update_jukebox_volume(event)">(the scroll wheel is your friend)</span>
    <div id="jukebox_loop_div">
      <input type="checkbox" id="jukebox_loop_input"/>
      <label for="jukebox_loop_input" id="loop_word">&#x2112;&#x2134;&#x2134;&wp;</label>
    </div>
    <select id="selch">
      <option value="0,0">Classic Jukebox (7)</option>
      <option value="0,204">BSC Prime Cuts (204)</option>
      <option value="0,22">Beats to Yeet By (22)</option>
      <option value="22,44">The Nippon Special (22)</option>
      <option value="44,53">33&frac13; RPM (9)</option>
      <option value="53,61">C++ (8)</option>
      <option value="61,74">Juh (13)</option>
      <option value="74,81">Crude Oil (7)</option>
      <option value="81,85">Micro Center&copy; (4)</option>
      <option value="85,88">Food Time (3)</option>
      <option value="88,100">English (12)</option>
      <option value="100,111">Netburst (11)</option>
      <option value="111,129">Metals (18)</option>
      <option value="129,130">Jerry Seinfeld (1)</option>
      <option value="130,139">Abnormal Music (9)</option>
      <option value="139,149">Doot (10)</option>
      <option value="149,161">some stuff idk (12)</option>
      <option value="161,173">EVGA GTX 1080 FTW (12)</option>
      <option value="173,203">junk (30)</option>
      <option value="203,204">Scoot the Burbs (1)</option>
    </select>
    <div id="change_album_message">Select<br/>playlist</div>
  </div>
</div>`);
  
/*
    FUNK / NICE COLORS
*/
var good_colors = CSS.supports("background-color", "oklch(1 0.4 0)");
if (good_colors) {
  var rainbow_rgb = (h) => `oklch(1 0.4 ${h})`;
} else {
  var rainbow_rgb = (h) => `hsl(${h} 100% 50%`;
}

var cycle_amount = 25;
var whatever = 0;
var long_int;
var time_circle;
var funk_button = document.getElementById("funk_button");
var funk_level = document.getElementById("funk_level");
var now_cycling = false;
funk_button.addEventListener("click", toggle_cycling);
function toggle_cycling(ev){
  if (ev?.shiftKey){
    clear_timers();
    reset_funk();
    return;
  }
  document.body.style.removeProperty("background-color");
  long_int = long_int?cancelAnimationFrame(long_int):okfine(time_circle = document.timeline.currentTime);
  now_cycling = !now_cycling;
  funk_button.value = now_cycling ? "Stop it's too much":"Start the party";
}
function okfine(timestamp) {
  var timescale = (timestamp - time_circle)*0.06;
  time_circle = document.timeline.currentTime;
  whatever+=cycle_amount*timescale/20;
  document.body.style.backgroundColor = rainbow_rgb(whatever);
  long_int = window.requestAnimationFrame(okfine);
}

/*
    FUNK METER BAR
*/
var box_bravo = document.getElementById("funk_meter_box_bravo");
var fmb_list = document.getElementsByClassName("funk_meter_bar");
function update_funk_meter_bar(element, delta) {
  var funk_meter_bar_width_total = 2 * cycle_amount;
  if (typeof update_funk_meter_bar.negative == "undefined")
    update_funk_meter_bar.negative = false;
  // var clock = (!cycle_amount && (delta > 0 || delta < 0));
  if ((!cycle_amount && (delta > 0))||(cycle_amount>0)) {
    update_funk_meter_bar.negative = false;
    element.style.backgroundColor = "#22bb22";
  } else
  if ((!cycle_amount && (delta < 0))||(cycle_amount<0)) {
    update_funk_meter_bar.negative = true;
    element.style.backgroundColor = "#bb2222";
  }
  if (update_funk_meter_bar.negative)
    funk_meter_bar_width_total *= -1;
  var fmbw_overflow = funk_meter_bar_width_total % window.innerWidth;
  //console.log("fmbw", fmbw_overflow, "elemwidth", parseFloat(element.style.width));
  if (Math.abs(fmbw_overflow)<2 && (fmb_list.length != 1)/* &&
    (parseFloat(element.style.width) < 2)*/
    &&((delta<0&&!update_funk_meter_bar.negative)||(delta>0&&update_funk_meter_bar.negative))) {
    //console.log("remove");
    element.parentNode.removeChild(element);
    return;
  }
  if (Math.abs(fmbw_overflow)<2 && (cycle_amount != 0)) {
    //console.log("spawn");
    spawn_funk_meter_bar(element);
    return;
  }
  element.style.width = ((fmbw_overflow) + "px");
}
function spawn_funk_meter_bar(element) {
  var nu_div = `<div class="funk_meter_bar" id="fmb_num_${fmb_list.length}" style="margin: 4px 0px; width: 0px; background-color: ${element.style.backgroundColor};"></div>`;
  box_bravo.insertAdjacentHTML("beforeend", nu_div);
}
function reset_funk(){
  box_bravo.replaceChildren();
  update_funk_meter_bar.negative = false;
  cycle_amount = 25;
  document.getElementById("fmb_num_0").style="";
  funk_level.innerText = 25;
}

/*
    FUNK USER INPUT
*/
// var global_update_cycle_amount_press_handle;
var time_handles = [];

var funk_more = document.getElementById("funk_more");
var funk_less = document.getElementById("funk_less");
for (const fb of [funk_more, funk_less]) {
  fb.addEventListener("mousedown", update_cycle_amount_press);
  fb.addEventListener("mouseup", update_cycle_amount_press);
  fb.addEventListener("touchstart", update_cycle_amount_press);
  fb.addEventListener("touchend", update_cycle_amount_press);
}
function update_cycle_amount(ev, el) {
  var gca_initial = cycle_amount;
  if (ev)
    cycle_amount += (ev.deltaY < 0) ? (1) : (-1);
  if (el)
    cycle_amount += (el.getAttribute("value") === ">") ? (1) : (-1);
  funk_level.innerHTML = (cycle_amount);
  update_funk_meter_bar(fmb_list[fmb_list.length - 1], (cycle_amount - gca_initial));
}
function update_cycle_amount_press(ev) {
  if ((ev.type == "mousedown"&&!ev.shiftKey) || ev.type == "touchstart")
    // global_update_cycle_amount_press_handle = setInterval(update_cycle_amount, 25, null, this);
    time_handles.push(setInterval(update_cycle_amount, 25, null, this));
  else if (ev.type == "mouseup" || ev.type == "touchend"||(ev.type == "mousedown"&&ev.shiftKey))
    // clearInterval(global_update_cycle_amount_press_handle);
    clearInterval(time_handles.pop());
}
function clear_timers(){
  for (const timer of time_handles)
    clearInterval(timer);
  time_handles.length = 0;
}

/*
    GIGA FUNK
*/
function giga_funk(which_funk, how_much) {
  var _which_funk = which_funk??funk_more;
  var _how_much = how_much??39;
  for(let i=0;i<_how_much;i++)
    _which_funk.dispatchEvent(new Event("mousedown"));
  return "hell yeah";
}
funk_button.addEventListener("contextmenu", (ev)=>ev.preventDefault());
funk_button.addEventListener("auxclick", ()=>giga_funk(funk_more));
funk_more.addEventListener("contextmenu", (ev)=>ev.preventDefault());
funk_more.addEventListener("auxclick", ()=>giga_funk(funk_more));
funk_less.addEventListener("contextmenu", (ev)=>ev.preventDefault());
funk_less.addEventListener("auxclick", ()=>giga_funk(funk_less));

/*
    JUKEBOX
*/
var classic_jukebox = [
  "Adhesive Wombat - Chodge Darger.mp3",
  "Jellyfish Jam.mp3",
  "Linkin Park - Numb (80's Remix).mp3",
  "Maurizio De Jorio - Running in the 90's.mp3",
  "Mile High Club (JC2).mp3",
  "Noma - Brain Power.mp3",
  "\u307F\u304D\u3068P - 39\u307F\u3085\u30FC\u3058\u3063\u304F! feat. \u521D\u97F3\u30DF\u30AF.mp3",
];
var jukebox_track_index = 0;
var jukebox_track_list = classic_jukebox;
var classic_mode = "/resource/jukebox-tracks/";
var expansion_pak = "https://idazntksvlmn.objectstorage.us-ashburn-1.oci.customer-oci.com/n/idazntksvlmn/b/waluigi_servebeer/o/jams/BSC%20Prime%20Cuts/";
var current_prefix = classic_mode;

var audio_player = document.getElementById("audio_player");
var jukebox_volume_element = document.getElementById("jukebox_volume_element");
var jukebox_current_track = document.getElementById("jukebox_current_track");
var singular_jukebox_divider = document.getElementById("singular_jukebox_divider");
var selch = document.getElementById("selch");
var jukebox_loop_input = document.getElementById("jukebox_loop_input");
var another_jukebox_divider = document.getElementById("another_jukebox_divider");

jukebox_current_track.innerHTML = jukebox_track_list[0];
audio_player.src = "/resource/jukebox-tracks/" + jukebox_track_list[0];
audio_player.volume = 0.15;
jukebox_volume_element.addEventListener("touchstart", touch_start_coord, false);
jukebox_volume_element.addEventListener("touchmove", update_jukebox_volume, false);
jukebox_current_track.addEventListener("touchstart", touch_start_coord, false);
jukebox_current_track.addEventListener("touchmove", update_jukebox_volume, false);
singular_jukebox_divider.addEventListener("touchstart", touch_start_coord, false);
singular_jukebox_divider.addEventListener("touchmove", update_jukebox_volume, false);
another_jukebox_divider.addEventListener("touchstart", touch_start_coord, false);
another_jukebox_divider.addEventListener("touchmove", update_jukebox_volume, false);


var touch_start = [ 0, 0 ];
function touch_start_coord(event) {
  touch_start[0] = event.touches[0].pageX;
  touch_start[1] = event.touches[0].pageY;
}

function toggle_audio(element) {
  element.classList.toggle("active");
  if (element.classList.contains("active")) {
    element.setAttribute("value", "Get it outta here");
    audio_player.play();
  } else {
    element.setAttribute("value", "Insert mixtape");
    audio_player.pause();
  }
}
function jukebox_change_track(element) {
  if (element === null && jukebox_loop_input.checked)
    return;
  if (element === null || element.getAttribute("value") === ">") {
    ++jukebox_track_index;
    if (jukebox_track_index == jukebox_track_list.length)
      jukebox_track_index = 0;
  } else {
    --jukebox_track_index;
    if (jukebox_track_index < 0)
      jukebox_track_index = jukebox_track_list.length - 1;
  }
  jukebox_load_audio();
}
function jukebox_load_audio(){
  sessionStorage["jukebox_track_index"] = jukebox_track_index;
  jukebox_current_track.innerText = jukebox_track_list[jukebox_track_index];
  audio_player["src"]= current_prefix + jukebox_track_list[jukebox_track_index];
  audio_player.load();
  if (audio_button.classList.contains("active"))
    audio_player.play().catch(e=>{});
  else
    audio_player.pause();
}
function update_jukebox_volume(event) {
  var new_volume = audio_player.volume;
  if (event.type === "wheel")
    new_volume += (event.deltaY < 0) ? 0.004 : -0.004;
  else {
    new_volume += ((event.touches[0].pageX > touch_start[0])?1:-1)/200;
  }
  if (new_volume < 0.0)
    new_volume = 0.0;
  else if (new_volume > 1.0)
    new_volume = 1.0;
  set_volobar(new_volume);
}
function set_volobar(new_volume){
  audio_player.volume = new_volume;
  sessionStorage["audio_player_volume"] = new_volume;
  jukebox_volume_bar.style.width = (audio_player.volume * 500)+"px";
}

/*
    JUKEBOX SELECT PLAYLIST
*/
var bsc_prime_cuts;
selch.addEventListener("change",selcho_onchange);
function selcho_onchange(ev) {
  jukebox_track_index = 0;
  sessionStorage["selch-index"] = ev.target.selectedIndex;
  selcho_playlist(ev.target.value);
}
function selcho_playlist(ev_target_value){
  var [starto, endo] = ev_target_value.split(",");
  jukebox_track_list = bsc_prime_cuts.slice(starto, endo);
  if(jukebox_track_list.length){
    current_prefix = expansion_pak;
  } else {
    jukebox_track_list = classic_jukebox;
    current_prefix=classic_mode;
  }
  jukebox_load_audio();
}
/*
    REMEMBER ME
*/
jukebox_loop_input.addEventListener("change",ev=>{
  sessionStorage["loop"] = ev.target.checked|0;
  set_audio_loop();
});
function set_audio_loop(){
  audio_player.loop = jukebox_loop_input.checked;
}
(async function(){
  set_volobar(Number(sessionStorage.getItem("audio_player_volume")||0.15));
  jukebox_track_index = Number(sessionStorage.getItem("jukebox_track_index")||0);
  bsc_prime_cuts = (await import("/resource/BSC_Prime_Cuts.json",{with:{type:"json"}})).default;
  var sid = Number(sessionStorage.getItem("selch-index")||0);
  selch[sid].selected = true;
  selcho_playlist(selch[sid].value);
  var do_loop = Number(sessionStorage.getItem("loop")||0);
  jukebox_loop_input.checked = Boolean(do_loop);
  set_audio_loop();
})();

/*
    SCROLLING
*/
var scrollable_meter_list = document.getElementsByClassName("scrollable_meter");
for (const sm of scrollable_meter_list) {
  sm.addEventListener("mouseover", stop_scrolling_y);
  sm.addEventListener("mouseout", start_scrolling_y);
  sm.addEventListener("wheel", check_can_scroll);
}
var full_doc_html = document.documentElement;
var can_scroll = true;
function stop_scrolling_y(event) {
  can_scroll = false;
}
function start_scrolling_y(event) {
  can_scroll = true;
}
function check_can_scroll(ev) {
  if (!can_scroll)
    ev.preventDefault();
}

