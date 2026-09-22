import { rui, rember } from "../../NEO.js";
import { formatCredit, gamble } from "./madden.js";
import { conjugate_III } from "./verblist.js";
import { noun } from "./noun.js";
import { adjective } from "./adjective.js";
import { johns_connable } from "./johns-connable.js";
import { verbInt, stickyHands } from "./verb-int.js";
const chillindude: VerbInt[] = [
	["my b", "chillindude"],
];
const amalgam = {
	johns_connable,
	adjective,
	verbInt,
	stickyHands,
	chillindude
};
type Amalgam = keyof typeof amalgam;
const distribution = {
	johns_connable: 0,
	adjective: 0,
	verbInt: 0,
	stickyHands: 0,
	chillindude: 0,
};
const tensile: TenseLike[] = ["past", "pres", "ing"];

export function johnerate_IV(): Johner {
	const credit: CreditCard[] = [];
	let structure = '';

	let [subject, vreq, scred] = rember(noun);
	credit.push({ series: 'subject', credit: scred });

	let THE_POKER_TABLE = '';
	if (gamble(20)) {
		// add a chance for this to be a canon event
		THE_POKER_TABLE = `, canonically,`;
	} else if (gamble(20)) {
		// this is a crime
		THE_POKER_TABLE = `illegally`;
	}

	let perchance = '';
	if (gamble(8)) {
		perchance = `not`;
	}

	const amy = rollTheDice();
	let tensor = rember(tensile);
	let structlike: string[] = [];

	if (amy === "johns_connable") {
		// this requires some conjugation work
		const [verb, rest, cred] = rember(amalgam[amy]);
		credit.push({ series: 'john', credit: cred });
		const conjugated = conjugate_III(verb, vreq, tensor);
		let hamlet = '';
		if (tensor === "ing") {
			const tensomniac = ingless();
			const hverb = 'be';
			hamlet = conjugate_III(hverb, vreq, tensomniac);
		}
		structlike = [subject, hamlet, THE_POKER_TABLE, perchance, conjugated, rest];

	} else {
		// we dont have to use the conjugation lookup function
		const [term, cred] = rember(amalgam[amy]);
		credit.push({ series: 'john', credit: cred });

		if (amy === "adjective") {
			// what "is" is
			const verb = "be";
			// we cant use "ing" here
			tensor = ingless();
			const conjugated = conjugate_III(verb, vreq, tensor);
			structlike = [subject, conjugated, THE_POKER_TABLE, perchance, term];

		} else if (amy === "verbInt") {
			// already in conjugated form
			structlike = [subject, THE_POKER_TABLE, term];

		} else if (amy === "stickyHands") {
			// it's important to remember that there *isnt* a space here
			structure = `${subject}${term}`;

		} else if (amy === "chillindude") {
			// poor kid...
			credit.length = 0;
			structure = term;

		} else {
			// unreachable
		}
	}

	// join it if we need to
	if (structlike.length) {
		structure = structlike.filter(Boolean).join(' ');
	}

	// grammar fix, copy-pasted from the original johnerate function
	structure = structure
		.replaceAll("s's", "s'")
		.replaceAll("I's", "My")
		.replaceAll("You's", "Your")
		.replaceAll("not not", "")
		.replaceAll(/[,.?!]\s?,/g, ',')
		.replaceAll(/\s+([,.?!])/g, '$1')
		.replaceAll(/\s{2,}/g, ' ')
		; // this is on a newline incase i add stuff later

	const johner: Johner = {
		credit_text: mapCredit(credit),
		structure
	};
	return johner;
}
function mapCredit(credit: CreditCard[]) {
	return credit.length ? `Credit: ${credit.map(cred => formatCredit(cred)).join(' ')}` : '';
}
function ingless():TenseLike {
	let tensomniac: TenseLike = 'ing';
	do {
		tensomniac = rember(tensile);
	} while (tensomniac === "ing");
	return tensomniac;
}

/**what are the odds that some phrase should be chosen?\
	this is mostly important for making sure that adjectives and normal johns aren't
	not unbiased one way or the other.*/
function calculateDistribution() {
	const adjl = adjective.length;
	const jconl = johns_connable.length;
	const vintl = verbInt.length;
	const shl = stickyHands.length;
	const cdl = chillindude.length;
	const sum = adjl + jconl + vintl + shl + cdl;

	const weightAdj = adjl / sum;
	const weightJcon = jconl / sum;
	const weightVint = vintl / sum;
	const weightSh = shl / sum;
	const weightCd = cdl / sum;

	distribution.adjective = 0 + weightAdj;
	distribution.johns_connable = weightAdj + weightJcon;
	distribution.verbInt = weightAdj + weightJcon + weightVint;
	distribution.stickyHands = weightAdj + weightJcon + weightVint + weightSh;
	distribution.chillindude = weightAdj + weightJcon + weightVint + weightSh + weightCd;
}
calculateDistribution();

function rollTheDice(): Amalgam {
	let dout: Amalgam = 'chillindude';
	const roll = Math.random();
	if (roll < distribution.adjective) {
		dout = 'adjective';
	} else if (roll < distribution.johns_connable) {
		dout = 'johns_connable';
	} else if (roll < distribution.verbInt) {
		dout = 'verbInt';
	} else if (roll < distribution.stickyHands) {
		dout = 'stickyHands';
	} else {
		dout = "chillindude";
	}
	return dout;
}
