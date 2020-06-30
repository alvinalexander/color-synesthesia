import './index.css';
import * as d3 from 'd3';
/**
 * Init
 */
const key = (d) => d.key;
let id = 2;

//Create colors
let colors = []

for (let i = 0; i < 26; i++) {
  colors.push('#'+Math.floor(Math.random()*16777215).toString(16));
}

const mapColorsToAlphabet = (colors) => {
  const map = new Map();
  const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
  for (let i = 0; i < alphabet.length; i++) {
    map.set(alphabet[i], colors[i])
  }
  return map;
}

const colorMap = mapColorsToAlphabet(colors);

let dataset = [];
/*const yScale = d3.scaleLinear()
  .domain([0, d3.max(dataset, (d) => d.value)])
  .range([0, h]);*/

/*  const svg = d3.select("svg");

  svg.attr("width", width)
  .attr("height", height) */

  const colorBlocks = d3.select(".container").append("ul").attr("class", "color-blocks");

  colorBlocks.selectAll("li")
  .data(dataset, key)
  .enter()
  .append("li")
  .attr("class", "color-block")
  .style("background-color", function(d) {
  return colorMap.get(d.value);
  })
  .text((d)=> d.value)
  .classed("hide-text", true);

d3.select("body").on("keydown", function(){
    const keyCode = d3.event.keyCode
    if(keyCode != 8){
      if(isValidLetter(keyCode)){
        const newChar = String.fromCharCode(d3.event.keyCode).toLowerCase();
        dataset.push({key: id++, value: newChar});

        const colorBlocks = d3.select("ul").selectAll("li").data(dataset,key);
        colorBlocks.enter()
        .append("li")
        .text((d)=>d.value)
        .attr("class", "color-block hide-text")
        .style("background-color", function(d) {
          return colorMap.get(d.value);
        })
        .style("opacity", 0)
        .transition()
        .duration(200)
        .style("opacity", 1)

        handleToggleEvent();
      }
    }else{
        dataset.splice(-1,1);
        const colorBlocks = d3.select("ul").selectAll("li").data(dataset,key);
        colorBlocks.exit()
        .transition()
        .duration(100)
        .style("opacity", 0)
        .remove()

        handleToggleEvent();
    }

  });

  const isValidLetter =(keyCode) =>{
    if( (keyCode>= 65 && keyCode <= 90) || (keyCode >= 97 && keyCode <= 122 || keyCode === 32)){
      return true;
    }else{
      return false;
    }
  }

const handleToggleEvent =() =>{
  const showText = d3.select("input").node().checked;
  if(showText){
    //re draw all the elements showing text
    const colorBlocks = d3.selectAll('li');
    colorBlocks.each(function(d, i) {
      d3.select(this)
        .classed("hide-text", false)
        .classed("show-text", true);
    });
  }else{
    const colorBlocks = d3.selectAll('li');
    colorBlocks.each(function(d, i) {
      d3.select(this)
      .classed("show-text", false)
      .classed("hide-text", true);
    });
  }

};
d3.select("input").on("change", handleToggleEvent);


//TODO: add drop down for dataset selection
//TODO: toggle between text and color blocks
//chooseDataset()
//update()
//showText global state.



