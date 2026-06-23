/** the next generation of outdex */

// if ('scrollRestoration' in history) {
//   history.scrollRestoration = 'manual';
// }

/** similar to dubiousLink */
export async function universal_almonds(ev: PointerEvent) {
  const link = (ev.target as Element)?.closest('a');
  if (!link || link.origin !== window.location.origin || link.target === '_blank'
    || !link.href) {
    // we dont do this to strangers' pages, or to homeless pages
    return;
  }

  // console.log(ev);
  ev.preventDefault();
	// ev.stopPropagation();
  const url = link.href;
  await consume_II(url);
	window.history.pushState(null, '', url);
  window.scroll(0, 0);
  const windog = window as any;
  windog.checkIfBargainBin();
}
// document.addEventListener('click', universal_almonds);

window.addEventListener('popstate', async function(ev) {
	// console.log(ev);
	await consume_II((ev.target as Window)?.location.pathname);
});

/** YOU KNOW I LOVE THE TUBA */
export async function consume_II(url: string) {
  try {
    const mimog = document.getElementById('mimog') as HTMLDivElement;
    const dogParser = new DOMParser();
    const windog = window as any;
    // stash the burgmenu if it exists
    const burgmenu = document.getElementById("burgmenu");
    if (burgmenu) {
      burgmenu.hidePopover();
    }
    const bmp = document.getElementById("burgmenu_mp");
    const party_zone = document.getElementById("party_zone");
    if (party_zone && burgmenu && bmp) {
      burgmenu.insertBefore(party_zone, bmp);
    }

    if (url === '/chef.html'){
      // we dont go to chef
      url = '/';
    }

    const response = await fetch(url);

    if (!response.ok) {
      // throw new Error('Page not found');
    }

    const htmlString = await response.text();
    const doc = dogParser.parseFromString(htmlString, 'text/html');

    const newTitle = doc.querySelector('title')?.textContent;
    if (newTitle) {
      document.title = newTitle;
    }

    if (doc.documentElement) {
      mimog.innerHTML = doc.documentElement.innerHTML;
      await executeScripts(mimog);
      // show steak or nah
			const returnSteak = document.getElementById('return_steak');
			if (returnSteak) {
        returnSteak.hidden = !!document.getElementById('welcome_steak');
      }
      // update the last-modified
			const lastModified = document.getElementById('Last-Modified');
			const lmHeader = response.headers.get('Last-Modified');
			if (lastModified && lmHeader) {
				lastModified.innerText = lmHeader;
      }
			// update the url bar
      // window.history.replaceState(url, '', url);

      windog.mellonTime();

      // restoreScrollPosition();
    }

  } catch (error) {
    console.error('Routing failed:', error);
    window.location.assign(url);
  }
}
Object.defineProperty(window, 'consume_II', {value: consume_II});

/** thanks gemini */
async function executeScripts(container: HTMLElement) {
  const scripts = container.querySelectorAll('script');

  for (const oldScript of scripts) {
		if (oldScript.src === "/js/everything.js" || oldScript.src === "/js/party-og.js") {
      continue;
    }

    const newScript = document.createElement('script');

    Array.from(oldScript.attributes).forEach(attr => {
      if (!(attr.name === 'src' &&
      (attr.value === "/js/everything.js" || attr.value === "/js/party-og.js"))) {
        newScript.setAttribute(attr.name, attr.value);
      }
    });

    // copy the actual script content
   //  if (newScript.src){
			// const response = await fetch(newScript.src);
			// const responseText = await response.text();
			// newScript.textContent = responseText;
   //  } else {
			// newScript.textContent = oldScript.textContent;
   //  }
    newScript.textContent = oldScript.textContent;
    oldScript.parentNode?.replaceChild(newScript, oldScript);
  }
}

// scrolling yeah
// document.addEventListener('visibilitychange', function() {
//   if (document.visibilityState === 'hidden') {
//     sessionStorage.setItem('savedScrollY', String(window.scrollY));
//   }
// });
function restoreScrollPosition() {
  const savedY = sessionStorage.getItem('savedScrollY');
  if (savedY !== null) {
    window.scrollTo({
      top: parseInt(savedY, 10),
      behavior: 'instant'
    });
    sessionStorage.removeItem('savedScrollY');
  }
}

// actually do the loading
if (window.location.pathname === '/chef.html') {
  let chef_pathname = sessionStorage.getItem('chef_pathname');
  consume_II(chef_pathname ?? '/');
}

