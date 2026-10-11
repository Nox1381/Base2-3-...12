import test from 'node:test';
import assert from 'node:assert/strict';
import { createCargoMission, moveCargo, inspectCargo, termForPair, class1Result, CARGO_MODES, CARGO_SIZES, pairExplanation } from '../docs/cargo-games-engine.js';

function rng(seed) {
  return () => { seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; return seed / 4294967296; };
}
test('all four cargo games generate 2, 4 and 6 pairs without malformed cards', () => {
  assert.equal(CARGO_MODES.length, 4);
  for (const mode of CARGO_MODES.map(x => x.id)) for (const count of CARGO_SIZES) {
    for (let seed = 1; seed <= 24; seed++) {
      const mission = createCargoMission(mode, count, rng(seed));
      assert.equal(mission.cards.length, mission.kind === 'ship' ? count*2 : count);
      assert.equal(new Set(mission.cards.map(c => c.id)).size, mission.cards.length);
      assert.ok(mission.cards.every(c => c.label && c.detail));
      assert.ok(mission.bins.length >= count);
      assert.equal(inspectCargo(mission).total, mission.cards.length);
    }
  }
});
test('closed CTU packing rejects Class 1 conflicts and accepts correctly grouped cargo', () => {
  assert.equal(class1Result('B','D').status,'forbidden');
  assert.equal(class1Result('D','D').status,'permitted');
  assert.equal(class1Result('L','L').status,'conditional');
  for (const count of CARGO_SIZES) {
    const mission = createCargoMission('packer', count, rng(13));
    let placed = { ...mission.placements };
    const grouped = [...new Set(mission.cards.map(c=>c.group))].map(group => mission.cards.filter(c=>c.group===group));
    grouped.forEach((cards, i) => {
      placed = moveCargo(mission, placed, cards[0].id, mission.bins[i].slots[0]);
      placed = moveCargo(mission, placed, cards[1].id, mission.bins[i].slots[1]);
    });
    const status = inspectCargo(mission, placed);
    assert.equal(status.placed, count*2);
    assert.equal(status.findings.length, 0);
    assert.equal(status.passed, true);
    const bin0 = mission.bins[0], bin1 = mission.bins[1];
    placed = moveCargo(mission, placed, placed[bin0.slots[0]], bin1.slots[0]);
    assert.equal(inspectCargo(mission, placed).findings.length,2);
    placed = moveCargo(mission, placed, placed[bin0.slots[0]], bin1.slots[0]);
    assert.equal(inspectCargo(mission, placed).findings.length,0);
  }
});
test('repair starts conflicted but a table-compatible solution is reachable', () => {
  for (const count of CARGO_SIZES) {
    const mission = createCargoMission('repair', count, rng(count));
    assert.ok(inspectCargo(mission).findings.length >= 2);
    const placement = {};
    const grouped = [...new Set(mission.cards.map(c => c.group))].map(group => mission.cards.filter(c=>c.group===group));
    grouped.forEach((cards, i) => cards.forEach((card, j) => { placement[mission.bins[i].slots[j]] = card.id; }));
    assert.equal(inspectCargo(mission, placement).passed,true);
    assert.equal(inspectCargo(mission, mission.placements).passed,false);
  }
});
test('general-table terminology covers 1-4, X and * without treating X as approval', () => {
  const cases = [['3','5.1','2'],['1.1','3','4'],['3','9','X'],['1.1','1.2','*']];
  for(const [a,b,expected] of cases) assert.equal(termForPair(a,b),expected);
  for(const count of CARGO_SIZES) {
    const mission=createCargoMission('terms',count,rng(17));
    assert.equal(new Set(mission.cards.map(c=>c.target)).size,count);
    let placement={};
    for(const card of mission.cards) {
      assert.equal(card.code,termForPair(card.a.label,card.b.label));
      placement=moveCargo(mission,placement,card.id,card.target);
      assert.match(pairExplanation(card), /DGL column 16b/);
    }
    assert.equal(inspectCargo(mission,placement).passed,true);
    const first=mission.cards[0], bad=mission.bins.find(x=>x.id!==first.target);
    placement=moveCargo(mission,placement,first.id,bad.id);
    assert.equal(inspectCargo(mission,placement).findings.length,1);
    placement=moveCargo(mission,placement,first.id,'quay');
    assert.equal(inspectCargo(mission,placement).placed,count-1);
  }
});
test('harbour decision desk distinguishes prohibited, permitted, conditional, DGL and general rules', () => {
  for (let seed=1;seed<20;seed++) for(const count of CARGO_SIZES) {
    const mission=createCargoMission('desk',count,rng(seed));
    let placements={};
    for(const card of mission.cards) {
      assert.ok(mission.bins.some(bin => bin.id === card.target));
      if(card.kind==='explosive') assert.equal(card.target,class1Result(card.a.group,card.b.group).status);
      else assert.equal(card.target,card.code==='X'?'dgl':card.code==='*'?'class1':'term');
      placements=moveCargo(mission,placements,card.id,card.target);
    }
    assert.equal(inspectCargo(mission,placements).passed,true);
  }
});
test('ship cards can be unloaded and swapped; invalid moves do not mutate placements', () => {
  const mission=createCargoMission('packer',2,rng(14));
  const a=mission.cards[0],b=mission.cards[1];
  let p=moveCargo(mission,{},a.id,mission.bins[0].slots[0]);
  p=moveCargo(mission,p,b.id,mission.bins[0].slots[1]);
  const q=moveCargo(mission,p,a.id,mission.bins[0].slots[1]);
  assert.equal(q[mission.bins[0].slots[1]],a.id);
  assert.equal(q[mission.bins[0].slots[0]],b.id);
  assert.deepEqual(moveCargo(mission,q,'missing','quay'),q);
  assert.equal(Object.keys(moveCargo(mission,q,a.id,'quay')).length,1);
});
