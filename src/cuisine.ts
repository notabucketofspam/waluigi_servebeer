/** the next generation of outdex */
const mimog = document.getElementById('mimog') as HTMLDivElement;
const dogParser = new DOMParser();

if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

/** similar to dubiousLink */
async function universal_almonds(event: PointerEvent) {
  const link = (event.target as Element)?.closest('a');

  if (!link || link.origin !== window.location.origin || link.target === '_blank'
    || !link.href) {
    // we dont do this to strangers' pages, or to homeless pages
    return;
  }

  event.preventDefault();
  const url = link.href;
  await consume_II(url);
}
document.addEventListener('click', universal_almonds);

window.addEventListener('popstate', async function(ev) {
	await consume_II(window.location.pathname);
});

/** YOU KNOW I LOVE THE TUBA */
export async function consume_II(url: string) {
  try {
    // stash the burgmenu if it exists, 
    const burgmenu = document.getElementById("burgmenu");
    burgmenu && burgmenu.hidePopover();
    const bmp = document.getElementById("burgmenu_mp");
    const party_zone = document.getElementById("party_zone");
    if (party_zone) {
      burgmenu && burgmenu.insertBefore(party_zone, bmp);
    }

    if (url === '/chef.html'){
      // we dont go to chef
      url = '/';
    }

    const response = await fetch(url, {
      headers: {'X-SPA-Request': 'true'}
    });

    if (!response.ok) {
      throw new Error('Page not found');
    }

    const htmlString = await response.text();
    const doc = dogParser.parseFromString(htmlString, 'text/html');

    const newTitle = doc.querySelector('title')?.textContent;
    if (newTitle) {
      document.title = newTitle;
    }

    if (doc.documentElement) {
      mimog.innerHTML = doc.documentElement.innerHTML;
      executeScripts(mimog);
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
      window.history.replaceState(url, '', url);

      (window as any).mellonTime();

      restoreScrollPosition();
    }

  } catch (error) {
    console.error('Routing failed:', error);
    window.location.assign(url);
  }
}
Object.defineProperty(window, 'consume_II', {value: consume_II});

/** thanks gemini */
function executeScripts(container: HTMLElement) {
  const scripts = container.querySelectorAll('script');

  scripts.forEach(oldScript => {
    const newScript = document.createElement('script');

    Array.from(oldScript.attributes).forEach(attr => {
      if (!(attr.name === 'src' && (attr.value === "/js/everything.js" || attr.value === "/js/party-og.js")))
      newScript.setAttribute(attr.name, attr.value);
    });

    newScript.textContent = oldScript.textContent;
    oldScript.parentNode?.replaceChild(newScript, oldScript);
  });
}

// scrolling yeah
document.addEventListener('visibilitychange', function() {
  if (document.visibilityState === 'hidden') {
    sessionStorage.setItem('savedScrollY', String(window.scrollY));
  }
});
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

