var windog = window as any;

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

function taskButtonRightClickHandler(ev: MouseEvent) {
  try {
    ev.preventDefault();

    const btn = ev.currentTarget as HTMLElement;
    const targetId = btn.getAttribute('data-target');
    if (targetId) {
      const win = document.getElementById(targetId) as HTMLElement | null;
      if (win) {
        // Show a context menu for the task button
        let contextMenu = document.getElementById('taskbar-context-menu') as HTMLDivElement | null;
        if (!contextMenu) {
          // context menu doesn't exist yet, create it
          contextMenu = document.createElement('div');
          contextMenu.id = 'taskbar-context-menu';
          contextMenu.style.position = 'absolute';
          contextMenu.style.left = `${ev.clientX}px`;
          contextMenu.style.bottom = `30px`;
          const minimizeOption = document.createElement('button');
          const yellowCircle = document.createElement('img');
          yellowCircle.classList.add('yellow-circle');
          yellowCircle.src = getAsset('osx-yel1.png');
          minimizeOption.appendChild(yellowCircle);
          minimizeOption.insertAdjacentText('beforeend',
            win.style.display === 'none' ? ' Restore' : ' Minimize');
          minimizeOption.addEventListener('click', () => {
            if (win.style.display === 'none') {
              focusWindow(targetId);
            } else {
              minimizeWindow(targetId);
            }
            contextMenu?.remove();
          });
          const closeOption = document.createElement('button');
          const redCircle = document.createElement('img');
          redCircle.classList.add('red-circle');
          redCircle.src = getAsset('osx-red1.png');
          closeOption.appendChild(redCircle);
          closeOption.insertAdjacentText('beforeend', ' Close');
          closeOption.addEventListener('click', () => {
            closeWindow(targetId);
            contextMenu?.remove();
          });
          contextMenu.appendChild(minimizeOption);
          contextMenu.appendChild(closeOption);
          document.getElementById('win97-desktop')?.appendChild(contextMenu);
        }
      } else {
        console.warn(`No window found for targetId: ${targetId}`);
      }
    } else {
      // no target id
    }
  } catch (err) {
    console.error(err);
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

function getAsset(fileName?: string) {
    return new URL(`../assets/${fileName||'window.png'}`, import.meta.url).href; 
}

export interface WindowOptions {
  id: string;
  title?: string;
  content: string | HTMLElement;
  icon?: string;
}

function incrementOffsets() {
  // increment x offset
  currentOffsetX +=  (30 + 10*Math.random());
  currentOffsetY += (30 + 10*Math.random());
  // if we go too far to the right, reset x
  if (currentOffsetX > window.innerWidth - 200) {
    currentOffsetX = 100 + 10*Math.random();
  }
  // if we go too far down, reset y
  if (currentOffsetY > window.innerHeight - 100) {
    currentOffsetY = 50 + 10*Math.random();
  }
}

// gotta create a new window
export function createWindow(options: WindowOptions) {
  const { id, title, content, icon } = options;
  // get the icon, or use generic if unavailable
  let iconUrl = getAsset(icon);
  let titleReal = title || id;

	// create the window element
	const win = document.createElement('div');
  win.classList.add('window');
  win.id = id;
	win.style.left = `${currentOffsetX}px`;
	win.style.top = `${currentOffsetY}px`;
	incrementOffsets();
	win.style.zIndex = highestZ.toString();
	win.addEventListener('mousedown', focusWindowHandler);

	const titlebar = document.createElement('div');
	titlebar.classList.add('title-bar');
	titlebar.id = `header-${id}`;
	titlebar.addEventListener('mousedown', titlebarMousedownHandler);

	const titleText = document.createElement('div');
	titleText.classList.add('title-bar-text');
  const titleTextIcon = document.createElement('img');
  titleTextIcon.classList.add('window-icon');
  titleTextIcon.style.maxHeight = '16px';
  titleTextIcon.style.marginRight = '4px';
  titleTextIcon.src = iconUrl;
  titleTextIcon.alt = '';
  titleText.appendChild(titleTextIcon);
  const titleTextSpan = document.createElement('span');
  titleTextSpan.innerText = titleReal;
  titleText.appendChild(titleTextSpan);

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
  if (typeof content === 'undefined' || content === null) {
    // handle undefined or null content
    // ... which means we do nothing lol
  } else if (typeof content === 'string'){
  	winbody.innerHTML = content;
  } else {
    winbody.appendChild(content);
  }
	win.appendChild(winbody);
  document.getElementById('win97-desktop')?.appendChild(win);

	// create the taskbar button
	const taskBtn = document.createElement('button');
	taskBtn.classList.add('task-btn');
	taskBtn.id = `task-btn-${id}`;
	taskBtn.setAttribute('data-target', id);
	taskBtn.addEventListener('click', taskButtonHandler);
  taskBtn.addEventListener('contextmenu', taskButtonRightClickHandler);
  const taskBtnIcon = document.createElement('img');
  taskBtnIcon.classList.add('task-btn-icon');
  taskBtnIcon.style.maxHeight = '16px';
  taskBtnIcon.style.marginRight = '4px';
  taskBtnIcon.src = iconUrl;
  taskBtnIcon.alt = '';
  taskBtn.appendChild(taskBtnIcon);
  const taskBtnSpan = document.createElement('span');
  taskBtnSpan.innerText = titleReal;
  taskBtn.appendChild(taskBtnSpan);

	document.getElementById('taskbar-tasks')?.appendChild(taskBtn);

	focusWindow(id);
}

// =================================================================
// things that deal with the start menu

function handleStartButtonClick(ev: MouseEvent) {
  try {
    ev.stopPropagation();
    const startMenu = document.getElementById('start-menu');
    const startBtn = document.getElementById('start-btn');
    if (startMenu && startBtn) {
      if (startMenu.style.display === 'block') {
        startMenu.style.display = 'none';
        startMenu.classList.remove('active');
        startBtn.classList.remove('active');
      } else {
        startMenu.style.display = 'block';
        startMenu.classList.add('active');
        startBtn.classList.add('active');
        // startBtn.blur();
      }
    } else {
      // no start button
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error handling start button click:', error.message);
    }
  }
}

// =================================================================
// all of the document handlers

function document_clickHandler(ev: MouseEvent) {
  // close the start menu, if it's open
  const startMenu = document.getElementById('start-menu');
  const startBtn = document.getElementById('start-btn');
  if (startMenu && startBtn){
    if (startMenu?.style.display === 'block' && !startMenu.contains(ev.target as Node)) {
      startMenu.style.display = 'none';
      startBtn?.classList.remove('active');
    }
  } else {
    // elements are missing
  }
  // close the taskbar context menu, if it's open
  const taskbarContextMenu = document.getElementById('taskbar-context-menu');
  if (taskbarContextMenu && !taskbarContextMenu.contains(ev.target as Node)) {
    taskbarContextMenu.remove();
  } else {
      // no context menu or clicked inside it
  }
}

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

document.addEventListener('click', document_clickHandler);
document.addEventListener('mousedown', document_mousedownHandler);
document.addEventListener('mousemove', document_mousemoveHandler);
document.addEventListener('mouseup', document_mouseupHandler);

// =================================================================
// some more junk

function createWindowHandler(ev: MouseEvent) {
	let thedate = Date.now();
  const windowOptions: WindowOptions = {
    id: `window-${thedate}`, 
    title: `Window ${thedate}`, 
    content: `<p>This is the content of the window: ${thedate}</p>` 
  }
	createWindow(windowOptions);
}
/**This is the collection of junk that may be lost whenever we navigate away from this page*/
function NowThatsWhatICallInitialization() {
  document.getElementById('start-btn')?.addEventListener('click', handleStartButtonClick);
  document.getElementById('smi-open-window')?.addEventListener('click', createWindowHandler);
	init_stylesheet();
}
// windog.dwm_init = NowThatsWhatICallInitialization;

// @ts-ignore
import win98css from '98.css?raw';
function init_stylesheet() {
  const scopedStyle = document.createElement('style');
  scopedStyle.textContent = `.win97 { 
    ${win98css} 
  }`;
  const virtualDesktop = document.getElementById('win97-desktop');
  if (virtualDesktop) {
    virtualDesktop.insertBefore(scopedStyle, virtualDesktop.firstChild);
  }
}

export function initDWM() {
  // the stylesheet
  init_stylesheet();
  // add start menu button click handler
  const startBtn = document.getElementById('start-btn');
  if (startBtn) {
    startBtn.addEventListener('click', handleStartButtonClick);
  } else {
    // no start button found
  }
}
(window as any).initDWM = initDWM;

// =================================================================
// we need some way for external applications to interact with our fake os

export interface ExternalApp {
  id: string;
  title?: string;
  icon?: string;
  execute: () => void;
}
/** add stuff to the start menu*/
export function installApp(exapp: ExternalApp){
  const smi = document.createElement('li');
  smi.id = `smi-${exapp.id}`;
  smi.classList.add('start-menu-item');
  const smiIcon = document.createElement('img');
  const iconUrl = getAsset(exapp.icon);
  const titleText = exapp.title || exapp.id;
  smiIcon.src = iconUrl;
  smi.appendChild(smiIcon);
  const smiText = document.createElement('span');
  smiText.textContent = titleText;
  smi.appendChild(smiText);
  smi.addEventListener('click', exapp.execute);
  const startMenu = document.getElementById('start-menu-apps');
  if (startMenu) {
    startMenu.appendChild(smi);
  }
}

