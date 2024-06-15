import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { colourPalette } from '../../_components/chartcolourPalette'; // Assuming you have a color palette defined

interface AnimalAppointmentPieChartData {
  AnimalCategory: string;
  AttendedAppointmentsPercentage: number;
}


interface PieChartProps {
  data: AnimalAppointmentPieChartData[];
}

const AnimalAppointmentPieChart: React.FC<PieChartProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const renderChart = () => {
      if (!svgRef.current || !containerRef.current) return;

      const containerWidth = containerRef.current.clientWidth;
      const margin = { top: 40, right: 40, bottom: 40, left: 40 };
      const width = containerWidth - margin.left - margin.right;
      const height = 130;
      const radius = Math.min(width, height) / 2;

      const colour = d3.scaleOrdinal()
        .domain(data.map(d => d.AnimalCategory))
        .range(colourPalette);

      const svg = d3.select(svgRef.current)
        .attr('width', containerWidth)
        .attr('height', height)
        .style('overflow', 'visible');

      svg.selectAll('*').remove();

      const chartGroup = svg.append('g')
      .attr('transform', `translate(${width / 2 - 70},${height / 1 - 45})`);

      const pie = d3.pie<AnimalAppointmentPieChartData>()
        .value(d => d.AttendedAppointmentsPercentage)(data);

      const arc = d3.arc<d3.PieArcDatum<AnimalAppointmentPieChartData>>()
        .innerRadius(0)
        .outerRadius(radius);

      chartGroup.selectAll('path')
        .data(pie)
        .enter().append('path')
        .attr('d', arc)
        .attr('fill', d => colour(d.data.AnimalCategory) as string)
        .attr('stroke', 'white')
        .style('stroke-width', '2px');

      // Calculate total percentage contribution
      const totalPercentage = d3.sum(data, d => d.AttendedAppointmentsPercentage);

      // Position the legend
      const legendWidth = 120; // Adjust width as needed
      const legendHeight = data.length * 20; // Height of the legend based on number of items
      const legendX = width + margin.right - legendWidth - 90; // Right side of the SVG minus margin and legend width
      const legendY = (height - legendHeight) / 2 + 25; // Center vertically

      const legendGroup = svg.append('g')
        .attr('transform', `translate(${legendX},${legendY})`);

      legendGroup.selectAll('rect')
        .data(data)
        .enter().append('rect')
        .attr('x', 0)
        .attr('y', (d, i) => i * 20)
        .attr('width', 12)
        .attr('height', 12)
        .style('fill', d => colour(d.AnimalCategory) as string);

      legendGroup.selectAll('text')
        .data(data)
        .enter().append('text')
        .attr('x', 16)
        .attr('y', (d, i) => i * 20 + 5)
        .attr('dy', '.35em')
        .text(d => `${d.AnimalCategory} (${((d.AttendedAppointmentsPercentage / totalPercentage) * 100).toFixed(2)}%)`);
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

  return (
    <div ref={containerRef} style={{ width: '100%', height: '300px', display: 'flex', justifyContent: 'center' }}>
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default AnimalAppointmentPieChart;
