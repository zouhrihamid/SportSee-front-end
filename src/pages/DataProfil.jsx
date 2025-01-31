import PropTypes from 'prop-types';
import './DataProfil.css';
import ActivityChart from '../components/Activity/ActivityChart';
import AverageChart from '../components/AverageSessions/AverageChart';
import SimpleRadialBarChart from '../components/Score/Score';
import PerformanceChart from '../components/Performance/Performance';
import caloriesIcon from '../assets/calories-icon.jpg';
import proteinesIcon from '../assets/protein-icon.jpg';
import glucidesIcon from '../assets/carbs-icon.jpg';
import lipideIcon from '../assets/fat-icon.jpg';
import { useGetAllData } from '../services/service';
import { useParams } from 'react-router-dom';
/**
 * @function UserDataPage
 *  @returns {JSX.Element}
 */

const UserDataPage = () => {
      const { userId } = useParams();

      return <DataProfil userId={userId} />;
};

/**
 *
 *  @param {Object} props
 * @param {number}
 *  @returns {JSX.Element}
 */

const DataProfil = ({ userId }) => {
      const isMocked = true;
      const { data } = useGetAllData(userId, isMocked);

      if (!data) {
            return <div>No user data available for the provided ID.</div>;
      }

      const { user, activity, average, performance } = data;

      return (
            <section className="dashboard-container">
                  <div className="title">
                        <span className="Name">
                              Bonjour <span className="red">{user.userInfos.firstName}</span>
                        </span>
                        <span className="subtitle"> Félicitations ! Vous avez explosé vos objectifs hier 👏</span>
                  </div>

                  <section className="chart-and-nutrition">
                        <section className="all-chart">
                              <article className="Chart-activity">
                                    <ActivityChart sessions={activity.sessions} />
                              </article>
                              <div className="chartWrapper">
                                    <article className="chart">
                                          <AverageChart AverageData={average.sessions} />
                                    </article>
                                    <article className="chart">
                                          <PerformanceChart performance={performance} />
                                    </article>
                                    <article className="chart">
                                          <SimpleRadialBarChart score={user.todayScore || user.score} />
                                    </article>
                              </div>
                        </section>

                        <section className="all-nutritional">
                              <article className="nutritional">
                                    <img src={caloriesIcon} alt="Calories Icon" className="nutritional-icon" />
                                    <div className="nutritional-info">
                                          <span>{user.keyData.calorieCount / 1000} kCal</span>
                                          <p>Calories</p>
                                    </div>
                              </article>

                              <article className="nutritional">
                                    <img src={proteinesIcon} alt="Proteins Icon" className="nutritional-icon" />
                                    <div className="nutritional-info">
                                          <span>{user.keyData.proteinCount} g</span>
                                          <p>Proteins</p>
                                    </div>
                              </article>

                              <article className="nutritional">
                                    <img src={glucidesIcon} alt="Carbs Icon" className="nutritional-icon" />
                                    <div className="nutritional-info">
                                          <span>{user.keyData.carbohydrateCount} g</span>
                                          <p>Clucides</p>
                                    </div>
                              </article>

                              <article className="nutritional">
                                    <img src={lipideIcon} alt="Fats Icon" className="nutritional-icon" />
                                    <div className="nutritional-info">
                                          <span>{user.keyData.lipidCount} g</span>
                                          <p>Lipides</p>
                                    </div>
                              </article>
                        </section>
                  </section>
            </section>
      );
};

DataProfil.propTypes = {
      userId: PropTypes.number.isRequired,
};
export default UserDataPage;
