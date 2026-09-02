/**how upset someone is*/
type Saltiness = 'water' | 'ramen' | 'ocean' | 'wife';

/**organized salt*/
type Salad<T> = {
	[key in Saltiness]: T[];
}

/**Usually the subject of our sentence*/
type Noun = [subject: string, verbReq: VerbReq, credit?: string];

/**Some kind of excuse*/
type John = [verbit: number, reason: string, credit?: string];

/**Bullying */
type Taunt = [taunt: string, credit?: string];

// ====================================================================================================================
// ======================================== a nice lineup of spices ========================================

/**people that we make fun of*/
const noun: Salad<Noun> = {
	water:[
		["My eyes", "3p", "niffyjiffy"],
		["The TV", "3s", "niffyjiffy"],
		["This setup", "3s","Taerk"],
		["My controller", "3s","Taerk"],
		["I", "1s", "niffyjiffy"],
		["The camera", "3s", "Dr Deletus"],
		["Your character", "3s", "/u/KindaFunnyUsername"],
		["My chair", "3s", "/u/shadowpikachu"],
		["The lag", "3s", "/u/DrankeyKrang"],
		["My skills", "3p", "/u/DrankeyKrang"],
		["My phone", "3s", "/u/DrankeyKrang"],
		["My nose", "3s", "/u/DrankeyKrang"],
		["The control stick", "3s", "/u/p0rtugalvii"],
		["The venue", "3s", "/u/p0rtugalvii"],
		["The stage", "3s", "/u/DeadLineClock"],
		["The bracket", "3s", "/u/DeadLineClock"],
		["The matchup", "3s", "/u/DeadLineClock"]
	],
	ramen:[
		["You", "2s","Taerk"],
		["My son", "3s", "niffyjiffy"],
		["This game", "3s","Taerk"],
		["My hands", "3p", "niffyjiffy"],
		["My fingers", "3p", "niffyjiffy"],
		["Your main", "3s", "/u/KindaFunnyUsername"],
		["My butt", "3s", "/u/shadowpikachu"],
		["My fingernails", "3p", "/u/DrankeyKrang"],
		["My breakfast", "3s", "/u/deluxejoe"],
		["Randall", "3s", "/u/NormalNavi"],
		["My 3DS", "3s", "/u/NormalNavi"],
		["Your 3DS", "3s", "/u/NormalNavi"],
		["Smash 64", "3s","Taerk"],
		["Melee", "3s","Taerk"],
		["Brawl", "3s","Taerk"],
		["Smash Ultimate", "3s","wsbc"],
		["Smash 4", "3s","Taerk"],
		["Netplay", "3s","Taerk"],
		["My drink", "3s","Taerk"],
		["My Uber driver", "3s","wsbc"],
		["Your amiibo", "3s", "/u/Meester_Tweester"],
		["My fedora", "3s", "/u/PhoenixBurning"],
		["Mango", "3s", "/u/DeadLineClock"],
		["My ride home", "3s", "/u/DeadLineClock"],
		["My dog", "3s", "/u/DeadLineClock"]
	],
	ocean:[
		["Your mom", "3s","Taerk"],
		["The spectators", "3p","Taerk"],
		["The commentators", "3p","Taerk"],
		["Everyone", "3s","Taerk"],
		["The desire sensor", "3s","Taerk"],
		["Sakurai", "3s","Taerk"],
		["The Vernal Equinox", "3s", "/u/RoflPost"],
		["/r/smashbros", "3s", "/u/NormalNavi"],
		["SmashBoards", "3s", "/u/NormalNavi"],
		["RNGesus", "3s", "/u/NormalNavi"],
		["My Zapper", "3s", "/u/NormalNavi"],
		["The John generator", "3s", "/u/NormalNavi"],
		["My waifu", "3s", "/u/radicalhighway_"],
		["The sponsors", "3p", "/u/radicalhighway_"],
		["Nintendo", "3s", "/u/radicalhighway_"],
		["Twitch", "3s", "/u/radicalhighway_"],
		["Gimr", "3s", "/u/radicalhighway_"],
		["D1", "3s", "/u/radicalhighway_"],
		["Prog", "3s", "/u/radicalhighway_"],
		["Doritos", "3p", "/u/radicalhighway_"],
		["Le toucan", "3s", "/u/PhoenixBurning"],
		["My ride home", "3s", "/u/DeadLineClock"],
		["The salt shaker", "3s", "/u/DeadLineClock"],
		["The matchup", "3s", "/u/DeadLineClock"],
		["The stock market", "3s", "/u/DeadLineClock"],
		["GRsmash", "3s", "/u/DeadLineClock"],
		["My panties", "3p", "/u/DeadLineClock"],
		["The left joycon", "3s", "/u/supaPILLOT"],
	],
	wife: [
		["My controller","3s","Poyoarya"],
		["The sun","3s","Poyoarya"],
		["My hands","3p","Poyoarya"],
		["Everyone","3s","Poyoarya"],
		["The TV","3s","Poyoarya"],
		["The crowd","3s","Poyoarya"],
		["My opponent","3s","Poyoarya"],
		["My chair","3s","Poyoarya"],
		["His controller","3s","Poyoarya"],
		["Meta Knight","3s","Poyoarya"],
		["Roy's wavedash","3s","Poyoarya"],
		["My mother","3s","Poyoarya"],
		["My brain","3s","Poyoarya"],
		["My 3DS","3s","Poyoarya"],
		["Nintendo","3s","Poyoarya"],
		["My Twitter followers","3p","Poyoarya"],
		["My eyes","3p","Poyoarya"],
		["The DLC","3s","Poyoarya"],
		["The commentators","3p","Poyoarya"],
		["The music","3s","Poyoarya"],
		["Final Destination","3s","Poyoarya"],
		["Reggie Fils-Aim&eacute;","3s","Poyoarya"],
		["The venue","3s","Poyoarya"],
		["My skills","3p","Poyoarya"],
		["The stream","3s","Poyoarya"],
		["Sakurai","3s","Poyoarya"],
		["The ledge","3s","Poyoarya"],
		["My foot","3s","Poyoarya"],
		["The C-stick","3s","Poyoarya"],
		["Project M","3s","Poyoarya"],
		["Your shoes","3p","Poyoarya"],
		["My mother's basement","3s","Poyoarya"],
		["The USA","3s","Poyoarya"],
		["Tap jump","3s","Poyoarya"],
		["Jigglypuff","3s","Poyoarya"],
		["I","1s","Poyoarya"],
		["PAC-MAN","3s","Poyoarya"],
		["Alex Strife","3s","Poyoarya"],
		["My scarf","3s","Poyoarya"],
		["The T.O.","3s","Poyoarya"],
		["EVO","3s","Poyoarya"],
		["Leffen","3s","Poyoarya"],
		["My wife","3s","wsbc"],
		["My dick","3s","wsbc"],
		["My tummy","3s","wsbc"],
		["Hungrybox","3s","wsbc"],
		["Miiverse","3s","wsbc"],
		["This Man","3s","notamacuser"],
		["The Wii U","3s","wsbc"],
		["Donkey Kong","3s","wsbc"],
		["Captain Falcon","3s","wsbc"],
		["My game","3s","notamacuser"],
		["My sponsor","3s","wsbc"],
		// ["We","1p","wsbc"],
		["Chat","3s","wsbc"],
		["Alpharad","3s","notamacuser"],
		["For Glory","3s","notamacuser"],
		["The wifi here","3s","wsbc"],
	]
};

