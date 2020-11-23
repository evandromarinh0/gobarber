import React, { useContext } from 'react';
import { FiClock, FiPower } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';

import { AuthContext } from '../../hooks/AuthContext';

import { 
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  Schedule,
  Calendar,
  NextAppointment
} from './styles';

const Dashboard: React.FC = () => {
  const { signOut, user } = useContext(AuthContext);
  
  return(
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="GoBarber"/>
          <Profile>
            <img src={user.avatar_url} alt={user.name} />
            <div>
              <span>Bem-vindo,</span>
              <strong>{user.name}</strong>
            </div>
          </Profile>

          <button onClick={signOut} type="button">
            <FiPower />
          </button>
        </HeaderContent>
      </Header>

      <Content>
        <Schedule>
          <h1>Horários agendados</h1>
          <p>
            <span>Hoje</span>
            <span>Dia 06</span>
            <span>Segunda-feira</span>
          </p>

          <NextAppointment>
            <strong>Atendimento a seguir</strong>
            <div>
              <img src="https://avatars0.githubusercontent.com/u/62427759?v=4" alt="Evandro Marinho"/>
              <strong>Evandro Marinho</strong>
              <span>
                <FiClock />
                08:00
              </span>
            </div>
          </NextAppointment>
        </Schedule>
        <Calendar></Calendar>
      </Content>
    </Container>
  );
}

export default Dashboard;