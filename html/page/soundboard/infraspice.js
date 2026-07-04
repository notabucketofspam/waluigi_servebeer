// ===================================== a whole lot of topmost ui things ======
// --------------- this is how we do searches
var allsounds_datalist = document.getElementById('all-sounds');
var allsounds = document.getElementById('all-sounds');
/**@type{string[]} */
var flatbread = [];

var real_n = 0;
/**this is a debug function and I would not recommend it.*/
function playAll() {
  if (flatbread[real_n]) {
    // keep playing sounds until we're out of stock
    beep(flatbread[real_n]);
    real_n++;
    requestAnimationFrame(playAll);
  } else {
    // reset that counter
		real_n = 0;
  }
}

function generate_flatbread() {
  if (!flatbread.length) {
    flatbread = window?.board?.flatMap(boa => boa.sound.map(sou => boa.name + '/' + sou)) || [];
		window.requestAnimationFrame(generate_flatbread);
  }
}

function init_realest() {
  generate_flatbread();
  generate_booba();
  actual_init_boat();
  generate_writeLovelist();
}
setTimeout(init_realest);

function actual_init_boat() {
	var booba_real = document.getElementById('booba');
	if (window.board && booba_real && booba_real.childElementCount) {
		dudeWheresMyBoat();
	} else {
		window.requestAnimationFrame(actual_init_boat);
  }
}

