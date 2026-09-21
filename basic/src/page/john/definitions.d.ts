type Johner = { structure: string, credit_text: string };

/**what kind of verb conjugation we will need for this subject*/
type VerbReq = "1s" | "2s" | "3s" | "1p" | "2p" | "3p";

type TenseLike = "past" | "pres" | "ing" | "future";
/**what time is it?*/
type VerbTense = Record<TenseLike, VerbNumber>;

/**how many men do you have?*/
type VerbNumber = Record<string, VerbPerson>;

/**who is the target of your aggression?*/
type VerbPerson = [nonth: undefined, first: string, second: string, third: string];

/**Usually the subject of our sentence*/
type Noun = [subject: string, verbReq: VerbReq, credit?: string];

/**Some kind of excuse*/
type John = [verbit: number, reason: string, credit?: string];

/**Bullying */
type Taunt = [taunt: string, credit?: string];

interface CreditCard {
	series: 'subject' | 'john' | 'win' | 'taunt' | 'both' | "none";
	credit: string;
}

type Adjective = [adj: string, credit?: string];
type VerbInt = [verb: string, credit?: string];
type VerbTrans = [verb: string, credit?: string];

interface GenState {
	verbreq: VerbReq;
	tense: keyof VerbTense;
	credits: CreditCard[];
}
type GrammarTag = string;
type Grammar = Array<Adjective | VerbInt | VerbTrans | Noun | string | GrammarTag[]>;
