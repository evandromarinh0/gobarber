import React, { useCallback, useContext, useRef } from 'react';
import { FiArrowLeft, FiCamera, FiLock, FiMail, FiUser } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Link, useHistory } from 'react-router-dom';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import Button from '../../components/Button';
import Input from '../../components/Input';
import getValidationErrors from '../../util/getValidationErrors';
import api from '../../services/api';

import { ToastContext } from '../../hooks/ToastContext';
import { AuthContext } from '../../hooks/AuthContext';

import { Container, Content, AnimatedContent, AvatarInput } from './styles';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const { addToast } = useContext(ToastContext);
  const { user } = useContext(AuthContext);

  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const handleSubmit = useCallback( async (data: SignUpFormData) => {
    try {
      formRef.current?.setErrors({})

      const schema = Yup.object().shape({
        name: Yup.string().required('Campo obrigatório'),
        email: Yup.string().required('Campo obrigatório').email('Digite um e-mail válido'),
        password: Yup.string().required('Campo obrigatório')
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await api.post('users', data);

      history.push('/');

      addToast({
        type: 'success',
        title: 'Cadastro realizado!',
        description: 'Você já pode realizar seu login no GoBarber',
      });
    } catch (err) {
      if(err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);

        return;
      }

      addToast({
        type: 'error',
        title: 'Erro no seu cadastro',
        description: 'Ocorreu um erro ao tentar realizar cadastro, tente novamente.'
      });
    }
  }, [addToast, history]);
  
  return(
    <Container>
      <Content>
        <header>
          <div>
            <Link to="/dashboard">
              <FiArrowLeft />
            </Link>
          </div>
        </header>
        <AnimatedContent>
          <Form ref={formRef} onSubmit={handleSubmit} initialData={{ name: user.name, email: user.email }} >
            <AvatarInput>
              <img src={user.avatar_url} alt={user.name} />
              <button type="button">
                <FiCamera />
              </button>
            </AvatarInput>
            <h1>Meu perfil</h1>

            <Input icon={FiUser} name="name" placeholder="Nome" />
            <Input icon={FiMail} name="email" placeholder="E-mail" />

            <Input icon={FiLock} name="old_password" type="password" placeholder="Senha atual" containerStyle={{ marginTop: 24 }} />
            <Input icon={FiLock} name="password" type="password" placeholder="Nova senha" />
            <Input icon={FiLock} name="password_confirmation" type="password" placeholder="Confirmar Senha" />

            <Button type="submit">Cadastrar</Button>
          </Form>
        </AnimatedContent>
      </Content>
    </Container>
  );
}

export default SignUp;