var auxcord = new AudioContext();
var gainode = new GainNode(auxcord, {gain:0.2});
gainode.connect(auxcord.destination);
var soundbuffers = new Map();

var clockbot = document.getElementById("clockbot_enable");
var channel_id = document.getElementById("channel_id");
var love_children = document.getElementById("love_children");

async function gimmefile(fname){
  var far = await fetch(`/page/soundboard/opodes/${fname}.opus`);
  var bar = await far.arrayBuffer();
  var dar = await auxcord.decodeAudioData(bar);
  soundbuffers.set(fname, dar);
  return dar;
}

var postfetch = abode => window.fetch(`${window.origin}/cmd?q=${channel_id.value}&f=${window.encodeURIComponent(abode)}`,{
  headers: {
    "Content-Type": "text/plain"
  },
  cache:"no-store"
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
    love_children.insertAdjacentHTML('beforeend',insert_love(fname));
    lovelist.push(fname);
  }
  document.getElementById(fname)?.classList.toggle("loved");
  whichStorage.setItem("soundboard_lovelist", JSON.stringify(lovelist));
}
function write_lovelist(){
  var somelove = lovelist.map(fname=>{
    document.getElementById(fname)?.classList.add("loved");
    return insert_love(fname);
  });
  love_children.insertAdjacentHTML('beforeend', somelove.join(''));
}

function reset_love(){
  document.getElementById('love_children').replaceChildren();
  document.querySelectorAll('button.loved').forEach(kid=>kid.classList.remove('loved'));
}

