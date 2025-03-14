if (!document.getElementById("jug")){
  document.getElementById("cookizza_zone")?.insertAdjacentHTML("afterend",
`<div id="jug">
  <div id="jar"></div>
  <button id="aight" onclick="realhideme()">aight</button>
  <button id="nah" onclick="hideme()">nah</button>
</div>`);
}
var jar = document.getElementById('jar');
var jug = document.getElementById('jug');
/**@type string[]*/
var cookizza_memes = [
  "I would have used your cookies, but the dog beat me over the fence.",
  "i dont actually know what a cookie is lol",
  "This site uses cookies.<br/>This site has always used cookies.",
  "This site uses someone else's cookies.",
  "This site is known to the State of California to cause cancer, birth defects, and other reproductive harm.",
  "This site uses cookies that expire only when you have sufficiently atoned for your sins.",
  "This site uses pet treats.",
  "A cookie is a cookie. You can't say it's only half.",
  "This site's cookies aren't real, they can't hurt you.",
  "All those <i>other</i> sites might use your cookies, but <i>this</i> site would <i>never</i> do that to you.",
  "This site uses cookies, but not in the ways you agreed to.",
  "This site uses a banner message that says \"This site uses cookies.\"",
  "This site uses cookies from cows not treated with rBST.",
  "This website contains a biologically-engineered food ingredient.",
  "This site contains useful information.<br/>This site has always contained useful information.",
  "This site does not contain useful information.<br/>This site has never contained useful information.",
  "This site uses hyperbole as a storytelling element. Viewer discretion is advised.",
  "This website is a work of fiction. Any resemblance to people, places, things, stuff, other places, or else, is not real you're just crazy.",
  "This site already used your cookies without asking first.",
  "This site will get around to implementing cookies eventually.",
  "This website deliberately violates the <abbr title=\"no it doesn't\">General Data Protection Regulation</abbr>.",
  "This site has been cookie-free for over 48 hours.",
  "This site used to be close with your cookies back in high school, but they drifted apart after graduation.",
  "I would have used your cookies, but the sun was in my eyes.",
  "This website deliberately violates the <abbr title=\"no it doesn't\">Geneva Convention</abbr>.",
  "This site used cookies before they were cool.",
  "This site uses cookies that can only be cleared by emailing a $5 iTunes gift card to <a href=\"javascript:alert('this is a scam!!!')\">not.a.scam@waluigi-servebeer.com</a>",
  "This site corrupts its users' cookies for fun and profit.",
  "NetworkError: Connection failure due to HTTP 500",
  "<q>What is a cookie? A miserable little pile of secrets. But enough talk... Have at you!</q> &horbar; Dracula.com, probably",
  "This site does not use cookies.<br/>This site has never used cookies.",
  "This site uses a giant cookie-pizza. I call it a <i>cookizza</i>.",
  "This site used to use cookies, but stopped using them after they went mainstream.",
  "This site only uses cookies on the night of the full moon each month.",
  "This site doesn't use cookies unless I'm short on rent this month.",
  "This site didn't start using cookies until it saw all the other sites start using cookies and it didn't wanna feel left out.",
  "This site does not plan to implement cookies at any point in the future.",
  "This site is completely non-fiction. All resemblance to places, people, things, stuff, other people, and else, is real and you're not just crazy.",
  "This site contains a mature and respectful discussion of <i>meat</i>.",
  "<a class=\"chad nostyle f1\" href=\"/\">Welcome to the <img class=\"steak_gif\" src=\"/resource/steak8.gif\" alt=\"STEAK\"/> zone</a>",
  "This site is made with <b>no artificial flavours or preservatives</b>.",
  "This site's cookies are processed in a facility that also processes wheat, peanut, soy, milk, and cement.",
  "This site uses nothing.",
  "cookie banner message<br/>line 2",
  "This site is a salad. "
];
/**@type number[]*/
var used = JSON.parse(localStorage.getItem('used')) ?? [];
function pulljar () {
  if (used.length === cookizza_memes.length - 1) {
    used.splice(0, 1+rui(used.length));
  }
  var n;
  var c = 0;
  do {
    n = rui(cookizza_memes.length);
    ++c;
  } while (used.includes(n));
  used.push(n);
  localStorage.setItem('used', JSON.stringify(used));
  jar.innerHTML = cookizza_memes.at(n);
}
pulljar();
function setjar(n) {
  jar.innerHTML = cookizza_memes.at(n);
}
function hideme () {
  jug.hidden = true;
  setTimeout(() => {
    jug.hidden = false;
    pulljar();
  }, 3000);
}
function realhideme() {
  jug.hidden = true;
}

