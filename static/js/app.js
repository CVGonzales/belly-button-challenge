// Use D3 library to read in samples.json file. 
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

const dataPromise = d3.json(url);
console.log("Data Promise: ", dataPromise);

d3.json(url).then(function(data) {

  let element = d3.select("#se1Dataset");
  for (let i in data.names) {
    let option = element.append("option")
      .text(data.names[i])
      .attr("values", data.names[i]);  
  }

  barChart(data.samples[0]);
  bubbleChart(data.samples[0]);
  metadataDisplay(data.metadata[0]);

    console.log(data);
  });

// Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
// Use sample_values as the values for the bar chart.
// Use otu_ids as the labels for the bar chart.
// Use otu_labels as the hovertext for the chart.

function barChart(sample) {

  let first10Otu = sample.otu_ids.slice(0,10).map((object)=>"OTU "+object).reverse();
  let first10Labels = sample.otu_labels.slice(0,10).reverse();
  let first10Values= sample.sample_values.slice(0,10);
  first10Values.sort((a,b) => a-b);

  let plotData = [{
    x: first10Values,
    y: first10Otu,
    text: first10Labels,
    orientation:'h',
    type:"bar"}];

  let layout = {
    height: 500,
    width: 500
    }; 
  config={responsive:true};

  graphDiv = document.getElementById('bar');
  Plotly.newPlot("bar", plotData, layout,config);
}
