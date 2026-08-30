type Saltiness = 'water' | 'ramen' | 'ocean' | 'wife';

type Noun = [subject: string, verb: string, credit?: string];
interface NounSalad {
	water: Noun[];
	ramen: Noun[];
	ocean: Noun[];
	wife: Noun[];
}

/**bit: effect
 * 0: use the adjective
 * 1: add a space
 * 2: conjugate to past tense
 */
const VERB = {
	USE: 1<<0,
	NOSPACE: 1<<1,
	PAST: 1<<2,
} as const;

type John = [verbit: number, reason: string, credit?: string];
interface JohnSalad {
	water: John[];
	ramen: John[];
	ocean: John[];
	wife: John[];
}

type Taunt = [taunt: string, credit?: string];
interface TauntSalad {
	water: Taunt[];
	ramen: Taunt[];
	ocean: Taunt[];
	wife: Taunt[];
}

const noun: NounSalad = {
	water:[
		["My eyes", "are", "niffyjiffy"],
		["The TV", "is", "niffyjiffy"],
		["This setup", "is","Taerk"],
		["My controller", "is","Taerk"],
		["I", "am", "niffyjiffy"],
		["The camera", "is", "Dr Deletus"],
		["Your character", "is", "/u/KindaFunnyUsername"],
		["My chair", "is", "/u/shadowpikachu"],
		["The lag", "is", "/u/DrankeyKrang"],
		["My skills", "are", "/u/DrankeyKrang"],
		["My phone", "is", "/u/DrankeyKrang"],
		["My nose", "is", "/u/DrankeyKrang"],
		["The control stick", "is", "/u/p0rtugalvii"],
		["The venue", "is", "/u/p0rtugalvii"],
		["The stage", "is", "/u/DeadLineClock"],
		["The bracket", "is", "/u/DeadLineClock"],
		["The matchup", "is", "/u/DeadLineClock"]
	],
	ramen:[
		["You", "are","Taerk"],
		["The Sun", "is", "niffyjiffy"],
		["This game", "is","Taerk"],
		["My hands", "are", "niffyjiffy"],
		["My fingers", "are", "niffyjiffy"],
		["Your main", "is", "/u/KindaFunnyUsername"],
		["My butt", "is", "/u/shadowpikachu"],
		["My fingernails", "are", "/u/DrankeyKrang"],
		["My breakfast", "is", "/u/deluxejoe"],
		["Randall", "is", "/u/NormalNavi"],
		["My 3DS", "is", "/u/NormalNavi"],
		["Your 3DS", "is", "/u/NormalNavi"],
		["Smash 64", "is","Taerk"],
		["Melee", "is","Taerk"],
		["Brawl", "is","Taerk"],
		["Smash Ultimate", "is","wsbc"],
		["Smash 4", "is","Taerk"],
		["Netplay", "is","Taerk"],
		["My drink", "is","Taerk"],
		["My Uber driver", "is","wsbc"],
		["Your amiibo", "is", "/u/Meester_Tweester"],
		["My fedora", "is", "/u/PhoenixBurning"],
		["Mango", "is", "/u/DeadLineClock"],
		["My ride home", "is", "/u/DeadLineClock"],
		["My dog", "is", "/u/DeadLineClock"]
	],
	ocean:[
		["Your mom", "is","Taerk"],
		["The spectators", "are","Taerk"],
		["The commentators", "are","Taerk"],
		["Everyone", "is","Taerk"],
		["The desire sensor", "is","Taerk"],
		["Sakurai", "is","Taerk"],
		["The Vernal Equinox", "is", "/u/RoflPost"],
		["/r/smashbros", "is", "/u/NormalNavi"],
		["SmashBoards", "is", "/u/NormalNavi"],
		["RNGesus", "is", "/u/NormalNavi"],
		["My Zapper", "is", "/u/NormalNavi"],
		["The John generator", "is", "/u/NormalNavi"],
		["My waifu", "is", "/u/radicalhighway_"],
		["The sponsors", "are", "/u/radicalhighway_"],
		["Nintendo", "is", "/u/radicalhighway_"],
		["Twitch", "is", "/u/radicalhighway_"],
		["Gimr", "is", "/u/radicalhighway_"],
		["D1", "is", "/u/radicalhighway_"],
		["Prog", "is", "/u/radicalhighway_"],
		["Doritos", "are", "/u/radicalhighway_"],
		["Le toucan", "is", "/u/PhoenixBurning"],
		["My ride home", "is", "/u/DeadLineClock"],
		["The salt shaker", "is", "/u/DeadLineClock"],
		["The matchup", "is", "/u/DeadLineClock"],
		["The stock market", "is", "/u/DeadLineClock"],
		["GRsmash", "is", "/u/DeadLineClock"],
		["My panties", "are", "/u/DeadLineClock"],
		["The left joycon", "is", "/u/supaPILLOT"],
	],
	wife: [
		["My controller","is","Poyoarya"],
		["The sun","is","Poyoarya"],
		["My hands","are","Poyoarya"],
		["Everyone","is","Poyoarya"],
		["The TV","is","Poyoarya"],
		["The crowd","is","Poyoarya"],
		["My opponent","is","Poyoarya"],
		["My chair","is","Poyoarya"],
		["His controller","is","Poyoarya"],
		["Meta Knight","is","Poyoarya"],
		["Roy's wavedash","is","Poyoarya"],
		["My mother","is","Poyoarya"],
		["My brain","is","Poyoarya"],
		["My 3DS","is","Poyoarya"],
		["Nintendo","is","Poyoarya"],
		["My Twitter followers","are","Poyoarya"],
		["My eyes","are","Poyoarya"],
		["The DLC","is","Poyoarya"],
		["The commentators","are","Poyoarya"],
		["The music","is","Poyoarya"],
		["Final Destination","is","Poyoarya"],
		["Reggie Fils-Aim&eacute;","is","Poyoarya"],
		["The venue","is","Poyoarya"],
		["My skills","are","Poyoarya"],
		["The stream","is","Poyoarya"],
		["Sakurai","is","Poyoarya"],
		["The ledge","is","Poyoarya"],
		["My foot","is","Poyoarya"],
		["The C-stick","is","Poyoarya"],
		["Project M","is","Poyoarya"],
		["Your shoes","are","Poyoarya"],
		["My mother's basement","is","Poyoarya"],
		["The USA","is","Poyoarya"],
		["Tap jump","is","Poyoarya"],
		["Jigglypuff","is","Poyoarya"],
		["I","am","Poyoarya"],
		["PAC-MAN","is","Poyoarya"],
		["Alex Strife","is","Poyoarya"],
		["My scarf","is","Poyoarya"],
		["The T.O.","is","Poyoarya"],
		["EVO","is","Poyoarya"],
		["Leffen","is","Poyoarya"],
		["My wife","is","wsbc"],
		["My dick","is","wsbc"],
		["My tummy","is","wsbc"],
		["Hungrybox","is","wsbc"],
		["Miiverse","is","wsbc"],
	]
};

