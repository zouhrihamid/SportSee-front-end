import PropTypes from 'prop-types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './ActivityChart.css';

const ActivityChart = ({ sessions }) => {
      const converCaloriesTokcal = (sessions) => {
            return sessions.map((session) => ({
                  ...session,
                  calories: session.calories / 1000,
            }));
      };

      const data = converCaloriesTokcal(sessions);

      const CustomTooltip = ({ active, payload, coordinate }) => {
            if (active && payload && payload.length) {
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

      return (
            <div className="container-chart">
                  <h3>Activité quotidienne</h3>
                  <ResponsiveContainer width={835} height={320}>
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
                              radius={[50, 50, 50, 50]}
                        >
                              <CartesianGrid strokeDasharray="3,3" vertical={false} horizontal={true} />
                              <XAxis dataKey="day" tickFormatter={(day) => day.slice(-1)} axisLine={false} tickLine={false} padding={{ left: -40, right: -40 }} />
                              <YAxis yAxisId="left" orientation="left" axisLine={false} tickLine={false} hide={true} tickCount={3} domain={[0, 0.7]} />
                              <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} domain={[50, 90]} tickMargin={10} dx={30} tickCount={3} />
                              <Tooltip content={<CustomTooltip />} labelFormatter={() => ''} />

                              <Legend
                                    wrapperStyle={{
                                          position: 'absolute',
                                          top: '-35px',
                                          left: '250px',
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
