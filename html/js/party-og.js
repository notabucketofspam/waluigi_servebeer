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
      <span class="scrollable_meter offwhite_in_burgmenu" id="jukebox_current_track" onwheel="update_jukebox_volume(event)"></span>
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
    <div class="white_in_burgmenu" id="jukebox_loop_div">
      <input type="checkbox" id="jukebox_loop_input"/>
      <label for="jukebox_loop_input" id="loop_word">&#x2112;&#x2134;&#x2134;&wp;</label>
    </div>
    <div id="shuffle_or_nah" style="" class="white_in_burgmenu">
      <input type="checkbox" id="jukebox_shuffle"/>
      <label id="shuffle_label" for="jukebox_shuffle">&#x1F500;&#xFE0F;</label>
    </div>
    <select id="selch">
      <option value="0,0,classic_mode">Classic Jukebox (7)</option>
      <hr>
      <option value="0,204">BSC Prime Cuts (204)</option>
      <option value="0,22">Beats to Yeet By (22)</option>
      <option value="22,44">The Nippon Special (22)</option>
      <option value="44,53">33&frac13; RPM (9)</option>
      <option value="53,61">C++ (8)</option>
      <option value="61,74">Juh (13)</option>
      <option value="74,88">Gamer (14)</option>
      <option value="88,100">English (12)</option>
      <option value="100,111">Netburst (11)</option>
      <option value="111,129">Metals (18)</option>
      <option value="129,139">Normal Music (10)</option>
      <option value="139,149">Doot (10)</option>
      <option value="149,161">some stuff idk (12)</option>
      <option value="161,173">EVGA GTX 1080 FTW (12)</option>
      <option value="173,204">junk (31)</option>
      <hr>
      <option value="0,0,pro_playlist">pro playlist (70)</option>
    </select>
    <div class="white_in_burgmenu" id="change_album_message">Select<br/>playlist</div>
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
var current_filetype = ".mp3";

var audio_player = document.getElementById("audio_player");
var jukebox_volume_element = document.getElementById("jukebox_volume_element");
var jukebox_current_track = document.getElementById("jukebox_current_track");
var singular_jukebox_divider = document.getElementById("singular_jukebox_divider");
var selch = document.getElementById("selch");
var jukebox_loop_input = document.getElementById("jukebox_loop_input");
var another_jukebox_divider = document.getElementById("another_jukebox_divider");
var jukebox_shuffle = document.getElementById("jukebox_shuffle");

