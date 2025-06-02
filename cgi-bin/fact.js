#!/usr/bin/node
import * as fs from "node:fs";
var paint = x=> fs.writeSync(1,x);
paint("Content-Type: text/plain\n\n");
import * as https from "node:https";
import { Buffer } from "node:buffer";

// try to read the fact file
const factpath = "/var/tmp/wsbc/fact";
fs.open(factpath, "r+", (err, fd)=>{
  if (err){
    // looks like there's no fact file
    getfact();
  } else {
    fs.read(fd, (err, bytesRead, buffer)=>{
      // so there's a fact file here, but...
      if (err){
        // ... i guess i can't read it
        paint(err.code);
      } else {
        const lastdate = buffer.readDoubleLE();
        if (Date.now() - lastdate > 1.2e6){
          // ... it's kinda old
          getfact(fd);
        } else {
          // ... it's adequately fresh
          const lastfact = buffer.toString('utf8', 8, bytesRead);
          instill_order(lastfact, fd);
        }
      }
    });
  }
});

/**
  get a fresh fact from gemini
  note: if there's no file descriptor, then this will create the fact file
*/
function getfact(fd){
  // get the gemini request ready
  const GEMINI_API_KEY = fs.readFileSync("../keys/GEMINI_API_KEY", {encoding:"utf8"});
  const MODEL_ID = "gemini-2.5-flash-preview-05-20";
  const GENERATE_CONTENT_API = "generateContent";
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_ID}:${GENERATE_CONTENT_API}?key=${GEMINI_API_KEY}`;
  const postload = {
    "generationConfig":{
      "temperature":2,
      "thinkingConfig":{
        "thinkingBudget":0
      },
      "topP":0.95,
      "topK":64,
      "maxOutputTokens":65536,
      "responseMimeType":"text/plain"
    },
    "safetySettings": [
      {"category": "HARM_CATEGORY_HARASSMENT", "threshold": "OFF"},
      {"category": "HARM_CATEGORY_HATE_SPEECH", "threshold": "OFF"},
      {"category": "HARM_CATEGORY_SEXUALLY_EXPLICIT", "threshold": "OFF"},
      {"category": "HARM_CATEGORY_DANGEROUS_CONTENT", "threshold": "OFF"}
    ],
    "system_instruction":{
      "parts":[{"text":"the user wants a fun fact. the fact must be 100% true. absurd, useless, or irrelevant output is ideal. output must include double entendre, suggestive phrasing, or innuendo. output must be only one sentence. please do not include markdown in the output. thank you!!!"}]
    },
    "contents":[{
      "role":"user",
      "parts":[{"text":"fact"}]
    }]
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
      var truesauce = fulldata["candidates"][0]["content"]["parts"][0]["text"].trim();
      // write down the data using pen-and-paper
      const buffer = Buffer.alloc(8 + Buffer.byteLength(truesauce));
      buffer.writeDoubleLE(Date.now());
      buffer.write(truesauce, 8);
      if (fd){
        fs.ftruncateSync(fd, 0);
        fs.writeSync(fd, buffer, 0, buffer.length, 0);
      } else {
        fs.writeFileSync(factpath, buffer); 
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
