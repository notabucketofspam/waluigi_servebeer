import {
	noun, champ, john, win, taunt
} from "./public-library.js";
import { johnerate as johnerate_III } from "./thanks-gemini.js";
import { johnerate_IV } from "./johnerate-ultra.js";
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

// ------------------------------------------------

const verdict: Record<string,Partial<VerbTense>> = {
	//@ts-ignore
	__proto__:null,
	"be":{
		past:{
			s:[_,"was","were","was"],
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

let logs: Johner[] = [];
let count = 0;
let salt_level = 3;
let is_win = false;
let wife_mode = true;
const MAX_LOG_SIZE = 1e3;

import {rui, rember} from '../../NEO.js';

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
	const [subject, verbReq, nounCred] = rember(nounPool);
	const [verbit, johnReason, johnCred] = rember(johnPool);
	
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

		if (gamble(20)) {
			// add a chance for this to be a canon event
			structure = `${structure.trim()}, canonically, `;
		} else if (gamble(20)) {
			// this is a crime
			structure = `${structure.trim()} illegally `;
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
		const [tauntext, tauntCred] = rember(taunt);
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

function johnerate_II(): Johner {
	return is_win ? johnerate() : johnerate_IV();
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
	logs.push({structure, credit_text});
	if (logs.length > MAX_LOG_SIZE) {
		logs.shift;
	}
	
	// add something to the counter? idk man.
	count++;
	const countement = document.querySelector('div#john-chamber #count');
	if (countement) {
		countement.innerHTML = String(count);
	}
}

function Bev_StartJohns(ev:PointerEvent){
	try {
		const johnest = johnerate_II();
		insert_john(johnest);
	}catch(errata){
		console.error(errata);
	}
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

function john_purity(n:number = 1e3){
	const plogs: Set<string> = new Set();

	for (let i=0;i<n;i++){
		plogs.add(johnerate().structure);
	}
		
	const purity = plogs.size/n;
	return purity;
}
(window as any).john_purity = john_purity;

export { conjugate, gamble, formatCredit };
