document.documentElement.insertAdjacentHTML("afterbegin", `
<div class="dropdown_base">
<button class="dropdown_button" onclick="dropdown_list.classList.toggle('dropdown_item_list_active')">
<div class="dropdown_base_line"></div>
<div class="dropdown_base_line"></div>
<div class="dropdown_base_line"></div>
</button>
<div class="dropdown_item_list" id="dropdown_list">
<a href="/outdex.html#${location.pathname}" class="dropdown_item">
${location.pathname.includes("outdex.html")?"Headin' back to Sydney, bruv?":"Enter the outback steakzone"}
</a>
<a class="dropdown_item">
More items coming Soon<sup>&#8482;</sup>
</a>
</div>
</div>`);

