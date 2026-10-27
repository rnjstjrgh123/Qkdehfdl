const fs=require('fs');const path=require('path');const assert=require('assert');const root=path.join(__dirname,'..');const served=fs.readFileSync(path.join(root,'public','index.html'),'utf8');const top=fs.readFileSync(path.join(root,'index.html'),'utf8');const picker=fs.readFileSync(path.join(root,'public','augment-picker.html'),'utf8');const server=fs.readFileSync(path.join(root,'server.js'),'utf8');assert.strictEqual(top,served,'root index.html and public/index.html must match');assert(served.includes('augment-picker.html'),'game page must open the separate picker');assert(served.includes('augment-yutnori:choose'),'game page must receive picker messages');assert(picker.includes("augment-yutnori:choose"),"picker must send selected augment");for(const id of ['fortune','capturer','guardian','swift'])assert(picker.includes('data-augment="'+id+'"'),'picker missing '+id);assert(server.includes('socket.on("player:augment"'),'server must accept augment selections');assert(server.includes('r.phase="augment"'),'server must enter augment phase');assert(server.includes('r.phase="playing"'),'server must advance to playing phase');new Function(served.match(/<script>([\s\S]*?)<\/script>/)[1]);new Function(picker.match(/<script>([\s\S]*?)<\/script>/)[1]);// Route/goal consistency regression checks.
const routeMatch=served.match(/const routePoints=(\[[\s\S]*?\]);/);
assert(routeMatch,'routePoints must be defined');
const outerMatch=served.match(/const outer=(\[[\s\S]*?\]);/);
assert(outerMatch,'outer board path must be defined');
const outer=new Function('return '+outerMatch[1])();
const routePoints=new Function('outer','return '+routeMatch[1])(outer);
assert.strictEqual(routePoints.length,11,'route must contain positions 0..10');
assert.deepStrictEqual(routePoints[10],{x:70,y:530},'position 10 must be the destination at the bottom-left corner');
assert.deepStrictEqual(routePoints[7],{x:300,y:300},'route must pass through the center');
assert.deepStrictEqual(routePoints[8],{x:254,y:346},'after center, route must continue toward the lower-left diagonal');
assert.deepStrictEqual(routePoints[9],{x:162,y:438},'route must pass the lower-left diagonal node before destination');
assert(server.includes('if(old === 0 && res.value < 0) target = 10'),'back-do from first step must wait at destination');
assert(server.includes('else if(target>10)'),'moving beyond destination must finish');
assert(server.includes('else if(target===10)'),'landing exactly on destination must wait');
assert(served.includes('pos>=11'),'client must hide completed pieces at position 11');
assert(server.includes('target<10'),'capture checks must exclude the waiting destination');
console.log('PASS: augment flow, HTML parity, JavaScript syntax, center-to-lower-left route, destination waiting, back-do and finish thresholds');