var soundsearch = document.getElementById('soundsearch');
soundsearch.addEventListener('input', ev => {
  try {
    if (typeof ev?.target?.value === 'string') {
      /**@type{string} */
			let etv = ev.target.value;
      if (etv === '') {
        soundsearch.blur();
        soundsearch.focus();
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
});
/**
 * this is where we create the list
 * @param {string} etv
 */
function allsounds_construct(etv) {
  const filterbread = etv ? flatbread.filter(s => (s.toLowerCase()).includes(etv.toLowerCase())) : flatbread;
  const phatbread = filterbread.map(s => `<span data-sound="${s}">${s}</span>`);
  const johnbread = phatbread.join('');
  allsounds.replaceChildren();
  allsounds.insertAdjacentHTML('beforeend', johnbread);
  allsounds_show(true);
}
allsounds.addEventListener('mousedown', ev => {
  try {
    const target_real = ev.target.closest('span');
    if (target_real?.dataset?.sound) {
			let thesound = target_real.dataset.sound;
			soundsearch.value = thesound;
      allsounds_show(false);
			beep(thesound);
    }
	} catch (err) { }
});
soundsearch.addEventListener('blur', ev => {
  setTimeout(() => {
    allsounds_show(false);
	});
});
soundsearch.addEventListener('focus', ev => {
  setTimeout(() => {
    allsounds_construct(soundsearch.value);
  });
});
function allsounds_show(actually) {
	if (actually) {
		allsounds.removeAttribute('hidden');
	} else {
		allsounds.setAttribute('hidden', '');
	}
}
function rewind_search() {
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
  if (soundsearch.value === '') {
    soundsearch.blur();
    soundsearch.focus();
  } else if (flatbread.includes(soundsearch.value)) {
    beep(soundsearch.value);
  }
}
// -------- the number of columns for all the groups of buttons
function setHowManyButtons(ev) {
  var wideness = ev.target.valueAsNumber;
  localStorage["sb_width"] = wideness;
  var body_size = document.body.getBoundingClientRect().width;
  var max_buttons = Math.trunc(body_size / 160);
  var wideness_real = Math.min(wideness, max_buttons);

  var div_sounds = document.querySelectorAll('div.sounds');
  div_sounds.forEach(dale => {
    dale.style.setProperty('grid-template-columns', `repeat(${wideness_real}, 1fr)`);
  });
  var sounds_havers = document.querySelectorAll(':has(>div.sounds)');
  sounds_havers.forEach(haver => {
    haver.style.setProperty('max-width', `calc(8.5in + ${(wideness_real - 5) * 160}px)`);
  });
}
var width_control = document.getElementById('width_control');
width_control.addEventListener('input', setHowManyButtons);
//var howmany = getComputedStyle(document.querySelector(':root')).getPropertyValue('--how-many-buttons');
localStorage["sb_width"] ??= getComputedStyle(document.querySelector(':root')).getPropertyValue('--how-many-buttons');
width_control.setAttribute('value', localStorage["sb_width"]);
setTimeout(function() {
  setHowManyButtons({target: width_control});
});

// ------- that lil button that says "where?"
document.getElementById('where_help').addEventListener('click', ev => {
  var greatanswer = document.getElementById('greatanswer');
  greatanswer.style.left = ev.x + 'px';
  greatanswer.style.top = ev.y + 'px';
});
// --------- some more ui things at the top
whichStorage["soundboard_clockbot_enable"] ??= 0;
clockbot_enable.checked = Number(whichStorage["soundboard_clockbot_enable"]);
clockbot_enable.addEventListener('input', (ev) => {
  whichStorage["soundboard_clockbot_enable"] = Number(ev.target.checked);
  somevolume.disabled = ev.target.checked;
});
somevolume.disabled = clockbot_enable.checked;

whichStorage["soundboard_clockbot_channel_id"] ??= "";
channel_id.value = whichStorage["soundboard_clockbot_channel_id"];

// =========== put the actual soundboards on the page
function generate_booba() {
	if (typeof make_group !== 'function' && typeof board !== 'object') {
    // gotta wait for the other js files to load in
		window.requestAnimationFrame(generate_booba);
  } else {
	  var booba_real = document.getElementById('booba');
    if (!booba_real.childElementCount) {
      window?.board?.forEach(key => make_group(booba, key));
		  show_booba_size();
		  window.requestAnimationFrame(generate_booba);
    }
  }
}

// --------- show the total number of sounds at the top of the page
function show_booba_size() {
  var pisces = document.querySelectorAll('div#booba button').length;
  var toppo = document.querySelector('div#topstuff>h2');
  toppo.innerText = pisces + 'pcs set';
}

// --------- where is the boat?
function dudeWheresMyBoat() {
  var navboat = document.getElementById('navboat');
  var shareholders = document.querySelectorAll('summary>h2');
  shareholders.forEach(man => {
    navboat.lastElementChild.insertAdjacentHTML('beforeend', `<button class="choking_hazard" onclick="document.getElementById('${man.closest('.sb').id}').scrollIntoView()">${man.innerText.split('\n')[0]}</button>`);
  });
  var navboat_shown = localStorage.getItem("soundboard_navboat_captains_style_display");
  navboat_shown ??= 'none';
  var captains = document.getElementById("captains");
  captains.style.display = navboat_shown === 'none' ? 'contents' : 'none';
  hidemyboat();
}
function hidemyboat() {
  var navboat = document.getElementById('navboat');
  var boat_hider = document.getElementById('boat_hider');
  var captains = document.getElementById("captains");
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

// ======================= this section deals with love ========================
// =========================== and its repurcussions ===========================
var kiddos = document.getElementById('love_children');
kiddos.addEventListener("dragover", ev => ev.preventDefault());

function generate_writeLovelist(){
  var booba_real = document.getElementById('booba');
	if (window.lovelist instanceof Array && typeof write_lovelist === 'function'
    && booba_real && booba_real?.childElementCount) {
    // we can actually do this now
    write_lovelist();
  } else {
    // try again later
		window.requestAnimationFrame(generate_writeLovelist);
  }
}

var has_username = false;
check_online(dat => {
  if (dat.username) {
    var username_perchance = document.getElementById("username_perchance")
    username_perchance.innerHTML = "Logged in as <div><b>" + dat.username + "</b></div>";
    has_username = true;
    get_love();
  }
});

