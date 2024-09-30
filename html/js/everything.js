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
<br/>
<br/>
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
<a href="/" class="dropdown_element dropdown_item">
sorry nothing.
</a>
<a class="dropdown_element dropdown_item">
More items coming Soon<sup>&#8482;</sup>
</a>
</div>
</div>`);
function startup_common(){}
