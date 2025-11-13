const url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json';

fetch(url)
  .then(res => res.json())
  .then(data => {
    const dataset = data;
    const margin = {top: 50, right: 30, bottom: 50, left: 60};
    const width = 900 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    const svg = d3.select("#scatterplot")
                  .attr("width", width + margin.left + margin.right)
                  .attr("height", height + margin.top + margin.bottom)
                  .append("g")
                  .attr("transform", `translate(${margin.left},${margin.top})`);

    const parseTime = d3.timeParse("%M:%S");
    dataset.forEach(d => d.Time = parseTime(d.Time));

    const xScale = d3.scaleTime()
                     .domain([d3.min(dataset, d => new Date(d.Year,0)), d3.max(dataset, d => new Date(d.Year,0))])
                     .range([0, width]);

    const yScale = d3.scaleTime()
                     .domain([d3.max(dataset, d => d.Time), d3.min(dataset, d => d.Time)])
                     .range([height, 0]);

    const xAxis = d3.axisBottom(xScale).tickFormat(d3.timeFormat("%Y"));
    const yAxis = d3.axisLeft(yScale).tickFormat(d3.timeFormat("%M:%S"));

    svg.append("g")
       .attr("id", "x-axis")
       .attr("transform", `translate(0,${height})`)
       .call(xAxis);

    svg.append("g")
       .attr("id", "y-axis")
       .call(yAxis);

    const tooltip = d3.select("#tooltip");

    svg.selectAll(".dot")
       .data(dataset)
       .enter()
       .append("circle")
       .attr("class", d => d.Doping ? "dot doping" : "dot clean")
       .attr("cx", d => xScale(new Date(d.Year,0)))
       .attr("cy", d => yScale(d.Time))
       .attr("r", 6)
       .attr("data-xvalue", d => d.Year)
       .attr("data-yvalue", d => d.Time)
       .on("mouseover", (event, d) => {
         tooltip.style("opacity", 1)
                .html(`${d.Name}: ${d.Nationality}<br>Year: ${d.Year}<br>Time: ${d3.timeFormat("%M:%S")(d.Time)}<br>${d.Doping}`)
                .attr("data-year", d.Year)
                .style("left", `${event.pageX + 5}px`)
                .style("top", `${event.pageY - 40}px`);
       })
       .on("mouseout", () => tooltip.style("opacity", 0));
  });
