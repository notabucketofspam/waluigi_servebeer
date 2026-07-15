import MediaPlayer from './MediaPlayer';
import {Room, RoomEvent, Track, createLocalAudioTrack, Participant, type AudioTrack} from 'livekit-client';

var LIVEKIT_URL = 'wss://livekit.waluigi-servebeer.com';

const mediaPlayer = new MediaPlayer();
var room = new Room();
var audioContext = new AudioContext();
var participantAudioElements = new Map<string, HTMLAudioElement>();

var livekitSound = {
  join: '/page/soundboard/opodes/MLG/Discord%20join%20voice%20chat.opus',
  leave: '/page/soundboard/opodes/MLG/Discord%20leave%20voice%20chat.opus',
  disconnect: '/page/soundboard/opodes/MLG/Discord%20disconnect%20voice%20chat.opus'
};

room.on(RoomEvent.ActiveSpeakersChanged, (speakers) => {
  checkParticipantsSpeaking();
});

function updateParticipantList() {
  try {
    const participantList = document.getElementById('participant-list') as HTMLUListElement | null;
    if (participantList) {
      // we have list container

      // It's you.
			let metallik = document.getElementById('livekit_roomcode') as HTMLMetaElement | null;
      if (metallik) {
        insertLocalParticipantDOM();
      } else {
        // not actively in a chat, so skip
      }

      // we gotta check in case someone has joined
      room.remoteParticipants.forEach((participant) => {
			  let existingLi = document.getElementById(`user-${participant.identity}`) as HTMLLIElement | null;
        if (existingLi) {
          // friend is already on the page
        } else {
          // !!! NEW !!!
				  const friendLi = createParticipantDOM(participant);
				  participantList.appendChild(friendLi);
        }
	    }); // forEach

		  // also check in case someone has left
		  const participantIds = new Set<string>();
		  room.remoteParticipants.forEach((participant) => {
        participantIds.add(participant.identity);
      });
      if (room.localParticipant?.identity) {
        participantIds.add(room.localParticipant.identity);
      }  
		  Array.from(participantList.children).forEach((li) => {
			  const participantId = li.id.replace('user-', '');
			  if (!participantIds.has(participantId)) {
				  li.remove();
			  }
		  });
    } else {
      // participant list is missing
    }
	} catch (err) {
		console.error('Error updating participant list:', err);
  }
}

function insertLocalParticipantDOM() {
  try {
		let participantList = document.getElementById('participant-list') as HTMLUListElement | null;
    if (participantList && room.localParticipant) {
			const useThisID = `user-${room.localParticipant.identity}`;
			if (document.getElementById(useThisID)) {
        // it's already in the DOM, so we can skip :^)
        // console.log("OK");
      } else {
        // you're not real
        const meLi = document.createElement('li');
        meLi.id = useThisID;
        meLi.innerHTML = `<span>${room.localParticipant.name}</span>`;
				// console.log("meLi:", meLi);
        setTimeout(() => {
          participantList.appendChild(meLi);
        });
      }
    } else {
      // participant list is missing
    }
	} catch (err) {
		console.error('Error creating local participant DOM:', err);
  }
}

function createParticipantDOM(participant: Participant) {
  // create the list item
  const friendLi = document.createElement('li');
        
  try {
    friendLi.id = `user-${participant.identity}`;
	  friendLi.classList.add('participant-item');

    // insert the display name
    const innerSpan = document.createElement('span');
    innerSpan.id = `name-${participant.identity}`;
    innerSpan.textContent = participant.name || participant.identity;
    friendLi.appendChild(innerSpan);

	  //create the slider and set its attributes
	  const slider = document.createElement('input');
	  slider.type = 'range';
    slider.id = `volume-${participant.identity}`;
	  slider.setAttribute('min', '0');
    slider.setAttribute('max', '1');
	  slider.setAttribute('step', 'any');
	  slider.setAttribute('value', '0.5');
	  slider.style.verticalAlign = 'middle';
	  slider.style.marginLeft = '10px';

    // the slider's event listener to adjust the volume of the participant's audio track
    slider.addEventListener('input', (ev: InputEvent) => {
      const volumeLevel = Number.parseFloat((ev.target as HTMLInputElement).value);
      // Get the audio element for this participant and adjust its volume
      const audioElement = participantAudioElements.get(participant.identity);
      if (audioElement) {
        audioElement.volume = volumeLevel;
      }
    }); // addEventListener

	  friendLi.appendChild(slider);

  } catch(err) {
		console.error('Error creating participant DOM:', err);
  }

	return friendLi;
}

