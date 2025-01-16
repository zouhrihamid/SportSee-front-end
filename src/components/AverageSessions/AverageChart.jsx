import PropTypes from 'prop-types';
import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import './AverageChart.css';

const AverageChart = ({ AverageData }) => {
      const daysMap = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

      const filteredData = AverageData.map((session) => ({
            ...session,
            day: daysMap[session.day - 1],
      }));

      return (
            <div className="average-chart-container">
                  <div className="title-average">
                        <p>Durée moyenne des sessions</p>
                  </div>
                  <ResponsiveContainer width="100%" height={263}>
                        <LineChart
                              data={filteredData}
                              margin={{
                                    top: 50,
                                    right: 20,
                                    left: 20,
                                    bottom: 20,
                              }}
                        >
                              <XAxis dataKey="day" tick={{ fill: '#ffffff', fontSize: 12 }} tickLine={false} axisLine={false} interval={0} />
                              <Tooltip
                                    contentStyle={{
                                          backgroundColor: '#ffffff',
                                          borderRadius: '5px',
                                          display: 'flex',
                                          flexDirection: 'column',
                                          justifyContent: 'center',
                                          textItem: 'center',
                                          padding: '2px',
                                    }}
                                    labelFormatter={() => ''}
                                    formatter={(value) => {
                                          return [`${value} min`];
                                    }}
                                    cursor={{ stroke: '', strokeWidth: 1 }}
                              />
                              <Line type="monotone" dataKey="sessionLength" stroke="#FFFFFF" dot={false} activeDot={{ r: 8 }} />
                        </LineChart>
                  </ResponsiveContainer>
            </div>
      );
};

AverageChart.propTypes = {
      AverageData: PropTypes.arrayOf(
            PropTypes.shape({
                  day: PropTypes.number.isRequired,
                  sessionLength: PropTypes.number.isRequired,
            })
      ).isRequired,
};

export default AverageChart;
