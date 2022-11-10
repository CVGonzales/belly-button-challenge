// Use D3 library to read in samples.json file. 

const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

const dataPromise = d3.json(url);
console.log("Data Promise: ", dataPromise);

d3.json(url).then(function(data) {

  let dropdown = d3.select("#selDataset");
  
  for (let i in data.names) {
    let option = dropdown.append("option")
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

  let top10_otu_ids = sample.otu_ids.slice(0,10).map((object)=>"OTU "+object).reverse();
  let top10_otu_labels = sample.otu_labels.slice(0,10).reverse();
  let top10_sample_values= sample.sample_values.slice(0,10);
  top10_sample_values.sort((a,b) => a-b);

  let plotData = [{
    x: top10_sample_values,
    y: top10_otu_ids,
    text: top10_otu_labels,
    orientation:'h',
    type:"bar"}];

  let layout = {
    height: 600,
    width: 600
    }; 
  config={responsive:true};

  graphDiv = document.getElementById('bar');
  Plotly.newPlot("bar", plotData, layout,config);
}

// Create a bubble chart that displays each sample.
// Use otu_ids for the x values.
// Use sample_values for the y values.
// Use sample_values for the marker size.
// Use otu_ids for the marker colors.
// Use otu_labels for the text values.

function bubbleChart(sample) {

  let bubbleChartData = [{
    x: sample.otu_ids,
    y: sample.sample_values,
    mode:"markers",
    marker: {
      size: sample.sample_values,
      color: sample.otu_ids
    },
    text:sample.otu_labels,
    type:"scatter"
  }];

  layout = {
    showlegend: false
  }
  config={responsive:true};
  
  graphDiv = document.getElementById('bubble');
  Plotly.newPlot(graphDiv, bubbleChartData, layout,config);
}

// Display the sample metadata, i.e., an individual's demographic information.

function metadataDisplay(metadata) {
  let dropdown = d3.select("#sample-metadata");
  d3.selectAll('p').remove();

  for (let i in metadata) {
    dropdown.append("p")
      .text(`${i}: ${metadata[i]}`)
  }
}  


// Update all the plots when a new sample is selected.

function optionChanged(value){

  d3.json(url).then(function(data) {
    let sample = [];
    let metadata = [];
    for (let i in data.samples){
      sample = data.samples[i];
      metadata = data.metadata[i];
      if ( sample.id == value ) {
        break;
      }
    }
    barChart(sample);
    bubbleChart(sample);
    metadataDisplay(metadata);
    })
  
  }