/**here's a cheatsheet for the bitmask: 
	0 - don't use subject's verb, but add a space
	1 - use
	2 - don't use verb and don't add a space
	5 - use the subject's verb in the past tense
*/
const john: Salad<John> = {
	water: [
		[1, "too sweaty.", "niffyjiffy"],
		[1, "too small.", "niffyjiffy"],
		[1, "in my eyes.", "niffyjiffy"],
		[1, "tired.", "niffyjiffy"],
		[1, "too bright.", "niffyjiffy"],
		[1, "in pain.", "niffyjiffy"],
		[1, "too big.","Taerk"],
		[1, "too loud.","Taerk"],
		[1, "too annoying.","Taerk"],
		[1, "self-destructing.","Taerk"],
		[1, "broken.","Taerk"],
		[1, "overpowered.","Taerk"],
		[1, "messing up my L-cancels.", "/u/Erotaku12943"],
		[0, "slipped.", "/u/ProjectMFeeningNigga"],
		[1, "spamming.", "/u/KindaFunnyUsername"],
		[1, "too slow.", "/u/Abraman1"],
		[1, "too laggy.", "/u/DrankeyKrang"],
		[1, "too dull.", "/u/DrankeyKrang"],
		[1, "itchy.", "/u/shadowpikachu"],
		[1, "too cold.", "/u/p0rtugalvii"],
		[1, "too warm.", "/u/p0rtugalvii"],
		[1, "too hard to see.", "/u/Slyphoria"],
		[1, "johning too much.", "/u/Slyphoria"],
		[1, "third-party.", "/u/Mitsjol"],
		[1, "sweaty.", "/u/Mitsjol"],
		[1, "calling me.", "/u/Mitsjol"],
		[0, "saved you.", "/u/Mitsjol"],
		[0, "ran out of jumps.", "/u/Meester_Tweester"],
		[1, "really feeling it!", "/u/PhoenixBurning"],
		[1, "stealing my main.", "/u/404House"],
		[5, "counter-picking the stage.","Taerk"],
		[5, "counter-picking the character.","Taerk"],
		[0, "should have teched that.", "/u/DeadLineClock"]
	],
	ramen:[
		[2, "'s tech skill is off.", "Graphitezepp"],
		[1, "losing on purpose.","Taerk"],
		[0, "just switched games.","Taerk"],
		[1, "biased.","Taerk"],
		[1, "modded.","Taerk"],
		[1, "hacking.","Taerk"],
		[1, "cheating.","Taerk"],
		[1, "using rumble.","Taerk"],
		[1, "against me.","Taerk"],
		[1, "teaming up on me.","Taerk"],
		[1, "too old.","Taerk"],
		[0, "nudged me.", "/u/Erotaku12943"],
		[0, "messed up my Z-cancels.", "/u/Erotaku12943"],
		[1, "butthurt.", "/u/shadowpikachu"],
		[0, "got no goddamn characters.", "/u/KiJoBu"],
		[1, "making me sleepy.", "/u/RoflPost"],
		[1, "too advanced.", "/u/DrankeyKrang"],
		[1, "outdated.", "/u/DrankeyKrang"],
		[1, "too casual.", "/u/DrankeyKrang"],
		[1, "not casual enough.", "/u/DrankeyKrang"],
		[1, "only playing to win.", "/u/DrankeyKrang"],
		[1, "using illegal tactics.", "/u/DrankeyKrang"],
		[1, "using banned characters.", "/u/DrankeyKrang"],
		[1, "using glitches.", "/u/DrankeyKrang"],
		[5, "nerfed again.", "/u/Gandesa"],
		[0, "wasn't paying attention.", "/u/PyrokidSosa"],
		[1, "not HD.", "/u/Mitsjol"],
		[1, "killing me.", "/u/Mitsjol"],
		[5, "staring at me.", "/u/2m2m_NoClown"],
		[5, "staring at you.", "/u/2m2m_NoClown"],
		[0, "told me it would work.", "/u/NormalNavi"],
		[1, "being so loud.", "/u/GSRaposo"],
		[1, "scratched up.", "/u/DeadLineClock"],
		[0, "share-stocked me.", "/u/DeadLineClock"],
		[0, "threw something at me.", "/u/DeadLineClock"],
		[5, "calling me names.", "/u/DeadLineClock"]
	],
	ocean:[
		[1, "on fire.","Taerk"],
		[1, "ugly.","Taerk"],
		[1, "listening to the wrong song.","Taerk"],
		[1, "messing with the setup.","Taerk"],
		[1, "too salty.","Taerk"],
		[1, "using the wrong tag.","Taerk"],
		[0, "nudged my R-cancelling knee.", "/u/Erotaku12943"],
		[1, "having a heart attack.", "/u/KiJoBu"],
		[1, "too glitchy.", "/u/DrankeyKrang"],
		[1, "too unstable.", "/u/DrankeyKrang"],
		[1, "too johnny.", "/u/DrankeyKrang"],
		[1, "using gimmicky custom moves.", "/u/DrankeyKrang"],
		[0, "got too much sleep.", "/u/Her0_0f_time"],
		[5, "distracted by that girl.", "/u/Her0_0f_time"],
		[0, "didn't get D1 and Prog to commentate.", "/u/Her0_0f_time"],
		[0, "broke the John generator.", "/u/Her0_0f_time"],
		[0, "exploded.", "/u/Her0_0f_time"],
		[0, "started watching Shrek.", "/u/Her0_0f_time"],
		[0, "wanted to make a gfycat.", "/u/Her0_0f_time"],
		[0, "tells ridiculous johns.", "/u/Her0_0f_time"],
		[1, "not subscribed.","Taerk"],
		[0, "doesn't understand their privilege.", "/u/GSRaposo"],
		[0, "did 9/11.", "/u/DeadLineClock"],
		[0, "murdered the commentator.", "/u/DeadLineClock"],
		[0, "generated my johns.", "/u/DeadLineClock"],
		[0, "didn't give me my money back.", "/u/DeadLineClock"],
		[1, "THE TOURNAMENT!", "/u/DeadLineClock"],
		[1, "not a real person.", "Copilot"],
		[0, "mangled my hand.",'wsbc'],
		[1, "horny.",'wsbc'],
		[0, "TURNED HER AGAINST ME.", "Anakin Skywalker"],
	],
	wife: [
		[1,"in my eyes.","Poyoarya"],
		[1,"broken.","Poyoarya"],
		[1,"laggy.","Poyoarya"],
		[1,"hacked.","Poyoarya"],
		[1,"too loud.","Poyoarya"],
		[1,"uncomfortable.","Poyoarya"],
		[1,"OP.","Poyoarya"],
		[1,"fraudulent.","Poyoarya"],
		[1,"disturbing me.","Poyoarya"],
		[1,"making me SD.","Poyoarya"],
		[1,"upside-down.","Poyoarya"],
		[1,"violating the rules.","Poyoarya"],
		[1,"totally spooking me out.","Poyoarya"],
		[1,"unnecessarily rude.","Poyoarya"],
		[1,"making funny faces at me.","Poyoarya"],
		[1,"trash-talking mid-match.","Poyoarya"],
		[5,"running a company for 16 hours a day.","Poyoarya"],
		[1,"making excuses.","Poyoarya"],
		[1,"spamming projectiles.","Poyoarya"],
		[1,"not fair.","Poyoarya"],
		[1,"way better than my character.","Poyoarya"],
		[5,"speaking Japanese.","Poyoarya"],
		[1,"too bright.","Poyoarya"],
		[1,"nerfed.","Poyoarya"],
		[1,"garbage.","Poyoarya"],
		[1,"not good enough.","Poyoarya"],
		[1,"reminding me of my ex.","Poyoarya"],
		[1,"really annoying.","Poyoarya"],
		[1,"a big gimmick.","Poyoarya"],
		[1,"kinda sweaty.","Poyoarya"],
		[1,"not listening to me.","Poyoarya"],
		[1,"sleeping.","Poyoarya"],
		[1,"terrible for my character.","Poyoarya"],
		[1,"taunting.","Poyoarya"],
		[1,"cheating.","Poyoarya"],
		[1,"using glitches.","Poyoarya"],
		[1,"too hard to reach.","Poyoarya"],
		[5,"using better moves than me.","Poyoarya"],
		[5,"using motion controls.","Poyoarya"],
		[1,"sitting slightly closer to the screen.","Poyoarya"],
		[1,"not wearing glasses.","Poyoarya"],
		[1,"sober.","Poyoarya"],
		[1,"using items.","Poyoarya"],
		[1,"not letting me grab him.","Poyoarya"],
		[1,"shielding too much.","Poyoarya"],
		[1,"air dodging.","Poyoarya"],
		[1,"rolling.","Poyoarya"],
		[5,"pausing mid-match.","Poyoarya"],
		[5,"saving replays.","Poyoarya"],
		[1,"ethically superior to me.","Poyoarya"],
		[1,"only using the A button.","Poyoarya"],
		[1,"only using the B button.","Poyoarya"],
		[1,"Reggie Fils-Aim&eacute;.","Poyoarya"],
		[1,"picking stages that I don't like.","Poyoarya"],
		[1,"bad and should feel bad.","Poyoarya"],
		[1,"low on batteries.","Poyoarya"],
		[1,"cold.","Poyoarya"],
		[1,"sticky.","Poyoarya"],
		[1,"blocking the screen.","Poyoarya"],
		[1,"walking in front of the screen.","Poyoarya"],
		[1,"tangling my controller cable.","Poyoarya"],
		[1,"incapable of melting steel beams.","Poyoarya"],
		[1,"too attractive.","Poyoarya"],
		[1,"too fast.","Poyoarya"],
		[1,"using an ugly alternative costume.","Poyoarya"],
		[5,"using counters too much.","Poyoarya"],
		[5,"spamming PK Fire.","Poyoarya"],
		[2,"... my b.","Poyoarya"],
		[1,"really hard to remember.","Poyoarya"],
		[5,"not going to the doctor.","Poyoarya"],
		[5,"threatening me.",'wsbc'],
		[1, "poor.","wsbc"],
		[0, "hurts :-(","wsbc"],
		[0, "posted my nudes on twitter.com","Eggman"],
		[1, "my wife.","wsbc"],
		[1, "racist.","wsbc"],
		[0, "killed my father.",'Inigo Montoya'],
		[0, "ate my son.",'Ted Cruz'],
		[1, "pure, unadulterated jank.",'Google'],
		[1, "a fucking architect.",'Clark'],
		[0, "crashed.",'notamacuser'],
		[5, "not old enough.",'wsbc'],
		[1, "the Senate.",'Palpatine'],
		[1, "a shill.",'wsbc'],
		[1, "streaming.",'wsbc'],
		[2, "<small>... n-nevermind.</small>",'wsbc'],
		[5, "going vertical.",'Vert Wheeler'],
		[0, "farted on the bike.",'notamacuser'],
		[1, "smelly.","wsbc"],
		[1, "not a natural formation.","notamacuser"],
		[5, "mad because I broke the glass.","Clark"],
		[1, "in The Files.","wsbc"],
	]
};

