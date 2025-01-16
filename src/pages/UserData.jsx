import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './UserData.css';
import ActivityChart from '../components/Activity/ActivityChart';
import AverageChart from '../components/AverageSessions/AverageChart';
import PerformanceChart from '../components/Performance/Performance';
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
                  </div>
            </>
      );
};

// Validation des props avec PropTypes
UserDataComponent.propTypes = {
      userId: PropTypes.number.isRequired,
};

export default UserDataComponent;
