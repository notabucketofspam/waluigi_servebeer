

// ====================================================================================================================
// ======================================== a nice lineup of spices ========================================

import { noun } from "./noun.js";

/**here's a cheatsheet for the bitmask: 
	0 - don't use subject's verb, but add a space
	1 - use
	2 - don't use verb and don't add a space
	5 - use the subject's verb in the past tense
*/
const john: John[] = [
	[2, "'s tech skill is off.", "Graphitezepp"],
	[0, "tells ridiculous johns.", "/u/Her0_0f_time"],
	[0, "doesn't understand their privilege.", "/u/GSRaposo"],
	[0, "generated my johns.", "/u/DeadLineClock"],
	[2, "... my b.", "Poyoarya"],
	[2, "<small>... n-nevermind.</small>", 'wsbc'],
];

/**YOU'RE WINNER*/
const champ: Noun[] = [
	["I", "1s"],
	["I", "1s"],
	["I", "1s"],
	["You", "2s"],
];

/**excuses for winners*/
const win: John[] = [
	[5, "through pure skill.", "niffyjiffy"],
	[5, "by getting lucky.", "Taerk"],
	[5, "and there's no stopping me.", "Taerk"],
	[5, "by spamming.", "Taerk"],
	[5, "through the power of hard work.", "Taerk"],
	[13, "I out-camped you.", "Taerk"],
	[5, "by dominating the neutral game.", "Taerk"],
	[13, "I know all the good combos.", "/u/KindaFunnyUsername"],

	[13, "my region is better.", "Taerk"],
	[5, "by cheating.", "Taerk"],
	[5, "by using a broken character.", "Taerk"],
	[5, "and I don't even play this game.", "Taerk"],
	[13, "my tech skill is off.", 'Graphitezepp'],
	[13, "your main is garbage.", "/u/KindaFunnyUsername"],
	[5, "by wavecheating.", "/u/p0rtugalvii"],
	[5, "and now it's time to save the replay.", "/u/p0rtugalvii"],

	[5, "through the power of friendship.", "Taerk"],
	[5, "through sheer willpower.", "Taerk"],
	[5, "using my bloodline technique.", "Taerk"],
	[13, "you're bad.", "Taerk"],
	[13, "my controller is blessed.", "/u/DamenCF"],
	[13, "your friends don't dance, and if they don't dance, then they're no friends of mine.", "/u/Meester_Tweester"],

	[13, "my wife is better than your wife.", "Copilot"],
	[6, ", fair and square.", "wsbc"],
	[13, 'I have plot armor.', "wsbc"],
	[6, '. You know what that means?', "wsbc"],
	[6, ", but I still love you.", "Copilot"],
	[6, ", I guess.", "wsbc"],
	[13, "they hit the second tower.", "wsbc"],
	[13, "I'm a streamer.", "wsbc"],
	[13, "I read the roll (obviously).", "wsbc"],
	[5, "with heavy mental gaming in the game.", "notamacuser"],
	[13, "I was unc.", "Clark"],
	[13, "I said so.", "wsbc"],
	[13, "I'm just better.", "wsbc"],
	[13, "I'm right.", "wsbc"],
];

/**make your opponent feel really bad about himself*/
const taunt: Taunt[] = [
	[""],

	["Wrecked!", "Taerk"],
	["Haha!", "Taerk"],
	["Get bodied!", "Taerk"],
	["lol.", "/u/p0rtugalvii"],
	["lmao.", "/u/p0rtugalvii"],
	["(And cheating.)", "Taerk"],
	["Give me my money!", "Taerk"],
	["Get scammed, kid.", "Taerk"],
	["<i>Okay!</i>", "/u/KindaFunnyUsername"],
	["And on stream too!", "Taerk"],
	["The aura is with me!", "Taerk"],

	["Pika-pika!", "Taerk"],
	["HYES!", "Taerk"],
	["FALCON WIN!", "Taerk"],
	["Hoo-hah!", "/u/KindaFunnyUsername"],
	["GFYCAT!!", "BizarroFlame"],
	["Minna, miteite kure!", "Marth"],
	["Omae wa mou shindeiru!", "Hokuto no Ken!"],

	["Are you done playing video games yet, sweetie?", "my wife"],
	["Get fucked up, dawg.", "HomeMadeWaffles"],
	["Unplug your controller, dawg.", "HomeMadeWaffles"],
	["I'm gonna go fuck your wife now.", "Shadow"],
	["That's unlucky, pal.", "wsbc"],
	["Stop it. Get some help.", "Michael Jordan"],
	["It's your fault, by the way.", "wsbc"],
	["OHHH YEAH!!!", "Kool-Aid Man"],
	["Just like me fr.", "notamacuser"],
	["Couldn't be me.", "notamacuser"],
	["jk lol.", "wsbc"],
	["How embarrassing.", "wsbc"],
	["Poggers!", "Twitch"],
	["Cringe, mate.", "wsbc"],
	[", bruh.", "wsbc"],
	[", dumbass.", "wsbc"],
	["DEEP FRIED!", "Brimmy"],
	["Skill issue.", "wsbc"],
	["WE ARE SO BACK!", "wsbc"],
	[', <span style="font-variant:small-caps">meow.</span>', "Disco"],
	[', <i>nyaa~</i>', "Disco"],
];

export { noun, john, champ, win, taunt };
