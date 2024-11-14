/*
    SOME HTML
*/
document.querySelector("meta.meta_party").insertAdjacentHTML('beforebegin',
`<div id="party_zone">
  <div id="funk_container" >
    <input id="funk_button" type="button" value="Start the party" onclick="toggle_cycle_background(this)">
    <div class="div_pad_small"></div>
    <div class="funk_meter scrollable_meter" id="another_funk_thing_idk" onwheel="update_cycle_amount(event, null)">
      <input class="funk_meter_button" type="button" value="&#60;" id="funk_less">
      <span id="funk_lvl_outer">Funk level: <span id="funk_level">25</span>%</span>
      <input class="funk_meter_button" type="button" value="&#62;" id="funk_more">
    </div>
    <div class="scrollable_meter" onwheel="update_cycle_amount(event, null)" id="giga_funk_message">
      Right-click to GIGA FUNK
    </div>
    <div class="scrollable_meter" onwheel="update_cycle_amount(event, null)">
      <div class="funk_meter_box" id="funk_meter_box_prime">
        <div class="funk_meter_bar" id="fmb_num_0"></div>
      </div>
    </div>
    <div id="funk_meter_box_bravo"></div>
  </div>
  <div class="div_pad_small" ></div>
  <div id="jukebox_container">
    <audio id="audio_player" hidden onended="jukebox_change_track(null)"></audio>
    <input id="audio_button" type="button" value="Insert mixtape" onclick="toggle_audio(this)">
    <div class="div_pad_small"></div>
    <div id="jukebox_track_selection">
      <input class="jukebox_track_button" type="button" value="&#60;" onclick="jukebox_change_track(this)">
      <span id="change_track">Change track</span>
      <input class="jukebox_track_button" type="button" value="&#62;" onclick="jukebox_change_track(this)">
    </div>
    <div class="div_pad_small"></div>
    <div id="jukebox_which_track">
      <span class="scrollable_meter" id="jukebox_current_track" onwheel="update_jukebox_volume(event)"></span>
    </div>
    <div class="div_pad_small scrollable_meter" id="singular_jukebox_divider"
         onwheel="update_jukebox_volume(event)"></div>
    <div id="jukebox_volume_element" class="scrollable_meter" onwheel="update_jukebox_volume(event)">
      <div id="jukebox_volume_box">
        <div id="jukebox_volume_bar"></div>
      </div>
    </div>
  </div>
  <div class="div_pad_small"></div>
  <span id="scroll_wheel_comment">(the scroll wheel is your friend)</span>
</div>`);
  
/*
    FUNK
*/
var global_frametime = 1000 / 60;
var global_cycle_units = 10;
var global_funk_meter_bar_units = 2;
var global_cycle_amount = 250;
var global_page_hue = 0;
var global_page_hue_reverse = 65535;
var global_cycle_background_handle;
var global_update_cycle_amount_press_handle;

var good_colors = CSS.supports("background-color: oklch(1 0.4 0)");
if (good_colors) {
  var rainbow_rgb = (h) => `oklch(1 0.4 ${h/182})`;
} else {
  var rainbow_rgb = (h) => `hsl(${h/182} 100% 50%`;
}

var fmb_list = document.getElementsByClassName("funk_meter_bar");

