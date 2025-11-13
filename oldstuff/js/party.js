// JUKEBOX
var jukebox_track_list = [
  "Adhesive Wombat - Chodge Darger.mp3",
  "Jellyfish Jam.mp3",
  "Linkin Park - Numb (80's Remix).mp3",
  "Maurizio De Jorio - Running in the 90's.mp3",
  "Mile High Club (JC2).mp3",
  "Noma - Brain Power.mp3",
  "\u307F\u304D\u3068P - 39\u307F\u3085\u30FC\u3058\u3063\u304F! feat. \u521D\u97F3\u30DF\u30AF.mp3",
];
var track_list_pos = 0;
jukebox_current_track.innerHTML = jukebox_track_list[0];
var audio_player = new Audio();
audio_player.src = "/resource/jukebox-tracks/" + jukebox_track_list[0];
audio_player.volume = 0.17;
jukebox_volume.addEventListener("input", ()=>audio_player.volume = jukebox_volume.valueAsNumber);
function jukebox_change_track(which_way) {
  if (which_way) {
    ++track_list_pos;
    if (track_list_pos == jukebox_track_list.length)
      track_list_pos = 0;
  } else {
    --track_list_pos;
    if (track_list_pos < 0)
      track_list_pos = jukebox_track_list.length - 1;
  }
  jukebox_current_track.innerHTML = jukebox_track_list[track_list_pos];
  audio_player.src = "/resource/jukebox-tracks/" + jukebox_track_list[track_list_pos];
  audio_player.load();
  if (audio_button.classList.contains("active"))
    audio_player.play();
  else
    audio_player.pause();
}
audio_player.addEventListener("ended", ()=>jukebox_change_track(1));
function toggle_audio() {
  audio_button.classList.toggle("active");
  if (audio_button.classList.contains("active")) {
    audio_button.innerText = "Get it outta here";
    audio_player.play();
  } else {
    audio_button.innerText = "Insert mixtape";
    audio_player.pause();
  }
}
audio_button.addEventListener("click", toggle_audio);
// FUNK
var good_colors = CSS.supports("background-color: oklch(1 0.4 0)");
if (good_colors) {
  var rainbow_rgb = (h) => `oklch(1 0.4 ${h/182})`;
} else {
  var rainbow_rgb = (h) => `hsl(${h/182} 100% 50%`;
}

