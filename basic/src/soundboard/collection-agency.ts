//@ts-ignore
import "/page/soundboard/opodes/boards.js";

import {
	init_localVolume, 
	init_clockbot_things,
	init_love,
	init_booba,
	init_shelf_controls,
	init_networkality,
	init_clocksock,
	deinit_clocksock
} from './cacophony_II.js';

import {
	init_searchFeature, 
	init_miscUI,
	init_hideNSeek
} from './infraspice_II.js';

function init_soundboard_HYPER() {
	init_booba();
	init_localVolume();
	init_clockbot_things();
	init_shelf_controls();
	init_love();
	init_searchFeature();
	init_miscUI();
	init_networkality();
	init_hideNSeek();
	init_clocksock();
}
document.addEventListener('spam', ev => {
	if (window.location.pathname === '/page/soundboard/quality.html') {
		init_soundboard_HYPER();
	} else {
		deinit_clocksock();
	}
});
init_soundboard_HYPER();