var funk_meter_button_list = document.getElementsByClassName("funk_meter_button");
var fmbl_counter;
for (fmbl_counter = 0; fmbl_counter < funk_meter_button_list.length; ++fmbl_counter) {
  funk_meter_button_list[fmbl_counter].addEventListener("mousedown", update_cycle_amount_press);
  funk_meter_button_list[fmbl_counter].addEventListener("mouseup", update_cycle_amount_press);
  funk_meter_button_list[fmbl_counter].addEventListener("touchstart", update_cycle_amount_press);
  funk_meter_button_list[fmbl_counter].addEventListener("touchend", update_cycle_amount_press);
}
function cycle_background() {
  if (global_cycle_amount >= 0) {
    global_page_hue += global_cycle_amount;
    //if (global_page_hue >= 65536)
      //global_page_hue = 0;
    document.body.style.backgroundColor = rainbow_rgb(global_page_hue, 255, 255);
  } else {
    global_page_hue_reverse += global_cycle_amount;
    //if (global_page_hue_reverse <= 0)
      //global_page_hue_reverse = 65535;
    document.body.style.backgroundColor = rainbow_rgb(global_page_hue_reverse, 255, 255);
  }
}
function toggle_cycle_background(element) {
  element.classList.toggle("active");
  if (element.classList.contains("active")) {
    element.setAttribute("value", "Stop it's too much");
    global_cycle_background_handle = setInterval(cycle_background, global_frametime);
  } else {
    element.setAttribute("value", "Start the party");
    clearInterval(global_cycle_background_handle);
    document.body.style.backgroundColor = "";
  }
}
function update_cycle_amount(event, element) {
  var gca_initial = global_cycle_amount;
  if (event)
    global_cycle_amount += (event.deltaY < 0) ? (global_cycle_units) : (-1 * global_cycle_units);
  if (element)
    global_cycle_amount += (element.getAttribute("value") === ">") ? 
      (global_cycle_units) : (-1 * global_cycle_units);
  document.getElementById("funk_level").innerHTML = (global_cycle_amount / global_cycle_units);
  // var fmb_list = document.getElementsByClassName("funk_meter_bar");
  update_funk_meter_bar(fmb_list[fmb_list.length - 1], (global_cycle_amount - gca_initial));
}
function update_funk_meter_bar(element, delta) {
  var funk_meter_bar_width_total = global_funk_meter_bar_units * global_cycle_amount / global_cycle_units;
  if (update_funk_meter_bar.negative == "undefined")
    update_funk_meter_bar.negative = false;
  var clock = (!global_cycle_amount && (delta > 0 || delta < 0));
  if (clock && (delta > 0)) {
    update_funk_meter_bar.negative = false;
    element.style.backgroundColor = "#22bb22";
  }
  if (clock && (delta < 0)) {
    update_funk_meter_bar.negative = true;
    element.style.backgroundColor = "#bb2222";
  }
  if (update_funk_meter_bar.negative)
    funk_meter_bar_width_total *= -1;
  var fmbw_overflow = funk_meter_bar_width_total % window.innerWidth;
  //console.log("fmbw", fmbw_overflow, "elemwidth", parseFloat(element.style.width));
  // var fmb_list = document.getElementsByClassName("funk_meter_bar");
  if (Math.abs(fmbw_overflow)<2 && (fmb_list.length != 1)/* &&
    (parseFloat(element.style.width) < 2)*/
    &&((delta<0&&!update_funk_meter_bar.negative)||(delta>0&&update_funk_meter_bar.negative))) {
    //console.log("remove");
    element.parentNode.removeChild(element);
    return;
  }
  if (Math.abs(fmbw_overflow)<2 && (global_cycle_amount != 0)) {
    //console.log("spawn");
    spawn_funk_meter_bar(element);
    return;
  }
  element.style.width = ((fmbw_overflow) + "px");
}
function update_cycle_amount_press(event) {
  if (event.type == "mousedown" || event.type == "touchstart")
    global_update_cycle_amount_press_handle = setInterval(update_cycle_amount, (1000 / 20), null, this);
  else if (event.type == "mouseup" || event.type == "touchend")
    clearInterval(global_update_cycle_amount_press_handle);
}
function spawn_funk_meter_bar(element) {
  var nu_div = `<div class="funk_meter_bar" id="fmb_num_${fmb_list.length}" style="margin: 4px 0px; width: 0px; background-color: ${element.style.backgroundColor};"></div>`;
  funk_meter_box_bravo.insertAdjacentHTML("beforeend", nu_div);
}

/*
    GIGA FUNK
*/
var funk_more = document.getElementById("funk_more");
var funk_less = document.getElementById("funk_less");
function giga_funk(which_funk, how_much) {
  var _which_funk = which_funk??funk_more;
  var _how_much = how_much??99;
  for(let i=0;i<_how_much;i++)
    _which_funk.dispatchEvent(new Event("mousedown"));
  return "hell yeah";
}
funk_more.addEventListener("contextmenu", (ev)=>ev.preventDefault());
funk_more.addEventListener("auxclick", ()=>giga_funk(funk_more));
funk_less.addEventListener("contextmenu", (ev)=>ev.preventDefault());
funk_less.addEventListener("auxclick", ()=>giga_funk(funk_less));

