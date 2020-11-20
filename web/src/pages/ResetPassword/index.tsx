import React, { useCallback, useContext, useRef } from 'react';
import { Form } from '@unform/web';
import { FiLock } from 'react-icons/fi';
import { useHistory, useLocation } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import logoImg from '../../assets/logo.svg';

import { ToastContext } from '../../hooks/ToastContext';
import api from '../../services/api';

import getValidationErrors from '../../util/getValidationErrors';
import Button from '../../components/Button';
import Input from '../../components/Input';

import { Container, Content, AnimatedContent, Background } from './styles';

interface ResetPasswordFormData {
  password: string;
  password_confirmation: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useContext(ToastContext);
  const history = useHistory();
  const location = useLocation();

  const handleSubmit = useCallback( async (data: ResetPasswordFormData) => {
    try {
      formRef.current?.setErrors({})

      const schema = Yup.object().shape({
        password: Yup.string().required('Campo obrigatório'),
        password_confirmation: Yup.string()
        .oneOf([Yup.ref('password'), undefined], 'Senhas devem combinar')
      });
      await schema.validate(data, {
        abortEarly: false,
      });

      const token = location.search.replace('?token=', '');

      if(!token) {
        throw new Error();
      }

      await api.post('/password/reset', {
        password: data.password,
        password_confirmation: data.password_confirmation,
        token
      })

      history.push('/');

      addToast({
        type: 'success',
        title: 'Senha alterada com sucesso!',
        description: 'Você já pode fazer o seu login'
      });

    } catch (err) {
      if(err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);

        return;
      }

      addToast({
        type: 'error',
        title: 'Erro na alteração de senha',
        description: 'Ocorreu um erro ao tentar alterar senha, tente novamente.'
      });
    }
  }, [addToast, history, location.search]);

  return(
    <Container>
      <Content>
        <AnimatedContent>
          <img src={logoImg} alt="GoBarber"/>

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Resetar senha</h1>

            <Input icon={FiLock} name="password" type="password" placeholder="Nova senha" />

            <Input icon={FiLock} name="password_confirmation" type="password" placeholder="Confirmar senha" />

            <Button type="submit">Confirmar</Button>
          </Form>
        </AnimatedContent>
      </Content>

      <Background />
    </Container>
  );
}

export default SignIn;