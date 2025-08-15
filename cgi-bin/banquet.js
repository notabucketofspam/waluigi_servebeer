#!/usr/bin/node
import * as fs from "node:fs";
var paint = x=> fs.writeSync(1,x);
paint("Content-Type: text/plain\n\n");
import * as https from "node:https";
import { Buffer } from "node:buffer";

// try to read the content file
const contentpath = "/var/tmp/wsbc/banquet";
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
        if (Date.now() - lastdate > 1.2e6){
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
  const MODEL_ID = "gemini-2.0-flash-preview-image-generation";
  const GENERATE_CONTENT_API = "generateContent";
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_ID}:${GENERATE_CONTENT_API}?key=${GEMINI_API_KEY}`;
  const postload = {
    "contents": [{
      "parts": [
        {"text": "The image is a package of Banquet frozen dinner. The packaging may additionally include one or more of the following phrases: \"Extra Beans\", \"Extra Long\", \"Extra Calories\", \"Extra Sauce\", \"Extra Numbers\", \"Extra Spaghetti\", \"Extra Tracks\", \"Extra Natural\", \"Extra Pop\", \"Extra Grunge\", \"Extra Particles\", \"Extra Plop\", \"Extra Texture\", \"Extra Crab\". The package is sitting on a freezer shelf in a store. The output shall include exactly one image. Thank you!!"}
      ]
    }],
    "generationConfig": {
      "responseModalities": ["IMAGE", "TEXT"],
      "temperature": 2,
      "topP": 1
    }
  };
  const postring = JSON.stringify(postload);
  
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
      var parts = fulldata["candidates"][0]["content"]["parts"];
      var truesauce = parts.find(item=>item["inlineData"])["inlineData"]["data"];
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
