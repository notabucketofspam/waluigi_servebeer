const pronounChart: PronounTuple[] = [
	["i", "me", "mine", "myself", true],
	["you", "you", "your", "yourself", true],
	["he", "him", "his", "himself", true],
	["she", "her", "hers", "herself", true],
	["it", "it", "its", "itself", true],
	["they", "them", "theirs", "themself", true],
	["we", "us", "ours", "ourselves", false],
	["you", "you", "yours", "yourselves", false],
	["they", "them", "theirs", "themselves", false]
];
type PronounTuple = [
	subject: string,
	object: string,
	possessive: string,
	reflexive: string,
	singular: boolean
];
type ProTarget = "subject" | "object" | "possessive" | "reflexive";
/**Tired of pronouns? Try Nouns Plus. Anything is possible.*/
export function pronounify(pronoun: string, verbReq: VerbReq, target: ProTarget):string {
	let cout = pronoun;
	const isSingular = verbReq.includes('s');
	let desire = pronounChart.find(function (el) {
		let rightNumber = isSingular === el[4];
		let hasOurGuy = el.includes(pronoun.toLowerCase());
		return rightNumber && hasOurGuy;
	});
	if (desire) {
		if (target === "subject") {
			cout = desire[0];
		} else if (target === "object") {
			cout = desire[1];
		} else if (target === "possessive") {
			cout = desire[2];
		} else if (target === "reflexive") {
			cout = desire[3];
		} else {
			cout = pronoun;
		}
	}
	return cout;
}

