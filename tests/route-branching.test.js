const assert=require('node:assert/strict');
const {advancePosition,pointForPosition,DESTINATION,FINISHED,CENTER}=require('../lib/routes');
// Outer route must stay outside when the roll merely passes a corner.
assert.equal(advancePosition(2,2).pos,4); // lands exactly at bottom-right corner
assert.equal(advancePosition(2,3).pos,5); // crosses corner, continues around outside
// Exact corner landing activates the branch on the next move.
assert.equal(advancePosition(4,1).pos,100);
assert.equal(advancePosition(4,2).pos,101);
assert.equal(advancePosition(4,3).pos,CENTER);
assert.equal(advancePosition(4,4).pos,103);
assert.equal(advancePosition(4,5).pos,104);
assert.equal(advancePosition(4,6).pos,DESTINATION);
assert.equal(advancePosition(4,7).pos,FINISHED);
// Top-right branch enters the center and then proceeds to lower-left.
assert.equal(advancePosition(9,1).pos,110);
assert.equal(advancePosition(9,2).pos,111);
assert.equal(advancePosition(9,3).pos,CENTER);
assert.equal(advancePosition(9,4).pos,103);
assert.equal(advancePosition(9,6).pos,DESTINATION);
assert.equal(advancePosition(9,7).pos,FINISHED);
// Center continuation and exact destination wait / next move finish.
assert.equal(advancePosition(CENTER,1).pos,103);
assert.equal(advancePosition(104,1).pos,DESTINATION);
assert.equal(advancePosition(DESTINATION,1).pos,FINISHED);
assert.equal(advancePosition(DESTINATION,2).pos,FINISHED);
// Top-left corner stays on the outer route; crossing it does not branch.
assert.equal(advancePosition(13,1).pos,14);
assert.equal(advancePosition(13,2).pos,15);
assert.ok(pointForPosition(CENTER));
console.log('Route tests passed: corner branching, outer-route crossing, center continuation, destination wait/finish.');
