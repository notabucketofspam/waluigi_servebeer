export function conjugate_III(verb: string, req: VerbReq, tense: TenseLike): string {
	let vout = verb;
	const vitem = verblist[verb];
	if (vitem) {
		const vtense = vitem[tense];
		if (vtense) {
			if (req === '1s') {
				vout = vtense[0];
			} else if (req === '2s') {
				vout = vtense[1];
			} else if (req === '3s') {
				vout = vtense[2];
			} else if (req === '1p') {
				vout = vtense[3];
			} else if (req === '2p') {
				vout = vtense[4];
			} else if (req === '3p') {
				vout = vtense[5];
			} else {
				vout = verb;
			}
		}
	}
	return vout;
}
const verblist: Record<string, VerbItem> = {
	be: {
		past: ["was", "were", "was", "were", "were", "were"],
		pres: ["am", "are", "is", "are", "are", "are"],
		ing: ["being", "being", "being", "being", "being", "being"]
	},
	win: {
		past: ["won", "won", "won", "won", "won", "won"],
		pres: ["win", "win", "wins", "win", "win", "win"],
		ing: ["winning", "winning", "winning", "winning", "winning", "winning"]
	},
	lose: {
		past: ["lost", "lost", "lost", "lost", "lost", "lost"],
		pres: ["lose", "lose", "loses", "lose", "lose", "lose"],
		ing: ["losing", "losing", "losing", "losing", "losing", "losing"]
	},
	"camp": {
		past: ["camped", "camped", "camped", "camped", "camped", "camped"],
		pres: ["camp", "camp", "camps", "camp", "camp", "camp"],
		ing: ["camping", "camping", "camping", "camping", "camping", "camping"]
	},
	hack: {
		past: ["hacked", "hacked", "hacked", "hacked", "hacked", "hacked"],
		pres: ["hack", "hack", "hacks", "hack", "hack", "hack"],
		ing: ["hacking", "hacking", "hacking", "hacking", "hacking", "hacking"]
	},
	cheat: {
		past: ["cheated", "cheated", "cheated", "cheated", "cheated", "cheated"],
		pres: ["cheat", "cheat", "cheats", "cheat", "cheat", "cheat"],
		ing: ["cheating", "cheating", "cheating", "cheating", "cheating", "cheating"]
	},
	listen: {
		past: ["listened", "listened", "listened", "listened", "listened", "listened"],
		pres: ["listen", "listen", "listens", "listen", "listen", "listen"],
		ing: ["listening", "listening", "listening", "listening", "listening", "listening"]
	},
	mess: {
		past: ["messed", "messed", "messed", "messed", "messed", "messed"],
		pres: ["mess", "mess", "messes", "mess", "mess", "mess"],
		ing: ["messing", "messing", "messing", "messing", "messing", "messing"]
	},
	use: {
		past: ["used", "used", "used", "used", "used", "used"],
		pres: ["use", "use", "uses", "use", "use", "use"],
		ing: ["using", "using", "using", "using", "using", "using"]
	},
	kill: {
		past: ["killed", "killed", "killed", "killed", "killed", "killed"],
		pres: ["kill", "kill", "kills", "kill", "kill", "kill"],
		ing: ["killing", "killing", "killing", "killing", "killing", "killing"]
	},
	make: {
		past: ["made", "made", "made", "made", "made", "made"],
		pres: ["make", "make", "makes", "make", "make", "make"],
		ing: ["making", "making", "making", "making", "making", "making"]
	},
	explode: {
		past: ["exploded", "exploded", "exploded", "exploded", "exploded", "exploded"],
		pres: ["explode", "explode", "explodes", "explode", "explode", "explode"],
		ing: ["exploding", "exploding", "exploding", "exploding", "exploding", "exploding"]
	},
	slip: {
		past: ["slipped", "slipped", "slipped", "slipped", "slipped", "slipped"],
		pres: ["slip", "slip", "slips", "slip", "slip", "slip"],
		ing: ["slipping", "slipping", "slipping", "slipping", "slipping", "slipping"]
	},
	stare: {
		past: ["stared", "stared", "stared", "stared", "stared", "stared"],
		pres: ["stare", "stare", "stares", "stare", "stare", "stare"],
		ing: ["staring", "staring", "staring", "staring", "staring", "staring"]
	},
	nudge: {
		past: ["nudged", "nudged", "nudged", "nudged", "nudged", "nudged"],
		pres: ["nudge", "nudge", "nudges", "nudge", "nudge", "nudge"],
		ing: ["nudging", "nudging", "nudging", "nudging", "nudging", "nudging"]
	},
	throw: {
		past: ["threw", "threw", "threw", "threw", "threw", "threw"],
		pres: ["throw", "throw", "throws", "throw", "throw", "throw"],
		ing: ["throwing", "throwing", "throwing", "throwing", "throwing", "throwing"]
	},
	have: {
		past: ["had", "had", "had", "had", "had", "had"],
		pres: ["have", "have", "has", "have", "have", "have"],
		ing: ["having", "having", "having", "having", "having", "having"]
	},
	call: {
		past: ["called", "called", "called", "called", "called", "called"],
		pres: ["call", "call", "calls", "call", "call", "call"],
		ing: ["calling", "calling", "calling", "calling", "calling", "calling"]
	},
	get: {
		past: ["got", "got", "got", "got", "got", "got"],
		pres: ["get", "get", "gets", "get", "get", "get"],
		ing: ["getting", "getting", "getting", "getting", "getting", "getting"]
	},
	murder: {
		past: ["murdered", "murdered", "murdered", "murdered", "murdered", "murdered"],
		pres: ["murder", "murder", "murders", "murder", "murder", "murder"],
		ing: ["murdering", "murdering", "murdering", "murdering", "murdering", "murdering"]
	},
	tell: {
		past: ["told", "told", "told", "told", "told", "told"],
		pres: ["tell", "tell", "tells", "tell", "tell", "tell"],
		ing: ["telling", "telling", "telling", "telling", "telling", "telling"]
	},
	save: {
		past: ["saved", "saved", "saved", "saved", "saved", "saved"],
		pres: ["save", "save", "saves", "save", "save", "save"],
		ing: ["saving", "saving", "saving", "saving", "saving", "saving"]
	},
	want: {
		past: ["wanted", "wanted", "wanted", "wanted", "wanted", "wanted"],
		pres: ["want", "want", "wants", "want", "want", "want"],
		ing: ["wanting", "wanting", "wanting", "wanting", "wanting", "wanting"]
	},
	steal: {
		past: ["stole", "stole", "stole", "stole", "stole", "stole"],
		pres: ["steal", "steal", "steals", "steal", "steal", "steal"],
		ing: ["stealing", "stealing", "stealing", "stealing", "stealing", "stealing"]
	},
	walk: {
		past: ["walked", "walked", "walked", "walked", "walked", "walked"],
		pres: ["walk", "walk", "walks", "walk", "walk", "walk"],
		ing: ["walking", "walking", "walking", "walking", "walking", "walking"]
	},
	tangle: {
		past: ["tangled", "tangled", "tangled", "tangled", "tangled", "tangled"],
		pres: ["tangle", "tangle", "tangles", "tangle", "tangle", "tangle"],
		ing: ["tangling", "tangling", "tangling", "tangling", "tangling", "tangling"]
	},
	sleep: {
		past: ["slept", "slept", "slept", "slept", "slept", "slept"],
		pres: ["sleep", "sleep", "sleeps", "sleep", "sleep", "sleep"],
		ing: ["sleeping", "sleeping", "sleeping", "sleeping", "sleeping", "sleeping"]
	},
	taunt: {
		past: ["taunted", "taunted", "taunted", "taunted", "taunted", "taunted"],
		pres: ["taunt", "taunt", "taunts", "taunt", "taunt", "taunt"],
		ing: ["taunting", "taunting", "taunting", "taunting", "taunting", "taunting"]
	},
	remind: {
		past: ["reminded", "reminded", "reminded", "reminded", "reminded", "reminded"],
		pres: ["remind", "remind", "reminds", "remind", "remind", "remind"],
		ing: ["reminding", "reminding", "reminding", "reminding", "reminding", "reminding"]
	},
	violate: {
		past: ["violated", "violated", "violated", "violated", "violated", "violated"],
		pres: ["violate", "violate", "violates", "violate", "violate", "violate"],
		ing: ["violating", "violating", "violating", "violating", "violating", "violating"]
	},
	run: {
		past: ["ran", "ran", "ran", "ran", "ran", "ran"],
		pres: ["run", "run", "runs", "run", "run", "run"],
		ing: ["running", "running", "running", "running", "running", "running"]
	},
	speak: {
		past: ["spoke", "spoke", "spoke", "spoke", "spoke", "spoke"],
		pres: ["speak", "speak", "speaks", "speak", "speak", "speak"],
		ing: ["speaking", "speaking", "speaking", "speaking", "speaking", "speaking"]
	},
	spam: {
		past: ["spammed", "spammed", "spammed", "spammed", "spammed", "spammed"],
		pres: ["spam", "spam", "spams", "spam", "spam", "spam"],
		ing: ["spamming", "spamming", "spamming", "spamming", "spamming", "spamming"]
	},
	do: {
		past: ["did", "did", "did", "did", "did", "did"],
		pres: ["do", "do", "does", "do", "do", "do"],
		ing: ["doing", "doing", "doing", "doing", "doing", "doing"]
	},
	sit: {
		past: ["sat", "sat", "sat", "sat", "sat", "sat"],
		pres: ["sit", "sit", "sits", "sit", "sit", "sit"],
		ing: ["sitting", "sitting", "sitting", "sitting", "sitting", "sitting"]
	},
	shield: {
		past: ["shielded", "shielded", "shielded", "shielded", "shielded", "shielded"],
		pres: ["shield", "shield", "shields", "shield", "shield", "shield"],
		ing: ["shielding", "shielding", "shielding", "shielding", "shielding", "shielding"]
	},
	"air dodge": {
		past: ["air dodged", "air dodged", "air dodged", "air dodged", "air dodged", "air dodged"],
		pres: ["air dodge", "air dodge", "air dodges", "air dodge", "air dodge", "air dodge"],
		ing: ["air dodging", "air dodging", "air dodging", "air dodging", "air dodging", "air dodging"]
	},
	"only use": {
		past: ["only used", "only used", "only used", "only used", "only used", "only used"],
		pres: ["only use", "only use", "only uses", "only use", "only use", "only use"],
		ing: ["only using", "only using", "only using", "only using", "only using", "only using"]
	},
	"only go": {
		past: ["only went", "only went", "only went", "only went", "only went", "only went"],
		pres: ["only go", "only go", "only goes", "only go", "only go", "only go"],
		ing: ["only going", "only going", "only going", "only going", "only going", "only going"]
	},
	"do not go": {
		past: ["did not go", "did not go", "did not go", "did not go", "did not go", "did not go"],
		pres: ["does not go", "does not go", "does not go", "does not go", "does not go", "does not go"],
		ing: ["not going", "not going", "not going", "not going", "not going", "not going"]
	},
	pick: {
		past: ["picked", "picked", "picked", "picked", "picked", "picked"],
		pres: ["pick", "pick", "picks", "pick", "pick", "pick"],
		ing: ["picking", "picking", "picking", "picking", "picking", "picking"]
	},
	"block": {
		past: ["blocked", "blocked", "blocked", "blocked", "blocked", "blocked"],
		pres: ["block", "block", "blocks", "block", "block", "block"],
		ing: ["blocking", "blocking", "blocking", "blocking", "blocking", "blocking"]
	},
	threaten: {
		past: ["threatened", "threatened", "threatened", "threatened", "threatened", "threatened"],
		pres: ["threaten", "threaten", "threatens", "threaten", "threaten", "threaten"],
		ing: ["threatening", "threatening", "threatening", "threatening", "threatening", "threatening"]
	},
	mangle: {
		past: ["mangled", "mangled", "mangled", "mangled", "mangled", "mangled"],
		pres: ["mangle", "mangle", "mangles", "mangle", "mangle", "mangle"],
		ing: ["mangling", "mangling", "mangling", "mangling", "mangling", "mangling"]
	},
	eat: {
		past: ["ate", "ate", "ate", "ate", "ate", "ate"],
		pres: ["eat", "eat", "eats", "eat", "eat", "eat"],
		ing: ["eating", "eating", "eating", "eating", "eating", "eating"]
	},
	crash: {
		past: ["crashed", "crashed", "crashed", "crashed", "crashed", "crashed"],
		pres: ["crash", "crash", "crashes", "crash", "crash", "crash"],
		ing: ["crashing", "crashing", "crashing", "crashing", "crashing", "crashing"]
	},
	fart: {
		past: ["farted", "farted", "farted", "farted", "farted", "farted"],
		pres: ["fart", "fart", "farts", "fart", "fart", "fart"],
		ing: ["farting", "farting", "farting", "farting", "farting", "farting"]
	},
	betray: {
		past: ["betrayed", "betrayed", "betrayed", "betrayed", "betrayed", "betrayed"],
		pres: ["betray", "betray", "betrays", "betray", "betray", "betray"],
		ing: ["betraying", "betraying", "betraying", "betraying", "betraying", "betraying"]
	},
	"counter-pick": {
		past: ["counter-picked", "counter-picked", "counter-picked", "counter-picked", "counter-picked", "counter-picked"],
		pres: ["counter-pick", "counter-pick", "counter-picks", "counter-pick", "counter-pick", "counter-pick"],
		ing: ["counter-picking", "counter-picking", "counter-picking", "counter-picking", "counter-picking", "counter-picking"]
	},
	"self-destruct": {
		past: ["self-destructed", "self-destructed", "self-destructed", "self-destructed", "self-destructed", "self-destructed"],
		pres: ["self-destruct", "self-destruct", "self-destructs", "self-destruct", "self-destruct", "self-destruct"],
		ing: ["self-destructing", "self-destructing", "self-destructing", "self-destructing", "self-destructing", "self-destructing"]
	},
	"only play": {
		past: ["only played", "only played", "only played", "only played", "only played", "only played"],
		pres: ["only play", "only play", "only plays", "only play", "only play", "only play"],
		ing: ["only playing", "only playing", "only playing", "only playing", "only playing", "only playing"]
	},
	team: {
		past: ["teamed", "teamed", "teamed", "teamed", "teamed", "teamed"],
		pres: ["team", "team", "teams", "team", "team", "team"],
		ing: ["teaming", "teaming", "teaming", "teaming", "teaming", "teaming"]
	},
	"do not": {
		past: ["did not", "did not", "did not", "did not", "did not", "did not"],
		pres: ["does not", "does not", "does not", "does not", "does not", "does not"],
		ing: ["not", "not", "not", "not", "not", "not"]
	},
	"totally spook": {
		past: ["totally spooked", "totally spooked", "totally spooked", "totally spooked", "totally spooked", "totally spooked"],
		pres: ["totally spook", "totally spook", "totally spooks", "totally spook", "totally spook", "totally spook"],
		ing: ["totally spooking", "totally spooking", "totally spooking", "totally spooking", "totally spooking", "totally spooking"]
	},
	"do not wear": {
		past: ["did not wear", "did not wear", "did not wear", "did not wear", "did not wear", "did not wear"],
		pres: ["does not wear", "does not wear", "does not wear", "does not wear", "does not wear", "does not wear"],
		ing: ["not wearing", "not wearing", "not wearing", "not wearing", "not wearing", "not wearing"]
	},
	"do not let": {
		past: ["did not let", "did not let", "did not let", "did not let", "did not let", "did not let"],
		pres: ["does not let", "does not let", "does not let", "does not let", "does not let", "does not let"],
		ing: ["not letting", "not letting", "not letting", "not letting", "not letting", "not letting"]
	},
	hurt: {
		past: ["hurt", "hurt", "hurt", "hurt", "hurt", "hurt"],
		pres: ["hurt", "hurt", "hurts", "hurt", "hurt", "hurt"],
		ing: ["hurting", "hurting", "hurting", "hurting", "hurting", "hurting"]
	}

};
