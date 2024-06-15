/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { colourPalette } from '../../_components/chartcolourPalette'; // Assuming you have defined a colour palette

interface BarChartProps {
  data: {
    AppointmentYear: number;
    TotalAppointments: number;
    NewPatientVisits: number;
    ReturningPatientVisits: number;
    RetentionRatePercentage: number;
  }[];
}

const BarChart_DataPoint11: React.FC<BarChartProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const renderChart = () => {
      if (!svgRef.current || !containerRef.current || !colourPalette) return;
  
      const containerWidth = containerRef.current.clientWidth;
      const containerHeight = containerRef.current.clientHeight - 160;
  
      const margin = { top: 20, right: 40, bottom: 100, left: 80 }; // Adjusted margins
      const width = containerWidth - margin.left - margin.right;
      const height = containerHeight - margin.top - margin.bottom;
  
      d3.select(svgRef.current).selectAll('*').remove(); // Clear previous chart
  
      const svg = d3.select(svgRef.current)
        .attr('width', containerWidth)
        .attr('height', containerHeight)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);
  
      const x = d3.scaleBand()
        .domain(data.map(d => `${d.AppointmentYear}`))
        .range([0, width])
        .paddingInner(0.2) // Adjust the inner padding between groups
        .paddingOuter(0.1); // Adjust the outer padding between the groups
  
      const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.TotalAppointments)!])
        .nice()
        .range([height, 0]);
  
      // Bars for TotalAppointments
      svg.selectAll('.bar-total')
        .data(data)
        .enter().append('rect')
        .attr('class', 'bar-total')
        .attr('x', d => x(`${d.AppointmentYear}`) ?? 0) // Handle undefined with default value (0 in this case)
        .attr('y', d => y(d.TotalAppointments) || 0) // Handle undefined with default value (0 in this case)
        .attr('width', x.bandwidth() / 3) // Adjust width as needed
        .attr('height', d => height - (y(d.TotalAppointments) || 0)) // Handle undefined with default value (0 in this case)
        .attr('fill', colourPalette[0] ?? 'black'); // Use the first color from your palette for TotalAppointments
  
      // Bars for NewPatientVisits
      svg.selectAll('.bar-new-patients')
        .data(data)
        .enter().append('rect')
        .attr('class', 'bar-new-patients')
        .attr('x', d => (x(`${d.AppointmentYear}`) ?? 0) + x.bandwidth() / 3) 
        .attr('y', d => y(d.NewPatientVisits) || 0) 
        .attr('width', x.bandwidth() / 3) 
        .attr('height', d => height - (y(d.NewPatientVisits) || 0)) 
        .attr('fill', colourPalette[1] ?? 'black'); 
  
      // Bars for ReturningPatientVisits
      svg.selectAll('.bar-returning-patients')
        .data(data)
        .enter().append('rect')
        .attr('class', 'bar-returning-patients')
        .attr('x', d => (x(`${d.AppointmentYear}`) ?? 0) + 2 * x.bandwidth() / 3) 
        .attr('y', d => y(d.ReturningPatientVisits) || 0)
        .attr('width', x.bandwidth() / 3)
        .attr('height', d => height - (y(d.ReturningPatientVisits) || 0)) 
        .attr('fill', colourPalette[2] ?? 'black');
  
      // X-axis
      svg.append('g')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x))
        .selectAll('text')
        .attr('transform', 'rotate(-45)')
        .style('text-anchor', 'end')
        .style('font-size', '10px');
  
      // X-axis label
      svg.append('text')
        .attr('class', 'x-axis-label')
        .attr('text-anchor', 'middle')
        .attr('x', width / 2)
        .attr('y', height + margin.bottom - 60)
        .style('font-size', '18px')
        .text('Year');
  
      // Y-axis
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
        .text('Total Appointments');
  
      // Legend
      const legendItems = [
        { label: 'Total Appointments', color: colourPalette[0] ?? 'black' },
        { label: 'New Patient Visits', color: colourPalette[1] ?? 'black' },
        { label: 'Returning Patient Visits', color: colourPalette[2] ?? 'black' }
      ];
  
      const legend = svg.append('g')
        .attr('class', 'legend')
        .attr('transform', `translate(${margin.left},${height + margin.bottom - 55})`);
  
      legend.selectAll('rect')
        .data(legendItems)
        .enter().append('rect')
        .attr('x', (d, i) => 140 * i)
        .attr('y', 0)
        .attr('width', 12)
        .attr('height', 12)
        .attr('fill', d => d.color);
  
      legend.selectAll('text')
        .data(legendItems)
        .enter().append('text')
        .attr('x', (d, i) => 140 * i + 20)
        .attr('y', 10)
        .text(d => d.label)
        .style('font-size', '12px')
        .attr('alignment-baseline', 'middle');
    };
  
    renderChart();
  
    // Handle resize
    window.addEventListener('resize', renderChart);
    return () => window.removeEventListener('resize', renderChart);
  }, [data]);
  
  return <div ref={containerRef} style={{ width: '100%', height: '600px' }}><svg ref={svgRef} /></div>; 
};

export default BarChart_DataPoint11;
