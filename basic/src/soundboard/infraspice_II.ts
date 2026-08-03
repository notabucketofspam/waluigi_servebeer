//@ts-ignore
import "/page/soundboard/opodes/boards.js";

// ===================================== a whole lot of topmost ui things ======
// --------------- this is how we do searches

var flatbread: string[] = [];

function init_flatbread() {
  // flatbread = window?.board?.flatMap(boa => boa.sound.map(sou => boa.name + '/' + sou)) || [];
  flatbread = window?.board?.flatMap(function(boardish) {
    if ('sound' in boardish) {
      // a normal board
      let boa = boardish as Board;
      return boa.sound.map(sou => boa.name + '/' + sou);
    } else {
      // a board group
      let boaGroup = boardish as BoardGroup;
      return boaGroup.boards.flatMap(boa => boa.sound.map(sou => boa.name + '/' + sou));
    }
  }) || [];
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
  const boat_hider = document.getElementById('boat_hider');
  boat_hider?.addEventListener('click', hidemyboat);
  init_shouldntOpen();
}

// --------- where is the boat?
function dudeWheresMyBoat() {
  let multiple_boats = window.board.map(boa => {
    return promote(boa.title ?? boa.name, `group_${boa.name}`);
  });
  var navboat_shown = localStorage.getItem("soundboard_navboat_captains_style_display");
  navboat_shown ??= 'none';
  var captains = document.getElementById("captains");
  if (captains) {
    captains.append(promote('Controls', 'clockbot_zone'));
    captains.append(promote('The Sounds You Love', 'love_zone'));
    captains.append(...multiple_boats);
    captains.style.display = navboat_shown === 'none' ? 'contents' : 'none';
  }
  hidemyboat();
}

/** this is how a man ascends to captainhood :^) */
function promote(innerText:string, targetId:string){
  const navbutton = document.createElement('button');
  navbutton.classList.add('choking_hazard');
  navbutton.innerText = innerText;
  navbutton.dataset['scrollto'] = targetId;
  navbutton.id = `navbutton_${targetId}`;
  navbutton.addEventListener('click', navbutton_click);

  const div = document.createElement('div');
  div.classList.add('capHodl');
  div.append(navbutton);

  const subboards = document.getElementById(targetId)?.querySelector('div.subboards');
  if (subboards) {
    const innerDiv = document.createElement('div');
    const burbs = Array.from(subboards.children).map(subboard => {
      return promote((subboard.getAttribute('data-title') ?? subboard.querySelector('h3')?.innerText ?? '???'), subboard.id);
    });
    innerDiv.append(...burbs);
    innerDiv.id = `subnav_${targetId}`;
    innerDiv.classList.add('subnav');
    innerDiv.style.display = 'none';
    
    div.dataset['subnav'] = innerDiv.id;
    div.addEventListener('pointerenter', navSubmarine);
    div.addEventListener('pointerleave', navSubmarine_hide);
    div.append(innerDiv);
  }
  return div;
}

function navSubmarine(ev:Event) {
  try {
    console.log(ev);
    const div = ev.currentTarget as HTMLDivElement;
    const subnav_id = div.dataset['subnav'];
    if (subnav_id){
      const subnav = document.getElementById(subnav_id!);
      if (subnav) {
        subnav.style.left = div.getBoundingClientRect().right + 'px';
        subnav.style.top = (-60 + div.getBoundingClientRect().top) + 'px';
        subnav.style.display = 'block';
      }
    }
  } catch(err) {
    console.error("Error in navSubmarine:", err);
  }
}
function navSubmarine_hide(ev:Event) {
  const div = ev.currentTarget as HTMLDivElement;
  const subnav_id = div.dataset['subnav'];
  if (subnav_id){
    const subnav = document.getElementById(subnav_id!);
    if (subnav) {
      subnav.style.display = 'none';
    }
  }
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
      console.log("PLEASE HELP");
    }
  }catch(err){
    console.error("Error setting up open categories:", err);
  }
}

/* hide-n-seek 
 * the goals of this section:
 * hide groups from the navboat on the left
 * hide groups from booba
 * hide files from search menu  
 */

export function init_hideNSeek() {
  const hnsMenu = createHideNSeekMenu();
  const hnsContainer = document.getElementById('hide-n-seek');
  if (hnsContainer) {
    hnsContainer.append(hnsMenu);
    document.getElementById('toggle-hns')?.addEventListener('click', () => {
      hnsMenu.showPopover();
    });
    HNS_iterate_localStorage();
    // hnsMenu.showPopover();
  }
}
/**Another init-lite function*/
function HNS_iterate_localStorage(){
  // hide individual sounds
  let hideSounds: string[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    if (localStorage.key(i)?.startsWith('soundboard::hide::')) {
      hideSounds.push(localStorage.key(i)!.replace('soundboard::hide::', ''));
    }
  }
  for (const guy of hideSounds) {
    hnsOneSound(guy, true);
  }
  // same thing, but for groups
  let hideGroups: string[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    if (localStorage.key(i)?.startsWith('soundboard::hideGroup::')) {
      hideGroups.push(localStorage.key(i)!.replace('soundboard::hideGroup::', ''));
    }
  }
  for (const group of hideGroups) {
    hnsOneGroup(group, true);
  }
}

