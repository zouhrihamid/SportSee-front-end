import PropTypes from 'prop-types';
import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer, Rectangle } from 'recharts';
import './AverageChart.css';

const CustomCursor = (props) => {
      const { points } = props;
      const { x } = points[0];

      return <Rectangle fill="rgba(0, 0, 0, 0.5)" stroke="transparent" x={x + 1} y={0} width={258} height={263} />;
};

CustomCursor.propTypes = {
      points: PropTypes.array.isRequired,
};

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
                                    right: 0,
                                    left: 0,
                                    bottom: 20,
                              }}
                        >
                              <XAxis
                                    dataKey="day"
                                    tick={{ fill: '#ffffff', fontSize: 12 }}
                                    tickLine={false}
                                    axisLine={false}
                                    interval={0}
                                    style={{
                                          transform: 'scaleX(0.76)',
                                          transformOrigin: 'center',
                                    }}
                              />
                              <Tooltip
                                    contentStyle={{
                                          backgroundColor: 'rgba(255,255,255,1)',
                                          borderRadius: '1px',
                                          display: 'flex',
                                          flexDirection: 'column',
                                          justifyContent: 'center',
                                          textItem: 'center',
                                          padding: '2px',
                                          width: '50px',
                                          height: '25px',
                                    }}
                                    labelFormatter={() => ''}
                                    formatter={(value) => {
                                          return [`${value} min`];
                                    }}
                                    cursor={<CustomCursor />}
                                    position={{ y: 30 }}
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
