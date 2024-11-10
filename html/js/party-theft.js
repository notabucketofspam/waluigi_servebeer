function spawn_funk_meter_bar(element) {
  var new_fmb = document.createElement("DIV");
  var new_fmb_attr_class = document.createAttribute("class");
  new_fmb_attr_class.value = "funk_meter_bar";
  new_fmb.setAttributeNode(new_fmb_attr_class);
  var new_fmb_attr_id = document.createAttribute("id");
  new_fmb_attr_id.value = 
    ("fmb_num_" + (document.getElementsByClassName("funk_meter_bar").length));
  new_fmb.setAttributeNode(new_fmb_attr_id);
  var new_fmb_attr_style = document.createAttribute("style");
  new_fmb_attr_style.value = ("margin: 4px 0px; width: 0px;" + 
    "background-color: "+ (element.style.backgroundColor + ";"));
  new_fmb.setAttributeNode(new_fmb_attr_style);
  document.getElementById("funk_meter_box_bravo").appendChild(new_fmb);
}
// Functions stolen from Adafruit_NeoPixel
function rainbow_rgb(set_hue, set_sat, set_val) {
  var new_red =   (0xFF0000 & (color_hsv(set_hue, set_sat, set_val))) >>> 16;
  var new_green = (0x00FF00 & (color_hsv(set_hue, set_sat, set_val))) >>>  8;
  var new_blue =  (0x0000FF & (color_hsv(set_hue, set_sat, set_val))) >>>  0;
  return "rgb(" + new_red + "," + new_green + "," + new_blue + ")";
}
function color_hsv(hue, sat, val) {
  var r = (1 >>> 1), g = (1 >>> 1), b = (1 >>> 1);
  hue = (hue * 1530 + 32768) / 65536;
  if(hue < 510) {
    b = 0;
    if(hue < 255) {
      r = 255;
      g = hue;
    } else {
      r = 510 - hue;
      g = 255;
    }
  } else if(hue < 1020) {
    r = 0;
    if(hue <  765) {
      g = 255;
      b = hue - 510;
    } else {
      g = 1020 - hue;
      b = 255;
    }
  } else if(hue < 1530) {
    g = 0;
    if(hue < 1275) {
      r = hue - 1020;
      b = 255;
    } else {
      r = 255;
      b = 1530 - hue;
    }
  } else {
    r = 255;
    g = b = 0;
  }
  var v1 =   1 + val;
  var s1 =   1 + sat;
  var s2 = 255 - sat;
  return ((((((r * s1) >>> 8) + s2) * v1) & 0xff00) << 8) |
          (((((g * s1) >>> 8) + s2) * v1) & 0xff00)       |
          ( ((((b * s1) >>> 8) + s2) * v1)           >> 8);
}