var jukebox_track_list = [
  "Adhesive Wombat - Chodge Darger.mp3",
  "Jellyfish Jam.mp3",
  "Linkin Park - Numb (80's Remix).mp3",
  "Maurizio De Jorio - Running in the 90's.mp3",
  "Mile High Club (JC2).mp3",
  "Noma - Brain Power.mp3",
  "\u307F\u304D\u3068P - 39\u307F\u3085\u30FC\u3058\u3063\u304F! feat. \u521D\u97F3\u30DF\u30AF.mp3",
];
var global_jukebox_track_list_position = 0;
var global_jukebox_volume_bar_units = 2;

var audio_player = document.getElementById("audio_player");
var jukebox_volume_element = document.getElementById("jukebox_volume_element");
var jukebox_current_track = document.getElementById("jukebox_current_track");
var singular_jukebox_divider = document.getElementById("singular_jukebox_divider");

jukebox_current_track.innerHTML = jukebox_track_list[0];
audio_player.src = "/resource/jukebox-tracks/" + jukebox_track_list[0];
audio_player.volume = 0.17;
jukebox_volume_element.addEventListener("touchstart", touch_start_coord, false);
jukebox_volume_element.addEventListener("touchmove", update_jukebox_volume, false);
jukebox_current_track.addEventListener("touchstart", touch_start_coord, false);
jukebox_current_track.addEventListener("touchmove", update_jukebox_volume, false);
singular_jukebox_divider.addEventListener("touchstart", touch_start_coord, false);
singular_jukebox_divider.addEventListener("touchmove", update_jukebox_volume, false);

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
  if (element === null || element.getAttribute("value") === ">") {
    ++global_jukebox_track_list_position;
    if (global_jukebox_track_list_position == jukebox_track_list.length)
      global_jukebox_track_list_position = 0;
  } else {
    --global_jukebox_track_list_position;
    if (global_jukebox_track_list_position < 0)
      global_jukebox_track_list_position = jukebox_track_list.length - 1;
  }
  jukebox_current_track.innerHTML = 
    jukebox_track_list[global_jukebox_track_list_position];
  audio_player.setAttribute("src", 
    "/resource/jukebox-tracks/" + jukebox_track_list[global_jukebox_track_list_position]);
  audio_player.load();
  if (audio_button.classList.contains("active"))
    audio_player.play();
  else
    audio_player.pause();
}
function update_jukebox_volume(event) {
  var new_volume = audio_player.volume;
  if (event.type === "wheel")
    new_volume += (event.deltaY < 0) ? 0.01 : -0.01;
  else {
    new_volume += 0.1 * (event.touches[0].pageX - touch_start[0]) / document.body.getBoundingClientRect().width;
  }
  if (new_volume < 0.0)
    new_volume = 0.0;
  else if (new_volume > 1.0)
    new_volume = 1.0;
  audio_player.volume = new_volume;
  jukebox_volume_bar.style.width = (audio_player.volume * 200)+"px";
}

/*
    SCROLLING
*/
var scrollable_meter_list = document.getElementsByClassName("scrollable_meter");
var sml_counter;
for (sml_counter = 0; sml_counter < scrollable_meter_list.length; ++sml_counter) {
  scrollable_meter_list[sml_counter].addEventListener("mouseover", stop_scrolling_y);
  scrollable_meter_list[sml_counter].addEventListener("mouseout", start_scrolling_y);
  scrollable_meter_list[sml_counter].addEventListener("wheel", check_can_scroll);
}
var full_doc_html = document.documentElement;
var can_scroll = true;
function stop_scrolling_y(event) {
  can_scroll = false;
  // full_doc_html.style.height = "100%";
  // full_doc_html.style.overflowY = "hidden";
}
function start_scrolling_y(event) {
  can_scroll = true;
  // full_doc_html.style.height = "auto";
  // full_doc_html.style.overflowY = "auto";
}
function check_can_scroll(ev) {
  if (!can_scroll)
    ev.preventDefault();
}

