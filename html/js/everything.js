if (!document.getElementById('fixed_top'))
document.body.insertAdjacentHTML("afterbegin",
`<div class="top_right" id="steak_corner">
<a href="/" class="anchor_no_style steak_zone_text">
Return to the 
<img src="/resource/steak.gif" alt="STEAK" class="steak_zone_image">
zone
</a>
</div>`);
document.body.insertAdjacentHTML("afterend",
`<footer>
<hr/>
<div style="text-align: center;">
Bar Stool Committee &#169; 2020&ndash;2024
<br/>
Site maintained by not.a.bucket.of.spam, @ me if something's up
<br/>
<br/>
Last-Modified: <span id="Last-Modified"></span>
</div>
</footer>`);
document.getElementById("Last-Modified").innerText = document.lastModified;
document.body.insertAdjacentHTML("beforeend", `
<div class="dropdown_element dropdown_base">
<button class="dropdown_element dropdown_button" onclick="void (
document.getElementsByClassName('dropdown_item_list')[0].classList.toggle('dropdown_item_list_active'));">
<div class="dropdown_element dropdown_base_line"></div>
<div class="dropdown_element dropdown_base_line"></div>
<div class="dropdown_element dropdown_base_line"></div>
</button>
<div class="dropdown_element dropdown_item_list">
<a href="/outdex.html#${location.pathname}" class="dropdown_element dropdown_item">
${location.pathname.includes("outdex.html")?"Headin' back to Sydney, bruv?":"Explore the <s>Outback</s> outdex"}
</a>
<a class="dropdown_element dropdown_item">
More items coming Soon<sup>&#8482;</sup>
</a>
</div>
</div>`);
function startup_common(){}
/**@param{number}k*/
function rui (k) {
  return Math.random() / Number.EPSILON % k;
}