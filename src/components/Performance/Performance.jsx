import PropTypes from 'prop-types';
import { Radar, RadarChart, ResponsiveContainer, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import './Performance.css';

/**
 *
 * @param {*} param0
 * @returns
 */
const PerformanceChart = ({ performanceData }) => {
      console.log('Performance Data received:', performanceData);

      if (!Array.isArray(performanceData) || performanceData.length === 0) {
            return <div>No performance data available.</div>;
      }

      // Transformation des données pour RadarChart
      const transformedData = performanceData.flatMap((user) => {
            if (!user.kind || !Array.isArray(user.data)) {
                  console.error('Invalid data structure:', user);
                  return [];
            }

            return user.data.map((item) => ({
                  userId: user.userId,
                  metric: user.kind[item.kind] || 'Unknown',
                  value: item.value,
            }));
      });

      const uniqueMetrics = [...new Set(transformedData.map((item) => item.metric))];

      const radarData = uniqueMetrics.map((metric) => {
            const metricValues = { metric };
            performanceData.forEach((user) => {
                  const userData = user.data.find((item) => user.kind[item.kind] === metric);
                  metricValues[`user_${user.userId}`] = userData ? userData.value : 0;
            });
            return metricValues;
      });

      console.log('Data formatted for RadarChart:', radarData);

      return (
            <div className="performance-chart-container">
                  <ResponsiveContainer width={258} height={263}>
                        <RadarChart
                              data={radarData}
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
                              {performanceData.map((user) => (
                                    <Radar key={user.userId} dataKey={`user_${user.userId}`} stroke="white" fill="#FF0101" fillOpacity={0.6} />
                              ))}
                        </RadarChart>
                  </ResponsiveContainer>
            </div>
      );
};

PerformanceChart.propTypes = {
      performanceData: PropTypes.arrayOf(
            PropTypes.shape({
                  userId: PropTypes.number.isRequired,
                  kind: PropTypes.objectOf(PropTypes.string).isRequired,
                  data: PropTypes.arrayOf(
                        PropTypes.shape({
                              value: PropTypes.number.isRequired,
                              kind: PropTypes.number.isRequired,
                        })
                  ).isRequired,
            })
      ).isRequired,
};

export default PerformanceChart;
