/** the next generation of outdex */

/**a fool-proof way to put stuff on the window*/
var windog = window as any;

/** similar to dubiousLink */
export async function universal_almonds(ev: PointerEvent) {
  const link = (ev.target as Element)?.closest('a');
  if (!link || link.origin !== window.location.origin || link.target === '_blank' || !link.href 
    || link.pathname === '/page/ancient-monuments/precisely-aligned-to-celestial-events.html'
    || link.closest('ul[id="sitemap"]') ) {
    // we dont do this to strangers' pages, or to homeless pages
    return;
  }

  ev.preventDefault();
  const url = link.href;
  await consume_II(url);
	postconsume_II(url);
}
windog.universal_almonds = universal_almonds;

/** what we do after we consume_II */
export function postconsume_II(url:string) {
  window.history.pushState(null, '', url);
  window.scroll(0, 0);
  windog.checkIfBargainBin();
}
windog.postconsume_II = postconsume_II;

/** how to handle the browser back button */
export async function chef_popstate(ev:PopStateEvent) {
  await consume_II((ev.target as Window)?.location.pathname);
  windog.checkIfBargainBin();
}
windog.chef_popstate = chef_popstate;

/** YOU KNOW I LOVE THE TUBA */
export async function consume_II(url: string) {
  try {
    const mimog = document.getElementById('mimog') as HTMLDivElement;
    const dogParser = new DOMParser();
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

    // get rid of stuff that may be left in the head
		const spareStyleSheets = Array.from(document.head.querySelectorAll('link[rel="stylesheet"]'));
		for (const link of spareStyleSheets) {
			if (link.tagName === 'LINK' && link.getAttribute('href') !== '/css/great-scott.css') {
				link.remove();
      }
		}
		const spareScripts = Array.from(document.head.querySelectorAll('script[src]'));
		for (const script of spareScripts) {
      // there shouldnt be any WSBC-like scripts in the head anyways
      script.remove();
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
windog.consume_II = consume_II;

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

