import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

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
      const containerHeight = containerRef.current.clientHeight;

      const width = containerWidth;
      const height = containerHeight;
      const radius = Math.min(width, height) / 2;
      const color = d3.scaleOrdinal(d3.schemeCategory10);

      d3.select(svgRef.current).selectAll('*').remove(); // Clear previous chart

      const svg = d3.select(svgRef.current)
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', `translate(${width / 2},${height / 2})`);

      const pie = d3.pie<{ TransactionTypeName: string; TotalRevenue: number; PercentageContribution: number }>()
        .value(d => d.PercentageContribution)(data);

      const arc = d3.arc<d3.PieArcDatum<{ TransactionTypeName: string; TotalRevenue: number; PercentageContribution: number }>>()
        .innerRadius(0)
        .outerRadius(radius);

      svg.selectAll('path')
        .data(pie)
        .enter().append('path')
        .attr('d', arc)
        .attr('fill', d => color(d.data.TransactionTypeName))
        .attr('stroke', 'white')
        .style('stroke-width', '2px');

      const label = d3.arc<d3.PieArcDatum<{ TransactionTypeName: string; TotalRevenue: number; PercentageContribution: number }>>()
        .innerRadius(radius * 0.7)
        .outerRadius(radius * 0.7);

      svg.selectAll('text')
        .data(pie)
        .enter().append('text')
        .attr('transform', d => `translate(${label.centroid(d)})`)
        .attr('dy', '0.35em')
        .text(d => `${d.data.TransactionTypeName} (${d.data.PercentageContribution}%)`)
        .style('text-anchor', 'middle')
        .style('font-size', '12px');
    };

    renderChart();

    window.addEventListener('resize', renderChart);
    return () => window.removeEventListener('resize', renderChart);
  }, [data]);

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }}><svg ref={svgRef} /></div>;
};

export default PieChart_DataPoint3;



