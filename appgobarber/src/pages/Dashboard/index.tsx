import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useContext } from 'react';
import { AuthContext } from '../../hooks/AuthContext';

import { 
  Container,
  Header,
  HeaderTitle,
  Username,
  ProfileButton,
  UserAvatar,
} from './styles';

const Dashboard: React.FC = () => {
  const { user } = useContext(AuthContext);
  const navigation = useNavigation();
  const handleNavigationToProfile = useCallback(() => {
    navigation.navigate('Profile');
  }, [navigation])

  return(
    <Container>
      <Header>
        <HeaderTitle>
          Bem vindo, {"\n"}
          <Username>{user.name}</Username>
        </HeaderTitle>

        <ProfileButton onPress={() =>{handleNavigationToProfile}}>
          <UserAvatar source={{ uri: user.avatar_url }} />
        </ProfileButton>
      </Header>
    </Container>
  );
}

export default Dashboard;