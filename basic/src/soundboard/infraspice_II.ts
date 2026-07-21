//@ts-ignore
import "/page/soundboard/opodes/boards.js";

// ===================================== a whole lot of topmost ui things ======
// --------------- this is how we do searches

var flatbread: string[] = [];

function init_flatbread() {
  flatbread = window?.board?.flatMap(boa => boa.sound.map(sou => boa.name + '/' + sou)) || [];
}

import { beep } from './cacophony_II.js';

export function init_searchFeature() {
  try {
    init_flatbread();
    init_soundsearch();
    init_allsounds();
    document.getElementById('FIND_rewindSearch')?.addEventListener('click', rewind_search);
    document.getElementById('PLAY_fromSearch')?.addEventListener('click', play_from_search);
  } catch (err) {}
}

function init_soundsearch() {
  const soundsearch = document.getElementById('soundsearch') as HTMLInputElement | null;
  if (soundsearch) {
    soundsearch.addEventListener('input', soundsearch_input);
    soundsearch.addEventListener('blur', soundsearch_blur);
    soundsearch.addEventListener('focus', soundsearch_focus);
   } else {
    // soundsearch is missing!
  }
}

function soundsearch_input(ev: Event) {
  try {
    let target = ev.target as HTMLInputElement;
    if (typeof target.value === 'string') {
			let etv = target.value;
      if (etv === '') {
        target.blur();
        target.focus();
        allsounds_construct(etv);
      } else if (flatbread.includes(etv)) {
        beep(etv);
        allsounds_show(false);
      } else {
        sessionStorage.setItem('most-recent-search', etv);
				allsounds_construct(etv);
      }
    }
  } catch (err) {}
}

function soundsearch_blur() {
  setTimeout(() => {
    allsounds_show(false);
	});
};

function soundsearch_focus() {
  setTimeout(() => {
    const soundsearch = document.getElementById('soundsearch') as HTMLInputElement | null;
    if (soundsearch) {
      allsounds_construct(soundsearch.value);
    }
  });
};

function init_allsounds() {
  const allsounds = document.getElementById('all-sounds');
  if (allsounds) {
    allsounds.addEventListener('mousedown', allsounds_mousedown);
  }
}
/**
 * this is where we create the list
 * @param {string} etv
 */
function allsounds_construct(etv:string) {
  const allsounds = document.getElementById('all-sounds');
  if (!allsounds) return;

  const filterbread = etv ? flatbread.filter(s => (s.toLowerCase()).includes(etv.toLowerCase())) : flatbread;
  const phatbread = filterbread.map(s => `<span data-sound="${s}">${s}</span>`);
  const johnbread = phatbread.join('');
  allsounds.replaceChildren();
  allsounds.insertAdjacentHTML('beforeend', johnbread);
  allsounds_show(true);
}
function allsounds_mousedown(ev: MouseEvent) {
  try {
    const target_real = (ev.target as HTMLElement).closest('span');
    if (target_real?.dataset?.sound) {
			let thesound = target_real.dataset.sound;
      const soundsearch = document.getElementById('soundsearch') as HTMLInputElement | null;
      if (soundsearch) {        
			  soundsearch.value = thesound;
      }
      allsounds_show(false);
			beep(thesound);
    }
	} catch (err) { }
}

function allsounds_show(actually:boolean) {
  const allsounds = document.getElementById('all-sounds');
  if (!allsounds) return;
	if (actually) {
		allsounds.removeAttribute('hidden');
	} else {
		allsounds.setAttribute('hidden', '');
	}
}
function rewind_search() {
  const soundsearch = document.getElementById('soundsearch') as HTMLInputElement | null;
  if (!soundsearch) return;

  let mrs_maybe = sessionStorage.getItem('most-recent-search');
  if (mrs_maybe) {
    soundsearch.value = mrs_maybe;
  } else {
    soundsearch.value = '';
  }
  soundsearch.blur();
  soundsearch.focus();
  if (mrs_maybe) {
		allsounds_construct(mrs_maybe);
  }
}
function play_from_search() {
  const soundsearch = document.getElementById('soundsearch') as HTMLInputElement | null;
  if (!soundsearch) return;

  if (soundsearch.value === '') {
    soundsearch.blur();
    soundsearch.focus();
  } else if (flatbread.includes(soundsearch.value)) {
    beep(soundsearch.value);
  }
}

// ======================= this section has misc ui controls =======================