/**YOU'RE WINNER*/
const champ: Salad<Noun> = {
	water:[
		["I", "1s"]
	],
	ramen: [
		["I", "1s"]
	],
	ocean: [
		["I", "1s"]
	],
	wife: [
		["You", "2s"],
		// ["He", "3s"]
	]
};

/**excuses for winners*/
const win: Salad<John> = {
	water:[ 
		[5, "through pure skill.", "niffyjiffy"],
		[5, "by getting lucky.","Taerk"],
		[5, "and there's no stopping me.","Taerk"],
		[5, "by spamming.","Taerk"],
		[5, "through the power of hard work.","Taerk"],
		[13,"I out-camped you.","Taerk"],
		[5, "by dominating the neutral game.","Taerk"],
		[13,"I know all the good combos.", "/u/KindaFunnyUsername"]
	],
	ramen:[
		[13,"my region is better.","Taerk"],
		[5, "by cheating.","Taerk"],
		[5, "by using a broken character.","Taerk"],
		[5, "and I don't even play this game.","Taerk"],
		[13,"my tech skill is off.", 'Graphitezepp'],
		[13,"your main is garbage.", "/u/KindaFunnyUsername"],
		[5, "by wavecheating.", "/u/p0rtugalvii"],
		[5, "and now it's time to save the replay.", "/u/p0rtugalvii"]
	],
	ocean:[
		[5, "through the power of friendship.","Taerk"],
		[5, "through sheer willpower.","Taerk"],
		[5, "using my bloodline technique.","Taerk"],
		[13,"you're bad.","Taerk"],
		[13,"my controller is blessed.", "/u/DamenCF"],
		[13,"your friends don't dance, and if they don't dance, then they're no friends of mine.", "/u/Meester_Tweester"]
	],
	wife:[
		[13,"my wife is better than your wife.","Copilot"],
		[6, ", fair and square.","wsbc"],
		[13,'I have plot armor.',"wsbc"],
		[6, '. You know what that means?', "wsbc"],
		[6, ", but I still love you.", "Copilot"],
		[6, ", I guess.", "wsbc"],
		[13,"they hit the second tower.", "wsbc"],
		[13,"I'm a streamer.", "wsbc"],
		[13,"I read the roll (obviously).", "wsbc"],
		[5,"with heavy mental gaming in the game.", "notamacuser"],
		[13,"I was unc.", "Clark"],
		[13,"I said so.", "wsbc"],
		[13,"I'm just better.", "wsbc"],
	]
};

