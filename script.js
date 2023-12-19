let num_students = [];
      let term = [];
      d3.json("hw3data.json")
        .then((data) => {
          for (key in data) {
            num_students.push(+data[key].students)
          } 
          for (key in data) {
            term.push(data[key].term)
          } 
        let tooltip = d3.select('body')
          .append('div')
          .style('position', 'absolute')
          .style('padding', '0 10px')
          .style('background', 'black')
          .style('opacity', 0);

        let margin = { top: 20, right: 20, bottom: 40, left: 50 };
      
        let height = 200 - margin.top - margin.bottom, width = 500 - margin.left - margin.right, barW = 40, barSpace = 5;
        
        
        let verticalGuide = d3.scaleLinear()
          .domain([0, d3.max(num_students)])
          .range([height, 0]);

        let yS = d3.scaleLinear()
          .domain([0, d3.max(num_students)])
          .range([0, height]);

        let xS = d3.scaleBand()
          .domain(data.map(d => d.term))
          .range([0, width])
          .padding(0.1);

        let graph = d3.select('#chart')
          .append('svg')
          .attr('width', width + margin.left + margin.right)
          .attr('height', height + margin.top + margin.bottom)
          .style('background', '#C0C0C0')
          .append('g')
          .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');
        
        graph.selectAll('rect')
          .data(data)
          .enter()
          .append('rect')
          .style('fill', 'blue')
          .attr('width', xS.bandwidth)
          .attr('height', function(d) { return yS(d.students); })
          .attr('x', function(d, i) { return xS(d.term); })
          .attr('y', function(d) { return height - yS(d.students); })
          .on('mouseover', function(event, d) {
              const[x, y] = d3.pointer(event)
              tooltip.transition()
                .style('opacity', 0.8)
              tooltip.html(`Term: ${d.term}<br>Students: ${d.students}`)
                .style('left', (x + 75) + 'px')
                .style('top', (y + 30) + 'px')
              d3.select(this)
                .style('opacity', 0.4)
          })
          .on('mouseout', function(event, d) {
            d3.select(this)
              .style('opacity', 1)
          });

        graph.append('g')
            .call(d3.axisLeft(yS).scale(verticalGuide));
          
        graph.append('g')
          .call(d3.axisBottom(xS))
          .attr('transform', 'translate(0, ' + height + ')');
        
        graph.append("g")
          .append("text")
          .attr("transform", "translate (-35, 30) rotate(-90)")
          .attr("stroke", "black")
          .classed("axis text", true)
          .text("Number of students");

        graph.append("g")
          .append("text")
          .attr("transform", "translate(220," + 170 + ")")
          .attr("stroke", "black")
          .classed("axis text", true)
          .text("Term");
      })
        .catch(() => {
            console.log("Something was not right! No data!");
      });