// jukebox_current_track.innerHTML = jukebox_track_list[0];
// audio_player.src = "/resource/jukebox-tracks/" + jukebox_track_list[0];
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
  if (jukebox_shuffle.checked){
    jukebox_track_index = rui(jukebox_track_list.length);
  } else
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
  audio_player["src"]= current_prefix + jukebox_track_list[jukebox_track_index] + current_filetype;
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
    new_volume += ((event.touches[0].pageX > touch_start[0])?1:-1)/600;
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
// var bsc_prime_cuts;
selch.addEventListener("change",selcho_onchange);
function selcho_onchange(ev) {
  jukebox_track_index = 0;
  sessionStorage["selch-index"] = ev.target.selectedIndex;
  selcho_playlist(ev.target.value);
}
function selcho_playlist(ev_target_value){
  var [starto, endo, nemo] = ev_target_value.split(",");
  nemo ??= "bsc_prime_cuts";
  jukebox_track_list = (album[nemo]).track_list.slice(starto, endo);  
  if(!jukebox_track_list.length){
    jukebox_track_list = album[nemo].track_list;
  }
  current_prefix = album[nemo].prefix;
  current_filetype = album[nemo].filetype;
  if (jukebox_shuffle.checked){
    jukebox_track_index = rui(jukebox_track_list.length);
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
jukebox_shuffle.addEventListener("change",ev=>{
  sessionStorage["shuffle"] = ev.target.checked|0;
});
function remember_me(){
  set_volobar(Number(sessionStorage.getItem("audio_player_volume")||0.15));
  jukebox_track_index = Number(sessionStorage.getItem("jukebox_track_index")||0);
  // bsc_prime_cuts = (await import("/resource/BSC_Prime_Cuts.json",{with:{type:"json"}})).default;
  var sid = Number(sessionStorage.getItem("selch-index")||0);
  selch[sid].selected = true;
  selcho_playlist(selch[sid].value);
  var do_loop = Number(sessionStorage.getItem("loop")||0);
  jukebox_loop_input.checked = Boolean(do_loop);
  set_audio_loop();
  var do_shuffle = Number(sessionStorage.getItem("shuffle")||0);
  jukebox_shuffle.checked = Boolean(do_shuffle);
}
setTimeout(remember_me,0);

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

/*
    ALBUM SELECT
*/
var album = {
  classic_mode:{
    prefix:"/resource/jukebox-tracks/",
    filetype:".mp3",
    track_list:["Adhesive Wombat - Chodge Darger","Jellyfish Jam","Linkin Park - Numb (80's Remix)","Maurizio De Jorio - Running in the 90's","Mile High Club (JC2)","Noma - Brain Power","\u307F\u304D\u3068P - 39\u307F\u3085\u30FC\u3058\u3063\u304F! feat. \u521D\u97F3\u30DF\u30AF"]
  },
  bsc_prime_cuts:{
    prefix:"https://idazntksvlmn.objectstorage.us-ashburn-1.oci.customer-oci.com/n/idazntksvlmn/b/waluigi_servebeer/o/jams/BSC%20Prime%20Cuts/",
    filetype:".mp3",
    track_list:["001 Adhesive Wombat - Chodge Darger","002 At Doom's Gate (DOOM E1M1, Eurobeat Remix)","003 Bag Raiders - Shooting Stars","004 Breakbot - Baby I'm Yours","005 Calling (TWEWY)","006 Daft Punk - Harder, Better, Faster, Stronger","007 Danny Baranowsky - Mausoleum Mash","008 Danny Baranowsky - Six Feet Thunder","009 Darude - Sandstorm","010 Dave Rodgers - Deja Vu","011 Duck Sauce - Barbra Streisand","012 Hybrid (TWEWY)","013 Kentaro Ishizaka - Waluigi Pinball (Super Smash Bros Brawl)","014 Linkin Park - Numb (80's Remix)","015 Maurizio De Jorio - Running in the 90's","016 Mystery Skulls - Freaking Out","017 Mystery Skulls - Ghost","018 NOMA - Brain Power","019 Satellite High - The Bus Is Late","020 Sunstroke Project and Olia Tira - Run Away (Moldova)","021 Toby Fox - Core (Undertale)","022 Waluigi Pinball (Eurobeat remix)","023 LamazeP - Triple Baka","024 MikitoP - 39 Music","025 Neon Genesis Evangelion Opening Theme","026 Ievan Polkka","027 LamazeP - Popipo","028 JAM Project - The Hero (One Punch Man Opening Theme)","029 Orangestar - Star Night Snow","030 Caramella - Caramelldansen","031 il vento d'oro (JoJo's Bizarre Adventure)","032 Fukkireta","033 ryo - World is Mine","034 UN Owen Was Her (Touhou)","035 Hachioji P - Kimagure Mercy","036 Akari Nanawo - Useless Angel","037 Someday (TWEWY)","038 DECO 27 - Ai","039 Bad Apple","040 Renai Circulation","041 emon(tes) - Dreamin Chuchu","042 Teto territory","043 Li-Sa-X - Little Wings","044 DECO 27 - HIBANA","045 Crush 40 - Escape From the City","046 Smash Mouth - All Star","047 Smash Mouth - Hot","048 Smash Mouth - Walkin' On The Sun","049 Ween - Ocean Man","050 DMX - X Gon Give It To Ya","051 Eminem - Lose Yourself (Uncensored)","052 NWA - Fuck Tha Police","053 NWA - Straight Outta Compton","054 At Doom's Gate (DOOM E1M1, Mick Gordon 2016)","055 Karl Flodin - Crystal Mines (Clustertruck)","056 Linus - SYS64738 DAYS","057 MASTER BOOT RECORD - AUTOEXEC_BAT","058 MASTER BOOT RECORD - FILES=666","059 MASTER BOOT RECORD - IRQ 10 3DFX","060 Mick Gordon - Rip and Tear (DOOM 2016)","061 RushJet1 - Serris (Metroid Fusion, synth remix)","062 a-ha - Take On Me","063 David Hasselhoff - True Survivor","064 Dead Or Alive - You Spin Me Round","065 Erasure - Chains of Love","066 Marvin Gaye and Tammi Terrell - Ain't No Mountain High Enough","067 Queen - Don't Stop Me Now","068 Rick Astley - Never Gonna Give You Up","069 Talking Heads - Once in a Lifetime","070 Midnight Oil - Run By Night","071 Yes - Roundabout","072 Men at Work - Land Down Under","073 Hawaii Five-O Theme","074 Herbie Hancock - Chameleon","075 dj-Jo - Gourmet Race","076 Snoop Dogg - Smoke Weed Everyday (dubstep remix)","077 Coconut Mall (MKW)","078 Creative Exercise (Mario Paint)","079 LiterallyNoOne - Megalovania but it's in 6-8 Time","080 Kelly Bailey - Apprehension and Evasion (Half-Life 2)","081 Soviet Connections (Grand Theft Auto 4)","082 Jerry Martin and Marc Russo - The Sims Buy Mode 1","083 Kevin DeYoe - The Mall (Zombie Estate 2)","084 Shopping Theme (Little Inferno)","085 Wii Shop Channel","086 Pizza Theme (Spider-Man 2 The Game)","087 Vargskelethor - Beef Zone","088 Vargskelethor - Glass of Milk","089 Chum Drum Bedlum","090 Daler Mehndi - Tunak Tunak Tun","091 Dio - Aye (ft Sef)","092 Japanese Beach (Nintendo DS)","093 Lindsey Stirling and Peter Hollens - The Dovahkiin (TESV)","094 Luis Fonsi - Despacito","095 O-Zone - Dragostea Din Tei (Numa Numa)","096 Super Smash Bros Brawl Main Theme","097 The Red Army Choir - National Anthem Of USSR","098 Theophany - Gravity","099 BTS - ON","100 Quad City DJ's - Space Jam","101 LiterallyNoOne - Golden Sins","102 Big Blue (SSBM)","103 Final Destination (Smash 64)","104 Meta Crystal (Smash 64)","105 At Doom's Gate (DOOM E1M1, 1993)","106 Duke Nukem 3D Main Theme","107 Fearofdark - Rolling Down The Street, In My Katamari","108 Guile's Theme (SF2)","109 Kitsune2 - Rainbow Tylenol","110 Naruto - Artificial Intelligence Bomb","111 Toby Fox - Megalovania","112 Animals As Leaders - Tempting Time","113 At Doom's Gate (DOOM E1M1, RichaadEB and ToxicxEternity)","114 Blotted Science - Narcolepsy","115 Cloudkicker - We're goin' in, We're going down","116 Electrocution 250 - Brainscraper","117 Ghost BC - Miasma","118 Haunted Shores - Harrison Fjord","119 Intervals - Belvedere","120 Intervals - Mata Hari","121 Intervals - Slight of Hand","122 Jason Kui - Polarized","123 Liminal - One's Glow","124 Obscura - Orbital Elements","125 Pomegranate Tiger - Boundless","126 Russian Circles - Arluck","127 Scale The Summit - Atlas Novus","128 TOOL - Triad","129 Vildhjarta - Phobon Nika","130 Seinfeld main theme","131 Biggie Smalls - Come On (ft Thomas the Tank Engine)","132 BotanicSage - Baby Got Cornered","133 BotanicSage - Let It Go, Waluigi","134 RosalinaSama - Skeet Skeet Canyon","135 Shoopfex - Soulja Baka","136 Smash Mouth - All Star (negative harmony remix)","137 Tokyo Megaplex - How Low Can You Smash Bro","138 We Are Number One (LazyTown - The Video Game)","139 Horses in Your Wifi","140 At Doom's Gate (DOOM E1M1, Doot edition)","141 Dream Land 64","142 insaneintherainmusic - Big Blue","143 insaneintherainmusic - Green Hill Zone","144 John Coltrane - Mr P C","145 Laurie Johnson - Happy Go Lively","146 Luigi Raceway (MK64)","147 Monsters Inc theme","148 Pepsi Man Theme","149 Tank (Cowboy Bebop)","150 At Doom's Gate (DOOM E1M1, synthwave cover)","151 Cage The Elephant - Ain't No Rest for the Wicked","152 Drill Queen - Born Depressed","153 Jim's Big Ego - Stress","154 Last Surprise (Persona 5)","155 Lemon Demon - Modify","156 The Heavy - Short Change Hero","157 JEDDI - Heartbeat (Cool Dudes Edition)","158 Mujo - Tokyo Strip Club","159 Minako Hamano and Akira Fujiwara - Underwater Depths (Metroid Fusion)","160 Chon - Pitch Dark","161 Zoo Strategies - Am I Just a Bunch of Particles That Thinks it's a Bunch of Particles","162 Alect Squadron (ACX)","163 At Doom's Gate (DOOM E1M1, guitar cover)","164 Big Blue (F-Zero, remix)","165 Breaking Benjamin - Blow Me Away (Instrumental Version)","166 Fire Youngman (AC2)","167 Golden Forest (1080 Snowboarding)","168 Incubus - Follow (Instrumental)","169 Ken's Theme (Street Fighter V)","170 Mute City (Super Smash Bros Melee)","171 Tetsukazu Nakanishi - Comona","172 Shreddin' (Halo CE)","173 Splattack (guitar cover)","174 I'm so fresh you can suck my nuts","175 Alpharad - Science Museum","176 Castle Crashers Main Theme","177 Gorillaz - Feel Good Inc","178 Lemon Demon - The Ultimate Showdown of Ultimate Destiny","179 Heyeyeyey (the original)","180 Bailey Simone - Crunk Channel","181 DragonForce - Through The Fire And Flames","182 John Cena - The Time is Now","183 Franz Richter - In The Hall Of The Mountain King","184 F O O D C O U R T 97- S H O W C A S E 97","185 Gentle Breeze (Trauma Center 2)","186 John Williams - Cantina Band","187 Lemon Demon - Knife Fight","188 Los Dos Laredos Acordeones","189 Martin O'Donnell and Michael Salvatori - Halo CE Main Theme","190 Martin O'Donnell and Michael Salvatori - Halo Reach Overture","191 More Gun (TF2)","192 Adventure Line (The Stanley Parable)","193 Murray Head - One Night In Bangkok","194 Route 225 (DPP 80's remix)","195 The Pelones - Lancer's Theme","196 Todd Snider - Beer Run","197 Weird Al Yankovic - Hardware Store","198 Turret Wife Serenade (Portal 2)","199 Windows XP Installation Music","200 Saint Seduce - 3 AM","201 Namco Sounds - Schizophrenic","202 Parov Stelar - Chambermaid Swing","203 Zame - Sinnoh Underground (Remastered)","204 Red Vox - Scoot The Burbs"]
  },
  pro_playlist:{
    prefix:"https://idazntksvlmn.objectstorage.us-ashburn-1.oci.customer-oci.com/n/idazntksvlmn/b/waluigi_servebeer/o/jams/pro%20playlist/",
    filetype:".ogg",
    track_list:["300 This is Sparta","AllStar","AMERICA","Ants In My Eyes Johnson","Bag Raiders - Shooting Stars","Barbra Streisand","Batman Theme Song Trap Remix","Big Bill Hell_s","Biggie Smalls feat. Thomas the Tank Engine","Chum Drum Bedrum","cooking by the book remix  ft lil jon","Daler Mehndi - Tunak Tunak Tun","Darude - Sandstorm","DK Rap","DOOMfeld","dreamland","Eminem - Mom_s Spaghetti","Epic Sax Guy","Everybody_s Circulation","Fresh Prince of Bel Air (Trap Remix)","Golden Forest (1080 Snowboarding)","Halo CE - Shreddin","Happy-Go-Lively","Hechizeros Band - El Sonidito","Heyeyeyey the original","hoth_sunday","Initial D - Deja Vu","Jean Jacques Perrey - Brazilian Flower","John Cena_s 2014 Theme Song - The Time is Now (You Can_t See Me)","Kazoo Kid - Trap Remix","Ken_s Theme","Keyboard Cat","Knuckles from K-.-N-.-U-.-C-.-K-.-L-.-E-.-S. _ Knuckles [Full Version _ Knuckles]","Lil_ Bits","Mesothelioma","MitchiriNeko March","Mute City","National Anthem of USSR","Numa Numa","Nyan Cat","Ocean Man","Pepsi Man","Pokemon - Double Trouble","Quad City DJ_s - Space Jam","RASPUTIN","Ravioli Remix","real fake doors","Rick Astley - Never Gonna Give You Up","Running in the 90_s","Science Museum","Skeet Skeet Canyon","Smash Mouth - Hot","Smoke weed every day","SPLATTACK","Spongebob - Jellyfish Jam (Bass Boosted)","Spongebob Trap Remix","Super Spice Bros 2","The Trashmen - Surfin Bird - Bird Is The Word","Thomas Gon_ Give It To Ya","Troll Song","Turbulent Juice","Two Brothers","Uptown Puffs","Uziko Kolo","Waluigi Pinball","warthog song","We Are Number One - LazyTown- The Video Game","Wii Shop Channel","Yee","You reposted in the wrong neighborhood"]
  }
}