/**make your opponent feel really bad about himself*/
const taunt: Salad<Taunt> = {
	water:[ 
		[""]
	],
	ramen:[
		["Wrecked!","Taerk"],
		["Haha!","Taerk"],
		["Get bodied!","Taerk"],
		["lol.", "/u/p0rtugalvii"],
		["lmao.", "/u/p0rtugalvii"],
		["(And cheating.)","Taerk"],
		["Give me my money!","Taerk"],
		["Get scammed, kid.","Taerk"],
		["<i>Okay!</i>", "/u/KindaFunnyUsername"],
		["And on stream too!","Taerk"],
		["The aura is with me!","Taerk"],
	],
	ocean:[
		["Pika-pika!","Taerk"],
		["HYES!","Taerk"],
		["FALCON WIN!","Taerk"],
		["Hoo-hah!", "/u/KindaFunnyUsername"],
		["GFYCAT!!", "BizarroFlame"],
		["Minna, miteite kure!","Marth"],
		["Omae wa mou shindeiru!", "Hokuto no Ken!"],
	],
	wife: [
		["Are you done playing video games yet, sweetie?","my wife"],
		["Get fucked up, dawg.","HomeMadeWaffles"],
		["Unplug your controller, dawg.","HomeMadeWaffles"],
		["I'm gonna go fuck your wife now.","Shadow"],
		["That's unlucky, pal.","wsbc"],
		["Stop it. Get some help.","Michael Jordan"],
		["It's your fault, by the way.","wsbc"],
		["OHHH YEAH!!!","Kool-Aid Man"],
		["Just like me fr.","notamacuser"],
		["Couldn't be me.","notamacuser"],
		["jk lol.","wsbc"],
		["How embarrassing.","wsbc"],
		["Poggers!","Twitch"],
		["Cringe, mate.","wsbc"],
		[", bruh.","wsbc"],
		[", dumbass.","wsbc"],
		["DEEP FRIED!","Brimmy"],
	]
};

