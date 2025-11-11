const url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json';

fetch(url)
  .then(res => res.json())
  .then(data => {
    const dataset = data.monthlyVariance;
    const baseTemp = data.baseTemperature;
    const margin = {top: 50, right: 30, bottom: 100, left: 80};
    const width = 1000 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    const svg = d3.select("#heatmap")
                  .attr("width", width + margin.left + margin.right)
                  .attr("height", height + margin.top + margin.bottom)
                  .append("g")
                  .attr("transform", `translate(${margin.left},${margin.top})`);

    const years = dataset.map(d => d.year);
    const months = Array.from({length:12}, (_, i) => i+1);

    const xScale = d3.scaleBand()
                     .domain(years)
                     .range([0, width]);

    const yScale = d3.scaleBand()
                     .domain(months)
                     .range([0, height]);

    const tempExtent = d3.extent(dataset, d => d.variance + baseTemp);
    const colorScale = d3.scaleQuantile()
                         .domain([tempExtent[0], tempExtent[1]])
                         .range(["#2a9d8f","#e9c46a","#f4a261","#e76f51"]);

    const xAxis = d3.axisBottom(xScale).tickValues(xScale.domain().filter((d,i) => !(i%10)));
    const yAxis = d3.axisLeft(yScale).tickFormat(d => d3.timeFormat("%B")(new Date(0,d-1)));

    svg.append("g")
       .attr("id", "x-axis")
       .attr("transform", `translate(0,${height})`)
       .call(xAxis)
       .selectAll("text")
       .attr("transform", "rotate(-45)")
       .style("text-anchor", "end");

    svg.append("g")
       .attr("id", "y-axis")
       .call(yAxis);

    const tooltip = d3.select("#tooltip");

    svg.selectAll(".cell")
       .data(dataset)
       .enter()
       .append("rect")
       .attr("class", "cell")
       .attr("data-year", d => d.year)
       .attr("data-month", d => d.month-1)
       .attr("data-temp", d => d.variance + baseTemp)
       .attr("x", d => xScale(d.year))
       .attr("y", d => yScale(d.month))
       .attr("width", xScale.bandwidth())
       .attr("height", yScale.bandwidth())
       .attr("fill", d => colorScale(d.variance + baseTemp))
       .on("mouseover", (event, d) => {
         tooltip.style("opacity", 1)
                .html(`${d.year} - ${d3.timeFormat("%B")(new Date(0,d.month-1))}<br>${(d.variance+baseTemp).toFixed(2)}°C`)
                .attr("data-year", d.year)
                .style("left", `${event.pageX + 5}px`)
                .style("top", `${event.pageY - 40}px`);
       })
       .on("mouseout", () => tooltip.style("opacity", 0));

    const legendColors = ["#2a9d8f","#e9c46a","#f4a261","#e76f51"];
    const legend = d3.select("#legend");
    legendColors.forEach(color => {
      legend.append("rect").attr("fill", color);
    });
  });
