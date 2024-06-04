import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

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

      const margin = { top: 20, right: 30, bottom: 60, left: 40 };
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
        .attr('height', d => height - y(d.Count))
        .attr('fill', d => color(d.TransactionTypeName)); // Apply color scale to bars
    };

    renderChart();

    window.addEventListener('resize', renderChart);
    return () => window.removeEventListener('resize', renderChart);
  }, [data]);

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }}><svg ref={svgRef} /></div>;
};

export default BarChart_DataPoint2;

