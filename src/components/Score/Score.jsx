import PropTypes from 'prop-types';
import { RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts';

const SimpleRadialBarChart = ({ score }) => {
      // Préparer les données pour le graphique radial

      const chartData = [
            { name: 'Score', value: score * 100, fill: '#FF0101' },
            { name: 'Rest', value: 100 - score * 100, fill: 'transparent' },
      ];

      return (
            <div style={{ position: 'relative', width: '258px', height: '263px', margin: '40px 0px 40px 30px', backgroundColor: 'rgba(251, 251, 251, 1)', borderRadius: '10px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                        <RadialBarChart innerRadius="70%" outerRadius="90%" data={chartData} startAngle={90} endAngle={450}>
                              <RadialBar minAngle={15} clockWise dataKey="value" background={{ fill: 'transparent' }} />
                        </RadialBarChart>
                  </ResponsiveContainer>

                  <div
                        style={{
                              position: 'absolute',
                              top: '50%',
                              left: '50%',
                              transform: 'translate(-50%, -50%)',
                              textAlign: 'center',
                              color: '#282D30',
                        }}
                  >
                        <div style={{ fontSize: '20px', fontWeight: 'bold' }}>{Math.round(score * 100)}%</div>
                        <div style={{ fontSize: '14px', color: '#74798C' }}> de votre objectif</div>
                  </div>
                  <div
                        style={{
                              position: 'absolute',
                              top: '10%',
                              left: '30%',
                              transform: 'translate(-50%, -50%)',
                              textAlign: 'center',
                              color: '#282D30',
                        }}
                  >
                        {' '}
                        Score
                  </div>
            </div>
      );
};

SimpleRadialBarChart.propTypes = {
      score: PropTypes.number.isRequired,
};

export default SimpleRadialBarChart;
