/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { colourPalette } from '../../_components/chartcolourPalette'; // Import colour palette

interface PieChartProps {
  data: { TransactionTypeName: string; TotalRevenue: number; PercentageContribution: number }[];
}

const PieChart_DataPoint3: React.FC<PieChartProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const renderChart = () => {
      if (!svgRef.current || !containerRef.current) return;

      const containerWidth = containerRef.current.clientWidth;
      const margin = { top: 40, right: 40, bottom: 40, left: 40 }; // Increase top margin for more space

      const width = containerWidth - margin.left - margin.right;
      const height = 280; 
      const radius = Math.min(width, height) / 2;

      const colour = d3.scaleOrdinal()
        .domain(data.map(d => d.TransactionTypeName))
        .range(colourPalette);

      const svg = d3.select(svgRef.current)
        .attr('width', containerWidth)
        .attr('height', height)
        .style('overflow', 'visible');

      svg.selectAll('*').remove();

      // Position the pie chart slightly to the left
      const chartGroup = svg.append('g')
        .attr('transform', `translate(${width / 3},${height / 2 + 50})`); // Adjusted left positioning

      const pie = d3.pie<{ TransactionTypeName: string; TotalRevenue: number; PercentageContribution: number }>()
        .value(d => d.PercentageContribution)(data);

      const arc = d3.arc<d3.PieArcDatum<{ TransactionTypeName: string; TotalRevenue: number; PercentageContribution: number }>>()
        .innerRadius(0)
        .outerRadius(radius);

      chartGroup.selectAll('path')
        .data(pie)
        .enter().append('path')
        .attr('d', arc)
        .attr('fill', d => colour(d.data.TransactionTypeName) as string)
        .attr('stroke', 'white')
        .style('stroke-width', '2px');

      // Calculate total percentage contribution
      const totalPercentage = d3.sum(data, d => d.PercentageContribution);

      // Position the legend
      const legendWidth = 120; // Adjust width as needed
      const legendHeight = data.length * 20; // Height of the legend based on number of items
      const legendX = width + margin.right - legendWidth - 90; // Right side of the SVG minus margin and legend width
      const legendY = (height - legendHeight) / 2 + 50; // Center vertically

      const legendGroup = svg.append('g')
        .attr('transform', `translate(${legendX},${legendY})`);

      legendGroup.selectAll('rect')
        .data(data)
        .enter().append('rect')
        .attr('x', 0)
        .attr('y', (d, i) => i * 20)
        .attr('width', 18)
        .attr('height', 18)
        .style('fill', d => colour(d.TransactionTypeName) as string);

      legendGroup.selectAll('text')
        .data(data)
        .enter().append('text')
        .attr('x', 24)
        .attr('y', (d, i) => i * 20 + 9)
        .attr('dy', '.35em')
        .text(d => `${d.TransactionTypeName} (${((d.PercentageContribution / totalPercentage) * 100).toFixed(2)}%)`);
    };

    renderChart();

    const handleResize = () => {
      renderChart();
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [data]);

  return <div ref={containerRef} style={{ width: '100%', height: '300px', display: 'flex', justifyContent: 'center' }}><svg ref={svgRef}></svg></div>;
};

export default PieChart_DataPoint3;