function clearParticipantList() {
	let participantList = document.getElementById('participant-list') as HTMLUListElement | null;
	if (participantList) {
		participantList.innerHTML = '';
  }
}

function checkParticipantsSpeaking(){
	try {
    // check yourself
    const localParticipantElement = document.getElementById(`user-${room.localParticipant.identity}`) as HTMLLIElement | null;
    if (localParticipantElement) {
      if (room.localParticipant.isSpeaking) {
        localParticipantElement.classList.add('isSpeaking');
      } else {
        localParticipantElement.classList.remove('isSpeaking'); 
      }
    } else {
      // you're not here
    }

    // check the others
		room.remoteParticipants.forEach((participant) => {
      let participantElement = document.getElementById(`user-${participant.identity}`) as HTMLLIElement | null;
      if (participantElement) {
        if (participant.isSpeaking) {
          participantElement.classList.add('isSpeaking');
        } else {
          participantElement.classList.remove('isSpeaking');
        }
      } else {
        // participant element not found, maybe they just joined and the DOM hasn't updated yet
      }
		});
	} catch (err) {
		console.error('Error checking participants speaking:', err);
  }
}

room.on(RoomEvent.TrackSubscribed, (track, publication, participant) => {
  if (track.kind === Track.Kind.Audio) {
    // audio track
    const audioElement = track.attach();
    let audioContainer = document.getElementById('audio-container') as HTMLDivElement | null;
    if (audioContainer){
      audioContainer.appendChild(audioElement);
    }

    // Store the audio element for this participant
    participantAudioElements.set(participant.identity, audioElement);

    // Set initial volume from slider
    const slider = document.getElementById(`volume-${participant.identity}`) as HTMLInputElement | null;
    if (slider) {
      audioElement.volume = Number.parseFloat(slider.value);
    }
  } else {
    // i haven't gotten to this part yet lol
  }
});

room.on(RoomEvent.ParticipantConnected, (participant) => {
  updateParticipantList();
  mediaPlayer.beep(livekitSound.join);
});

room.on(RoomEvent.ParticipantDisconnected, (participant) => {
  updateParticipantList();
  mediaPlayer.beep(livekitSound.leave);
  
  // Clean up audio element reference
  participantAudioElements.delete(participant.identity);
});

/**
 * 
 * @param {string} roomcode
 */
async function joinVoiceChannel(roomcode: string) {
  try {
		if (!roomcode) {
			roomcode = 'general-chat';
    }
    const response = await fetch('/api/join-voice', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({roomcode})
    });
    const data = await response.json();
    const token = data.token;

    await room.connect(LIVEKIT_URL, token);

		// actually use the microphone
    await room.localParticipant.setMicrophoneEnabled(true, {
			echoCancellation: true,
			noiseSuppression: true,
      voiceIsolation: true,
			autoGainControl: true
    });

		displayView(roomcode);

		var metallik = document.createElement('meta');
		metallik.setAttribute('id', 'livekit_roomcode');
		metallik.setAttribute('data-roomcode', roomcode);

    let roomSid = await room.getSid();
		metallik.setAttribute('data-roomsid', roomSid);
		document.head.appendChild(metallik);

    updateParticipantList();
    setTimeout(loadActiveRooms, 100);
		mediaPlayer.beep(livekitSound.join);
  } catch (err) {
		console.error('Error joining voice channel:', err);
  }
}

function handleJoinBtnClick(ev: PointerEvent) {
  let roomcodeInput = document.getElementById('roomcode-input') as HTMLInputElement | null;
  if (roomcodeInput) {
    const roomcode = roomcodeInput.value ?? 'general-chat';
    joinVoiceChannel(roomcode);
  }
}

async function leaveVoiceChannel() {
  try {
    await room.disconnect();
    let audiocontainer = document.getElementById('audio-container') as HTMLDivElement | null;
    if (audiocontainer) {
      audiocontainer.innerHTML = '';
    }
    displayView(null);

    var metallik = document.getElementById('livekit_roomcode') as HTMLMetaElement | null;
    if (metallik) {
      metallik.remove();
    }

    mediaPlayer.beep(livekitSound.disconnect);

    clearParticipantList();
    participantAudioElements.clear();

    // refresh listings
    setTimeout(loadActiveRooms, 100);
  } catch (err) {
    console.error(err);
  }
}

/**
 * 
 * @param {string|null} roomcode
 */
