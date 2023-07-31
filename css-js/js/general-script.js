var big_section_xy = [ ];
var full_doc_html = document.getElementsByTagName("html")[0];
var full_doc_body = document.getElementsByTagName("body")[0];

function lock_full_doc_dimensions() {
  var big_section_list = document.getElementsByClassName("big_section");
  var bsl_counter;
  for (bsl_counter = 0; bsl_counter < big_section_list.length; ++bsl_counter) {
    big_section_list[bsl_counter].style.width = String(String(
      Math.ceil(big_section_list[bsl_counter].getBoundingClientRect().width)) + "px");
    big_section_list[bsl_counter].style.height = String(String(
      Math.ceil(big_section_list[bsl_counter].getBoundingClientRect().height)) + "px");
    big_section_xy.push(new function() {
      this.x = big_section_list[bsl_counter].getBoundingClientRect().width;
      this.y = big_section_list[bsl_counter].getBoundingClientRect().height;
    });
  }
  full_doc_html.style.width = String(full_doc_html.getBoundingClientRect().width + "px");
  if (parseInt(full_doc_html.style.width) % 2)
    full_doc_html.style.width = String(String(parseInt(full_doc_html.style.width) - 1) + "px");
  full_doc_html.style.height = String(full_doc_html.getBoundingClientRect().height + "px");
  full_doc_html.style.overflowX = "visible";
  full_doc_html.style.zIndex = 0;
  full_doc_body.style.width = String(full_doc_body.getBoundingClientRect().width + "px");
  if (parseInt(full_doc_body.style.width) % 2)
    full_doc_body.style.width = String(String(parseInt(full_doc_body.style.width) - 1) + "px");
  full_doc_body.style.height = String(full_doc_body.getBoundingClientRect().height + "px");
  full_doc_body.style.overflowX = "visible";
  full_doc_body.style.zIndex = 0;
}
function gated_d_latch (clock, data) {
  if (typeof gated_d_latch.q == "undefined")
    gated_d_latch.q = 0;
  if (clock == 0)
    gated_d_latch.q = gated_d_latch.q;
  if (clock == 1 && data == 0) 
    gated_d_latch.q = 0;
  if (clock == 1 && data == 1)
    gated_d_latch.q = 1;
}
function literal_to_string(str) {
  return String(str).replace(/\n    /g, "");
}
function unicode_to_b64(data) {
  return btoa(unescape(encodeURIComponent(data)));
}
function debug_element_class_border(element_class) {
  var element_list = document.getElementsByClassName(String(element_class));
  var el_counter;
  for (el_counter = 0; el_counter < element_list.length; ++el_counter) {
    element_list[el_counter].style.borderWidth = "1px";
    element_list[el_counter].style.borderColor = "#aa0000";
    element_list[el_counter].style.borderStyle = "solid";
  }
}
