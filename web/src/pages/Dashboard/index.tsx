import React, { useCallback, useContext, useState } from 'react';
import { FiClock, FiPower } from 'react-icons/fi';
import DayPicker, { DayModifiers } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import logoImg from '../../assets/logo.svg';

import { AuthContext } from '../../hooks/AuthContext';

import { 
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  Schedule,
  NextAppointment,
  Section,
  Appointment,
  Calendar,
} from './styles';

const Dashboard: React.FC = () => {
  const { signOut, user } = useContext(AuthContext);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if(modifiers.available) {
      setSelectedDate(day)
    }
  }, [])
  
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

          <Section>
            <strong>Manhã</strong>

            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>

              <div>
                <img src="https://avatars0.githubusercontent.com/u/62427759?v=4" alt="Evandro Marinho"/>
                <strong>Evandro Marinho</strong>
              </div>
            </Appointment>

            <Appointment>
              <span>
                <FiClock />
                10:00
              </span>

              <div>
                <img src="https://avatars0.githubusercontent.com/u/62427759?v=4" alt="Evandro Marinho"/>
                <strong>Evandro Marinho</strong>
              </div>
            </Appointment>
          </Section>

          <Section>
            <strong>Tarde</strong>

            <Appointment>
              <span>
                <FiClock />
                13:00
              </span>

              <div>
                <img src="https://avatars0.githubusercontent.com/u/62427759?v=4" alt="Evandro Marinho"/>
                <strong>Evandro Marinho</strong>
              </div>
            </Appointment>
          </Section>
        </Schedule>
        <Calendar>
          <DayPicker
            fromMonth={new Date()}
            disabledDays={[
              { daysOfWeek: [0, 6] }
            ]}
            modifiers={{
              available: { daysOfWeek: [1, 2, 3, 4, 5] }
            }}
            onDayClick={handleDateChange}
            selectedDays={selectedDate}
            weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S' ]}
            months={[
              'Janeiro',
              'Fevereiro',
              'Março',
              'Abril',
              'Maio',
              'Junho',
              'Julho',
              'Agosto',
              'Setembro',
              'Outubro',
              'Novembro',
              'Dezembro',
            ]}
          />
        </Calendar>
      </Content>
    </Container>
  );
}

export default Dashboard;