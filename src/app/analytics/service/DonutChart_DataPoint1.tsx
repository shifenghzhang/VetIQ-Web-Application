/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { colourPalette } from '../../_components/chartcolourPalette'; // Import colour palette

interface PieChartProps {
  data: { TransactionTypeName: string; PercentageUsage: number; TotalUsage: number }[];
}

const DonutChart_DataPoint1: React.FC<PieChartProps> = ({ data }) => {
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
      const labelPadding = 10; // Padding between the label and the end of the line

      // Define colour palette allows the chart to automatically select a colour for each
      // x-axis category from chartcolourPalette.tsx
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

      // Pie generator
      const pie = d3.pie<{ TransactionTypeName: string; PercentageUsage: number; TotalUsage: number }>()
        .value(d => d.PercentageUsage)(data);

      // Arc generators
      const arc = d3.arc<d3.PieArcDatum<{ TransactionTypeName: string; PercentageUsage: number; TotalUsage: number }>>()
        .innerRadius(innerRadius)
        .outerRadius(radius);

      const outerArc = d3.arc<d3.PieArcDatum<{ TransactionTypeName: string; PercentageUsage: number; TotalUsage: number }>>()
        .innerRadius(radius * 0.9)
        .outerRadius(radius * 0.9);

      // Render pie slices
      const arcs = svg.selectAll('arc')
        .data(pie)
        .enter().append('g')
        .attr('class', 'arc');

      arcs.append('path')
        .attr('d', arc)
        .attr('fill', d => colour(d.data.TransactionTypeName) as string)
        .attr('stroke', 'white')
        .style('stroke-width', '2px');

      // Sort data to get top 8 values
      const sortedData = data.sort((a, b) => b.PercentageUsage - a.PercentageUsage).slice(0, 5); //Adjust number of labels that appear

      // Render leader lines and labels only for top 8 values
      const labelData = pie.filter(d => sortedData.find(sd => sd.TransactionTypeName === d.data.TransactionTypeName));

      // Function to detect and adjust overlapping labels
      const adjustLabels = (labels: { y: number }[]) => {
        labels.forEach((d, i) => {
          if (i === 0) return; // Skip the first label
      
          const prev = labels[i - 1];
          if (prev && d.y - prev.y < 1) {
            d.y = prev.y + 1; // Adjust this value as needed
          }
        });
      };

      // Initial label positions
      const labels = labelData.map(d => {
        const pos = outerArc.centroid(d);
        const midAngle = Math.atan2(pos[1], pos[0]);
        const x = Math.cos(midAngle) * (radius * 1.15);
        const y = Math.sin(midAngle) * (radius * 1.15);
        return { ...d, x, y, text: `${d.data.TransactionTypeName} (${d.data.PercentageUsage.toFixed(1)}%)` };
      });

      // Sort labels by y position to help with collision detection
      labels.sort((a, b) => a.y - b.y);
      adjustLabels(labels);

      // Leader lines
      svg.selectAll('line')
        .data(labels)
        .enter().append('line')
        .attr('stroke', 'black')
        .attr('stroke-width', 1.5)
        .attr('x1', d => {
          const pos = outerArc.centroid(d);
          const midAngle = Math.atan2(pos[1], pos[0]);
          return Math.cos(midAngle) * (radius + labelPadding);
        })
        .attr('y1', d => {
          const pos = outerArc.centroid(d);
          const midAngle = Math.atan2(pos[1], pos[0]);
          return Math.sin(midAngle) * (radius + labelPadding);
        })
        .attr('x2', d => d.x)
        .attr('y2', d => d.y);

      // Labels outside slices
      svg.selectAll('text')
        .data(labels) 
        .enter().append('text')
        .attr('transform', d => `translate(${d.x},${d.y})`)
        .attr('text-anchor', d => (d.x > 0) ? 'start' : 'end')
        .attr('dy', '.35em')
        .text(d => d.text);

      // Total amount text
      const totalAmount = d3.sum(data, d => d.TotalUsage);
      svg.append('text')
        .attr('text-anchor', 'middle')
        .attr('dy', '0.35em')
        .text(`Total: ${totalAmount}`)
        .style('font-size', '20px');

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

  return <div ref={containerRef} style={{ width: '100%', height: '300px' }}><svg ref={svgRef} /></div>;
};

export default DonutChart_DataPoint1;
