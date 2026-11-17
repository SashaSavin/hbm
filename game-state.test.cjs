const {test}=require('node:test');
const assert=require('node:assert/strict');
const {createGame,steps}=require('./dist/game-state.js');
test('objects must be found in story order; wrong choices cannot skip chapters',()=>{
 const game=createGame();
 assert.equal(game.choose('painting').reason,'inactive');
 game.start();
 assert.equal(game.choose('coffee').reason,'wrong');
 assert.equal(game.index,0);
 for(const step of steps){assert.equal(game.current.id,step.id);assert.equal(game.choose(step.id).ok,true);}
 assert.equal(game.complete,true);
 assert.equal(game.choose('dream').reason,'inactive');
});
test('restart returns to entrance and permits a complete new story',()=>{
 const game=createGame();game.start();game.choose('painting');game.reset();
 assert.equal(game.index,-1);assert.equal(game.current,null);assert.equal(game.complete,false);
 game.start();assert.equal(game.current.id,'painting');
 for(const step of steps)game.choose(step.id);
 assert.equal(game.complete,true);
});
