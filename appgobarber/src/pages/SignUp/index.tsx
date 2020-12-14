import React, { useRef, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import { Alert, Image, KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import getValidationErrors from '../../util/getValidationErrors';
import * as Yup from 'yup';

import api from '../../services/api';

import logoImg from '../../assets/logo.png';

import Button from '../../components/Button';
import Input from '../../components/Input';

import { Container,
  Title,
  BackToLogin,
  BackToLoginText  
} from './styles';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const navigation = useNavigation();
  const formRef = useRef<FormHandles>(null);

  const handleSignUp = useCallback( async (data: SignUpFormData) => {
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

      Alert.alert(
        'Cadastro realizado com sucesso',
        'Seu cadastro foi realizado, você já pode fazer o seu login'
      )

      navigation.goBack();
    } catch (err) {
      if(err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);

        return;
      }

      Alert.alert(
        'Erro no cadastro',
        'Ocorreu um erro ao fazer cadastro, tente novamente'
      )
    }
  }, [navigation]);

  return(
    <>
    <KeyboardAvoidingView 
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flex: 1 }}
      >
        <Container>
          <Image source={logoImg} />
          <View>
            <Title>Crie sua conta</Title>
          </View>

          <Form ref={formRef} onSubmit={handleSignUp}>
            <Input 
              autoCorrect={true}
              autoCapitalize="words"
              name="name" 
              icon="user" 
              placeholder="Nome" 
              returnKeyType="next"
            />
            <Input 
              name="email" 
              icon="mail" 
              placeholder="E-mail" 
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              returnKeyType="next"
            />  
            <Input 
              name="password" 
              icon="lock" 
              placeholder="Senha" 
              secureTextEntry
              textContentType="newPassword"
              returnKeyType="send"
              onSubmitEditing={() => formRef.current?.submitForm()}
            />
            <Button onPress={() => formRef.current?.submitForm()}>Entrar</Button>
          </Form>
        </Container>

        <BackToLogin onPress={() => {navigation.goBack()}}>
          <Icon name="arrow-left" size={20} color="#fff" />
          <BackToLoginText>
            Voltar a página inicial
          </BackToLoginText>
        </BackToLogin>
      </ScrollView>
    </KeyboardAvoidingView>
    </>
  );
}

export default SignUp;