// ====================================================================================================================
// ==================================== The English Language ==========================================================
// ========================== "I got a five on the AP English Lang exam, btw" =========================================

const _ = undefined;

/**a bitmask saying what to do with a verb */
const VERB = {
	/**use the verb (default is present tense)*/
	USE: 1<<0,
	/**don't add a space before the john (overwrites USE) */
	NOSPACE: 1<<1,
	/**conjugate the verb to past tense */
	PAST: 1<<2,
	/**needs to have the word "because" added to it*/
	BECAUSE: 1<<3,
} as const;

/**what kind of verb conjugation we will need for this subject*/
type VerbReq = "1s" | "2s" | "3s" | "1p" | "2p" | "3p";

// -----------------------------------------------
/**what time is it?*/
type VerbTense = Record<"past"|"pres", VerbNumber>;

/**how many men do you have?*/
type VerbNumber = Record<string, VerbPerson>;

/**who is the target of your aggression?*/
type VerbPerson = [nonth:undefined,first:string,second:string,third:string];
// ------------------------------------------------

const verdict: Record<string,VerbTense> = {
	//@ts-ignore
	__proto__:null,
	"be":{
		past:{
			s:[_,"was","was","was"],
			p:[_,"were","were","were"]
		},
		pres:{
			s:[_,"am","are","is"],
			p:[_,"are","are","are"]
		}
	},
	"win":{
		past:{
			s:[_,"won","won","won"],
			p:[_,"won","won","won"]
		},
		pres:{
			s:[_,"win","win","win"],
			p:[_,"win","win","win"]
		}
	},
	"lose":{
		past:{
			s:[_,"lost","lost","lost"],
			p:[_,"lost","lost","lost"]
		},
		pres:{
			s:[_,"lose","lose","loses"],
			p:[_,"lose","lose","lose"]
		}
	}
};

