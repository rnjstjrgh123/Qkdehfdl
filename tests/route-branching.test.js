const assert=require('node:assert/strict');
const {advancePosition,pointForPosition,DESTINATION,FINISHED,CENTER,CENTER_TO_TOPLEFT}=require('../lib/routes');
// Outer route stays outside when a roll passes a corner; branching is activated only
// when a move ends exactly on the corner and the next move starts there.
assert.equal(advancePosition(2,2).pos,4);
assert.equal(advancePosition(2,3).pos,5);
// Bottom-right branch: center exits toward the upper-left diagonal, then follows the
// left/top-left corner and down the left edge.
assert.equal(advancePosition(4,1).pos,100);
assert.equal(advancePosition(100,1).pos,101);
assert.equal(advancePosition(101,1).pos,CENTER_TO_TOPLEFT);
assert.equal(pointForPosition(CENTER_TO_TOPLEFT).x,300);
assert.equal(advancePosition(CENTER_TO_TOPLEFT,1).pos,120);
assert.equal(advancePosition(120,1).pos,121);
assert.equal(advancePosition(121,1).pos,14); // top-left corner
assert.equal(advancePosition(14,1).pos,15); // down the left edge, not lower-left diagonal
// Top-right branch: center exits toward the lower-left diagonal and destination.
assert.equal(advancePosition(9,1).pos,110);
assert.equal(advancePosition(110,1).pos,111);
assert.equal(advancePosition(111,1).pos,CENTER);
assert.equal(advancePosition(CENTER,1).pos,103);
assert.equal(advancePosition(103,1).pos,104);
assert.equal(advancePosition(104,1).pos,DESTINATION);
assert.equal(advancePosition(DESTINATION,1).pos,FINISHED);
// Passing a corner mid-roll does not branch; the upper-left outer path remains open.
assert.equal(advancePosition(13,1).pos,14);
assert.equal(advancePosition(13,2).pos,15);
assert.ok(pointForPosition(CENTER));
console.log('Route tests passed: distinct center exits, corner branching, outer-route crossing, destination wait/finish.');