// -------- the number of columns for all the groups of buttons
function setHowManyButtons(target: HTMLInputElement) {
  var wideness = target.valueAsNumber;
  localStorage["sb_width"] = wideness;
  var body_size = document.body.getBoundingClientRect().width;
  var max_buttons = Math.trunc(body_size / 160);
  var wideness_real = Math.min(wideness, max_buttons);

  var div_sounds = Array.from(document.querySelectorAll('div.sounds')) as Array<HTMLDivElement>;
  div_sounds.forEach(dale => {
    dale.style.setProperty('grid-template-columns', `repeat(${wideness_real}, 1fr)`);
  });
  var sounds_havers = Array.from(document.querySelectorAll(':has(>div.sounds)')) as Array<HTMLElement>;
  sounds_havers.forEach(haver => {
    haver.style.setProperty('max-width', `calc(8.5in + ${(wideness_real - 5) * 160}px)`);
  });
}
function setHowManyButtonsFromEvent(ev: Event) {
  const target = ev.target as HTMLInputElement;
  if (target && target.type === 'range') {
    setHowManyButtons(target);
  }
}

function init_width_control() {
  // check disk for values
  let sb_width = localStorage.getItem("sb_width");
  if (sb_width) {
    // leave it alone
  } else {
    // gotta set it to the default value
     sb_width = "5";
    let docRoot = document.querySelector(':root') as HTMLElement | null;
    if (docRoot) {
      // has doc root
     sb_width = getComputedStyle(docRoot).getPropertyValue('--how-many-buttons');
    } else {
      // just let it be at five
    }
    localStorage.setItem("sb_width", sb_width);
  }
  var width_control = document.getElementById('width_control') as HTMLInputElement | null;
  if (width_control) {
    width_control.addEventListener('input', setHowManyButtonsFromEvent);
    width_control.setAttribute('value', sb_width);
    setTimeout(function() {
      setHowManyButtons(width_control as HTMLInputElement);
    });  
  }
}

/** that lil button that says "where?" next to clockbot*/
function init_whereHelp() {
  const where_help = document.getElementById('where_help');
  where_help?.addEventListener('click', ev => {
    var greatanswer = document.getElementById('greatanswer');
    if (greatanswer) {
      greatanswer.style.left = ev.x + 'px';
      greatanswer.style.top = ev.y + 'px';
    }
  });
}

export function init_miscUI() {
  init_width_control();
  init_whereHelp();
  dudeWheresMyBoat();
  init_shouldntOpen();
}

// --------- where is the boat?
function dudeWheresMyBoat() {
  var navboat = document.getElementById('navboat');
  let multiple_boats = window.board.map(boa => {
    const navbutton = document.createElement('button');
    navbutton.classList.add('choking_hazard');
    navbutton.innerText = boa.name;
    navbutton.dataset['scrollto'] = `group_${boa.name}`;
    navbutton.addEventListener('click', navbutton_click);
    return navbutton;
  });
  navboat?.append(...multiple_boats);
  var navboat_shown = localStorage.getItem("soundboard_navboat_captains_style_display");
  navboat_shown ??= 'none';
  var captains = document.getElementById("captains");
  if (captains) {
    captains.style.display = navboat_shown === 'none' ? 'contents' : 'none';
  }
  hidemyboat();
}

function navbutton_click(ev: MouseEvent) {
  let navbutton = ev.target as HTMLButtonElement;
  if (navbutton?.dataset?.scrollto) {
    document.getElementById(navbutton.dataset.scrollto)?.scrollIntoView();
  }
}

function hidemyboat() {
  var navboat = document.getElementById('navboat');
  var boat_hider = document.getElementById('boat_hider');
  var captains = document.getElementById("captains");
  if (!captains || !navboat || !boat_hider) return;
  
  if (captains.style.display === 'contents') {
    // we are hiding the boat
    navboat.classList.remove('navboat_classical');
    captains.style.display = 'none';
    boat_hider.innerHTML = '&gt;&gt;&gt;&gt; NAVBOAT';
  } else {
    // we are SHOWING the navboat
    navboat.classList.add('navboat_classical');
    captains.style.display = 'contents';
    boat_hider.innerHTML = '&lt;&lt;&lt;&lt; HIDE';
  }
  localStorage.setItem('soundboard_navboat_captains_style_display', captains.style.display);
}

// ----------- what categories are open and not
function init_shouldntOpen(){
  try {
    const booba = document.getElementById('booba');
    if (window.board && booba?.childElementCount) {
      // set them open or not
      var shouldnt_open = localStorage.getItem('soundboard::shouldnt_open');
      if (shouldnt_open) {
        // has it in localstorage
        const sto_shouldntOpen = JSON.parse(shouldnt_open) as string[];
        sto_shouldntOpen.forEach(man=>document.getElementById(man)?.removeAttribute("open"));
      } else {
        // missing from localstorage, so make it blank
        localStorage.setItem('soundboard::shouldnt_open', '[]');
      }
    } else {
      // booba is missing
    }
  }catch(err){
    console.error("Error setting up open categories:", err);
  }
}


