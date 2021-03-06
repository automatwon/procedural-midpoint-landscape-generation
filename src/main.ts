///<reference path="p5.d.ts" />

import {TerrainGenerator} from './terrain-generator';
import { ScrollingMidpointDisplacerLinkedList } from './scrolling-midpoint-displacer-linkedlist';

const sketch = function (p : p5) {
  const MARGIN_PERCENTAGE : number = .15;
  
  const W : number = 1400;
  const H : number = 400;

  const minimumW: number = 800;
  const maximumH: number = Math.round(H *(1 - MARGIN_PERCENTAGE));

  const mdp : TerrainGenerator = new ScrollingMidpointDisplacerLinkedList(minimumW, maximumH);

  p.setup = function () {
    p.createCanvas(W, H);
    p.strokeWeight(2);
    p.frameRate(20);
    
  };

  p.draw = function() {
    p.background(p.color('black'));
    
    p.push();
    p.translate(0, MARGIN_PERCENTAGE * H / 2);
    p.stroke(p.color(98, 203, 157));
    mdp.update(); 
    mdp.render(p);
    p.pop();

    p.stroke(p.color('white'));
    p.line(minimumW, 0, minimumW, H);

    p.fill(p.color(211, 245, 235, 90));
    p.rect(minimumW, 0, W, H);
  };
};

// TODO(freefood): fix data.json to have more explicit type 
new p5(sketch, false, false);