function displayView(roomcode: string | null){
  try {
    if (typeof roomcode === 'string' && roomcode.length > 0) {
      // roomcode is ok

      var lobbyview = document.getElementById('lobby-view') as HTMLDivElement | null;
      if (lobbyview){
        lobbyview.style.display = 'none';
      }

      var activecallview = document.getElementById('active-call-view') as HTMLDivElement | null;
      if (activecallview){
        activecallview.style.display = 'block';
      }

      var currentroomtitle = document.getElementById('current-room-title') as HTMLSpanElement | null;
      if (currentroomtitle) {
        currentroomtitle.innerText = `${roomcode}`;
      }
    } else {
      // null was passed, so we assume we're not in a room

      var lobbyview = document.getElementById('lobby-view') as HTMLDivElement | null;
      if (lobbyview){
        lobbyview.style.display = 'block';
      }

      var activecallview = document.getElementById('active-call-view') as HTMLDivElement | null;
      if (activecallview){
        activecallview.style.display = 'none';
      }
    }
  } catch(err){
    console.error('Error displaying view:', err);
  }
}

function joinVoiceChannelFromButton(ev: PointerEvent) {
  try {
    const button = ev.currentTarget as HTMLButtonElement;
    const roomcode = button.getAttribute('data-roomcode');
    if (roomcode) {
      joinVoiceChannel(roomcode);
    } else {
      console.error('No room code found on button');
    }
  } catch(err) {
    console.error('Error joining voice channel from button:', err);
  }
}
async function loadActiveRooms() {
  if (window.location.hostname === 'localhost') {
    return;
  }
  try {
    const response = await fetch('/api/active-rooms',{
		  method: 'GET',
		  cache: 'no-store',
    });
    const activeRooms = await response.json();

    const container = document.getElementById('room-list-container') as HTMLDivElement | null;
    if (container) {
      // Clear the old list
      container.innerHTML = '';

      if (Array.isArray(activeRooms)) {
        if (activeRooms.length > 0) {
          // we have rooms
          activeRooms.forEach(room => {
            const roomDiv = document.createElement('div');
            roomDiv.className = 'room-card';
            const rdStrong = document.createElement('strong');
            rdStrong.textContent = room.name;
            roomDiv.appendChild(rdStrong);
            const span = document.createElement('span');
            span.textContent = ` (${room.participantCount} online) `;
            roomDiv.appendChild(span);
            const button = document.createElement('button');
            button.textContent = 'Join';
            button.setAttribute('data-roomcode', room.name);
            button.addEventListener('click', joinVoiceChannelFromButton);
            button.id = room.sid;
            roomDiv.appendChild(button);
            container.appendChild(roomDiv);
          });
        } else {
          // no rooms?
          container.innerHTML = '<p>No one is online right now.</p>';
        }
      } else {
        // somehow we got a non-array answer
      }

    } else {
      // container is missing
    }
	  checkRoomIDs();
  } catch(err) {
		console.error('Error loading active rooms:', err);
  }
}
/**
 * we run this to disable the button for the currently-joined room.
 */
function checkRoomIDs(){
  try {
    // try to figure out the room sid
    let metallik = document.getElementById('livekit_roomcode') as HTMLMetaElement | null;
    if (metallik) {
      // we have metallik
      let currentRoomSid = metallik.getAttribute('data-roomsid');
      if (currentRoomSid) {
        // have room sid
        let theRelevantButton = document.getElementById(currentRoomSid) as HTMLButtonElement | null;
        if (theRelevantButton) {
          // has button
          theRelevantButton.setAttribute('disabled', 'true');
        } else {
          // no button found
        }
      } else {
        // no room sid found
      }
    } else {
      // no metallik found, so there's no way to know which button to disable
    }
  }catch(err){
		console.error('Error checking room IDs:', err);
  }
}

export function init_livekitDOM() {
  if (window.location.hostname !== 'localhost') {
    loadActiveRooms();
  }

	// add event listeners for buttons
	var loadactiveroomsbtn = document.getElementById('loadactiverooms') as HTMLButtonElement | null;
	if (loadactiveroomsbtn) {
		loadactiveroomsbtn.addEventListener('click', loadActiveRooms);
  }

	var leave_btn = document.getElementById('leave-btn') as HTMLButtonElement | null;
	if (leave_btn) {
		leave_btn.addEventListener('click', leaveVoiceChannel);
  }

	var join_btn = document.getElementById('join-btn') as HTMLButtonElement | null;
	if (join_btn) {
		join_btn.addEventListener('click', handleJoinBtnClick);
	}

	// load the correct view, if we're already in a room
	var metallik = document.getElementById('livekit_roomcode') as HTMLMetaElement | null;
	if (metallik) {
		var roomcode = metallik.getAttribute('data-roomcode');
		if (roomcode) {
			displayView(roomcode);
    }
  }

	updateParticipantList();
}

