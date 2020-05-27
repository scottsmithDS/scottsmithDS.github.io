
function init() {
  

    d3.json("data/samples.json").then((data) => {
      var datanames = data.names;
      var dropdown = d3.select("#selDataset");
      var selection = dropdown.selectAll("option") 
        .data(datanames) 
        .enter()
        .append("option")
        .text(function(d) {
          return d;
        }); 
    all3(940);
    });
  }
  init();

  d3.selectAll("#selDataset").on("change", changeee);
  
  function changeee() {
    var newchoice = d3.select("#selDataset");
    var newchoicewhich = newchoice.node().value;
    all3(parseInt(newchoicewhich));
  }

  function all3(i) {
    d3.json("data/samples.json").then((data) => {
        var metadataa = data.metadata[data.metadata.findIndex(m => m.id === i)];
        var indexy = data.samples.findIndex(m => m.id == i);
        var samples = data.samples.map(object => object.sample_values); 
        var Ids = data.samples.map(object => object.otu_ids); 
        var Labels = data.samples.map(object => object.otu_labels); 
        var Keys = Object.keys(metadataa);
        var Value = Object.values(metadataa);
        var datainput = d3.select('#sample-metadata');
        datainput.html("");
        for (var l = 0; l < Keys.length; l++) {
          datainput.append("p").text(`${Keys[l]}: ${Value[l]}`);
        var samplesslice = samples[indexy].slice(0, 10);
        var IdsSliced = Ids[indexy].slice(0, 10);
        var LabelsSliced = Labels[indexy].slice(0, 10);
        var Idsslicestr = IdsSliced.map(String);
        Idsslicestr.forEach(function(element, indexy) {
            Idsslicestr[indexy] = 'OTU ' + element;
          });
        revsamplesslice = samplesslice.reverse();
        revIds = Idsslicestr.reverse();
        revlabels= LabelsSliced.reverse();
        var trace1 = {
            x: revsamplesslice,
            y: revIds,
            text: revlabels,
            name: "OTUs",
            type: "bar",    
            orientation: "h"      
          };
        var trace2 = {
            x: Ids[indexy],
            y: samples[indexy],
            text: Labels[indexy],
            mode: 'markers',
            marker: {
            size: samples[indexy],
            color: Ids[indexy]
          }
        };
        var databar = [trace1];
        var databubbs = [trace2];
        
        var bartitle = {
            title: "Top 10"  
          };
        var bubbs = {
          xaxis: {
            title: {
              text: "OTU"
            }
          },
          showlegend: false  
        };

        Plotly.newPlot("bar", databar, bartitle);  
        Plotly.newPlot('bubble', databubbs, bubbs);
     }  ;  
    })};