/**Take Control Of Your Language! Subscribe Today!*/
function conjugate(verb:string, verbReq:VerbReq,tense:keyof VerbTense){
	const [vper,vnum] = verbReq.split("");
	let value: string | undefined;
	value = verdict?.[verb]?.[tense]?.[String(vnum)]?.[Number(vper)];
	// return the original verb in case something went wrong
	return value??verb;
}

// ====================================================================================================================
// ==================================== the rest of the johnomatic ====================================================

type Johner = {structure: string, credit_text: string};
let logs: Johner[] = [];
let count = 0;
let salt_level = 3;
let is_win = false;
let wife_mode = true;

import {rui, rember} from '../NEO.js';

function randomCat(): Saltiness {
	let saltiness = salt_level;
	let salt2_SonOfSalt = rui(saltiness + 1);
	let vert: Saltiness = 'wife';
	if (salt2_SonOfSalt === 0) {
		vert = 'water';
	} else if (salt2_SonOfSalt === 1) {
		vert = 'ramen';
	} else if (salt2_SonOfSalt === 2) {
		vert = 'ocean';
	} else {
		// he's already salty enough
	}
	return vert;
}

interface CreditCard {
	series: 'subject' | 'john' | 'win' | 'taunt' | 'both';
	credit: string;
}

