import React, { useContext } from 'react';
import { FiAlertCircle, FiCheckCircle, FiInfo, FiXCircle } from 'react-icons/fi';
import { ToastContext, ToastMessage } from '../../hooks/ToastContext';

import { Container, Toast } from './styles';

interface ToastContainerProps {
  messages: ToastMessage[];
}

const icons = {
  info: <FiInfo size={24} />,
  error: <FiAlertCircle size={24} />,
  success: <FiCheckCircle size={24} />
}

const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {
  const { removeToast } = useContext(ToastContext);

  return(
    <Container>
      {messages.map(message => (
        <Toast key={message.id} type={message.type}>
          {icons[message.type]}

          <div>
            <strong>{message.title}</strong>
            <p>{message.description}</p>
          </div>

          <button onClick={() => {removeToast(message.id)}} type="button">
            <FiXCircle size={18} />
          </button>
        </Toast>
      ))}
    </Container>
  );
}

export default ToastContainer;