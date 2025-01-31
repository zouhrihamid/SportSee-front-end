import PropTypes from 'prop-types';
import { Radar, RadarChart, ResponsiveContainer, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import './Performance.css';

/**
 * Prepare Data for RadarChart
 * @param {Object} performance - The performance data
 * @returns {Array} Transformed and reversed performance data
 */
const prepareData = (performance) => {
      if (performance.data.length === 0) {
            return <div>No performance data available.</div>;
      }
      const categoryTranslation = {
            cardio: 'Cardio',
            energy: 'Energie',
            endurance: 'Endurance',
            strength: 'Force',
            speed: 'Vitesse',
            intensity: 'Intensité',
      };
      return performance.data
            .map((item) => ({
                  category: categoryTranslation[performance.kind[item.kind]] || 'Unknown',
                  value: item.value,
            }))
            .reverse();
};

/**
 * PerformanceChart Component
 * @param {Object} props - The component props
 * @param {Object} props.performance - The performance data
 * @returns {JSX.Element} RadarChart
 */

const PerformanceChart = ({ performance }) => {
      return (
            <div className="performance-chart-container">
                  <ResponsiveContainer width="100%" height="100%">
                        <RadarChart
                              data={prepareData(performance)}
                              margin={{
                                    top: 0,
                                    right: 35,
                                    left: 30,
                                    bottom: 0,
                              }}
                              style={{ backgroundColor: 'rgba(40,45,48,1)', borderRadius: '8px', padding: '0px' }}
                              innerRadius="10%"
                              outerRadius="90%"
                        >
                              <PolarGrid stroke="rgba(255,255,255,1)" gridType="polygon" radialLines={false} />
                              <PolarAngleAxis dataKey="category" tick={{ fill: 'rgba(255,255,255,1)', fontSize: 'clamp(6px, 1vw, 12px)' }} dy={5} />
                              <PolarRadiusAxis tick={false} axisLine={false} />
                              <Radar dataKey="value" stroke="white" fill="rgba(255,1,1,0.7)" fillOpacity={0.6} />
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
