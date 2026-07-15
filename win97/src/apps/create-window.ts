import { type WindowOptions, createWindow, installApp, type ExternalApp } from "../dwm";

function createWindowHandler() {
	let thedate = String(Date.now());
  const somecontent = generateContent(thedate);
  const windowOptions: WindowOptions = {
    id: `window-${thedate}`, 
    title: `#${thedate}`, 
    content: somecontent
  }
	createWindow(windowOptions);
}
function generateContent(sometime:string) {
  const topDivis = document.createElement('div');
  topDivis.textContent = `This is the content of the window:`;
  const pipis = document.createElement('p');
  pipis.textContent = sometime;
  pipis.style.textAlign = 'center';
  const divis = document.createElement('div');
  divis.appendChild(topDivis);
  divis.appendChild(pipis);
  return divis;
}
export function install_CreateWindow(){
  const appOptions: ExternalApp = {
    id: 'app-window',
    title: 'Open window',
    icon: 'window.png',
    execute: createWindowHandler
  };
  installApp(appOptions);
}
install_CreateWindow();

function document_spamHandler(ev: Event) {  
  const url = (ev as CustomEvent).detail?.url;
  if (url?.startsWith('/windows')){
    install_CreateWindow();
  }
}
document.addEventListener('spam', document_spamHandler);

