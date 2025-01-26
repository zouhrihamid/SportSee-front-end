import PropTypes from 'prop-types';
import { RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts';
import './score.css';
/**
 *
 * @param {*} param0
 * @returns
 */
const SimpleRadialBarChart = ({ score }) => {
      const chartData = [
            { name: 'Score', value: score * 100, fill: '#FF0101' },
            { name: 'Rest', value: 100 - score * 100, fill: 'transparent' },
      ];

      return (
            <div className="score-chart-container">
                  <div className="chart-overlay">
                        <div className="chart-title">Score</div>
                        <div className="chart-score">
                              <span className="chart-percentage">{Math.round(score * 100)}%</span>
                              <span className="chart-subtitle">de votre objectif</span>
                        </div>
                  </div>

                  <ResponsiveContainer width="100%" height="100%">
                        <RadialBarChart innerRadius="70%" outerRadius="90%" data={chartData} startAngle={80} endAngle={450}>
                              <RadialBar minAngle={15} clockWise dataKey="value" background={{ fill: 'transparent' }} cornerRadius={10} />
                        </RadialBarChart>
                  </ResponsiveContainer>
            </div>
      );
};

SimpleRadialBarChart.propTypes = {
      score: PropTypes.number.isRequired,
};

export default SimpleRadialBarChart;
