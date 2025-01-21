import PropTypes from 'prop-types';
import { Radar, RadarChart, ResponsiveContainer, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import './Performance.css';

/**
 * PerformanceChart Component
 * @param {Object} props - The component props
 * @param {Object} props.performance - The performance data
 * @returns {JSX.Element} RadarChart
 */
const PerformanceChart = ({ performance }) => {
      console.log('Performance Data received:', performance);

      if (!performance || typeof performance !== 'object' || !Array.isArray(performance.data) || performance.data.length === 0) {
            return <div>No performance data available.</div>;
      }

      const transformedData = performance.data.map((item) => ({
            category: performance.kind[item.kind] || 'Unknown',
            value: item.value,
      }));

      return (
            <div className="performance-chart-container">
                  <ResponsiveContainer width={258} height={263}>
                        <RadarChart
                              data={transformedData}
                              margin={{
                                    top: 20,
                                    right: 20,
                                    left: 20,
                                    bottom: 20,
                              }}
                              style={{ backgroundColor: '#1e1e1e', borderRadius: '8px', padding: '0px' }}
                        >
                              <PolarGrid stroke="white" gridType="polygon" radialLines={false} />
                              <PolarAngleAxis dataKey="metric" tick={{ fill: 'white', fontSize: 10 }} />
                              <PolarRadiusAxis tick={false} axisLine={false} />
                              <Radar dataKey="value" stroke="white" fill="#FF0101" fillOpacity={0.6} />
                        </RadarChart>
                  </ResponsiveContainer>
            </div>
      );
};

PerformanceChart.propTypes = {
      performance: PropTypes.shape({
            userId: PropTypes.number.isRequired,
            kind: PropTypes.objectOf(PropTypes.string).isRequired,
            data: PropTypes.arrayOf(
                  PropTypes.shape({
                        value: PropTypes.number.isRequired,
                        kind: PropTypes.number.isRequired,
                  })
            ).isRequired,
      }).isRequired,
};

export default PerformanceChart;