/*
	0 - don't use subject's verb, but add a space
	1 - use
	2 - don't use and don't add a space
	5 - use the subject's verb in the past tense
*/
const john: JohnSalad = {
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
		[1, "oudated.", "/u/DrankeyKrang"],
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
		[1, "too Johnny.", "/u/DrankeyKrang"],
		[1, "using gimmicky custom moves.", "/u/DrankeyKrang"],
		[0, "got too much sleep.", "/u/Her0_0f_time"],
		[5, "distracted by that girl.", "/u/Her0_0f_time"],
		[0, "didn't get D1 and Prog to commentate.", "/u/Her0_0f_time"],
		[0, "broke the John generator.", "/u/Her0_0f_time"],
		[0, "exploded.", "/u/Her0_0f_time"],
		[0, "started watching Shrek.", "/u/Her0_0f_time"],
		[0, "wanted to make a gfycat.", "/u/Her0_0f_time"],
		[0, "tells ridiculous Johns.", "/u/Her0_0f_time"],
		[1, "not subscribed.","Taerk"],
		[0, "doesn't understand their privilege.", "/u/GSRaposo"],
		[0, "did 9/11.", "/u/DeadLineClock"],
		[0, "murdered the commentator.", "/u/DeadLineClock"],
		[0, "generated my Johns.", "/u/DeadLineClock"],
		[0, "didn't give me my money back.", "/u/DeadLineClock"],
		[1, "THE TOURNAMENT!", "/u/DeadLineClock"],
		[1, "not a real person.", "GitHub"],
		[0, "mangled my hand.",'wsbc'],
		[1, "horny.",'wsbc'],
		[0, "TURNED HER AGAINST ME.", "anakin_skywalker"],
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
		[1,"not wearing his glasses.","Poyoarya"],
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
		[0, "killed my father.",'InigoMontoya'],
	]
};

