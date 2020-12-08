import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import logoImg from '../../assets/logo.png';

import Button from '../../components/Button';
import Input from '../../components/Input';

import { Container,
  Title,
  BackToLogin,
  BackToLoginText  
} from './styles';

const SignUp: React.FC = () => {
  const navigation = useNavigation();

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

          <Input name="name" icon="user" placeholder="Nome" />
          <Input name="name" icon="mail" placeholder="E-mail" />  
          <Input name="password" icon="lock" placeholder="Senha" />

          <Button>Entrar</Button>
        </Container>

        <BackToLogin onPress={() => {navigation.navigate('SignIn')}}>
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