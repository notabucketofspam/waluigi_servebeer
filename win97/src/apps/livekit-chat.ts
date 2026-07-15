// this is where we build the actual app
import "../style/livekit.css";
/**thanks claude*/
function createLiveKitUI(): HTMLDivElement {
	// Main container
	const platter = document.createElement('div');
	platter.classList.add('sef', 'lard');
	platter.id = 'livekit-platter';

	// Title
	const title = document.createElement('h1');
	title.style.fontSize = 'revert';
	title.style.textAlign = 'center';
	title.textContent = 'LiveKit Chat';
	title.style.margin = "0px";
	platter.appendChild(title);

	// Main content div
	const contentDiv = document.createElement('div');
	platter.appendChild(contentDiv);

	// Lobby view
	const lobbyView = document.createElement('div');
	lobbyView.id = 'lobby-view';
	const roomcodeInput = document.createElement('input');
	roomcodeInput.type = 'text';
	roomcodeInput.id = 'roomcode-input';
	roomcodeInput.placeholder = 'Enter room code';
	roomcodeInput.value = 'general-chat';
	const joinBtn = document.createElement('button');
	joinBtn.id = 'join-btn';
	joinBtn.textContent = 'Join Voice';
	lobbyView.appendChild(roomcodeInput);
	lobbyView.appendChild(joinBtn);
	contentDiv.appendChild(lobbyView);

	// Active call view
	const activeCallView = document.createElement('div');
	activeCallView.id = 'active-call-view';
	activeCallView.style.display = 'none';
	const callHeader = document.createElement('div');
	callHeader.className = 'call-header';
	const currentRoomHolder = document.createElement('span');
	currentRoomHolder.textContent = 'Current Room: ';
	const currentRoomTitle = document.createElement('span');
	currentRoomTitle.id = 'current-room-title';
	currentRoomTitle.textContent = 'None';
	currentRoomHolder.appendChild(currentRoomTitle);
	const leaveBtn = document.createElement('button');
	leaveBtn.id = 'leave-btn';
	leaveBtn.textContent = 'Disconnect';
	callHeader.appendChild(currentRoomHolder);
	callHeader.appendChild(leaveBtn);
	activeCallView.appendChild(callHeader);

	const everyoneIsHere = document.createElement('div');
	everyoneIsHere.id = 'everyone-is-here';
	const peopleHeader = document.createElement('h4');
	peopleHeader.textContent = 'People in Channel';
	peopleHeader.style.fontSize = 'revert';
	const participantList = document.createElement('ul');
	participantList.id = 'participant-list';
	everyoneIsHere.appendChild(peopleHeader);
	everyoneIsHere.appendChild(participantList);
	activeCallView.appendChild(everyoneIsHere);
	contentDiv.appendChild(activeCallView);

	// Separator
	const hr = document.createElement('hr');
	contentDiv.appendChild(hr);

	// Room list section
	const roomSection = document.createElement('div');
	const loadActiveRoomsBtn = document.createElement('button');
	loadActiveRoomsBtn.id = 'loadactiverooms';
	loadActiveRoomsBtn.textContent = 'Load Active Rooms';
	const roomListContainer = document.createElement('div');
	roomListContainer.id = 'room-list-container';
	roomSection.appendChild(loadActiveRoomsBtn);
	roomSection.appendChild(roomListContainer);
	contentDiv.appendChild(roomSection);

	// Audio container
	const audioContainer = document.createElement('div');
	audioContainer.id = 'audio-container';
	platter.appendChild(audioContainer);

	// Check online status
	// since this requires a fetch, we need to do it after the platter is in the DOM

	return platter;
}

/**Gen. II check_online functionality*/
async function checkOnline_NEO(callback: (data: any) => void) {
	try {
		const response = await fetch('/api/users/info', {
			method: 'GET',
			cache: 'no-store'
		});
		if (response.status < 400) {
			const data = await response.json();
			if (typeof callback === 'function') {
				callback(data);
			} else {
				// callback wasnt a function
			}
		} else {
			// not online
		}
	} catch (error) {
		// fail silently
		console.log('not online', error);
	}
}

async function insertLoggedInAs(platter: HTMLDivElement){
	await checkOnline_NEO(function (jazz: Record<string, any>) {
		if (jazz.username) {
			// top half of the box
			let liaTop = document.createElement('div');
			liaTop.textContent = 'Logged in as';
			// bottom half of the box
			let usernameBold = document.createElement('b');
			usernameBold.textContent = jazz.username;
			let liaBottom = document.createElement('div');
			liaBottom.appendChild(usernameBold);
			// the box herself
			let loggedInDiv = document.createElement('div');
			loggedInDiv.appendChild(liaTop);
			loggedInDiv.appendChild(liaBottom);
			loggedInDiv.className = 'logged-in-as';
			if (platter) {
				platter.prepend(loggedInDiv);
			} else {
				// no platter
			}
		} else {
			// no jazz?
		}
	});
	return platter;
}

import { type WindowOptions, createWindow, installApp, type ExternalApp, focusWindow } from "../dwm";
import { init_livekitDOM} from "../livekit";

function liveKitAppHandler() {
	try {
		const existingWindow = document.getElementById('window-livekit-chat');
		if (existingWindow) {
			// window exists, bring it to the front
			focusWindow(existingWindow.id);
		} else {
			// no window, so we can create one
			createWindowHandler();
			init_livekitDOM();
		}
	} catch(err) {
		console.error('Error in liveKitAppHandler:', err);
	}
}

function createWindowHandler() {
	// the main ui
	let somecontent = createLiveKitUI();
	// we dont have to wait for this bc it's async and we dont need
	// the platter to be in the DOM for it to work
	insertLoggedInAs(somecontent);
	//actually make the window
	const windowOptions: WindowOptions = {
		id: `window-livekit-chat`,
		title: `LiveKit Chat`,
		content: somecontent,
		icon: 'realchat.png'
	};
	createWindow(windowOptions);
}

function install_LiveKitChat() {
	const appOptions: ExternalApp = {
		id: 'app-livekit-chat',
		title: 'LiveKit Chat',
		icon: 'realchat.png',
		execute: liveKitAppHandler
	};
	installApp(appOptions);
}
install_LiveKitChat();

function document_spamHandler(ev: Event) {  
  const url = (ev as CustomEvent).detail?.url;
  if (url?.startsWith('/windows')){
    install_LiveKitChat();
  }
}
document.addEventListener('spam', document_spamHandler);