// "I won [...]"
const win: JohnSalad = {
	water:[ 
		[5, "through pure skill.", "niffyjiffy"],
		[5, "by getting lucky.","Taerk"],
		[5, "and there's no stopping me.","Taerk"],
		[5, "by spamming.","Taerk"],
		[5, "through the power of hard work.","Taerk"],
		[5, "by out-camping you.","Taerk"],
		[5, "by dominating the neutral game.","Taerk"],
		[5, "because I know all the good combos.", "/u/KindaFunnyUsername"]
	],
	ramen:[
		[5, "because my region is better.","Taerk"],
		[5, "by cheating.","Taerk"],
		[5, "by using a broken character.","Taerk"],
		[5, "and I don't even play this game.","Taerk"],
		[5, "because my tech skill is off.", 'Graphitezepp'],
		[5, "because your main is garbage.", "/u/KindaFunnyUsername"],
		[5, "by wavecheating.", "/u/p0rtugalvii"],
		[5, "and now it's time to save the replay.", "/u/p0rtugalvii"]
	],
	ocean:[
		[5, "through the power of friendship.","Taerk"],
		[5, "through sheer willpower.","Taerk"],
		[5, "using my bloodline technique.","Taerk"],
		[5, "because you're bad.","Taerk"],
		[5, "because my controller is blessed.", "/u/DamenCF"],
		[5, "because your friends don't dance, and if they don't dance, then they're no friends of mine.", "/u/Meester_Tweester"]
	],
	wife:[
		[5, "because my wife is better than your wife.","GithubCopilot"],
		[6, ", fair and square.","wsbc"],
		[5, 'because I have plot armor.',"wsbc"],
		[6, '. You know what that means?', "wsbc"],
	]
};

const champ: NounSalad = {
	water:[
		["I", "win"]
	],
	ramen: [
		["I", "win"]
	],
	ocean: [
		["I", "win"]
	],
	wife: [
		["I", "win"]
	]
};

const taunt: TauntSalad = {
	water:[ 
		[""]
	],
	ramen:[
		["Wrecked!","Taerk"],
		["Haha!","Taerk"],
		["Get bodied!","Taerk"],
		["lol", "/u/p0rtugalvii"],
		["lmao", "/u/p0rtugalvii"],
		["(And cheating.)","Taerk"],
		["Give me my money!","Taerk"],
		["Get scammed, kid.","Taerk"],
		["<i>Okay!</i>", "/u/KindaFunnyUsername"],
		["And on stream too!","Taerk"],
		["The aura is with me!","Taerk"]
	],
	ocean:[
		["Pika-pika!","Taerk"],
		["HYES!","Taerk"],
		["FALCON WIN!","Taerk"],
		["Hoo-hah!", "/u/KindaFunnyUsername"],
		["GFYCAT!!", "BizarroFlame"],
		["Minna, miteite kure!","Marth"],
		["Omae wa mou shindeiru!", "Hokuto no Ken!"]
	],
	wife: [
		["Are you done playing video games yet, sweetie?","my_wife"],
		["Get fucked up, dawg.","HMW"],
		["I'm gonna go fuck your wife now.","Shadow"],
		["That's unlucky, pal.","wsbc"],
	]
};

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

