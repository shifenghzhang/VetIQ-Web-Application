/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface BarChartProps {
  data: { TransactionTypeName: string; Month: number; Count: number }[];
}

const BarChart: React.FC<BarChartProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const margin = { top: 20, right: 30, bottom: 60, left: 40 }; // Adjusted bottom margin
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleBand()
      .domain(data.map(d => d.TransactionTypeName))
      .range([0, width])
      .padding(0.1);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.Count)!])
      .nice()
      .range([height, 0]);

    // Define color scale
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('transform', 'rotate(45)')
      .style('text-anchor', 'start')
      .style('font-size', '12px');

    svg.append('g')
      .call(d3.axisLeft(y));

    svg.selectAll('.bar')
      .data(data)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', d => x(d.TransactionTypeName)!)
      .attr('y', d => y(d.Count))
      .attr('width', x.bandwidth())
      .attr('height', d => height - y(d.Count))
      .attr('fill', d => color(d.TransactionTypeName)); // Apply color scale to bars
  }, [data]);

  return <svg ref={svgRef} />;
};

export default BarChart;
