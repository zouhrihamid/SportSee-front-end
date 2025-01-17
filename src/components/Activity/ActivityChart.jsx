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

      return (
            <div className="container-chart">
                  <h3>Activité quotidienne</h3>
                  <ResponsiveContainer width={835} height={320}>
                        <BarChart
                              data={data}
                              margin={{
                                    top: 20,
                                    right: 0,
                                    left: 0,
                                    bottom: 5,
                              }}
                              barSize={7}
                        >
                              <CartesianGrid strokeDasharray="3 3" vertical={false} />
                              <XAxis dataKey="day" tickFormatter={(day) => day.slice(-1)} axisLine={false} tickLine={false} />

                              <YAxis yAxisId="left" orientation="left" axisLine={false} tickLine={false} hide={true} />

                              <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} domain={['dataMin - 5', 'dataMax + 5']} />

                              <Tooltip
                                    formatter={(value, name) => {
                                          return name === 'Calories brûlées (kCal)' ? [`${value} kCal`] : [`${value} kg`];
                                    }}
                                    contentStyle={{
                                          backgroundColor: 'rgba(230,0,0,1)',
                                          border: '1px solid #ccc',
                                          borderRadius: '5px',
                                          padding: '10px',
                                          display: 'flex',
                                          flexDirection: 'column',
                                          justifyContent: 'center',
                                          alignItems: 'center',
                                    }}
                                    labelFormatter={() => ''}
                              />

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

                              <Bar dataKey="kilogram" fill="rgba(40, 45, 48, 1)" name="Poids (kg)" yAxisId="right" />

                              <Bar dataKey="calories" fill="rgba(230, 0, 0, 1)" name="Calories brûlées (kCal)" yAxisId="left" />
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
