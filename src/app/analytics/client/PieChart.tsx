import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

interface PieChartProps {
  data: { TransactionTypeName: string; TotalRevenue: number; PercentageContribution: number }[];
}

const PieChart: React.FC<PieChartProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 400;
    const height = 400;
    const radius = Math.min(width, height) / 2;
    const color = d3.scaleOrdinal(d3.schemeCategory10);

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

    // Adding labels
    const label = d3.arc<d3.PieArcDatum<{ TransactionTypeName: string; TotalRevenue: number; PercentageContribution: number }>>()
      .innerRadius(radius * 0.7)
      .outerRadius(radius * 0.7);

    svg.selectAll('text')
      .data(pie)
      .enter().append('text')
      .attr('transform', d => `translate(${label.centroid(d)})`)
      .attr('dy', '0.35em')
      .text(d => {
        const percentage = (d.data.PercentageContribution * 1).toFixed(2);
        return d.data.PercentageContribution >= 2 ? `${d.data.TransactionTypeName} (${percentage}%)` : ''; // Hides labels with less than 5%
      })
      .style('text-anchor', 'middle')
      .style('font-size', '12px');
  }, [data]);

  return <svg ref={svgRef} />;
};

export default PieChart;
