import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { fetchStockData } from "./fetchStockData";

const StockChart = () => {
  const svgRef = useRef();
  const tooltipRef = useRef();
  const [data, setData] = useState([]);

  const loadStockData = async () => {
    try {
      const newData = await fetchStockData();
      setData(newData);
    } catch (error) {
      console.error("Error fetching stock data:", error);
    }
  };

  useEffect(() => {
    loadStockData();
    const interval = setInterval(loadStockData, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!data.length) return;

    const svg = d3.select(svgRef.current);
    const tooltip = d3.select(tooltipRef.current);
    const width = 800;
    const height = 400;
    const margin = { top: 30, right: 30, bottom: 50, left: 50 };

    svg.attr("width", width).attr("height", height);

    // Expanded Y-Axis Range for More Height
    const minPrice = d3.min(data, (d) => d.price);
    const maxPrice = d3.max(data, (d) => d.price);
    const yPadding = (maxPrice - minPrice) * 1.5; // Increased padding for better spread

    const xScale = d3
      .scaleTime()
      .domain(d3.extent(data, (d) => d.date))
      .range([margin.left, width - margin.right]);

      const yScale = d3
      .scaleLinear()
      .domain([d3.min(data, (d) => d.price) - 2, d3.max(data, (d) => d.price) + 2])
      .range([height - margin.bottom, margin.top]);

    const colorScale = d3
      .scaleSequential(d3.interpolateRdYlGn)
      .domain(d3.extent(data, (d) => d.change));

    // Line Generator
    const line = d3
      .line()
      .x((d) => xScale(d.date))
      .y((d) => yScale(d.price))
      .curve(d3.curveMonotoneX);

    svg.selectAll(".line").remove();
    svg
      .append("path")
      .datum(data)
      .attr("class", "line")
      .attr("fill", "none")
      .attr("stroke-width", 2)
      .transition()
      .duration(1000)
      .attr("stroke", "black")
      .attr("d", line);

    // Added Circles with Hover
    svg.selectAll(".dot").remove();
    svg
      .selectAll(".dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "dot")
      .attr("cx", (d) => xScale(d.date))
      .attr("cy", (d) => yScale(d.price))
      .attr("r", 5)
      .attr("fill", (d) => colorScale(d.change))
      .on("mouseover", (event, d) => {
        const tooltipWidth = 150; // Approximate tooltip width
        const tooltipHeight = 50; // Approximate tooltip height
        const pageWidth = window.innerWidth;
        const pageHeight = window.innerHeight;
        
        let leftPosition = event.pageX + 10; // Default right side
        let topPosition = event.pageY - tooltipHeight - 10; // Default above point
      
        // Prevented tooltip from overflowing right
        if (leftPosition + tooltipWidth > pageWidth) {
          leftPosition = event.pageX - tooltipWidth - 10;
        }
      
        // Prevented tooltip from going above viewport
        if (topPosition < 0) {
          topPosition = event.pageY + 10; // Moved below point
        }
      
        // Preventing tooltip from overflowing left
        if (leftPosition < 0) {
          leftPosition = 10; // Sticking to left edge
        }
      
        // Preventing tooltip from overflowing bottom
        if (topPosition + tooltipHeight > pageHeight) {
          topPosition = pageHeight - tooltipHeight - 10; // Stick to bottom edge
        }
      
        tooltip
          .style("opacity", 1)
          .html(
            `<strong>Price:</strong> $${d.price.toFixed(2)}<br/><strong>Time:</strong> ${d.date.toLocaleTimeString()}`
          )
          .style("left", `${leftPosition}px`)
          .style("top", `${topPosition}px`);
      })
      .on("mousemove", (event) => {
        let leftPosition = event.pageX + 10;
        let topPosition = event.pageY - 50;
      
        if (leftPosition + 150 > window.innerWidth) {
          leftPosition = event.pageX - 160;
        }
      
        if (topPosition < 0) {
          topPosition = event.pageY + 10;
        }
      
        tooltip
          .style("left", `${leftPosition}px`)
          .style("top", `${topPosition}px`);
      })
      .on("mouseout", () => {
        tooltip.style("opacity", 0);
      });
      
    // Updated X & Y Axes with Transitions
    svg.select(".x-axis").transition().duration(750).call(d3.axisBottom(xScale).ticks(5));
    svg.select(".y-axis").transition().duration(750).call(d3.axisLeft(yScale));

    // Axis Labels
    svg.select(".x-label").remove();
    svg
      .append("text")
      .attr("class", "x-label")
      .attr("text-anchor", "middle")
      .attr("x", width / 2)
      .attr("y", height - 10)
      .text("Time");

    svg.select(".y-label").remove();
    svg
      .append("text")
      .attr("class", "y-label")
      .attr("text-anchor", "middle")
      .attr("x", -height / 2)
      .attr("y", 15)
      .attr("transform", "rotate(-90)")
      .text("Stock Price");

    // Legend
    const legend = svg.append("g").attr("transform", `translate(${width - 100}, 20)`);
    legend.append("circle").attr("cx", 10).attr("cy", 10).attr("r", 5).attr("fill", d3.interpolateRdYlGn(0.2));
    legend.append("text").attr("x", 20).attr("y", 15).text("Price Drop");

    legend.append("circle").attr("cx", 10).attr("cy", 30).attr("r", 5).attr("fill", d3.interpolateRdYlGn(0.8));
    legend.append("text").attr("x", 20).attr("y", 35).text("Price Gain");
  }, [data]);

  return (
    <div style={{ position: "relative" }}>
      <h2>Stock Market Price Chart</h2>
      <svg ref={svgRef}>
        <g className="x-axis" transform="translate(0, 350)"></g>
        <g className="y-axis" transform="translate(50, 0)"></g>
      </svg>
      <div
        ref={tooltipRef}
        style={{
          position: "absolute",
          backgroundColor: "white",
          border: "1px solid black",
          padding: "5px",
          borderRadius: "5px",
          opacity: 0,
          pointerEvents: "none",
          fontSize: "12px",
          fontWeight: "bold",
        }}
      ></div>
    </div>
  );
};

export default StockChart;
