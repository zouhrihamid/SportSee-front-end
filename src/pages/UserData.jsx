import PropTypes from 'prop-types';
import './Userdata.css';
import ActivityChart from '../components/Activity/ActivityChart';
import AverageChart from '../components/AverageSessions/AverageChart';
import SimpleRadialBarChart from '../components/Score/Score';
import PerformanceChart from '../components/Performance/Performance';
import caloriesIcon from '../assets/calories-icon.jpg';
import proteinesIcon from '../assets/protein-icon.jpg';
import glucidesIcon from '../assets/carbs-icon.jpg';
import lipideIcon from '../assets/fat-icon.jpg';
import { useDataUser } from '../services/serviceData';
import { useDataActivity } from '../services/serviceActivity';
import { useDataAverage } from '../services/serviceAverage';
import { useDataPerformance } from '../services/servicePerformance';

useDataPerformance;
const UserDataComponent = ({ userId }) => {
      const ismocked = true;

      const { data: userData } = useDataUser(userId, ismocked);
      const { data: activityData } = useDataActivity(userId, ismocked);
      const { data: averageData } = useDataAverage(userId, ismocked);
      const { data: performanceData } = useDataPerformance(userId, ismocked);

      if (!userData || !activityData || !averageData) {
            return <div>No user data available for the provided ID.</div>;
      }

      return (
            <>
                  <div className="title">
                        <span className="Name">
                              Bonjour <span className="red">{userData.userInfos.firstName}</span>
                        </span>
                        <span className="subtitle"> Félicitations ! Vous avez explosé vos objectifs hier 👏</span>
                  </div>

                  <div className="info-nutrition">
                        <section className="all-char">
                              <div className="Chart">
                                    <ActivityChart className="ActivityChar" sessions={activityData.sessions} />
                              </div>
                              <div className="chartWrapper">
                                    <div className="ChartAverage">
                                          <AverageChart className="AverageSessions" AverageData={averageData.sessions} />
                                    </div>
                                    <div className="ChartPerformance">
                                          <PerformanceChart className="performance" performance={performanceData} />
                                    </div>
                                    <div className="SimpleRadialBarChart">
                                          <SimpleRadialBarChart score={userData.todayScore || userData.score} />
                                    </div>
                              </div>
                        </section>
                        <section className="all-nutritional">
                              <div className="nutritional">
                                    <img src={caloriesIcon} alt="Calories Icon" className="nutritional-icon" />
                                    <div className="nutritional-info">
                                          <span>{userData.keyData.calorieCount / 1000} kCal</span>
                                          <p>Calories</p>
                                    </div>
                              </div>

                              <div className="nutritional">
                                    <img src={proteinesIcon} alt="Proteins Icon" className="nutritional-icon" />
                                    <div className="nutritional-info">
                                          <span>{userData.keyData.proteinCount} g</span>
                                          <p>Proteins</p>
                                    </div>
                              </div>

                              <div className="nutritional">
                                    <img src={glucidesIcon} alt="Carbs Icon" className="nutritional-icon" />
                                    <div className="nutritional-info">
                                          <span>{userData.keyData.carbohydrateCount} g</span>
                                          <p>Carbs</p>
                                    </div>
                              </div>

                              <div className="nutritional">
                                    <img src={lipideIcon} alt="Fats Icon" className="nutritional-icon" />
                                    <div className="nutritional-info">
                                          <span>{userData.keyData.lipidCount} g</span>
                                          <p>Fats</p>
                                    </div>
                              </div>
                        </section>
                  </div>
            </>
      );
};

UserDataComponent.propTypes = {
      userId: PropTypes.number.isRequired,
};

export default UserDataComponent;