function make_group(dad, someboard){
  var somebuttons = someboard.sound.map(s=>`<button id="${someboard.name}/${s}" onclick="beep('${someboard.name}/${s}')" oncontextmenu="event.preventDefault()||love('${someboard.name}/${s}')">${s}</button>`);
  dad.insertAdjacentHTML('beforeend',`
<details id="group_${someboard.name}" class="sb">
  <summary><h2>${someboard.name}</h2></summary>
  <div class="sounds">${somebuttons.join('')}</div>
</details>
`);
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

/*
    SOUNDBOARDS    SOUNDBOARDS    SOUNDBOARDS    SOUNDBOARDS    SOUNDBOARDS    SOUNDBOARDS    SOUNDBOARDS    SOUNDBOARDS
*/
var board = [
  {name:"Turkey",sound:["nope","A cookizza right in the well","alotta calories","Alright","and remember thats turkey","Are you finally gonna feed me","But its gonna be really hot","Cathy Cathy Cathy","Come on down here","cookizza noises","crab stuffed chocolate cake","Ding laugh track","eight oclock","Excellent","Finally dessert","g r e a s y","Get that guy outta there","Have you been holding something back from me like dessert","I call it a cookizza","I have no idea what this is","I wanna show you how much grease already got on that steak","I would indeed","I would put your dad right in the machine","Ill be careful","Im gonna jump in and eat it","is that good","is","Its gonna be really hot","Its kinda a giant cookie pizza","Joe Cathy Joe Cathy","Joe Mmmmm","Joe noises 1","Joe noises 2","Joe noises 3","Joe this is uh","Jump in and eat it","Listen to that crunch","Look at that 2","look at that","look what weve done","mmm nope","More toppings","Nice big special mushrooms","not your grand mothers coconuts","now you have two hundred percent more cooking area","Now youre gonna put a steak in this","o h h h h h turkey","ohhhhh","Okey","p i z z a","Pizza Pizza Pizza","pop 1","pop 2","pop 3","pop 4","put whatever toppings you like","r i i i g h t","ready for that challenge","right in the machine","simple step by step instructions","so greasy","so I just set it for two hundred minutes","so its almost yknow steak","special low cal oatmeal chocolate chip turkey","thats kinda cheating","The crunch","this I gotta try","This is the mini uh","this is turkey","w o w","Wait a minute","Well I have some very special party stuff","Well I have some very special turkey","Were gonna solve the mystery","When you get home from work","yeah but its worth it","yknow Cathy this is absolutely remarkable but","You said youd put this steak up against grandma farrago"]},
  {"name":"SoupOrSmash","sound":["23 clear movies","about the clones","Amiibo yeah","and you wont be able to play online","Battles","clones","come on now the wii u","dx12","eight player smash can be played by up to four players","get help","Go and take a shower","Huzzah","I dont think this is a game for gamers","I hope youre excited for TF2","I think this is a game for posers","im tryna say","Judgment","man noises","maybe if the game is like warioware","Nin-Tendy S","Nintendo Gamecube Controller","not even special","not my clear movies","Offensive","OK","Once an amiibo figure has been scanned","PLAY AT ONCE","Please stay tuned","smash brothers for wii u is a board game","sus","the Controller","the fighting party game","The most interesting thing you can do with the game pad","the nintendo wii u classic gamecube controller remote pad chuck plus pro","the Nun","the piece of junk","the probability of multiplayer","the Wii U has frozen again","the Wii U Pro Controller Pro","We are introducing a different mode","we are introducing sick mode","will never be released in north america ever","You can also help them grow by feeding them PF Changs","you know what im tryna say","real life","Yup","you wont have to worry about going over to a friends house","youll notice that the moveset of each fighter is the same as kirby"]},
  {"name":"SoupStore","sound":["alright well hurry up and come over here","alright you dont have to shout at me","beep hello","footsteps","go into the next aisle","hey whats up","i cant find em theres only soup","i cant find em","i cant im buying clothes","i mean im at soup","i need your help can you come here","im at soup","im at the soup store","it means theres only soup","theres just more soup","theres more soup","theres still soup","well then get outta the soup aisle","whaddaya mean theres more soup","whaddaya mean youre at soup","what do you mean theres only soup","what do you mean you cant find em","what store are you in","where are you right now","why are you buying clothes at the soup store"]},
  {"name":"Skooks","sound":["whats the plan","okay lets go","lets plot a course","I got a hunch","fuck you","jinkies","watch me swooce right in","how do we see nude movies","I dont like it","I like it","I wonder where this","am I glad hes frozen in there","boy was that good","isnt there anything more to eat","Ill take it","come inside","go to the church","it belongs to me and you cant have it","and theres no way out","theres only one way out","were free","oh no","come on gtfo","we have work to do","dont worry","maybe I would","and now back to Hulk Hogans Rock n Wrestling","I think wed better think of something","I dont fuckin care","I think its the Three Stooges","fuck you 2","I saw a cave","you kids check out that cave","Shhhhh","its that feeble minded jackass","alright thats cool","ah Batman","Batmilk and cookies for everyone","Jinkies this is a big one","what happened to the frat house","well get to the bottom of it by staying on top of it","was there really milk","no","amazing Batman","absolutely mind boggling","shut up","cmon were gonna switch","you mean like youd rather do it the other way around","sure man","okay","well never catch him","we cant do anything more here","weve got to bring our friends back","Ill have a double order of onion rings","bitch"]},
  {name: "Adventures",sound:["Ah god","Alright","Alright 2","Be humane","Booty","Dammit you said something geoffrey","Dammit","Evaporated milk","Fire","Get it","Get that","Hes comin in","Hey","I got some good eats right here","I love me some fish","Is this thing on","Its from your homeboy","Juicy juicy","Kill it","Man","Mmmh","Monkey","Nasty","Oh god","Oh jesus","Oh man","Oh man 2","Oh my god","Oh sweet jesus","Oh thank god","Oh","Ok","Outside","Screaming","Some juicy juicy fish","Swiggity swoogity","Thomas Jefferson","The unintelligible noise he makes after saying Thomas Jefferson","Tomas","Twenty three degrees","Twenty three","Whats that buzzin noise","Whered the milk go","Who is that","Whos in here","Ya hungry","even the monkey","everybodys happy on set","get a tissue on set","if you ever wanna see","im going to kill her now","just get a tissue","nerf gun","oh man 3","oh shit am i supposed to say something","ohfu","on my mark men","or she gets it","she gets it ya hear","sobbing","thats a nasty right there","the captain has been shot","then you betcha getcha booty over here","under the sea","whered the fan go","ya hear punk","ya hear","you get back here","you have waited too long this time","your true main again"]},
  {name:"Pizza",sound:["Alright","Alright 2","Alright that looks pretty good","Awesome","Awesome 2","Basils","Beautiful visage","Beautiful","Beep beep","Champ","Enjoy that","Fabulous","Fantastic","Garlic powder","God","Goddammit","Good job","Good","I said it looks good","I said that looks pretty good","Im so sorry","Its totally legit","Look at that","Look at that 2","Look at that 3","Now","Oh I was gonna go crazy","Oh man","Oh man 2","Oh man thats hot","Onion powder","Open the box","Prime cut","Real good","Seven fourteen degrees","Socrates","Socrates 2","Socrates 3","Spices","Thank you","Thats good","Thats pipin hot","Thyme","Unravel the plastic","Voluptuous","Wow","You got it","You know what Im sayin","Yup yup good alright","step one","for makin some pizza with fan","with fan","making sure","the beautiful visage of the pizza","and thats how you get it done right there","yeah right in there","now we have to get it on that tray","waow","look at this","beautifully cut in half","totally with the fan","always make sure to sharpen your fan before usage","no giggles on set please","this is purely original","oh god","we must cut the pizza in half for size","an ineffective blade","alright thank you very much","and now we can get it on that tray","for the purposes of this video","were gonna have to use one half at a time","we have a nice lineup of spices","not cannabis","yup and those are our spices right","and were gonna go each one at a time","yup right there yup alright","oh man its preheated alright","you just put it in the oven","be careful now","you can always blow it off","there ya go","ya closed the oven","look at how effective that was","dont you agree","that pizzas bakin real good","it stopped beeping","why is the beepin goin","somebody turn off that beeping","ah yeah cool that off","close the oven like a champ","we just have to wait a little bit","Im glad that beeping stopped","m mm m","m mm","toasty","thats some prime cut right there","bris","m mm 2","you can just pick it up","with your fan of course","mm","yeah there ya go","mm 2","wait a second","is that who i think it is","howd you get in this video","there","thats the clean plate","metal fork","and anything else to enhance your dining experience","ok","fan on fork action","yup looks good"]},
  {name:"Misc",sound:["Food Time","insult","1149_hmscream","Wilhelm 4","Taunt1_shammy","alottadamage","doublekill","triplekill","killtacular","killingspree","runningriot","old stuff","KAYOClutch2","KAYOEnemyKAYOKill","KAYORoundWon4","Microsoft Windows XP Startup","Microsoft Windows XP Shutdown","dial-up modem","youveGotmail","Navi Hey Listen","PUT IT IN","noot","wtf is a kilometer","metal pipes","but i like this","buy everything","buy something","does that make any sense","even crysis","geforce gamer","no geforce gamer","fuck off for even saying that","alotta big words","idgaf","Smash Mouth - Hot","prunejuice","deepfried","Id make that deal","DAMN GOOD DEAL","gimme dat","I shoulda got that","Im gonna eat the whole thing","Im jokin 1","Im jokin 2","that looks really good","Come On","Falcon","Punch","Show me your moves","Scout_no01","Grab His Dick and Twist It","Twist that dick","twist his dick","the old dick twist","hes in there and were out here","swooce","minecraft oof","get me a drink bartender","drink whoosh","broken glass","BFB","bottom gear long","welcome to bottom gear mates","today on bottom gear","oi luv","Im a cat Waltuh","you need to feed me Waltuh","I want lasagna Waltuh","meow meow","I hate mondays","meow meow 2","let me speak to the people","let me speak","they need to hear this","thirty","Im not a big fan of the government","not a big fan","fuck the government","thirty 2","Im never payin my taxes","money aint real","wheres that diamond tester","Im not saying 21 or 30 anymore","say something else then","Im smokin opps from the Honda Civic","Lego Yoda death","Large Ceramic Pot Break","I hope youre hungry for nothing","someone cooked here","hey I just had an interesting thought"]},
  {name:"DoubleTrouble",sound:["big trouble","capture pikachu 1","capture pikachu 2","couldnt screw this up Jesse","creators of a grand design","do unto others","even we couldnt screw this one up","for mayhem and madness Full","here they come","ill be the joker of crime","ill be the king","ill be the queen","im always the man","im so gorgeous","Jesse laugh 1","Jesse team rockets rockin","laugh 1","laugh 2","laugh 3","make it double 1","make it double 2","no one can deny it","oooh a riot","Pokemon - Double Trouble (Full Version)","prepare for trouble 1","prepare for trouble 2","stop yappin Full","Team Rocket Slogan Full","team rockets blasting off again","this is our most ingenious plan","this is the boss","truth can be deceiving","walking trouble 1","walking trouble 2","we can cause a riot Full","we fight for whats wrong","well be the richest rogues of all time","well have you believe it","were always gonna try it","were team rocket Full","would you two stop yappin","youre just the players"]},
  {"name":"CaptainFalcon","sound":["captain00","captain01","captain02","captain03","captain04","captain05","captain06","captain07","captain08","captain09","captain0a","captain0b","captain0c","captain0d","captain0e","captain0f","captain10","captain11","captain12","captain13","captain14","captain15","captain16","captain17","captain18","captain19","captain1a","captain1b"]},
  {"name":"BigBillHellsCars","sound":["fuck you Baltimore","if youre dumb enough to buy a new car this weekend","youre a big enough schmuck to come to big bill hells cars","bad deals","cars that break down","thieves","if you think youre gonna find a bargain at big bill","you can kiss my ass","its our belief","youll fall for this bullshit","if you find a better deal","bring your trade","well fuck her","thats right","well fuck your wife","because at big bill hell","youre fucked six ways from sunday","take a hike","to big bill hell","home of challenge pissing","how does it work","he explains how challenge pissing works","dont wait","only at big bill hell","the only dealer","hurry up asshole","this event is the minute after you write us a check","and it better not bounce","go to hell","big bill hells cars","Baltimores filthiest","guaranteed","outro"]},
  {"name":"Gazorpazorpfield","sound":["moan","I hate mondays","and I really could go for some enchiladas","hey Jon","its me Gazorpazorpfield","boy fuck you","fuckin dumb stupid idiot","go easy on me","dumb stupid","weak pathetic","uh ummm","milk toast","piece of human garbage","jeez","youre pretty mean to me but that takes the cake","I dont give a fuck","Im Gazorpazorp fucking field bitch","now gimme my fucking enchiladas","cmon"]},
  {"name":"GordonMahUng","sound":["driving the bus","thirty kilos","algorithm this","its all a scam anyway","the Apple commercial","its just embarrassing","this fucking asshole","a few back of the envelope calculations","Battlestar Galactica","Ive been here for like eight years","biggest fucking secret in the world","Blade Runner industrial complex","blah","but cmon","I cant eat those damn bagels anymore","chicken sounds","a common problem we have with PR people","clicked on what","this is collaboration","Darth Vader is gripping your ass","I didnt even know he died","not gonna eat this bagel","are you sure","eight year old blogger","every fucking day","ewoks","fucking yuppies man","fuck that","fuck you bad drivers","fuck you Steve Jobs","fuck you Vista","generally fuck you","some goddamn latte-sipping Mac user","the green light","holy shit","some dumbass riding a Segway","I do not give a shit","I dont get shit","its my fucking turn","Ive got news for you","Jesus Christ","Jesus Fucking Christ","Michael Landon","mom on the internet","nickel and dime you","get the fuck outta my way","thats not very angry is it","not washing your hands","oh I still love Apple","this pisses me off","outhouse exchange doesnt matter","Outlook is so bad","the people who go to ebay","what pisses me off","really theyre just assholes","say Steve Jobs is The Devil","Segway across the country","Sim Fucking City","slimy looking bastard","I dont know what theyre smoking over there","I shit you not","some son of a bitch in this office","South San Francisco","are you still a loyal Apple fan","termination","total fucking bullshit","that kid is crushed","and that makes no fucking sense","well thats impossible","theres this thing called the internet","those people are just assholes","those people should be fuckin put to death","email client","Vista being a terrible OS","another thing that really pisses me off","Wesley Crusher","what the fuck is a mashup","what the hell","what the hells up with that","what the hell were you thinking","who the hell even uses Ask anyway","what does web two point oh mean","what the fuck is casual gaming","you can never criticize the jobs","you guys are high","show intro music","rant intro music","bam 1","bam 2","outro music"]},
  {"name":"MotherPleaseChill","sound":["tldr whole things fucked","its so bad that its funny","incomprehensibly bad","I do not understand how its this bad","but theres more","whatever the fuck this is","featuring a miniaturized woman inside the computer","this ones not good","they might have been on acid when they designed it","what is this","Freud Im sure wouldve had alot to say","anyway","hang on lemme make sure I get it right","really rolls off the tongue","I mean the ad alone was worth that","dazzling","it actually says dazzling on the page which is good","we hate 5090s","well burn that bridge when we get to it","but it technically is a Chamber","were not sure why","welcome to the US PTO","and they make it worse","plus its just bad value","I need to see what they possibly fucked up so bad","so lets do it","very complicated","this has got some Dell vibes","wtf ok that explains a lot","heres your problem","its kinda stupid","when you do this performance bad","this is incredibly awful","so theyve solved that problem","theres this button here that you cant push","its got some instructions there","progress","something interesting going on there","externally it looks fantastic","actually this is very nice","yeah no this is good","youve done one thing right","its not our job","its so bad","wow","its so disappointing","wow ok","thats a nice touch","cool","good attention to detail","man","this is a mess","its a mystery why it sucks so much","well be back","embarrassingly below expectations","near-literal dumpster fire of a pc","thats the intellectual property","no ones done it before","Resizabled Bar","its a dirty trick","more disappointment","behold the bloat","the rest of them are just trash","McAfee","but theres more 2","interesting","elevate your gaming experience","okay","features","packed into the software","great set of options","the secret fourth option","good","its making my job really fun","thats insane","thats crazy","this is the most idiotic","youre welcome","send them some flowers or chocolate","today","Im only gonna clap once","hello dear"]},
];

