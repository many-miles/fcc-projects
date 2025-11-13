const url = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json';

fetch(url)
  .then(res => res.json())
  .then(data => {
    const width = 1000;
    const height = 600;
    const svg = d3.select("#treemap")
                  .attr("width", width)
                  .attr("height", height);

    const tooltip = d3.select("#tooltip");

    const root = d3.hierarchy(data)
                   .sum(d => d.value)
                   .sort((a,b) => b.value - a.value);

    d3.treemap()
      .size([width, height])
      .padding(1)
      (root);

    const categories = Array.from(new Set(root.leaves().map(d => d.data.category)));
    const color = d3.scaleOrdinal(d3.schemeCategory10).domain(categories);

    svg.selectAll("rect")
       .data(root.leaves())
       .enter()
       .append("rect")
       .attr("class", "tile")
       .attr("data-name", d => d.data.name)
       .attr("data-category", d => d.data.category)
       .attr("data-value", d => d.data.value)
       .attr("x", d => d.x0)
       .attr("y", d => d.y0)
       .attr("width", d => d.x1 - d.x0)
       .attr("height", d => d.y1 - d.y0)
       .attr("fill", d => color(d.data.category))
       .on("mouseover", (event, d) => {
         tooltip.style("opacity", 1)
                .html(`${d.data.name}<br>${d.data.category}<br>$${d.data.value.toLocaleString()}`)
                .attr("data-value", d.data.value)
                .style("left", `${event.pageX + 5}px`)
                .style("top", `${event.pageY - 40}px`);
       })
       .on("mouseout", () => tooltip.style("opacity", 0));

    const legend = d3.select("#legend");
    const legendCellSize = 30;
    categories.forEach((cat, i) => {
      legend.append("rect")
            .attr("class", "legend-item")
            .attr("x", i * legendCellSize)
            .attr("y", 0)
            .attr("width", legendCellSize)
            .attr("height", legendCellSize)
            .attr("fill", color(cat));
    });
  });
