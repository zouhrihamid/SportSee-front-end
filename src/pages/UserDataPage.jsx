import { useParams } from 'react-router-dom';
import UserDataComponent from './UserData';

const UserDataPage = () => {
      const { userId } = useParams();
      console.log('UserId extrait :', userId);
      return <UserDataComponent userId={userId} />;
};

export default UserDataPage;