/**this deals with flatbread and buttons*/
function hnsOneSound(fname: string, hide: boolean) {
  if (hide) {
    localStorage.setItem('soundboard::hide::' + fname, 'true');
    document.getElementById(fname)?.setAttribute('hidden', 'true');
    if (flatbread.includes(fname)) {
      flatbread.splice(flatbread.indexOf(fname), 1);      
    }
  } else {
    localStorage.removeItem('soundboard::hide::' + fname);
    document.getElementById(fname)?.removeAttribute('hidden');
    // just put it in the back, which is sloppy but whatevs
    flatbread.push(fname);
  }
}
/**this deals with navboat and booba */
function hnsOneGroup(gname: string, hide: boolean) {
  if (hide) {
    localStorage.setItem('soundboard::hideGroup::' + gname, 'true');
    document.getElementById(`group_${gname}`)?.setAttribute('hidden', 'true');
    document.getElementById(`navbutton_group_${gname}`)?.setAttribute('hidden', 'true');
  } else {
    localStorage.removeItem('soundboard::hideGroup::' + gname);
    document.getElementById(`group_${gname}`)?.removeAttribute('hidden');
    document.getElementById(`navbutton_group_${gname}`)?.removeAttribute('hidden');
  }
}

/**The actual, official hide-n-seek menu*/
function createHideNSeekMenu(){
  const hnsMenu = document.createElement('div');
  hnsMenu.id = 'hnsMenu';
  hnsMenu.setAttribute('popover', '');
  const closeButton = document.createElement('button');
  closeButton.id = "hnsClose";
  closeButton.innerText = 'Close';
  closeButton.addEventListener('click', () => {
    hnsMenu.hidePopover();
  });
  hnsMenu.append(closeButton);
  window.board.forEach(board => {
    if ('sound' in board) {
      // a normal board
      const listItems = createHNSList(board as Board);
      hnsMenu.append(listItems);
    } else {
      // a board group
      const boardGroup = board as BoardGroup;

      const div = document.createElement('div');
      div.classList.add('hnsb_SUPER');
      hnsMenu.append(div);

      const details = document.createElement('details');
      details.classList.add('hnsb');
      div.append(details);

      const summary = document.createElement('summary');
      details.append(summary);

      const h2 = document.createElement('h2');
      h2.innerText = boardGroup.title;
      h2.classList.add('hnsHeading');
      summary.append(h2);

      boardGroup.boards.forEach(board => {
        const listItems = createHNSList(board, 'h3');
        listItems.style.marginLeft = '1em';
        details.append(listItems);
      });
    }
  });
  return hnsMenu;
}

/**this is used once per group*/
function createHNSList(board: Board, hSize = 'h2') {  
  const theWholeThing = document.createElement('div');
  theWholeThing.classList.add('hnsb_MEGA');
  
// the heading container
  const headman = document.createElement('div');
  theWholeThing.append(headman);
  
  const MrPresident = document.createElement('input');
  MrPresident.type = 'checkbox';
  MrPresident.checked = !localStorage.getItem('soundboard::hideGroup::' + board.name);
  MrPresident.style.display = 'inline-block';
  MrPresident.style.position = 'relative';
  if (hSize === 'h2') {
    MrPresident.style.top = '11px';
  }
  MrPresident.addEventListener('change', getDownMisterPresident);
  headman.append(MrPresident);

  // the details container
  const detailsCapsule = document.createElement('div');
  theWholeThing.append(detailsCapsule);
  
  const details = document.createElement('details');
  details.classList.add('hnsb');
  details.style.display = 'inline-block';
  detailsCapsule.append(details);

  const summary = document.createElement('summary');
  details.append(summary);
  
  const heading = document.createElement(hSize);
  heading.innerText = board.title ?? board.name;
  heading.classList.add('hnsHeading');
  summary.append(heading);
  
  const ul = document.createElement('ul');
  ul.classList.add('hnsListMan');
  const lis = board.sound.map(sound => {
    const label = document.createElement('label');
    const input = document.createElement('input');
    input.value = board.name + '/' + sound;
    input.type = 'checkbox';
    input.checked = !localStorage.getItem('soundboard::hide::' + input.value);
    input.addEventListener('change', handleHNSInputChange);
    label.append(input);
    label.insertAdjacentText('beforeend', sound);
    const li = document.createElement('li');
    li.append(label);
    return li;
  });
  ul.append(...lis);
  details.append(ul);

  return theWholeThing;
}
/**handle change event for individual sound checkboxes */
function handleHNSInputChange(ev: Event) {
  const input = ev.target as HTMLInputElement;
  const fname = input.value;
  const isChecked = input.checked;
  hnsOneSound(fname, !isChecked);
}

/**hide the whole group*/
function getDownMisterPresident(ev: Event) {
  const el = ev.target as HTMLInputElement;
  const details = el?.parentElement?.nextElementSibling?.firstElementChild as HTMLDetailsElement | null;
  if (details) {
    const checkboxes = details.querySelectorAll('input[type="checkbox"]') as NodeListOf<HTMLInputElement>;
    const checkBoxesArray = Array.from(checkboxes);
    checkBoxesArray.forEach(checkbox => {
      checkbox.checked = el.checked;
      //console.log(checkbox.value, checkbox.checked);
      hnsOneSound(checkbox.value, !el.checked);
    });
    const groupHeading = details.querySelector('h2, h3, div.sb_head');
    if (groupHeading) {
      hnsOneGroup((groupHeading as HTMLElement).innerText, !el.checked);
    }
  }
}

