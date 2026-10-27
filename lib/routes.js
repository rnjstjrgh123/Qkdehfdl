// Branch-aware Yutnori path graph. 0..19 are the outer route from the start
// (outer[14]) to the destination (outer[15]); 11 is reserved by the game as finished.
const DESTINATION = 19;
const FINISHED = 999;
const CENTER = 102;
const CENTER_TO_TOPLEFT = 112;
const branchPoints = {
  100:{x:438,y:438}, 101:{x:346,y:346}, 102:{x:300,y:300},
  103:{x:254,y:346}, 104:{x:162,y:438},
  110:{x:438,y:162}, 111:{x:346,y:254},
  120:{x:254,y:254}, 121:{x:162,y:162}, 112:{x:300,y:300}
};
const outerPointIndexes = [14,13,12,11,10,9,8,7,6,5,4,3,2,1,0,19,18,17,16,15];
const outerCoords = [
 {x:162,y:530},{x:254,y:530},{x:346,y:530},{x:438,y:530},{x:530,y:530},
 {x:530,y:438},{x:530,y:346},{x:530,y:254},{x:530,y:162},{x:530,y:70},
 {x:438,y:70},{x:346,y:70},{x:254,y:70},{x:162,y:70},{x:70,y:70},
 {x:70,y:162},{x:70,y:254},{x:70,y:346},{x:70,y:438},{x:70,y:530}
];
const pointByPos = Object.fromEntries(outerCoords.map((p,i)=>[i,p]));
Object.assign(pointByPos, branchPoints);
function isCorner(pos){ return pos===4 || pos===9; }
function stepForward(pos, branchMode){
  // Branching occurs only when a turn begins on a corner. Crossing a corner
  // mid-roll stays on the outside route, as requested.
  if(branchMode && pos===4) return 100;
  if(branchMode && pos===9) return 110;
  if(pos===100) return 101;
  if(pos===101) return CENTER_TO_TOPLEFT;
  if(pos===CENTER_TO_TOPLEFT) return 120;
  if(pos===120) return 121;
  if(pos===121) return 14;
  if(pos===110) return 111;
  if(pos===111) return CENTER;
  if(pos===CENTER) return 103;
  if(pos===103) return 104;
  if(pos===104) return DESTINATION;
  if(Number.isInteger(pos) && pos>=0 && pos<DESTINATION) return pos+1;
  return null;
}
function stepBackward(pos){
  if(pos===DESTINATION) return 18;
  if(pos===104) return 103;
  if(pos===103) return CENTER;
  if(pos===CENTER) return 111;
  if(pos===111) return 110;
  if(pos===121) return 120;
  if(pos===120) return CENTER_TO_TOPLEFT;
  if(pos===CENTER_TO_TOPLEFT) return 101;
  if(pos===101) return 100;
  if(pos===100) return 4;
  if(pos===111) return 110;
  if(pos===110) return 9;
  if(Number.isInteger(pos) && pos>0 && pos<DESTINATION) return pos-1;
  return null;
}
function advancePosition(oldPos, steps, options={}) {
  const launched=!!options.launched;
  if(!Number.isInteger(steps)) throw new Error('steps must be an integer');
  if(steps<0){
    let pos=oldPos;
    for(let i=0;i<Math.abs(steps);i++){
      if(pos===DESTINATION) return {pos:DESTINATION, finished:false, waiting:true};
      pos=stepBackward(pos);
      if(pos===null) return {pos:null,finished:false,waiting:false};
    }
    return {pos,finished:false,waiting:pos===DESTINATION};
  }
  let pos=oldPos;
  const branchMode=isCorner(oldPos);
  for(let i=0;i<steps;i++){
    if(pos===DESTINATION) return {pos:FINISHED,finished:true,waiting:false};
    const next=stepForward(pos, branchMode && i===0);
    if(next===null) return {pos:FINISHED,finished:true,waiting:false};
    pos=next;
  }
  if(pos===DESTINATION && steps>0) return {pos:DESTINATION,finished:false,waiting:true};
  return {pos,finished:false,waiting:false};
}
function pointForPosition(pos){ return pointByPos[pos] || null; }
module.exports={DESTINATION,FINISHED,CENTER,CENTER_TO_TOPLEFT,branchPoints,outerCoords,pointForPosition,isCorner,stepForward,stepBackward,advancePosition};
