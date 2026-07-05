// --- Global State ---
let highestZ = 1;
let activeWindowId: string | null = null;

// --- Dragging Variables ---
let isDragging = false;
let dragTarget: HTMLElement | null = null;
let offsetX = 0;
let offsetY = 0;

let currentOffsetX = 100;
let currentOffsetY = 100;

// --- Core Focus Function ---
function focusWindow(windowId: string) {
  const win = document.getElementById(windowId);
  const taskBtn = document.getElementById(`task-btn-${windowId}`);

  if (!win || !taskBtn) return;

  // Increment Z-index to bring to front
  highestZ++;
  win.style.zIndex = highestZ.toString();

  // Ensure the window is visible (if it was minimized)
  win.style.display = 'block';

  // Strip 'active' class from all windows and buttons
  document.querySelectorAll('.window').forEach(w => w.classList.remove('active'));
  document.querySelectorAll('.task-btn').forEach(b => b.classList.remove('active'));

  // Apply 'active' class to the target
  win.classList.add('active');
  taskBtn.classList.add('active');

  activeWindowId = windowId;
}

// --- Window Click Listeners (For Focus) ---
function focusWindowHandler(ev: MouseEvent) {
	let win = ev.currentTarget as HTMLElement;
  if (activeWindowId !== win.id) {
    focusWindow(win.id);
  }
}

// --- Dragging Logic ---

function titlebarMousedownHandler(ev: MouseEvent) {
	let header = ev.currentTarget as HTMLElement;

  if (!(ev instanceof MouseEvent)) return;
  // Don't trigger drag if they clicked a control button (like minimize)
  if (ev.target instanceof HTMLElement && ev.target.closest('.title-bar-controls')) return;

  isDragging = true;
  dragTarget = header.closest('.window') as HTMLElement | null; // Get the parent window

  if (!dragTarget) return;

  // Calculate where inside the title bar the user clicked
  const rect = dragTarget.getBoundingClientRect();
  offsetX = ev.clientX - rect.left;
  offsetY = ev.clientY - rect.top;
}

// --- Taskbar Button Logic ---
function taskButtonHandler(ev: MouseEvent) {
  const btn = ev.currentTarget as HTMLElement;
  const targetId = btn.getAttribute('data-target');
  if (!targetId) return;

  const win = document.getElementById(targetId) as HTMLElement | null;

  if (!win) return;

  if (win.style.display === 'none') {
    // Minimized -> Show & Focus
    focusWindow(targetId);
  } else if (activeWindowId !== targetId) {
    // Visible but behind -> Focus
    focusWindow(targetId);
  } else {
    // Visible & Active -> Minimize
    win.style.display = 'none';
    btn.classList.remove('active');
		minimizeWindow(targetId);
    if (activeWindowId === targetId) {
      activeWindowId = null;
    }
  }
}

// --- Minimize Button Logic ---
function minimizeWindow(windowId: string) {
  const win = document.getElementById(windowId) as HTMLElement | null;
  const taskBtn = document.getElementById(`task-btn-${windowId}`) as HTMLElement | null;

  if (!win) return;
  win.style.display = 'none';
  if (taskBtn) taskBtn.classList.remove('active');

  if (activeWindowId === windowId) {
    activeWindowId = null;
  }
}
function minimizeWindowHandler(ev: MouseEvent) {
	ev.stopPropagation(); // Stop the mousedown from firing and focusing the window
	const targetId = (ev.target as HTMLElement).getAttribute('data-target');
	if (!targetId) return;
	minimizeWindow(targetId);
}

// --- Close Button Logic ---
function closeWindow(windowId: string) {
  const win = document.getElementById(windowId) as HTMLElement | null;
  if (!win) return;
  win.remove();
  const taskBtn = document.getElementById(`task-btn-${windowId}`) as HTMLElement | null;
  if (taskBtn) taskBtn.remove();
  if (activeWindowId === windowId) {
    activeWindowId = null;
  }
}
function closeWindowHandler(ev: MouseEvent) {
	ev.stopPropagation(); // Stop the mousedown from firing and focusing the window
	const targetId = (ev.target as HTMLElement).getAttribute('data-target');
	if (!targetId) return;
	closeWindow(targetId);
}

