import PropTypes from 'prop-types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './ActivityChart.css';

/**
 * Converts calories to kilocalories
 * @param {Array} sessions - The session data
 * @returns {Array} Updated session data
 */
const convertCaloriesToKcal = (sessions) => {
      return sessions.map((session) => ({
            ...session,
            calories: session.calories / 1000,
      }));
};

/**
 * Custom Tooltip Component
 * @param {Object} props - Tooltip props
 * @returns {JSX.Element | null} Custom Tooltip JSX
 */
const CustomTooltip = ({ active, payload, coordinate }) => {
      if (active && payload.length) {
            const calorieData = payload.find((item) => item.name === 'Calories brûlées (kCal)');
            const kilogramData = payload.find((item) => item.name === 'Poids (kg)');

            return (
                  <div
                        style={{
                              backgroundColor: 'rgba(230,0,0,1)',
                              border: '1px solid #ccc',
                              borderRadius: '5px',
                              padding: '10px 2px',
                              color: 'white',
                              fontSize: '14px',
                              textAlign: 'center',
                              position: 'absolute',
                              left: `${coordinate.x + 70}px`,
                              top: `${-20}px`,
                        }}
                  >
                        {calorieData && <div style={{ marginBottom: '20px' }}>{`${calorieData.value}kCal`}</div>}
                        {kilogramData && <div style={{ marginTop: '20px' }}>{`${kilogramData.value}kg`}</div>}
                  </div>
            );
      }
      return null;
};

CustomTooltip.propTypes = {
      active: PropTypes.bool,
      payload: PropTypes.arrayOf(
            PropTypes.shape({
                  name: PropTypes.string,
                  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            })
      ),
      coordinate: PropTypes.shape({
            x: PropTypes.number,
            y: PropTypes.number,
      }),
};

/**
 * ActivityChart Component
 * @param {Object} props - The component props
 * @param {Array} props.sessions - The activity session data
 * @returns {JSX.Element} BarChart Component
 */
const ActivityChart = ({ sessions }) => {
      const data = convertCaloriesToKcal(sessions);

      return (
            <div className="container-chart">
                  <h3>Activité quotidienne</h3>
                  <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                              data={data}
                              margin={{
                                    top: 20,
                                    right: 30,
                                    left: 30,
                                    bottom: 5,
                              }}
                              barSize={7}
                              barGap={10}
                        >
                              <CartesianGrid strokeDasharray="3,3" vertical={false} horizontal={true} />

                              <XAxis dataKey="day" tickFormatter={(day) => day.slice(-1)} axisLine={true} tickLine={false} padding={{ left: -43, right: -43 }} />
                              <YAxis yAxisId="left" orientation="left" axisLine={false} tickLine={false} hide={true} tickCount={3} domain={[0, 0.7]} />
                              <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} domain={[50, 90]} tickMargin={10} dx={25} tickCount={3} />
                              <Tooltip content={<CustomTooltip />} labelFormatter={() => ''} />
                              <Legend
                                    wrapperStyle={{
                                          position: 'absolute',
                                          top: '-10%',
                                          left: '30%',
                                          fontFamily: 'Roboto, sans-serif',
                                          fontSize: '14px',
                                    }}
                                    iconType="circle"
                                    iconSize={8}
                              />
                              <Bar dataKey="kilogram" fill="rgba(40, 45, 48, 1)" name="Poids (kg)" yAxisId="right" radius={[3, 3, 0, 0]} />
                              <Bar dataKey="calories" fill="rgba(230, 0, 0, 1)" name="Calories brûlées (kCal)" yAxisId="left" radius={[3, 3, 0, 0]} />
                        </BarChart>
                  </ResponsiveContainer>
            </div>
      );
};

ActivityChart.propTypes = {
      sessions: PropTypes.arrayOf(
            PropTypes.shape({
                  day: PropTypes.string.isRequired,
                  kilogram: PropTypes.number.isRequired,
                  calories: PropTypes.number.isRequired,
            })
      ).isRequired,
};

export default ActivityChart;
