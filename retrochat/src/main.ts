// Import the core class and the types!
import {
  Room,
  RoomEvent,
  RemoteTrack,
  RemoteTrackPublication,
  RemoteParticipant
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

  room.on(RoomEvent.ParticipantConnected, (participant) => {
    wmp.beep(stolenSound.join);
  });
  room.on(RoomEvent.ParticipantDisconnected, (participant) => {
    wmp.beep(stolenSound.leave);
  });
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
  const response = await fetch('/api/join-voice', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({roomcode})
  });
  const data = await response.json();
  const token = data.token;
  return token;
}

class WinMediaPlayer {
	auxcord: AudioContext;
	gainode: GainNode;
	soundbuffers: Map<string, AudioBuffer>;

  constructor () {
		this.auxcord = new AudioContext();
		this.gainode = new GainNode(this.auxcord, {gain: 0.3});
    this.gainode.connect(this.auxcord.destination);
		this.soundbuffers = new Map();
  }
  async gimmefile(fname: string) {
    var far = await fetch(`/page/soundboard/opodes/${fname}.opus`);
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
