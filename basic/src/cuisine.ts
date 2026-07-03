/** the next generation of outdex */

/** similar to dubiousLink */
export async function universal_almonds(ev: PointerEvent) {
  const link = (ev.target as Element)?.closest('a');
  if (!link || link.origin !== window.location.origin || link.target === '_blank' || !link.href 
    || link.pathname === '/page/ancient-monuments/precisely-aligned-to-celestial-events.html'
    || link.closest('ul[id="sitemap"]') ) {
    // we dont do this to strangers' pages, or to homeless pages
    return;
  }

  // console.log(ev);
  ev.preventDefault();
  const url = link.href;
  await consume_II(url);
	postconsume_II(url);
}
/** what we do after we consume_II */
export function postconsume_II(url:string) {
  window.history.pushState(null, '', url);
  window.scroll(0, 0);
  const windog = window as any;
  windog.checkIfBargainBin();
}
Object.defineProperty(window, 'postconsume_II', {value: postconsume_II});

window.addEventListener('popstate', async function(ev) {
	// console.log(ev);
  await consume_II((ev.target as Window)?.location.pathname);
  const windog = window as any;
  windog.checkIfBargainBin();
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

    // remove a whole bunch of duplicates
		const titleElement = doc.querySelector('title');
    if (titleElement) {
      if (titleElement.textContent) {
        document.title = titleElement.textContent;
      }
      titleElement.remove();
    }
    const greatScott = doc.querySelector('link[rel="stylesheet"][type="text/css"][href="/css/great-scott.css"]');
		if (greatScott) {
			greatScott.remove();
    }
    const metaComp = doc.querySelector('meta[name="viewport"][content="width=device-width, user-scalable=yes"');
    if (metaComp) {
      metaComp.remove();
    }
		const everythingJs = doc.querySelector('script[src="/js/everything.js"]');
		if (everythingJs) {
			everythingJs.remove();
		}
		const partyOgJs = doc.querySelector('script[src="/js/party-og.js"]');
		if (partyOgJs) {
			partyOgJs.remove();
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

      windog.mellonTime();

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
    newScript.textContent = oldScript.textContent;
    oldScript.parentNode?.replaceChild(newScript, oldScript);
  }
}

// actually do the loading
if (window.location.pathname === '/chef.html') {
  let chef_pathname = sessionStorage.getItem('chef_pathname');
  consume_II(chef_pathname ?? '/');
}

