import React, { useRef, useCallback, useContext } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import * as Yup from 'yup';
import ImagePicker from 'react-native-image-picker';

import { AuthContext } from '../../hooks/AuthContext';
import getValidationErrors from '../../util/getValidationErrors';
import api from '../../services/api';
import Button from '../../components/Button';
import Input from '../../components/Input';

import { 
  Container,
  Title,
  BackButton,
  UserAvatarButton,
  UserAvatar
} from './styles';
interface ProfileFormData {
  name: string;
  email: string;
  password: string;
  old_password: string;
  password_confirmation: string;
}

const SignUp: React.FC = () => {
  const { user, updateAvatar } = useContext(AuthContext);
  const navigation = useNavigation();
  const formRef = useRef<FormHandles>(null);

  const handleUpdateUser = useCallback( async (data: ProfileFormData) => {
    try {
      formRef.current?.setErrors({})

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Digite um e-mail válido'),
        old_password: Yup.string(),
        password: Yup.string().when('old_password', {
          is: (val) => !!val.length,
          then: Yup.string().required('Campo obrigatório'),
          otherwise: Yup.string(),
        }),
        password_confirmation: Yup.string()
          .when('old_password', {
            is: (val) => !!val.length,
            then: Yup.string().required('Campo obrigatório'),
            otherwise: Yup.string(),
          })
          .oneOf([Yup.ref('password'), null], 'Confirmação incorreta'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const {
        name,
        email,
        old_password,
        password,
        password_confirmation,
      } = data;

      const formData = {
        name,
        email,
        ...(old_password ? {
          old_password,
          password,
          password_confirmation,
        }
        : {}),
      }

      const response = await api.put('profile', formData);

      updateAvatar(response.data);

      Alert.alert(
        'Perfil atualizado com sucesso',
        ':)'
      );

      navigation.goBack();
    } catch (err) {
      if(err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);

        return;
      }

      Alert.alert(
        'Erro na atualização do perfil',
        'Ocorreu um erro ao atualizar seu perfil, tente novamente'
      );
    }
  }, [navigation, updateAvatar]);

  const handleUpdateAvatar = useCallback(() => {
    ImagePicker.showImagePicker({
      title: 'Selecione um avatar',
      cancelButtonTitle: 'Cancelar',
      takePhotoButtonTitle: 'Usar câmera',
      chooseFromLibraryButtonTitle: 'Escolher avatar da galeria'
    }, response => {
      if(response.didCancel) {
        return;
      } 
      
      if (response.error) {
        Alert.alert('Erro ao atualizar seu avatar.');
        return;
      } 

      const data = new FormData();

      data.append('avatar', {
        type: 'image/jpeg',
        name: `${user.id}.jpg`,
        uri: response.uri,
      });

      api.patch('users/avatar', data).then(aResponse => {
        updateAvatar(aResponse.data);
      });
    })
  }, [updateAvatar, user.id]);

  const handleGoBack = useCallback(() => {
    navigation.goBack();
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
            <BackButton onPress={handleGoBack}>
              <Icon name="chevron-left" size={24} color='#999591' />
            </BackButton>

            <UserAvatarButton onPress={handleUpdateAvatar}>
              <UserAvatar source={{ uri: user.avatar_url }} />
            </UserAvatarButton>

            <View>
              <Title>Meu perfil</Title>
            </View>

            <Form initialData={{ name: user.name, email: user.email }} ref={formRef} onSubmit={handleUpdateUser}>
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
                name="old_password" 
                icon="lock" 
                placeholder="Senha atual" 
                secureTextEntry
                textContentType="newPassword"
                containerStyle={{ marginTop: 16 }}
                returnKeyType="next"
                onSubmitEditing={() => formRef.current?.submitForm()}
              />
              <Input 
                name="password" 
                icon="lock" 
                placeholder="Nova senha" 
                secureTextEntry
                textContentType="newPassword"
                returnKeyType="next"
                onSubmitEditing={() => formRef.current?.submitForm()}
              />
              <Input 
                name="password_confirmation" 
                icon="lock" 
                placeholder="Confirmar senha" 
                secureTextEntry
                textContentType="newPassword"
                returnKeyType="send"
                onSubmitEditing={() => formRef.current?.submitForm()}
              />
              <Button onPress={() => formRef.current?.submitForm()}>Confirmar mudanças</Button>
            </Form>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}

export default SignUp;