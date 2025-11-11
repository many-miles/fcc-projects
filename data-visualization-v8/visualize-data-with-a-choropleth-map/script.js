const educationURL = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json';
const countiesURL = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json';

Promise.all([d3.json(educationURL), d3.json(countiesURL)]).then(([education, counties]) => {
    const width = 1000;
    const height = 600;
    const svg = d3.select("#choropleth")
                  .attr("width", width)
                  .attr("height", height);

    const tooltip = d3.select("#tooltip");

    const eduMap = new Map(education.map(d => [d.fips, d]));

    const colorScale = d3.scaleThreshold()
        .domain([12, 25, 38, 50])
        .range(["#2a9d8f","#e9c46a","#f4a261","#e76f51"]);

    const path = d3.geoPath();

    svg.append("g")
       .selectAll("path")
       .data(topojson.feature(counties, counties.objects.counties).features)
       .enter()
       .append("path")
       .attr("class", "county")
       .attr("data-fips", d => d.id)
       .attr("data-education", d => eduMap.get(d.id).bachelorsOrHigher)
       .attr("fill", d => colorScale(eduMap.get(d.id).bachelorsOrHigher))
       .attr("d", path)
       .on("mouseover", (event, d) => {
         const edu = eduMap.get(d.id);
         tooltip.style("opacity", 1)
                .html(`${edu.area_name}, ${edu.state}: ${edu.bachelorsOrHigher}%`)
                .attr("data-education", edu.bachelorsOrHigher)
                .style("left", `${event.pageX + 5}px`)
                .style("top", `${event.pageY - 30}px`);
       })
       .on("mouseout", () => tooltip.style("opacity", 0));

    const legendWidth = 400;
    const legendHeight = 50;
    const legendSvg = d3.select("#legend")
                        .attr("width", legendWidth)
                        .attr("height", legendHeight);

    const legendData = colorScale.range().map(color => {
        const d = colorScale.invertExtent(color);
        return {color: color, extent: d};
    });

    const cellWidth = legendWidth / legendData.length;
    legendSvg.selectAll("rect")
             .data(legendData)
             .enter()
             .append("rect")
             .attr("x", (_, i) => i * cellWidth)
             .attr("y", 0)
             .attr("width", cellWidth)
             .attr("height", legendHeight)
             .attr("fill", d => d.color);
});
