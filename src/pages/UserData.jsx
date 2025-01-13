import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

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
            statistics: statisticsData.data,
      };
};

const UserDataComponent = ({ userId }) => {
      const [userData, setUserData] = useState(null);
      const [status, setStatus] = useState('loading');

      useEffect(() => {
            if (!userId) return setStatus('error');

            const fetchData = async () => {
                  setStatus('loading');
                  try {
                        const data = await fetchUserData(userId);
                        setUserData(data);
                        setStatus('success');
                  } catch (error) {
                        console.error(error);
                        setStatus('error');
                  }
            };

            fetchData();
      }, [userId]);

      if (status === 'loading') return <div>Loading...</div>;
      if (status === 'error') return <div>Error: Unable to load user data.</div>;
      if (!userData) return <div>No user data available.</div>;

      return (
            <div>
                  <h2>
                        {userData.user.userInfos.firstName} {userData.user.userInfos.lastName}
                  </h2>
            </div>
      );
};

// Validation des props avec PropTypes
UserDataComponent.propTypes = {
      userId: PropTypes.number.isRequired,
};

export default UserDataComponent;