// gotta create a new window
function createWindow(id: string, title: string, content: string) {
	// create the window element
	const win = document.createElement('div');
  win.classList.add('window');
  win.id = id;
	win.style.left = `${currentOffsetX}px`;
	win.style.top = `${currentOffsetY}px`;
	currentOffsetX += 30; // Increment for next window
	currentOffsetY += 30; // Increment for next window
	win.style.zIndex = highestZ.toString();
	win.addEventListener('mousedown', focusWindowHandler);

	const titlebar = document.createElement('div');
	titlebar.classList.add('title-bar');
	titlebar.id = `header-${id}`;
	titlebar.addEventListener('mousedown', titlebarMousedownHandler);

	const titleText = document.createElement('div');
	titleText.classList.add('title-bar-text');
	titleText.innerText = title;
	const controls = document.createElement('div');
	controls.classList.add('title-bar-controls');
	const btnMinimize = document.createElement('button');
	btnMinimize.setAttribute('aria-label', 'Minimize');
	btnMinimize.classList.add('btn-minimize');
	btnMinimize.setAttribute('data-target', id);
	btnMinimize.addEventListener('click', minimizeWindowHandler);

	const btnClose = document.createElement('button');
	btnClose.setAttribute('aria-label', 'Close');
	btnClose.classList.add('btn-close');
	btnClose.setAttribute('data-target', id);
	btnClose.addEventListener('click', closeWindowHandler);

  controls.appendChild(btnMinimize);
	controls.appendChild(btnClose);
	titlebar.appendChild(titleText);
	titlebar.appendChild(controls);
	win.appendChild(titlebar);
	const winbody = document.createElement('div');
	winbody.classList.add('window-body');
  	winbody.innerHTML = content;
	win.appendChild(winbody);
  document.getElementById('user-desktop')?.appendChild(win);

	// create the taskbar button
	const taskBtn = document.createElement('button');
	taskBtn.classList.add('task-btn');
	taskBtn.id = `task-btn-${id}`;
	taskBtn.setAttribute('data-target', id);
	taskBtn.innerText = title;
	taskBtn.addEventListener('click', taskButtonHandler);

	document.getElementById('taskbar-tasks')?.appendChild(taskBtn);

	focusWindow(id);
}

// =================================================================
// all of the document handlers

function document_mousedownHandler(ev: MouseEvent) {
  try {
    let element = ev.target as HTMLElement | null;
    if (element && (element.closest('.window') || element.closest('.task-btn'))) {

    } else {
      // Clicked outside any window, remove focus from all
      document.querySelectorAll('.window').forEach(w => w.classList.remove('active'));
      document.querySelectorAll('.task-btn').forEach(b => b.classList.remove('active'));
      activeWindowId = null;
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error handling mousedown:', error.message);
    }
  }
}

function document_mousemoveHandler(ev: MouseEvent) {
  if (!(ev instanceof MouseEvent)) return;
  if (!isDragging || !dragTarget) return;

  ev.preventDefault(); // Prevent accidental text highlighting

  const newX = ev.clientX - offsetX;
  const newY = ev.clientY - offsetY;

  dragTarget.style.left = `${newX}px`;
  dragTarget.style.top = `${newY}px`;
}

function document_mouseupHandler(ev: MouseEvent) {
  if (!(ev instanceof MouseEvent)) return;
  isDragging = false;
  dragTarget = null;
}

document.addEventListener('mousedown', document_mousedownHandler);
document.addEventListener('mousemove', document_mousemoveHandler);
document.addEventListener('mouseup', document_mouseupHandler);

// =================================================================
// some more junk

function createWindowHandler(ev: MouseEvent) {
	let thedate = Date.now();
	createWindow(`window${thedate}`, `Window ${thedate}`, `<p>This is the content of the window: ${thedate}</p>`);
}
/**This is the collection of junk that may be lost whenever we navigate away from this page*/
function NowThatsWhatICallInitialization() {
  document.getElementById('start-btn')?.addEventListener('click', createWindowHandler);
	init_stylesheet();
}
Object.defineProperty(window, 'NowThatsWhatICallInitialization', {value: NowThatsWhatICallInitialization});

import win98css from '98.css?raw';
async function init_stylesheet() {
	 // Import the 98.css stylesheet as a string
  // 2. Create a <style> element in TypeScript
  const scopedStyle = document.createElement('style');

  // 3. Wrap the entire 98.css stylesheet inside a native @scope rule
  scopedStyle.textContent = `.retro-os { 
    ${win98css} 
  }`;

  // 4. Inject the scoped styles into the document head
  const virtualDesktop = document.getElementById('virtual-desktop-real');
  if (virtualDesktop) {
    virtualDesktop.appendChild(scopedStyle);
  }
}
