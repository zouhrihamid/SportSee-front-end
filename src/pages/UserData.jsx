import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './Userdata.css';
import ActivityChart from '../components/Activity/ActivityChart';
import AverageChart from '../components/AverageSessions/AverageChart';
import PerformanceChart from '../components/Performance/Performance';
import SimpleRadialBarChart from '../components/Score/Score';
import caloriesIcon from '../assets/calories-icon.jpg';
import proteinesIcon from '../assets/protein-icon.jpg';
import glucidesIcon from '../assets/carbs-icon.jpg';
import lipideIcon from '../assets/fat-icon.jpg';
/**
 * Description placeholder
 *
 * @async
 * @param {*} userId
 * @returns {unknown}
 */
const fetchUserData = async (userId) => {
      const urls = [`http://localhost:3000/user/${userId}/activity`, `http://localhost:3000/user/${userId}/performance`, `http://localhost:3000/user/${userId}/average-sessions`, `http://localhost:3000/user/${userId}`];

      try {
            const responses = await Promise.all(urls.map((url) => fetch(url)));
            const data = await Promise.all(responses.map((res) => res.json()));
            return formatUserData(data);
      } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
      }
};

const formatUserData = (data) => {
      const [activityData, performanceData, statisticsData, userData] = data;

      return {
            activity: activityData.data,
            performance: performanceData.data,
            user: userData.data,
            Average: statisticsData.data,
      };
};

const UserDataComponent = ({ userId }) => {
      const [userData, setUserData] = useState(null);

      useEffect(() => {
            const fetchData = async () => {
                  try {
                        const data = await fetchUserData(userId);
                        setUserData(data);
                  } catch (error) {
                        console.error(error);
                  }
            };

            fetchData();
      }, [userId]);

      if (!userData) return <div>No user data available.</div>;

      console.log('performance', userData.performance);
      return (
            <>
                  <div className="title">
                        <span className="Name">
                              Bonjour
                              <span className="red">{userData.user.userInfos.firstName}</span>
                        </span>
                        <span className="subtitle"> Félicitation! Vous avez explosé vos objectifs hier 👏</span>
                  </div>
                  <div className="info-nutrition">
                        <section className="all-char">
                              <div className="Chart">
                                    <ActivityChart className="ActivityChar" sessions={userData.activity.sessions} />
                              </div>
                              <div className="chartWrapper">
                                    <div className="ChartAverage">
                                          <AverageChart className="AverageSessions" AverageData={userData.Average.sessions} />
                                    </div>
                                    <div className="ChartPerformance">
                                          <PerformanceChart className="performance" performanceData={[userData.performance]} />
                                    </div>
                                    <div className="SimpleRadialBarChart">
                                          <SimpleRadialBarChart score={[userData.user.score]} />
                                    </div>
                              </div>
                        </section>
                        <section className="all-nutritional">
                              <div className="nutritional">
                                    <img src={caloriesIcon} alt="Calories Icon" style={{ width: '60px', height: '60px' }} />{' '}
                                    <div className="nutritional-info">
                                          <span>{userData.user.keyData.calorieCount / 1000} kCal</span>
                                          <p>Calories</p>
                                    </div>
                              </div>
                              <div className="nutritional">
                                    <img src={proteinesIcon} alt="Proteines Icon" style={{ width: '60px', height: '60px' }} />{' '}
                                    <div className="nutritional-info">
                                          <span>{userData.user.keyData.proteinCount} g</span>
                                          <p>Proteines</p>
                                    </div>
                              </div>
                              <div className="nutritional">
                                    <img src={glucidesIcon} alt="glucide Icon" style={{ width: '60px', height: '60px' }} />{' '}
                                    <div className="nutritional-info">
                                          <span>{userData.user.keyData.carbohydrateCount} g</span>
                                          <p>Glucides</p>
                                    </div>
                              </div>
                              <div className="nutritional">
                                    <img src={lipideIcon} alt="lipideIcon Icon" style={{ width: '60px', height: '60px' }} />{' '}
                                    <div className="nutritional-info">
                                          <span>{userData.user.keyData.lipidCount} g</span>
                                          <p>Lipides</p>
                                    </div>
                              </div>
                        </section>
                  </div>
            </>
      );
};

// Validation des props avec PropTypes
UserDataComponent.propTypes = {
      userId: PropTypes.number.isRequired,
};

export default UserDataComponent;
