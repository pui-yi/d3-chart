let num_students = [];
      let term = [];
      d3.json("hw3data.json")
        .then((data) => {
          for (key in data) {
          num_students.push(+data[key].students)
          } 
          for (key in data) {
          term.push(data[key])
          } 
          console.log(term);
        let tooltip = d3.select('body')
          .append('div')
          .style('position', 'absolute')
          .style('padding', '0 10px')
          .style('background', 'black')
          .style('opacity', 0);

        let margin = { top: 20, right: 20, bottom: 30, left: 40 };
      
        let height = 200 - margin.top - margin.bottom, width = 500 - margin.left - margin.right, barW = 40, barSpace = 5;
        
        
        let verticalGuide = d3.scaleLinear()
          .domain([0, d3.max(num_students)])
          .range([height, 0]);

        let yS = d3.scaleLinear()
          .domain([0, d3.max(num_students)])
          .range([0, height]);

        let xS = d3.scaleBand()
          .domain(d3.range(0, num_students.length))
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
          .data(num_students)
          .enter()
          .append('rect')
          .style('fill', 'blue')
          .attr('width', xS.bandwidth)
          .attr('height', function(d) { return yS(d); })
          .attr('x', function(d, i) { return xS(i); })
          .attr('y', function(d) { return height - yS(d); })
          .on('mouseover', function(event, d) {
              const[x, y] = d3.pointer(event)
              tooltip.transition()
              .style('opacity', .8)
              tooltip.html(d)
              .style('left', (x + 75) + 'px')
              .style('top', (y + 30) + 'px')
              d3.select(this)
              .style('opacity', .4)
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
          
      })
        .catch(() => {
            console.log("Something was not right! No data!");
      });