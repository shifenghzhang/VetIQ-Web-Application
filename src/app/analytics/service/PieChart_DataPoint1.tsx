import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

interface PieChartProps {
  data: { TransactionTypeName: string; PercentageUsage: number; TotalUsage: number }[];
}

const PieChart_DataPoint1: React.FC<PieChartProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const renderChart = () => {
      if (!svgRef.current || !containerRef.current) return;

      const containerWidth = containerRef.current.clientWidth;
      const containerHeight = containerRef.current.clientHeight;

      const width = containerWidth;
      const height = containerHeight;
      const radius = Math.min(width, height) / 2;
      const color = d3.scaleOrdinal(d3.schemeCategory10);

      d3.select(svgRef.current).selectAll('*').remove(); // Clear previous chart

      const svg = d3.select(svgRef.current)
        .attr('width', width + 200) // Add extra width for legend
        .attr('height', height)
        .append('g')
        .attr('transform', `translate(${width / 2},${height / 2})`);

      const pie = d3.pie<{ TransactionTypeName: string; PercentageUsage: number; TotalUsage: number }>()
        .value(d => d.PercentageUsage)(data);

      const arc = d3.arc<d3.PieArcDatum<{ TransactionTypeName: string; PercentageUsage: number; TotalUsage: number }>>()
        .innerRadius(0)
        .outerRadius(radius);

      svg.selectAll('path')
        .data(pie)
        .enter().append('path')
        .attr('d', arc)
        .attr('fill', d => color(d.data.TransactionTypeName))
        .attr('stroke', 'white')
        .style('stroke-width', '2px');

      // Adding legend
      const legend = d3.select(svgRef.current)
        .append('g')
        .attr('transform', `translate(${width}, ${20})`); // Position the legend

      legend.selectAll('rect')
        .data(data)
        .enter().append('rect')
        .attr('x', 0)
        .attr('y', (d, i) => i * 20)
        .attr('width', 18)
        .attr('height', 18)
        .style('fill', d => color(d.TransactionTypeName));

      legend.selectAll('text')
        .data(data)
        .enter().append('text')
        .attr('x', 24)
        .attr('y', (d, i) => i * 20 + 9)
        .attr('dy', '.35em')
        .text(d => `${d.TransactionTypeName} (${(d.PercentageUsage * 1).toFixed(2)}%)`);
    };

    renderChart();

    window.addEventListener('resize', renderChart);
    return () => window.removeEventListener('resize', renderChart);
  }, [data]);

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }}><svg ref={svgRef} /></div>;
};

<<<<<<< HEAD
export default PieChart_DataPoint1;
=======
export default PieChart_DataPoint1;
>>>>>>> 57558663ce470057351e80d5065af23b92d43d45
