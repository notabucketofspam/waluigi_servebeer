#!/usr/bin/node
import * as fs from "node:fs";
var paint = x=> fs.writeSync(1,x);
paint("Content-Type: text/plain\n\n");
import * as https from "node:https";
import { Buffer } from "node:buffer";
import * as os from "node:os";
import * as path from "node:path";

// try to read the content file
const contentpath = path.join(os.tmpdir(),"wsbc_banquet");
const max_fresh = 8e7;
fs.open(contentpath, "r+", (err, fd)=>{
  if (err){
    // looks like there's no content file
    getcontent();
  } else {
    const sizen = fs.fstatSync(fd).size;
    fs.read(fd, {buffer: Buffer.alloc(sizen)}, (err, bytesRead, buffer)=>{
      // so there's a content file here, but...
      if (err){
        // ... i guess i can't read it
        paint(err.code);
      } else {
        const lastdate = buffer.readDoubleLE();
        if (Date.now() - lastdate > max_fresh){
          // ... it's kinda old
          getcontent(fd);
        } else {
          // ... it's adequately fresh
          const lastcontent = buffer.toString('utf8', 8, bytesRead);
          instill_order(lastcontent, fd);
        }
      }
    });
  }
});

/**
  get fresh content from gemini
  note: if there's no file descriptor, then this will create the content file
*/
function getcontent(fd){
  // get the gemini request ready
  
  const GEMINI_API_KEY = fs.readFileSync("../keys/GEMINI_API_KEY", {encoding:"utf8"});

  const request_json = {
    "model": "models/gemini-3.1-flash-lite-image",
    "input": "A package of Banquet frozen dinner. The packaging may additionally include one or more of the following phrases: \"Extra Beans\", \"Extra Long\", \"Extra Calories\", \"Extra Sauce\", \"Extra SO-DIMM Slots\", \"Extra Banquet\", \"Bonus Songs\", \"Extra Natural\", \"Extra Pop\", \"More Grunge\", \"Extra Particles\", \"Extra Plop\", \"Extra Texture\", \"100% Natural 'Crab'\", \"Very Special\", \"Reduced Guilt\". The package is sitting on a freezer shelf in a store.",
    "generation_config": {
        "temperature": 1,
        "max_output_tokens": 65536,
        "top_p": 1,
        "thinking_level": "low",
        "image_config": {
          "aspect_ratio": "1:1"
        }
    },
    "response_modalities": ["image"]
  };
  const postring = JSON.stringify(request_json);
  
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/interactions?key=${GEMINI_API_KEY}`;
  
  // how to handle the response
  const req = https.request(endpoint,{method: "POST", headers:{"Content-Type": "application/json"}}, res=>{
    var fulltext = "";
    res.setEncoding("utf8");  
    res.on("data", data=>{
      fulltext += data;
    });
    res.on("end", ()=>{
      // parse the data
      var fulldata = JSON.parse(fulltext);
      let imagedata = "";
      try {
        /**@type any[]*/
        let steps = fulldata["steps"];
        /**@type any[]*/
        let actual_content = steps.find(item => typeof item["content"] !== 'undefined')["content"];
        let actual_image = actual_content.find(item => item["type"] === 'image');
        /**@type string*/
        imagedata = actual_image["data"];
      } catch(err) {
        imagedata = "error: " + err.message;
      }

      var truesauce = imagedata;
      // write down the data using pen-and-paper
      const buffer = Buffer.alloc(8 + Buffer.byteLength(truesauce));
      buffer.writeDoubleLE(Date.now());
      buffer.write(truesauce, 8);
      if (fd){
        fs.ftruncateSync(fd, 0);
        fs.writeSync(fd, buffer, 0, buffer.length, 0);
      } else {
        fs.writeFileSync(contentpath, buffer); 
      }
      // serve the order to the customer
      instill_order(truesauce, fd);
    });
  });
  
  // actually send the request to gemini
  req.on("error",e=>{});
  req.write(postring);
  req.end();
}

/**
  cleanup n stuff
*/
function instill_order(portrait, fd){
  paint(portrait);
  if (fd){
    fs.close(fd, (err)=>{
      if (err){
        // apparently the file can't be closed
        paint(err.errno);
      }
    });
  }
}
