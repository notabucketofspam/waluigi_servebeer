var auxcord = new AudioContext();
var gainode = new GainNode(auxcord, {gain:0.2});
gainode.connect(auxcord.destination);
var soundbuffers = new Map();
var clockbot = document.getElementById("clockbot");
var channel_id = document.getElementById("channel_id");

var whoishost = window.location.hostname==="localhost"?"http://localhost:39692":"http://clockbot.waluigi-servebeer.com";

async function gimmefile(fname){
  var far = await fetch(`/page/soundboard/${fname}.mp3`);
  var bar = await far.arrayBuffer();
  var dar = await auxcord.decodeAudioData(bar);
  soundbuffers.set(fname, dar);
  return dar;
}

var postfetch = abode => fetch(`${whoishost}/?q=${channel_id.value}`, {
  method: "POST",
  headers: {
    "Content-Type": "text/plain"
  },
  mode: "no-cors",
  body: abode
});

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
function make_group(dad, someboard){
  var somebuttons = someboard.sound.map(s=>`<button onclick="beep('${someboard.name}/${s}')">${s}</button>`);
  dad.insertAdjacentHTML('beforeend', `<div id="group_${someboard.name}"><h2>${someboard.name}</h2>${somebuttons.join('')}</div>`);
}

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
/*
    SOUNDBOARDS    SOUNDBOARDS    SOUNDBOARDS    SOUNDBOARDS    SOUNDBOARDS    SOUNDBOARDS    SOUNDBOARDS    SOUNDBOARDS
*/
var board = {
  adventures:{
    name: "Adventures",
    sound:["Ah god","Alright","Alright 2","Be humane","Booty","Dammit you said something geoffrey","Dammit","Evaporated milk","Fire","Get it","Get that","Hes comin in","Hey","I got some good eats right here","I love me some fish","Is this thing on","Its from your homeboy","Juicy juicy","Kill it","Man","Mmmh","Monkey","Nasty","Oh god","Oh jesus","Oh man","Oh man 2","Oh my god","Oh sweet jesus","Oh thank god","Oh","Ok","Outside","Screaming","Some juicy juicy fish","Swiggity swoogity","Thomas Jefferson","The unintelligible noise he makes after saying Thomas Jefferson","Tomas","Twenty three degrees","Twenty three","Whats that buzzin noise","Whered the milk go","Who is that","Whos in here","Ya hungry"]
  },
  pizza:{
    name:"Pizza",
    sound:["Alright","Alright 2","Alright that looks pretty good","Awesome","Awesome 2","Basils","Beautiful visage","Beautiful","Beep beep","Champ","Enjoy that","Fabulous","Fantastic","Garlic powder","God","Goddammit","Good job","Good","I said it looks good","I said that looks pretty good","Im so sorry","Its totally legit","Look at that","Look at that 2","Look at that 3","Now","Oh I was gonna go crazy","Oh man","Oh man 2","Oh man thats hot","Onion powder","Open the box","Prime cut","Real good","Seven fourteen degrees","Socrates","Socrates 2","Socrates 3","Spices","Thank you","Thats good","Thats pipin hot","Thyme","Unravel the plastic","Voluptuous","Wow","You got it","You know what Im sayin","Yup yup good alright"]
  },
  misc:{
    name:"Misc",
    sound:["Food Time","insult","1149_hmscream","Wilhelm 4","Taunt1_shammy","alottadamage","doublekill","triplekill","killtacular","killingspree","runningriot","old stuff","KAYOClutch2","KAYOEnemyKAYOKill","KAYORoundWon4","Microsoft Windows XP Startup","Microsoft Windows XP Shutdown","dial-up modem","youveGotmail","Navi Hey Listen","PUT IT IN","noot"]
  }
};