function gamble(x:number): boolean {
	return rui(x) === 0;
}

function johnerate(): Johner {		
	let credit: CreditCard[] = [];
	let structure = "";
	
	// choose which johns to use
	let nounPool = is_win? champ : noun;
	let johnPool = is_win? win : john;

	let verb = "be";
	const [subject, verbReq, nounCred] = rember(nounPool[randomCat()]);
	const [verbit, johnReason, johnCred] = rember(johnPool[randomCat()]);
	
	if (is_win){
		verb = verbReq.includes('1') ? "win" : "lose";
	}

	// Push credits
	if (nounCred)
		credit.push({series: 'subject', credit: nounCred});
	if (johnCred)
		credit.push({series: is_win? 'win' : 'john', credit: johnCred});

	// assemble the salad
	structure = subject;

	if (verbit & VERB.NOSPACE) {
		// dont need to do anything (usually)
		
		// this is the one case where we need to do something
		if (is_win && verbit&VERB.PAST){
			structure += ` ${conjugate(verb, verbReq, "past")}`;
		}
	} else if (verbit & VERB.USE) {
		// we are using some form of verb
		let verbToUse = conjugate(verb, verbReq, "pres");

		// conjugate to past-tense, perchance
		if (verbit & VERB.PAST || gamble(4)) {
			verbToUse = conjugate(verb, verbReq, "past");
		}
		structure += ` ${verbToUse} `;

		// add the "because"
		if (verbit&VERB.BECAUSE) {
			structure += "because ";
		}

		// add a one-in-ten chance for this to be a canon event
		if (gamble(10)){
			structure = `${structure.trim()}, canonically, `;
		}

		// add a one-in-five chance to negate it
		if (!is_win && gamble(5)){
			structure += "not ";
		}
	} else {
		// in this case, we just add a space
		structure += ' ';
	}
	
	// finally, append the john
	structure += johnReason;
	
	// and then we taunt for style points.
	if (is_win) {
		const [tauntext, tauntCred] = rember(taunt[randomCat()]);
		if (tauntCred)
			credit.push({series: 'taunt', credit: tauntCred});
		structure += ` ${tauntext}`;
	}

	// my b
	if (gamble(0xff)) {
		structure = "my b";
		credit.length = 0;
	}
		
	// grammar fix
	structure = structure.replace("s's", "s'").replace("I's", "My").replace("You's", "Your")
		.replace("not not ","").replace(/[?,.]\s?,/,',');
	
	// generate the credit text
	let credit_text = credit.length ? `Credit: ${credit.map(cred=>formatCredit(cred)).join(' ')}` : '';
	
	return {structure, credit_text};
}

function formatCredit(credit: CreditCard): string {
	return `[${credit.series}:${credit.credit}]`;
}

// ====================================================================================================================
// ========================================== DOM AND DOM ACCESSORIES =================================================

const wilopa = window.location.pathname;

function insert_john(johner: Johner){
	const {structure, credit_text} = johner;

	// insert it into the document
	let output = document.querySelector('div#john-chamber #output');
	if (output) {
		output.innerHTML = structure;
	}

	// insert said credit into the document
	const crel = document.querySelector('div#john-chamber #credit');
	if (crel) {
		crel.innerHTML = credit_text;
	}
	
	// something with the logs
	if (logs.length > 1000) {
		logs.shift();
	}
	logs.push({structure, credit_text});
	
	// add something to the counter? idk man.
	count++;
	const countement = document.querySelector('div#john-chamber #count');
	if (countement) {
		countement.innerHTML = String(count);
	}
}

function Bev_StartJohns(ev:PointerEvent){
	try {
		const johnest = johnerate();
		insert_john(johnest);
	}catch(errata){}
}

function backJohn() {
	if (logs.length) {
		logs.pop();
		const output = document.querySelector('div#john-chamber #output');
		const credit = document.querySelector('div#john-chamber #credit');
		if (output && credit) {
			output.innerHTML = logs.at(-1)?.structure || "";
			credit.innerHTML = logs.at(-1)?.credit_text || "";
		}
		
		count--;
		const countement = document.querySelector('div#john-chamber #count');
		if (countement) {
			countement.innerHTML = String(count);
		}
	} else {
		// got nowhere to go back to, bub
	}
}
function Bev_BackJohn(ev:PointerEvent){
	try{
		backJohn();
	}catch(erro){}
}

