import styled from 'styled-components/native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { Platform } from 'react-native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 30px ${Platform.OS === 'android' ? 150 : 40}px;
  margin-top: 32px;
`;

export const Title = styled.Text`
  margin: 32px 0 24px;
  color: #f4ede8;
  font-size: 24px;
  font-family: 'RobotoSlab-Medium';
`;

export const ForgotPassword = styled.TouchableOpacity`
  margin-top: 24px;
`;

export const ForgotPasswordText = styled.Text`
  color: #f4ede8;
  font-size: 16px;
  font-family: 'RobotoSlab-Regular';
`;

export const CreateAccountButton = styled.TouchableOpacity`
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  border-top-width: 1px;
  border-color: #232129;
  background: #312e38;
  padding: 16px 0 ${12 + getBottomSpace()}px;

  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

export const CreateAccountButtonText = styled.Text`
  margin-left: 16px;
  color: #ff9000;
  font-family: 'RobotoSlab-Regular';
  font-size: 18px;
`;