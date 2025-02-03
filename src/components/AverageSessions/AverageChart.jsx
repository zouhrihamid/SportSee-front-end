import PropTypes from 'prop-types';
import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import './AverageChart.css';

/**
 * Custom Cursor Component for Tooltip
 * @param {Object} props - Tooltip cursor properties
 * @returns {JSX.Element} Custom cursor rectangle
 */
const CustomCursor = ({ points }) => {
      const { x } = points[0];
      return (
            <svg width="258px">
                  <rect fill="rgba(0, 0, 0, 0.1)" stroke="transparent" x={x + 1} y={0} width="100%" height="100%" rx={10} ry={10} />
            </svg>
      );
};

CustomCursor.propTypes = {
      points: PropTypes.array.isRequired,
};

/**
 * AverageChart Component
 * @param {Object} props - Component properties
 * @param {Array} props.AverageData - Array of session data
 * @returns {JSX.Element} LineChart Component
 */
const AverageChart = ({ AverageData }) => {
      const daysMap = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

      const filteredData = AverageData.map((session) => ({
            ...session,
            day: daysMap[session.day - 1],
      }));

      return (
            <div className="average-chart-container">
                  <div className="title-average">
                        <p className="align-title">Durée moyenne des sessions</p>
                  </div>
                  <ResponsiveContainer>
                        <LineChart
                              data={filteredData}
                              margin={{
                                    top: 50,
                                    right: 0,
                                    left: 0,
                                    bottom: 20,
                              }}
                        >
                              <XAxis dataKey="day" tick={{ fill: '#ffffff', fontSize: 12 }} tickLine={false} axisLine={false} interval={0} style={{ transform: 'scaleX(0.76)', transformOrigin: 'center' }} />
                              <Tooltip
                                    contentStyle={{
                                          backgroundColor: 'rgba(255,255,255,1)',
                                          borderRadius: '1px',
                                          fontSize: '8px',
                                          padding: '2px 8px',
                                          width: '39px',
                                          height: '25px',
                                    }}
                                    labelFormatter={() => ''}
                                    formatter={(value) => [`${value} min`]}
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
