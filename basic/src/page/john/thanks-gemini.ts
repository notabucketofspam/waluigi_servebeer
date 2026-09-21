// ====================================================================================================================
// ============================================== thanks gemini =======================================================
import { gamble, formatCredit } from "./madden.js";
import { noun } from "./noun.js";
import { adjective } from "./adjective.js";
import { verbTrans } from "./verb-trans.js";
import { verbInt } from "./verb-int.js";
import { rember, rui } from "../../NEO.js";

import type NLP from "compromise";
declare const nlp: typeof NLP;

const pronouns: Record<string, string> = {
	//@ts-ignore
	__proto__: null,
	"1s": "I",
	"2s": "you",
	"3s": "it",
	"1p": "we",
	"2p": "you",
	"3p": "they"
};

/**\<Tag\> for grammar rules, [verb] for regex conjugator*/
const grammar: Record<string, Grammar> = {
	Sentence: [
		["<Subject>", "<Predicate>"]
	],

	Subject: noun,

	Predicate: [
		["<Verb_Intransitive>"],
		["<Verb_Intransitive>", "<Flavor>"],
		["<BeVerb>", "<Adjective>"]
	],

	Verb_Intransitive: verbInt,

	BeVerb: [
		"[be]"
	],

	Adjective: adjective,

	Flavor: [""]
};

function conjugate(verb: string, verbReq: VerbReq, tense: keyof VerbTense):string {
	let res = "";

	if (tense === 'past' || tense === 'pres' || tense === 'ing') {
		const sub = pronouns[verbReq] || "";
		let doc = nlp(`${sub} ${verb}`);
		let v = doc.verbs();
		if (tense === "past") {
			v.toPastTense();
		} else if (tense === "pres") {
			v.toPresentTense();
		} else if (tense === "ing") {
			v.toGerund();
		}
		res = v.text().replace(sub, '').trim();
	} else {
		// no tense, maybe?
		res = verb;
	}
	return res;
}

function isGrammarTag(token: any): boolean {
	return typeof token === "string" && token.startsWith("<") && token.endsWith(">");
}

function expand(symbol: string, state: GenState): string {
	const key = symbol.replace(/[<>]/g, "");
	let res = "";
	if (grammar[key]) {

		const productions = grammar[key];
		const gram = rember(productions);

		if (gram) {
			if (Array.isArray(gram)) {
				// test to see what kind of token this is
				if (gram.length === 3 && gram[1] in pronouns) {
					// this is a Noun Tuple [text, verbReq, credit?]
					const vreq = gram[1] as VerbReq;
					state.verbreq = vreq;
					res = gram[0];
					if (gram[2]) {
						state.credits.push({ series: "subject", credit: gram[2] });
					}
				} else {
					const hasGrammarTags = gram.some(isGrammarTag);
					if (hasGrammarTags) {
						// gotta resolve grammar rules
						const resolvedTokens = gram.map(token => token && isGrammarTag(token) ? expand(token, state) : token);
						res = resolvedTokens.filter(x=>typeof x === "string").join(" ");
					} else {
						// its some sort of phrase
						res = gram[0];
						const cred = gram.at(-1);
						if (typeof cred === "string") {
							state.credits.push({ series: "john", credit: cred });
						}
					}
				}
			} else if (typeof gram === "string") {
				// this is also just a raw string
				res = gram;
			} else {
				// idk
			}
		} else {
			// there was no chosen rule
		}
	} else {
		// it's a raw word, and we give it back
		res = symbol;
	}
	return res;
}

function processConjugations(rawString: string, state: GenState): string {	
	const { verbreq: req, tense } = state;
	const x = rawString.replace(/(\[.*?\])/, (match) => {
		const rootVerb = match.slice(1, -1);
		return conjugate(rootVerb, req, tense);
	});
	return x;
}

function johnerate(): Johner {
	let state: GenState = {
		verbreq: "3s",
		tense: rember(['past', 'pres', 'ing']),
		credits: []
	};

	let rawStructure = expand("<Sentence>", state);
	console.log(rawStructure, state);
	if (rawStructure.includes('[be]') && state.tense === 'ing') {
		// dont want to have "is being" in my sentence
		state.tense = rember(['past', 'pres']);
	}
	let structure = processConjugations(rawStructure, state);

	structure = structure.charAt(0).toUpperCase() + structure.slice(1);
	structure = structure.replace(/\s+/g, ' ').trim();

	// Temporary credit placeholder while testing
	const credit = state.credits;
	let credit_text = credit.length ? `Credit: ${credit.map(cred => formatCredit(cred)).join(' ')}` : '';

	return { structure, credit_text };
}

export { johnerate };