/**These are items that you can lick*/
export const items: LickableItem[] = [
	["my","eyes", "3p", "them", "niffyjiffy"],
	["the", "TV", "3s", "it", "niffyjiffy"],
	["this", "setup", "3s", "it", "Taerk"],
	['-',"I", "1s", '',"niffyjiffy"],
	["my","controller", "3s", "it", "Taerk"],
	["the","camera", "3s", "it", "Dr Deletus"],
	["your","character", "3s", "it", "/u/KindaFunnyUsername"],
	["my","chair", "3s", "it", "/u/shadowpikachu"],
	["the","lag", "3s", "it", "/u/DrankeyKrang"],
	["my","skills", "3p", "them", "/u/DrankeyKrang"],
	["my","phone", "3s", "it", "/u/DrankeyKrang"],
	["my","nose", "3s", "it", "/u/DrankeyKrang"],
	["the","control stick", "3s", "it", "/u/p0rtugalvii"],
	["the","venue", "3s", "it", "/u/p0rtugalvii"],
	["the","stage", "3s", "it", "/u/DeadLineClock"],
	["the","bracket", "3s", "it", "/u/DeadLineClock"],
	["the", "matchup", "3s", "it", "/u/DeadLineClock"],

	['-', "you", "2s", '', "Taerk"],
	["my","son", "3s", "he", "niffyjiffy"],
	["this","game", "3s", "it", "Taerk"],
	["my","hands", "3p", "them", "niffyjiffy"],
	["my","fingers", "3p", "them", "niffyjiffy"],
	["your","main", "3s", "it", "/u/KindaFunnyUsername"],
	["my","butt", "3s", "it", "/u/shadowpikachu"],
	["my","fingernails", "3p", "them", "/u/DrankeyKrang"],
	["my","breakfast", "3s", "it", "/u/deluxejoe"],
	["","Randall", "3s", "him", "/u/NormalNavi"],
	["my","3DS", "3s", "it", "/u/NormalNavi"],
	["your","3DS", "3s", "it", "/u/NormalNavi"],
	["","Smash 64", "3s", "it", "Taerk"],
	["","Melee", "3s", "it", "Taerk"],
	["","Brawl", "3s", "it", "Taerk"],
	["","Smash 4", "3s", "it", "Taerk"],
	["","Netplay", "3s", "it", "Taerk"],
	["my","drink", "3s", "it", "Taerk"],
	["your","amiibo", "3s", "him", "/u/Meester_Tweester"],
	["my","fedora", "3s", "it", "/u/PhoenixBurning"],
	['', "Mango", "3s", "him", "/u/DeadLineClock"],
	["my","ride home", "3s", "her", "/u/DeadLineClock"],

	["my","dog", "3s", "him", "/u/DeadLineClock"],
	["your","mom", "3s", "her", "Taerk"],
	["the","spectators", "3p", "them", "Taerk"],
	["the","commentators", "3p", "them", "Taerk"],
	['', "everyone", "3p", "them", "Taerk"],
	["the","desire sensor", "3s", "it", "Taerk"],
	['', "Sakurai", "3s", "him", "Taerk"],
	["the","Vernal Equinox", "3s", "it", "/u/RoflPost"],
	['-', "/r/smashbros", "3s", "it", "/u/NormalNavi"],
	['', "SmashBoards", "3s", "it", "/u/NormalNavi"],
	['', "RNGesus", "3s", "him", "/u/NormalNavi"],
	["my","Zapper", "3s", "it", "/u/NormalNavi"],
	["the","John generator", "3s", "it", "/u/NormalNavi"],
	["my","waifu", "3s", "her", "/u/radicalhighway_"],
	["the","sponsors", "3p", "them", "/u/radicalhighway_"],
	['', "Nintendo", "3s", "it", "/u/radicalhighway_"],
	['', "Twitch", "3s", "it", "/u/radicalhighway_"],
	['', "Gimr", "3s", "him", "/u/radicalhighway_"],
	['',"Mr. Game &amp; Watch", "3s", "him", "/u/radicalhighway_"],
	['',"Prog", "3s", "him", "/u/radicalhighway_"],
	['',"Doritos", "3p", "them", "/u/radicalhighway_"],
	['', "Le toucan", "3s", "him", "/u/PhoenixBurning"],
	["my","ride home", "3s", "her", "/u/DeadLineClock"],
	["the","salt shaker", "3s", "it", "/u/DeadLineClock"],
	["the","matchup", "3s", "it", "/u/DeadLineClock"],
	["the","stock market", "3s", "it", "/u/DeadLineClock"],
	['', "GRsmash", "3s", "him", "/u/DeadLineClock"],
	["my","panties", "3p", "them", "/u/DeadLineClock"],
	["the","left joycon", "3s", "it", "/u/supaPILLOT"],

	["my","controller", "3s", "it", "Poyoarya"],
	["the","sun", "3s", "it", "Poyoarya"],
	["my","hands", "3p", "them", "Poyoarya"],
	['', "everyone", "3p", "them", "Poyoarya"],
	["the","TV", "3s", "it", "Poyoarya"],
	["the","crowd", "3s", "them", "Poyoarya"],
	["my","opponent", "3s", "him", "Poyoarya"],
	["my","chair", "3s", "it", "Poyoarya"],
	["his","controller", "3s", "it", "Poyoarya"],
	['',"Meta Knight", "3s", "him", "Poyoarya"],
	["Roy's","wavedash", "3s", "it", "Poyoarya"],
	["my","mother", "3s", "her", "Poyoarya"],
	["my","brain", "3s", "it", "Poyoarya"],
	["my","3DS", "3s", "it", "Poyoarya"],
	['', "Nintendo", "3s", "it", "Poyoarya"],
	["my","Twitter followers", "3p", "them", "Poyoarya"],
	["my","eyes", "3p", "them", "Poyoarya"],
	["the","DLC", "3s", "it", "Poyoarya"],
	["the","commentators", "3p", "them", "Poyoarya"],
	["the","music", "3s", "it", "Poyoarya"],
	['', "Final Destination", "3s", "it", "Poyoarya"],
	['', "Reggie Fils-Aim&eacute;", "3s", "him", "Poyoarya"],
	['the', "venue", "3s", "it", "Poyoarya"],
	["my","skills", "3p", "them", "Poyoarya"],
	["the","stream", "3s", "it", "Poyoarya"],
	['', "Sakurai", "3s", "him", "Poyoarya"],
	["the","ledge", "3s", "it", "Poyoarya"],
	["my","foot", "3s", "it", "Poyoarya"],
	["the","C-stick", "3s", "it", "Poyoarya"],
	['', "Project M", "3s", "it", "Poyoarya"],
	["your","shoes", "3p", "them", "Poyoarya"],
	["my","mother's basement", "3s", "it", "Poyoarya"],
	["the ","USA", "3s", "it", "Poyoarya"],
	['', "tap jump", "3s", "it", "Poyoarya"],
	['', "Jigglypuff", "3s", "her", "Poyoarya"],
	['-', "I", "1s", "", "Poyoarya"],
	['', "PAC-MAN", "3s", "him", "Poyoarya"],
	['', "Cloud Strife", "3s", "him", "Poyoarya"],
	["my","scarf", "3s", "it", "Poyoarya"],
	["the","T.O.", "3s", "him", "Poyoarya"],
	['', "EVO", "3s",'it', "Poyoarya"],
	['', "Leffen", "3s", 'him', "Poyoarya"],

	['',"Smash Ultimate", "3s",'it', "wsbc"],
	['my',"Uber driver", "3s",'him', "wsbc"],
	['my',"wife", "3s",'her', "wsbc"],
	['my',"dick", "3s",'him', "wsbc"],
	['my',"tummy", "3s",'it', "wsbc"],
	['',"Hungrybox", "3s",'him', "wsbc"],
	['',"Miiverse", "3s",'it', "wsbc"],
	['This',"Man", "3s",'him', "notamacuser"],
	['the',"Wii U", "3s",'it', "wsbc"],
	['',"Donkey Kong", "3s",'him', "wsbc"],
	['',"Captain Falcon", "3s",'him', "wsbc"],
	['my',"game", "3s",'it', "notamacuser"],
	['my',"sponsor", "3s",'him', "wsbc"],
	['',"chat", "3s",'it', "wsbc"],
	['',"Alpharad", "3s",'him', "notamacuser"],
	['-',"For Glory", "3s",'it', "notamacuser"],
	['the',"wifi here", "3s",'it', "wsbc"],
	['',"Wii Fit Trainer", "3s",'her', "notamacuser"],
	['',"Falco", "3s",'him', "wsbc"],
	['',"someone", "3s",'him', "Walter White"],
	['this',"place", "3s",'it', "wsbc"],
	['Mr.',"President", "3s",'him', "wsbc"],
	["the","Voices", "3p", 'them', "wsbc"],
	["my","house", "3s", 'it', "Clark"],
];
