async function append_git_data() {
  let git_commit_count = document.createElement("DIV");
  let git_commit_count_attr_class = document.createAttribute("class");
  git_commit_count_attr_class.value = "bottom_right";
  git_commit_count.setAttributeNode(git_commit_count_attr_class);
  let git_commit_count_attr_id = document.createAttribute("id");
  git_commit_count_attr_id.value = "git_commit_count";
  git_commit_count.setAttributeNode(git_commit_count_attr_id);
  document.body.appendChild(git_commit_count);
  let git_last_commit = document.createElement("DIV");
  let git_last_commit_attr_class = document.createAttribute("class");
  git_last_commit_attr_class.value = "bottom_left";
  git_last_commit.setAttributeNode(git_last_commit_attr_class);
  let git_last_commit_attr_id = document.createAttribute("id");
  git_last_commit_attr_id.value = "git_last_commit";
  git_last_commit.setAttributeNode(git_last_commit_attr_id);
  document.body.appendChild(git_last_commit);
  await async_data_request(
    {data_path: "/resource/git-data.txt", response_type: "text", request_header: "Cache-Control: no-store"},
    function(xhr) {
      var git_data = String(xhr.responseText).split("\n");
      document.getElementById("git_commit_count").innerHTML = "Commit count: " + git_data[0];
      document.getElementById("git_last_commit").innerHTML = "Last commit: " + git_data[1];
    }
  );
}
async function append_footer() {
  let doc_footer = document.createElement("FOOTER");
  doc_footer.innerHTML = `
    <hr>
    <div style="text-align: center;">
      Bar Stool Committee &#169; 2020&ndash;2024
      <br>
      Site maintained by notabucketofspam, @ me if something's up
      <br>
      <a href="/page/sitemap/sitemap.html">Sitemap</a>
      <div class="div_pad_large"></div>
    </div>
  `;
  document.getElementsByTagName("html")[0].appendChild(doc_footer);
}
async function load_async_elements() {
  await Promise.all([
    Array.from(document.getElementsByClassName("async_text")).map(async_element_inner_text),
    Array.from(document.getElementsByClassName("async_html")).map(async_element_inner_html),
    Array.from(document.getElementsByClassName("async_image")).map(async_image_source),
  ]);
}
async function append_steak_zone() {
  let steak_corner = document.createElement("DIV");
  let steak_corner_attr_class = document.createAttribute("class");
  steak_corner_attr_class.value = "top_right";
  steak_corner.setAttributeNode(steak_corner_attr_class);
  let steak_corner_attr_id = document.createAttribute("id");
  steak_corner_attr_id.value = "steak_corner"
  steak_corner.setAttributeNode(steak_corner_attr_id);
  document.body.appendChild(steak_corner);
  let steak_anchor = document.createElement("A");
  let steak_anchor_attr_href = document.createAttribute("href");
  steak_anchor_attr_href.value = "/index.html";
  steak_anchor.setAttributeNode(steak_anchor_attr_href);
  let steak_anchor_attr_class = document.createAttribute("class");
  steak_anchor_attr_class.value = "anchor_no_style";
  steak_anchor.setAttributeNode(steak_anchor_attr_class);
  let steak_anchor_attr_id = document.createAttribute("id");
  steak_anchor_attr_id.value = "steak_anchor";
  steak_anchor.setAttributeNode(steak_anchor_attr_id);
  document.getElementById("steak_corner").appendChild(steak_anchor);
  let steak_span_one = document.createElement("SPAN");
  steak_span_one.innerHTML = "Return to the ";
  let steak_span_one_attr_class = document.createAttribute("class");
  steak_span_one_attr_class.value = "steak_zone_text";
  steak_span_one.setAttributeNode(steak_span_one_attr_class);
  document.getElementById("steak_anchor").appendChild(steak_span_one);
  let steak_span_two = document.createElement("SPAN");
  steak_span_two.innerHTML = "STEAK";
  let steak_span_two_attr_class = document.createAttribute("class");
  steak_span_two_attr_class.value = "steak_zone_text";
  steak_span_two.setAttributeNode(steak_span_two_attr_class);
  let steak_span_two_attr_id = document.createAttribute("id");
  steak_span_two_attr_id.value = "steak_span_two";
  steak_span_two.setAttributeNode(steak_span_two_attr_id);
  document.getElementById("steak_anchor").appendChild(steak_span_two);
  let steak_span_three = document.createElement("SPAN");
  steak_span_three.innerHTML = " zone";
  let steak_span_three_attr_class = document.createAttribute("class");
  steak_span_three_attr_class.value = "steak_zone_text";
  steak_span_three.setAttributeNode(steak_span_three_attr_class);
  document.getElementById("steak_anchor").appendChild(steak_span_three);
  let steak_gif = document.createElement("IMG");
  let steak_gif_attr_src = document.createAttribute("src");
  steak_gif_attr_src.value = "";
  steak_gif.setAttributeNode(steak_gif_attr_src);
  let steak_gif_attr_alt = document.createAttribute("alt");
  steak_gif_attr_alt.value = "STEAK";
  steak_gif.setAttributeNode(steak_gif_attr_alt);
  let steak_gif_attr_class = document.createAttribute("class");
  steak_gif_attr_class.value = "steak_zone_image";
  steak_gif.setAttributeNode(steak_gif_attr_class);
  let steak_gif_attr_id = document.createAttribute("id");
  steak_gif_attr_id.value = "steak_gif";
  steak_gif.setAttributeNode(steak_gif_attr_id);
  let steak_gif_attr_data_path = document.createAttribute("data-path");
  steak_gif_attr_data_path.value = "/resource/steak.gif";
  steak_gif.setAttributeNode(steak_gif_attr_data_path);
  document.getElementById("steak_span_two").innerHTML = "";
  document.getElementById("steak_span_two").appendChild(steak_gif);
  await async_image_source(document.getElementById("steak_gif"));
}
async function append_dropdown_menu() {
  let dropdown_menu = document.createElement("div");
  let dropdown_menu_attr_class = document.createAttribute("class");
  dropdown_menu_attr_class.value = "dropdown_element dropdown_base";
  dropdown_menu.setAttributeNode(dropdown_menu_attr_class);
  dropdown_menu.innerHTML = `
    <button class="dropdown_element dropdown_button" onclick="void (
      document.getElementsByClassName('dropdown_item_list')[0].classList.toggle('dropdown_item_list_active'));">
      <div class="dropdown_element dropdown_base_line"></div>
      <div class="dropdown_element dropdown_base_line"></div>
      <div class="dropdown_element dropdown_base_line"></div>
    </button>
    <div class="dropdown_element dropdown_item_list"></div>
  `;
  document.body.appendChild(dropdown_menu);
  await async_data_request(
    {data_path: "/resource/dropdown-item-list.html", response_type: "document", 
      request_header: "Cache-Control: no-store"}, 
    function(xhr) {document.getElementsByClassName("dropdown_item_list")[0].innerHTML = xhr.response.body.innerHTML;}
  );
  document.addEventListener("click", function(event) {
    if (!event.target.classList.contains("dropdown_element"))
      document.getElementsByClassName('dropdown_item_list')[0].classList.remove('dropdown_item_list_active');
  });
}
async function startup_common(callback, ...args) {
  await Promise.all([
    append_footer(),
    load_async_elements(),
    append_git_data(),
    append_steak_zone(),
    append_dropdown_menu(),
  ]);
  typeof callback === "function" && callback(args);
}
