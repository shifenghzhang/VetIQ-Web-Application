import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

interface StopwatchPieChartProps {
  duration: number;
  label: string;
}

const StopwatchPieChart: React.FC<StopwatchPieChartProps> = ({ duration, label }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const renderChart = () => {
      if (!svgRef.current || !containerRef.current) return;

      const containerWidth = containerRef.current.clientWidth;
      const width = containerWidth;
      const height = 120; // Adjust height as needed
      const radius = Math.min(width, height) / 2;
      const innerRadius = radius * 0.6;
      const outlineRadius = radius + 5; // Radius for the outline circle

      d3.select(svgRef.current).selectAll('*').remove();

      const svg = d3.select(svgRef.current)
        .attr('width', width)
        .attr('height', height)
        .style('overflow', 'visible')
        .append('g')
        .attr('transform', `translate(${width / 3 + 20},${height / 1 - 30})`);

      const data = [{ label, value: duration }, { label: label, value: 60 - duration }];

      const pie = d3.pie<{ label: string; value: number }>()
        .value(d => d.value)(data);

      const arc = d3.arc<d3.PieArcDatum<{ label: string; value: number }>>()
        .innerRadius(innerRadius)
        .outerRadius(radius);

      const colour: string[] = ['#F9F871', '#FFFFFF']; // Colours for completed and remaining

      const arcs = svg.selectAll('arc')
        .data(pie)
        .enter().append('g')
        .attr('class', 'arc');

      arcs.append('path')
        .attr('d', arc)
        .attr('fill', (d, i) => colour[i]!)
        .attr('stroke', 'white')
        .style('stroke-width', '2px');

      // Center title label 
      const centerLabel = svg.append('text')
        .attr('text-anchor', 'middle')
        .attr('dy', '.35em')
        .text(`${label}`)
        .style('font-size', '24px')
        .style('font-weight', 'bold')
        .attr('fill', 'black')
        .attr('transform', `translate(0, ${-10})`); // Adjust vertical positioning

      // title label with duration 
      const remainingLabel = svg.append('text')
        .attr('text-anchor', 'middle')
        .attr('dy', '1.5em')
        .text(`${duration} min`) 
        .style('font-size', '16px')
        .attr('fill', 'black')
        .attr('transform', `translate(0, ${10})`); // Adjust vertical positioning

      // Donut hole
      svg.append('circle')
        .attr('cx', 0)
        .attr('cy', 0)
        .attr('r', innerRadius)
        .attr('fill', 'white');

      // Outline circle
      svg.append('circle')
        .attr('cx', 0)
        .attr('cy', 0)
        .attr('r', outlineRadius)
        .attr('fill', 'none')
        .attr('stroke', '#ccc') // Colour of the outline
        .attr('stroke-width', '1px');

      // Bring the labels to the front
      centerLabel.raise(); // Move center label to the front
      remainingLabel.raise(); // Move remaining label to the front
    };

    renderChart();

    window.addEventListener('resize', renderChart);
    return () => window.removeEventListener('resize', renderChart);
  }, [duration, label]);

  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative' }}>
      <div ref={containerRef} style={{ display: 'inline-block', width: '100%', height: '150px' }}>
        <svg ref={svgRef} />
      </div>
    </div>
  );
};

export default StopwatchPieChart;