/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { colourPalette } from '../../_components/chartcolourPalette';

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

      const margin = { top: 20, right: 40, bottom: 100, left: 80 };
      const width = containerWidth - margin.left - margin.right;
      const height = containerHeight - margin.top - margin.bottom;

      // Select SVG element and append a group for chart elements
      const svg = d3.select(svgRef.current)
        .attr('width', containerWidth)
        .attr('height', containerHeight)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

      // Create scales for x and y axes
      const x = d3.scaleBand()
        .domain(data.map(d => d.TransactionTypeName))
        .range([0, width])
        .padding(0.2);

      const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.Count)!])
        .nice()
        .range([height, 0]);

      // Colour scale for bars
      const colour = d3.scaleOrdinal()
        .domain(data.map(d => d.TransactionTypeName))
        .range(colourPalette);

      // Append x-axis to SVG
      svg.append('g')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x))
        .selectAll('text')
        .attr('transform', 'rotate(35)')
        .style('text-anchor', 'start')
        .style('font-size', '10px');

      // X-axis label
      svg.append('text')
        .attr('class', 'x-axis-label')
        .attr('text-anchor', 'middle')
        .attr('x', width / 2)
        .attr('y', height + margin.bottom - 33)
        .style('font-size', '18px')
        .text('Service Type');

      // Append y-axis to SVG
      svg.append('g')
        .call(d3.axisLeft(y))
        .selectAll('text')
        .style('font-size', '10px');

      // Y-axis label
      svg.append('text')
        .attr('class', 'y-axis-label')
        .attr('text-anchor', 'middle')
        .attr('transform', 'rotate(-90)')
        .attr('x', -height / 2)
        .attr('y', -margin.left + 25)
        .style('font-size', '18px')
        .text('Dollar ($)');

      // Append bars to SVG
      svg.selectAll('.bar')
        .data(data)
        .enter().append('rect')
        .attr('class', 'bar')
        .attr('x', d => x(d.TransactionTypeName)!)
        .attr('y', d => y(d.Count))
        .attr('width', x.bandwidth())
        .attr('height', d => height - y(d.Count))
        .attr('fill', d => colour(d.TransactionTypeName) as string)
        .on('mouseover', function (event, d) {
          // Show tooltip on hover
          d3.select(this)
            .attr('opacity', 0.7);

          svg.append('text')
            .attr('class', 'tooltip')
            .attr('x', x(d.TransactionTypeName)! + x.bandwidth() / 2)
            .attr('y', y(d.Count) - 10) // Adjust vertical position above the bar
            .attr('text-anchor', 'middle')
            .text(d.Count)
            .style('font-size', '12px')
            .style('fill', '#333');
        })
        .on('mouseout', function () {
          // Hide tooltip on mouseout
          d3.select(this)
            .attr('opacity', 1);

          svg.select('.tooltip').remove();
        });
    };

    renderChart();

    // Re-render chart on window resize
    window.addEventListener('resize', renderChart);
    return () => window.removeEventListener('resize', renderChart);
  }, [data]);

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%' }}>
      <svg ref={svgRef} />
    </div>
  );
};

export default BarChart_DataPoint2;
