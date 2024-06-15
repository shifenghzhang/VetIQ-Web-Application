/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { colourPalette } from '../../_components/chartcolourPalette'; // Adjust import path as necessary

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

      arcs.append('path')
        .attr('d', arc)
        .attr('fill', d => colour(d.data.TransactionTypeName) as string)
        .attr('stroke', 'white')
        .style('stroke-width', '2px');

      // Labels inside slices (percentages)
      arcs.append('text')
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        .attr('transform', d => `translate(${arc.centroid(d)})`)
        .attr('text-anchor', 'middle')
        .attr('dy', '.35em')
        .text(d => `${d.data.PercentageUsage.toFixed(1)}%`);

      // Legends outside the chart
      const legend = svg.selectAll('.legend')
        .data(pie)
        .enter().append('g')
        .attr('class', 'legend')
        .attr('transform', (d, i) => `translate(${width / 2 + radius + 20},${(i * 20) - (data.length / 2 * 20) - 100})`); // Adjust spacing

      legend.append('rect')
        .attr('x', 0)
        .attr('width', 18)
        .attr('height', 18)
        .style('fill', d => colour(d.data.TransactionTypeName) as string);

      legend.append('text')
        .attr('x', 24)
        .attr('y', 9)
        .attr('dy', '.35em')
        .text(d => d.data.TransactionTypeName);

      // Color legend
      const colorLegend = svg.append('g')
        .attr('class', 'color-legend')
        .attr('transform', `translate(${width / 2 - radius},${height + 30})`);

      const legendItems = colorLegend.selectAll('.legend-item')
        .data(data)
        .enter().append('g')
        .attr('class', 'legend-item')
        .attr('transform', (d, i) => `translate(${i * 120}, 0)`);

      legendItems.append('rect')
        .attr('x', 0)
        .attr('width', 18)
        .attr('height', 18)
        .attr('fill', d => colour(d.TransactionTypeName) as string);

      legendItems.append('text')
        .attr('x', 15)
        .attr('y', 0)
        .attr('dy', '0.35em')
        .text(d => d.TransactionTypeName);

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
    <div style={{ width: '100%', textAlign: 'center' }}>
      <div ref={containerRef} style={{ display: 'inline-block', width: '100%', height: '300px' }}>
        <svg ref={svgRef} />
      </div>
    </div>
  );
};

export default DonutChart_DataPoint11;
