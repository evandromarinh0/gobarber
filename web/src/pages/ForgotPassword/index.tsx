import React, { useCallback, useContext, useRef, useState } from 'react';
import { Form } from '@unform/web';
import { FiChevronLeft, FiMail } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import logoImg from '../../assets/logo.svg';

import { ToastContext } from '../../hooks/ToastContext';

import api from '../../services/api';
import getValidationErrors from '../../util/getValidationErrors';

import Button from '../../components/Button';
import Input from '../../components/Input';

import { Container, Content, AnimatedContent, Background } from './styles';
import { Link } from 'react-router-dom';

interface ForgotPasswordFormData {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useContext(ToastContext);

  const handleSubmit = useCallback( async (data: ForgotPasswordFormData) => {
    try {
      setLoading(true);

      formRef.current?.setErrors({})

      const schema = Yup.object().shape({
        email: Yup.string().required('Campo obrigatório').email('Digite um e-mail válido'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await api.post('/password/forgot', {
        email: data.email,
      })

      addToast({
        type: 'success',
        title: 'Recuperação de senha',
        description: 'Verifique no seu e-mail o link para recuperação de senha'
      });
    } catch (err) {
      if(err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);

        return;
      }
      addToast({
        type: 'error',
        title: 'Erro na recuperação de senha',
        description: 'Ocorreu um erro ao tentar recuperar a senha, tente novamente.'
      });
    } finally {
      setLoading(false);
    }
  }, [addToast]);

  return(
    <Container>
      <Content>
        <AnimatedContent>
          <img src={logoImg} alt="GoBarber"/>

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Recuperar senha</h1>

            <Input icon={FiMail} name="email" placeholder="E-mail" />

            <Button loading={loading} type="submit">Recuperar</Button>
          </Form>

          <Link to="/">
            <FiChevronLeft />
            Voltar para página inicial
          </Link>
        </AnimatedContent>
      </Content>

      <Background />
    </Container>
  );
}

export default ForgotPassword;