function Bev_WinStatus(ev:PointerEvent){
	try{
		const target = ev.target as HTMLElement;
		const didYouWin = target.getAttribute('data-win-status') === 'win';
		setWinStatus(didYouWin);
		saveWinStatus();
	}catch(e){}
}

function setWinStatus(didYouWin:boolean){
	is_win = didYouWin;
	const leSubject	= document.querySelector('div#john-chamber #subject');
	const status_win = document.querySelector('div#john-chamber #status_win');
	const status_lose = document.querySelector('div#john-chamber #status_lose');
	if (leSubject && status_win && status_lose){
		status_win.classList.remove('active');
		status_lose.classList.remove('active');
		if (is_win){
			// You're winner.
			leSubject.innerHTML = "they";
			status_win.classList.add('active');
		} else {
			// LOSER! YOU'RE A LOSER! ARE YOU FEELING SORRY FOR YOURSELF? WELL YOU SHOULD BE BECAUSE YOU ARE DIRT!
			leSubject.innerHTML = "you";
			status_lose.classList.add('active');
		}
	} else {
		// we are missing some elements, and thus we shall never be whole.
	}
}

function Bev_SaltLevel(ev:PointerEvent){
	try{
		let target = ev.target as HTMLElement;
		let slevel = Number(target.getAttribute('data-salt-level'));
		setSaltLevel(slevel);
		saveSaltLevel();
	}catch(er){}
}
function setSaltLevel(slevel:number){
	try{
		// clear the salt buttons
		const saltButtons = Array.from(document.querySelectorAll('div#john-chamber .salt-button'));
		saltButtons.forEach((button) => {
			button.classList.remove('active');
		});
		let target = document.querySelector(`div#john-chamber .salt-button[data-salt-level="${slevel}"]`);
		if (target instanceof HTMLElement) {
			// set this salt button to "salt"
			target.classList.add('active');
		}
		// set the salt_level
		salt_level = slevel;
		if (slevel > 2){
			// she's gone from suck to blow
			wife_mode = true;
		} else {
			// she hath calmed
			wife_mode = false;
		}
	}catch(eros){}
}

// a whole bunch of stuff that handles saving/loading
function saveWinStatus(){
	sessionStorage.setItem(`${wilopa}::win-status`, is_win ? 'win' : 'lose');
}
function loadWinStatus(){
	const status = sessionStorage.getItem(`${wilopa}::win-status`);
	const didYouWin = status === 'win';
	setWinStatus(didYouWin);
}

function saveSaltLevel(){
	sessionStorage.setItem(`${wilopa}::salt-level`, String(salt_level));
}
function loadSaltLevel(){
	const slevel = sessionStorage.getItem(`${wilopa}::salt-level`);
	if (slevel === null) {
		salt_level = 3;
	} else {
		salt_level = Number(slevel);
	}
	setSaltLevel(salt_level);
}

/**basically an init function*/
function bracketReset(){
	logs = [];
	count = 0;
	salt_level = 3;
	is_win = false;
	wife_mode = true;

	// add event listeners to the salt buttons
	const saltButtons = Array.from(document.querySelectorAll('div#john-chamber .salt-button'));
	saltButtons.forEach((button) => {
		if (button instanceof HTMLElement) {
			button.addEventListener('click', Bev_SaltLevel);
		}
	});

	// also gotta add the event listeners to the win status buttons
	const statusButtons = Array.from(document.querySelectorAll('div#john-chamber .status-button'));
	statusButtons.forEach((button) => {
		if (button instanceof HTMLElement) {
			button.addEventListener('click', Bev_WinStatus);
		}
	});

	// and the event listener for the back button
	const backButton = document.querySelector('div#john-chamber #back');
	if (backButton instanceof HTMLElement) {
		backButton.addEventListener('click', Bev_BackJohn);
	}

	// and also the button to actually write the john
	const generateButton = document.querySelector('div#john-chamber #submit');
	if (generateButton instanceof HTMLElement) {
		generateButton.addEventListener('click', Bev_StartJohns);
	}

	// load statii from the store
	loadWinStatus();
	loadSaltLevel();
}

document.addEventListener('spam', ev => {
	let cev = ev as CustomEvent;
	if (cev?.detail?.url === '/page/legal/john.html') {
		bracketReset();
	} else {
		// ignore reality
	}
});
bracketReset();