function pastTensify(verb: string): string {
	let ferb = verb;
	if (verb === 'is') {
		// 3p singular
		ferb = 'was';
	} else if (verb === 'are') {
		// 2p singular / plural
		ferb = 'were';
	} else if (verb === 'am'){
		// 1p singular
		ferb = 'was';
	} else if (verb === 'win'){
		// this is in case we need to do something in the winner's bracket
		ferb = 'won';
	}
	return ferb;
}

function johnerate(): Johner {		
	let credit: CreditCard[] = [];
	let structure = "";
	
	// choose which johns to use
	let nounPool = is_win? champ : noun;
	let johnPool = is_win? win : john;

	const [subject, verb, nounCred] = rember(nounPool[randomCat()]);
	const [verbit, johnReason, johnCred] = rember(johnPool[randomCat()]);
			
	// Push credits
	if (nounCred)
		credit.push({series: 'subject', credit: nounCred});
	if (johnCred)
		credit.push({series: is_win? 'win' : 'john', credit: johnCred});

	// assemble the salad
	structure = subject;

	if (verbit & VERB.NOSPACE) {
		// dont need to do anything (usually)

		if (is_win && verbit&VERB.PAST){
			//this is the one case where we need to do something
			structure += ` ${pastTensify(verb)}`;
		}

	} else if (verbit & VERB.USE) {
		// we are using some form of verb
		let verbToUse = verb;
		// possibly force it to be past-tense, just to keep it interesting
		const forcePast = !rui(4);
		if (forcePast || verbit & VERB.PAST){
			// gotta conjugate it to the past tense
			verbToUse = pastTensify(verbToUse);
		}
		structure += ` ${verbToUse} `;

		// add a one-in-five chance to negate it
		if (!is_win && !rui(5)){
			structure += "not ";
		}
	} else {
		// in this case, we just add a space
		structure += ' ';
	}
	
	// finally, append the john
	structure += johnReason;

	if (is_win){
		// and then we taunt for style points.
		const [tauntext, tauntCred] = rember(taunt[randomCat()]);
		if (tauntCred)
			credit.push({series: 'taunt', credit: tauntCred});
		structure += ` ${tauntext}`;
	}

	// my b
	if (!rui(200)) {
		structure = "my b";
		credit.length = 0;
	}
		
	// grammar fix
	structure = structure.replace("s's", "s'").replace("I's", "My").replace("You's", "Your");
	structure = structure.replace("not not ","");
	
	// generate the credit text
	let credit_text = credit.length ? `Credit: ${credit.map(cred=>formatCredit(cred)).join(', ')}` : '';
	
	return {structure, credit_text};
}

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
	if (logs.length > 10) {
		logs.splice(0,1);
	}
	logs.push({structure, credit_text});
	
	// add something to the counter? idk man.
	count++;
	const countement = document.querySelector('div#john-chamber #count');
	if (countement) {
		countement.innerHTML = String(count);
	}
}

function formatCredit(credit: CreditCard): string {
	return `[${credit.series}:${credit.credit}]`;
}

function Bev_StartJohns(ev:PointerEvent){
	try {
		const johnest = johnerate();
		insert_john(johnest);
	}catch(errata){}
}

function backJohn() {
	if (logs.length > 1) {
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
		if (target.getAttribute('data-win-status') === 'win'){
			setWinStatus(true);
		} else {
			setWinStatus(false);
		}
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
		// clear the salt buttons
		const saltButtons = Array.from(document.querySelectorAll('div#john-chamber .salt-button'));
		saltButtons.forEach((button) => {
			button.classList.remove('active');
		});

		// set this salt button to "salt"
		let target = ev.target as HTMLElement;
		target.classList.add('active');

		// set the salt_level
		let saltLevel = Number.parseInt(target.getAttribute('data-salt-level') || '0', 10);
		if (Number.isInteger(saltLevel) && saltLevel >= 0 && saltLevel <= 2) {
			salt_level = saltLevel;
			wife_mode = false;
		} else {
			// she's gone from suck to blow
			salt_level = 3;
			wife_mode = true;
		}
	}catch(er){}
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
