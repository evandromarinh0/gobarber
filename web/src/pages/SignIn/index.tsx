import React, { useCallback, useContext, useRef } from 'react';
import { Form } from '@unform/web';
import { FiLock, FiLogIn, FiMail } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import logoImg from '../../assets/logo.svg';

import { AuthContext } from '../../hooks/AuthContext';
import { ToastContext } from '../../hooks/ToastContext';

import getValidationErrors from '../../util/getValidationErrors';
import Button from '../../components/Button';
import Input from '../../components/Input';

import { Container, Content, AnimatedContent, Background } from './styles';
import { Link, useHistory } from 'react-router-dom';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { signIn, user } = useContext(AuthContext);
  const { addToast } = useContext(ToastContext);
  const history = useHistory();

  console.log(user);

  const handleSubmit = useCallback( async (data: SignInFormData) => {
    try {
      formRef.current?.setErrors({})

      const schema = Yup.object().shape({
        email: Yup.string().required('Campo obrigatório').email('Digite um e-mail válido'),
        password: Yup.string().required('Campo obrigatório')
      });
      await schema.validate(data, {
        abortEarly: false,
      });

      await signIn({
        email: data.email,
        password: data.password
      });

      history.push('/dashboard');

    } catch (err) {
      if(err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);

        return;
      }
      addToast({
        type: 'error',
        title: 'Erro na autenticação',
        description: 'Ocorreu um erro no login, verifique suas credenciais.'
      });
    }
  }, [signIn, addToast, history]);

  return(
    <Container>
      <Content>
        <AnimatedContent>
          <img src={logoImg} alt="GoBarber"/>

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu login</h1>

            <Input icon={FiMail} name="email" placeholder="E-mail" />
            <Input icon={FiLock} name="password" type="password" placeholder="Senha" />

            <Button type="submit">Entrar</Button>

            <Link to="/forgot-password">Esqueci minha senha</Link>
          </Form>

          <Link to="/sign-up">
            <FiLogIn />
            Criar conta
          </Link>
        </AnimatedContent>
      </Content>

      <Background />
    </Container>
  );
}

export default SignIn;