/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { colourPalette } from '../../_components/chartcolourPalette'; 

interface PieChartProps {
  data: { TransactionTypeName: string; PercentageUsage: number }[];
}

const DonutChart_DataPoint11: React.FC<PieChartProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const renderChart = () => {
      if (!svgRef.current || !containerRef.current) return;
  
      const containerWidth = containerRef.current.clientWidth;
      const width = containerWidth;
      const height = 280; // Adjust height as needed
      const radius = Math.min(width, height) / 2;
      const innerRadius = radius * 0.6; // Adjust the inner radius for the donut chart
  
      const colour = d3.scaleOrdinal()
        .domain(data.map(d => d.TransactionTypeName))
        .range(colourPalette);
  
      d3.select(svgRef.current).selectAll('*').remove(); // Clear previous chart
  
      const svg = d3.select(svgRef.current)
        .attr('width', width)
        .attr('height', height)
        .style('overflow', 'visible') // Ensure no overflow
        .append('g')
        .attr('transform', `translate(${width / 2},${height / 2 + 50})`); // Center the chart
  
      const pie = d3.pie<{ TransactionTypeName: string; PercentageUsage: number }>()
        .value(d => d.PercentageUsage)(data);
  
      const arc = d3.arc<d3.PieArcDatum<{ TransactionTypeName: string; PercentageUsage: number }>>()
        .innerRadius(innerRadius)
        .outerRadius(radius);
  
      const arcs = svg.selectAll('arc')
        .data(pie)
        .enter().append('g')
        .attr('class', 'arc');
  
      // Create a tooltip
      const tooltip = d3.select(containerRef.current)
        .append('div')
        .style('position', 'absolute')
        .style('background', 'white')
        .style('padding', '5px 10px')
        .style('border', '1px solid #ccc')
        .style('border-radius', '5px')
        .style('pointer-events', 'none')
        .style('opacity', 0);
  
      arcs.append('path')
        .attr('d', arc)
        .attr('fill', d => colour(d.data.TransactionTypeName) as string)
        .attr('stroke', 'white')
        .style('stroke-width', '2px')
        .on('mouseover', function (event, d) {
          d3.select(this).transition().duration(200).attr('opacity', 0.7);
          tooltip.transition().duration(200).style('opacity', 1);
          tooltip.html(`<strong>${d.data.TransactionTypeName}</strong><br/>Percentage: ${d.data.PercentageUsage}%`)
            .style('left', (event.pageX + 10) + 'px')
            .style('top', (event.pageY - 28) + 'px');
  
          // Show the percentage label on hover
          const parentNode = this.parentNode as SVGGElement | null;
          if (parentNode) {
            d3.select(parentNode).select('text').style('opacity', 1);
          }
        })
        .on('mouseout', function () {
          d3.select(this).transition().duration(500).attr('opacity', 1);
          tooltip.transition().duration(500).style('opacity', 0);
  
          // Hide the percentage label when not hovering
          const parentNode = this.parentNode as SVGGElement | null;
          if (parentNode) {
            d3.select(parentNode).select('text').style('opacity', 0);
          }
        });
  
      // Labels inside slices (percentages)
      arcs.append('text')
        .attr('transform', d => `translate(${arc.centroid(d)})`)
        .attr('text-anchor', 'middle')
        .attr('dy', '.35em')
        .style('opacity', 0) // Hide the labels for mouse hovering
        .text(d => `${d.data.PercentageUsage.toFixed(1)}%`);
  
      // Legends outside the chart (horizontal)
      const legend = svg.selectAll('.legend')
        .data(pie)
        .enter().append('g')
        .attr('class', 'legend')
        .attr('transform', (d, i) => `translate(${(i * 150) - (data.length / 2 * 110)}, ${height - 90})`); // Move the position of the legend
      
      // Change the colour legend icon size
      legend.append('rect')
        .attr('x', 0)
        .attr('width', 12)
        .attr('height', 12)
        .style('fill', d => colour(d.data.TransactionTypeName) as string);
  
      // Change the legend text position 
      legend.append('text')
        .attr('x', 20)
        .attr('y', 6.5)
        .attr('dy', '.35em')
        .style('font-size', '12px') // Decrease font size of the text
        .text(d => d.data.TransactionTypeName);
  
      // Donut hole
      svg.append('circle')
        .attr('cx', 0)
        .attr('cy', 0)
        .attr('r', innerRadius)
        .attr('fill', 'white');
    };
  
    renderChart();
  
    window.addEventListener('resize', renderChart);
    return () => window.removeEventListener('resize', renderChart);
  }, [data]);
  
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative' }}>
      <div ref={containerRef} style={{ display: 'inline-block', width: '100%', height: '300px' }}>
        <svg ref={svgRef} />
      </div>
    </div>
  );
  
};

export default DonutChart_DataPoint11;
