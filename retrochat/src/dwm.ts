// --- Global State ---
let highestZ = 1;
let activeWindowId: string | null = 'chat-window';

// --- Dragging Variables ---
let isDragging = false;
let dragTarget: HTMLElement | null = null;
let offsetX = 0;
let offsetY = 0;

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
document.querySelectorAll('.window').forEach(win => {
  win.addEventListener('mousedown', () => {
    if (activeWindowId !== win.id) {
      focusWindow(win.id);
    }
  });
});

document.addEventListener('mousedown', (e) => {
	try{
    let element = e.target as HTMLElement | null;
    if (element && element.closest('.window')) {

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
});

// --- Dragging Logic ---
document.querySelectorAll('.title-bar').forEach(header => {
  header.addEventListener('mousedown', (e) => {

    if (!(e instanceof MouseEvent)) return;
        // Don't trigger drag if they clicked a control button (like minimize)
    if (e.target instanceof HTMLElement && e.target.closest('.title-bar-controls')) return;

    isDragging = true;
    dragTarget = header.closest('.window') as HTMLElement | null; // Get the parent window

    if (!dragTarget) return;

    // Calculate where inside the title bar the user clicked
    const rect = dragTarget.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
  });
});

document.addEventListener('mousemove', (e) => {
  if (!(e instanceof MouseEvent)) return;
  if (!isDragging || !dragTarget) return;

  e.preventDefault(); // Prevent accidental text highlighting

  const newX = e.clientX - offsetX;
  const newY = e.clientY - offsetY;

  dragTarget.style.left = `${newX}px`;
  dragTarget.style.top = `${newY}px`;
});

document.addEventListener('mouseup', (e) => {
  if (!(e instanceof MouseEvent)) return;
  isDragging = false;
  dragTarget = null;
});

// --- Taskbar Button Logic ---
document.querySelectorAll('.task-btn').forEach(btn => {
  btn.addEventListener('click', () => {
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
      if (activeWindowId === targetId) {
        activeWindowId = null;
      }
    }
  });
});

// --- Minimize Button Logic ---
document.querySelectorAll('.btn-minimize').forEach(minBtn => {
  minBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // Stop the mousedown from firing and focusing the window

    const targetId = minBtn.getAttribute('data-target');
    if (!targetId) return;
    const win = document.getElementById(targetId) as HTMLElement | null;
    const taskBtn = document.getElementById(`task-btn-${targetId}`) as HTMLElement | null;

    if (!win) return;

    win.style.display = 'none';
    if (taskBtn) taskBtn.classList.remove('active');

    if (activeWindowId === targetId) {
      activeWindowId = null;
    }
  });
});