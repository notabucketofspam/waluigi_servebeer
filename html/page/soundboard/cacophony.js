var auxcord = new AudioContext();
var gainode = new GainNode(auxcord, {gain:0.2});
gainode.connect(auxcord.destination);
var soundbuffers = new Map();

var clockbot = document.getElementById("clockbot_enable");
var channel_id = document.getElementById("channel_id");
var love_zone = document.getElementById("love_zone");

var whoishost = window.location.hostname==="localhost"?"http://localhost:39692":"https://clockbot.waluigi-servebeer.com";

async function gimmefile(fname){
  var far = await fetch(`/page/soundboard/${fname}.mp3`);
  var bar = await far.arrayBuffer();
  var dar = await auxcord.decodeAudioData(bar);
  soundbuffers.set(fname, dar);
  return dar;
}

var postfetch = abode => fetch(`${whoishost}/cmd?q=${channel_id.value}`, {
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

var lovelist = JSON.parse(whichStorage.getItem('soundboard_lovelist'))??[];
var insert_love = fname => `<button id="love_${fname}" onclick="beep('${fname}')" oncontextmenu="event.preventDefault()||love('${fname}')">${fname.split('/')[1]}</button>`;
function love(fname){
  let fav = document.getElementById(`love_${fname}`);
  if (fav){
    fav.remove();
    lovelist.splice(lovelist.indexOf(fname), 1);
  } else {    
    love_zone.insertAdjacentHTML('beforeend',insert_love(fname));
    lovelist.push(fname);
  }
 whichStorage.setItem("soundboard_lovelist", JSON.stringify(lovelist));
}
function write_lovelist(){
  var somelove = lovelist.map(insert_love);
  love_zone.insertAdjacentHTML('beforeend', somelove.join(''));
}

function make_group(dad, someboard){
  var somebuttons = someboard.sound.map(s=>`<button onclick="beep('${someboard.name}/${s}')" oncontextmenu="event.preventDefault()||love('${someboard.name}/${s}')">${s}</button>`);
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
    sound:["Food Time","insult","1149_hmscream","Wilhelm 4","Taunt1_shammy","alottadamage","doublekill","triplekill","killtacular","killingspree","runningriot","old stuff","KAYOClutch2","KAYOEnemyKAYOKill","KAYORoundWon4","Microsoft Windows XP Startup","Microsoft Windows XP Shutdown","dial-up modem","youveGotmail","Navi Hey Listen","PUT IT IN","noot","wtf is a kilometer","metal pipes","but i like this","buy everything","buy something","does that make any sense","even crysis","geforce gamer","no geforce gamer","fuck off for even saying that","alotta big words","idgaf","Smash Mouth - Hot","prunejuice","deepfried","Id make that deal","DAMN GOOD DEAL","gimme dat","I shoulda got that","Im gonna eat the whole thing","Im jokin 1","Im jokin 2","that looks really good","Come On","Falcon","Punch","Scout_no01","Show me your moves"]
  },
  doubletrouble:{
    name:"DoubleTrouble",
    sound:["big trouble","capture pikachu 1","capture pikachu 2","couldnt screw this up Jesse","creators of a grand design","do unto others","even we couldnt screw this one up","for mayhem and madness Full","here they come","ill be the joker of crime","ill be the king","ill be the queen","im always the man","im so gorgeous","Jesse laugh 1","Jesse team rockets rockin","laugh 1","laugh 2","laugh 3","make it double 1","make it double 2","no one can deny it","oooh a riot","Pokemon - Double Trouble (Full Version)","prepare for trouble 1","prepare for trouble 2","stop yappin Full","Team Rocket Slogan Full","team rockets blasting off again","this is our most ingenious plan","this is the boss","truth can be deceiving","walking trouble 1","walking trouble 2","we can cause a riot Full","we fight for whats wrong","well be the richest rogues of all time","well have you believe it","were always gonna try it","were team rocket Full","would you two stop yappin","youre just the players"]
  },
  turkey:{
    name:"Turkey",
    sound:["A cookizza right in the well","alotta calories","Alright","and remember thats turkey","Are you finally gonna feed me","But its gonna be really hot","Cathy Cathy Cathy","Come on down here","cookizza noises","crab stuffed chocolate cake","Ding laugh track","eight oclock","Excellent","Finally dessert","g r e a s y","Get that guy outta there","Have you been holding something back from me like dessert","I call it a cookizza","I have no idea what this is","I wanna show you how much grease already got on that steak","I would indeed","I would put your dad right in the machine","Ill be careful","Im gonna jump in and eat it","is that good","is","Its gonna be really hot","Its kinda a giant cookie pizza","Joe Cathy Joe Cathy","Joe Mmmmm","Joe noises 1","Joe noises 2","Joe noises 3","Joe this is uh","Jump in and eat it","Listen to that crunch","Look at that 2","look at that","look what weve done","mmm nope","More toppings","Nice big special mushrooms","not your grand mothers coconuts","now you have two hundred percent more cooking area","Now youre gonna put a steak in this","o h h h h h turkey","ohhhhh","Okey","p i z z a","Pizza Pizza Pizza","pop 1","pop 2","pop 3","pop 4","put whatever toppings you like","r i i i g h t","ready for that challenge","right in the machine","simple step by step instructions","so greasy","so I just set it for two hundred minutes","so its almost yknow steak","special low cal oatmeal chocolate chip turkey","thats kinda cheating","The crunch","this I gotta try","This is the mini uh","this is turkey","w o w","Wait a minute","Well I have some very special party stuff","Well I have some very special turkey","Were gonna solve the mystery","When you get home from work","yeah but its worth it","yknow Cathy this is absolutely remarkable but","You said youd put this steak up against grandma farrago"]
  }
};

