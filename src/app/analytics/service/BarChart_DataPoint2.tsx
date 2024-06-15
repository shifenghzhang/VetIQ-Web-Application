import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { colourPalette } from '../../_components/chartcolourPalette'; //import colour palette

interface BarChartProps {
  data: { TransactionTypeName: string; Month: number; Count: number }[];
}

const BarChart_DataPoint2: React.FC<BarChartProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const renderChart = () => {
      if (!svgRef.current || !containerRef.current) return;

      const containerWidth = containerRef.current.clientWidth;
      const containerHeight = containerRef.current.clientHeight;

      const margin = { top: 20, right: 40, bottom: 100, left: 80 }; // Adjusted margins to make space for axis titles
      const width = containerWidth - margin.left - margin.right;
      const height = containerHeight - margin.top - margin.bottom;

      d3.select(svgRef.current).selectAll('*').remove(); // Clear previous chart

      const svg = d3.select(svgRef.current)
        .attr('width', containerWidth)
        .attr('height', containerHeight)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

      const x = d3.scaleBand()
        .domain(data.map(d => d.TransactionTypeName))
        .range([0, width])
        .padding(0.2);

      const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.Count)!])
        .nice()
        .range([height, 0]);

      // Define colour palette allows the chart to automatically select a colour for each
      // x-axis category from chartcolourPalette.tsx
      const colour = d3.scaleOrdinal()
        .domain(data.map(d => d.TransactionTypeName))
        .range(colourPalette);

      // X-axis
      svg.append('g')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x))
        .selectAll('text')
        .attr('transform', 'rotate(35)') // Rotate labels for better visibility
        .style('text-anchor', 'start') // Adjust anchor for rotated labels
        .style('font-size', '10px'); // Adjust font size as needed

      // X-axis title
      svg.append('text')
        .attr('class', 'x-axis-label')
        .attr('text-anchor', 'middle')
        .attr('x', width / 2)
        .attr('y', height + margin.bottom - 20) // Position below the x-axis
        .style('font-size', '18px')
        .text('Service Type');

      // Y-axis
      svg.append('g')
        .call(d3.axisLeft(y))
        .selectAll('text')
        .style('font-size', '10px');

      // Y-axis title
      svg.append('text')
        .attr('class', 'y-axis-label')
        .attr('text-anchor', 'middle')
        .attr('transform', 'rotate(-90)')
        .attr('x', -height / 2)
        .attr('y', -margin.left + 25) // Position to the left of the y-axis
        .style('font-size', '18px')
        .text('Dollar ($)');

      // Add bars
      svg.selectAll('.bar')
        .data(data)
        .enter().append('rect')
        .attr('class', 'bar')
        .attr('x', d => x(d.TransactionTypeName)!)
        .attr('y', d => y(d.Count))
        .attr('width', x.bandwidth())
        .attr('height', d => height - y(d.Count))
        .attr('fill', d => colour(d.TransactionTypeName) as string); // Apply colour to bar chart
    };

    renderChart();

    window.addEventListener('resize', renderChart);
    return () => window.removeEventListener('resize', renderChart);
  }, [data]);

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }}><svg ref={svgRef} /></div>;
};

export default BarChart_DataPoint2;

