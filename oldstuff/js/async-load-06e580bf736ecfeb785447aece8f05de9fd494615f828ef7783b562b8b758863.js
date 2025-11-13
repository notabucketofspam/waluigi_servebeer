async function async_data_request(xhr_prop, callback, ...args) {
  return new Promise((resolve) => {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", xhr_prop.data_path, true);
    if (typeof xhr_prop.response_type === "string") 
      xhr.responseType = xhr_prop.response_type;
    if (typeof xhr_prop.request_header === "string") {
      xhr_prop.request_header.split(";").forEach((substr) => {
        xhr.setRequestHeader(substr.split(":")[0], substr.split(":")[1]);
      });
    }
    xhr.onreadystatechange = function() {
      if(xhr.readyState === 4) {
        if(xhr.status === 200 || xhr.status == 0) {
          typeof callback === "function" && callback(xhr, args);
          resolve(true);
        }
      }
    };
    xhr.send();
  });
}
async function async_image_source(element) {
  await async_data_request(
    {data_path: element.getAttribute("data-path"), response_type: "arraybuffer", 
      request_header: element.getAttribute("data-req-head")}, 
    function(xhr) {
      let a_resp = new Uint8Array(xhr.response), a_resp_len = a_resp.length, bin = "", index;
      for (index = 0; index < a_resp_len; index += 32768)
        bin += String.fromCharCode.apply(null, a_resp.slice(index, Math.min(index + 32768, a_resp_len)));
      let data_uri = "data:image/" + element.getAttribute("data-path").split(".")[1] + ";base64," + btoa(bin);
      element.src = data_uri;
    }
  );
}
async function async_element_inner_text(element) {
  await async_data_request(
    {data_path: element.getAttribute("data-path"), response_type: "text",
      request_header: element.getAttribute("data-req-head")}, 
    function(xhr) {element.innerText = xhr.responseText;}
  );
}
async function async_element_inner_html(element) {
  await async_data_request(
    {data_path: element.getAttribute("data-path"), response_type: "text",
      request_header: element.getAttribute("data-req-head")}, 
    function(xhr) {element.innerHTML = xhr.response;}
  );
}
