// Import the core class and the types!
import {
  Room,
  RoomEvent,
  RemoteTrack,
  RemoteTrackPublication,
  RemoteParticipant,
	Participant
} from 'livekit-client';


const stolenSound = {
  join: 'MLG/Discord%20join%20voice%20chat',
  leave: 'MLG/Discord%20leave%20voice%20chat',
  disconnect: 'MLG/Discord%20disconnect%20voice%20chat',
};
// 1. Initialize the Room
const room = new Room();

// 2. Listen for incoming tracks with strict typing
room.on(RoomEvent.TrackSubscribed, (
  track: RemoteTrack,
  publication: RemoteTrackPublication,
  participant: RemoteParticipant
) => {

  if (track.kind === 'video') {
    // We use "as HTMLVideoElement" to explicitly cast the DOM element
    const videoElement = document.getElementById('remote-video') as HTMLVideoElement | null;

    if (videoElement) {
      track.attach(videoElement);
    } else {
      console.error("Video element missing from the DOM!");
    }
  }

  if (track.kind === 'audio') {
    const audioElement = document.getElementById('remote-audio') as HTMLAudioElement | null;
    if (audioElement) track.attach(audioElement);
  }

});

room.on(RoomEvent.ParticipantConnected, (participant: Participant) => {
  console.log(`${participant.identity} joined the call.`);
  updateParticipantList();
  wmp.beep(stolenSound.join);
});

room.on(RoomEvent.ParticipantDisconnected, (participant: Participant) => {
  console.log(`${participant.identity} left the call.`);
  updateParticipantList();
  wmp.beep(stolenSound.leave);
});
// 3. Connect function with type-safe parameters
async function joinVoiceChat(token: string): Promise<void> {
  const livekitUrl = 'wss://livekit.waluigi-servebeer.com';

  try {
    await room.connect(livekitUrl, token);

    await room.localParticipant.setMicrophoneEnabled(true, {
      echoCancellation: true,
      noiseSuppression: true,
      voiceIsolation: true,
      autoGainControl: true
    });

    wmp.beep(stolenSound.join);

    console.log('Successfully connected to LiveKit!');
		updateParticipantList();
  } catch (error) {
    // In TS, caught errors are of type 'unknown', so we handle them carefully
    if (error instanceof Error) {
      console.error('Connection failed:', error.message);
    }
  }
}

// Example of querying the button safely
const connectBtn = document.getElementById('connect-btn') as HTMLButtonElement | null;
if (connectBtn) {
  connectBtn.addEventListener('click', async () => {
    // You would fetch your actual token here
    const token = await getTokenFromServer();
    joinVoiceChat(token);
  });
}

const disconnectBtn = document.getElementById('disconnect-btn') as HTMLButtonElement | null;
if (disconnectBtn) {
	disconnectBtn.addEventListener('click', async () => {
		await leaveVoiceChat();
	});
}
async function leaveVoiceChat() {
	try {
		await room.disconnect();
		wmp.beep(stolenSound.leave);
		setTimeout(() => {

			updateParticipantList();
		}, 100);
	} catch (error) {
		if (error instanceof Error) {
			console.error('Error disconnecting:', error.message);
    }
  }
}

async function getTokenFromServer(roomcode?:string): Promise<string> {
  if (!roomcode) {
    roomcode = 'general-chat';
  }
  const response = await fetch('https://waluigi-servebeer.com/api/join-voice', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({roomcode})
  });
  const data = await response.json();
  const token = data.token;
  return token;
}

room.on(RoomEvent.RoomMetadataChanged, () => {
  // Triggers when you first connect and get room details
  updateParticipantList();
});

setTimeout(updateParticipantList, 100);

function updateParticipantList() {
  try {
    const listContainer = document.getElementById('participant-list') as HTMLUListElement | null;
    if (!listContainer) return;
    listContainer.innerHTML = '';

    // 1. Always add yourself to the top of the list
    if (room.localParticipant && room.localParticipant.trackPublications.size > 0) {
      const meLi = document.createElement('li');
      // Using the 'name' field sent by your Node backend
      const sliderId = `volume-${room.localParticipant.identity}`;
      meLi.innerHTML = `
      <strong>${room.localParticipant.name}</strong>
      <input type="range" id="${sliderId}" 
        min="0" max="1" step="any" value="0.5"
        style="vertical-align: middle; margin-left: 10px;"
      >`;
      if (room.localParticipant.isSpeaking) {
        meLi.style.color = '#000080'; // Classic blue
      }
      listContainer.appendChild(meLi);
    }

    // 2. Loop through every other active friend in the room
    room.remoteParticipants.forEach((participant: Participant) => {
      const friendLi = document.createElement('li');
      friendLi.id = `user-${participant.identity}`;

      const sliderId = `volume-${participant.identity}`;
      friendLi.innerHTML = `
        <span>${participant.name || participant.identity}</span>
        <input type="range" id="${sliderId}" 
          min="0" max="1" step="any" value="0.5"
          style="vertical-align: middle; margin-left: 10px;"
        >`;
      if (participant.isSpeaking) {
        friendLi.style.color = '#000080';
      }
      listContainer.appendChild(friendLi);

      const slider = document.getElementById(sliderId) as HTMLInputElement | null;
      if (slider) {
        slider.addEventListener('input', (event) => {
          const volumeLevel = parseFloat((event.target as HTMLInputElement).value);
          // Loop through all tracks this specific person is publishing
          participant.trackPublications.forEach((publication) => {
            // If it's an active audio track, adjust its local playback volume
            if (publication.track && publication.kind === 'audio') {
              (publication.track as any).setVolume(volumeLevel);
            }
          }); //forEach
        }); // addEventListener
      }
    }); // forEach
  } catch (err) {
    console.error('Error updating participant list:', err);
  }
}
(window as any).room = room; // Expose for debugging
// Add this right below your ParticipantConnected / ParticipantDisconnected events
room.on(RoomEvent.ActiveSpeakersChanged, (speakers: Participant[]) => {
  // We don't even need to parse the 'speakers' array directly.
  // The event means someone's state changed, so we just redraw the list 
  // and the function above will read everyone's current .isSpeaking status.
  updateParticipantList();
});
class WinMediaPlayer {
	auxcord: AudioContext;
	gainode: GainNode;
	soundbuffers: Map<string, AudioBuffer>;

  constructor () {
		this.auxcord = new AudioContext();
		this.gainode = new GainNode(this.auxcord, {gain: 0.2});
    this.gainode.connect(this.auxcord.destination);
		this.soundbuffers = new Map();
  }
  async gimmefile(fname: string) {
    var far = await fetch(`https://waluigi-servebeer.com/page/soundboard/opodes/${fname}.opus`);
    var bar = await far.arrayBuffer();
    var dar = await this.auxcord.decodeAudioData(bar);
    this.soundbuffers.set(fname, dar);
    return dar;
  }
  async beep(fname: string) {
    var somebuffer = this.soundbuffers.get(fname);
    if (typeof somebuffer === 'undefined') {
      somebuffer = await this.gimmefile(fname);
    }
    var someabsn = new AudioBufferSourceNode(this.auxcord, {buffer: somebuffer});
    someabsn.connect(this.gainode);
    someabsn.start();
  }
}
const wmp = new WinMediaPlayer();
