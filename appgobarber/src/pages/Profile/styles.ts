import styled from 'styled-components/native';
import { Platform } from 'react-native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 0 30px ${Platform.OS === 'android' ? 150 : 40}px;
  position: relative;
`;

export const Title = styled.Text`
  margin: 24px 0;
  color: #f4ede8;
  font-size: 20px;
  font-family: 'RobotoSlab-Medium';
`;

export const BackButton = styled.TouchableOpacity`
  margin-top: 80px;
`;

export const UserAvatarButton = styled.TouchableOpacity`
  margin-top: 32px;
`;

export const UserAvatar = styled.Image`
  width: 186px;
  height: 186px;
  border-radius: 98px;
  align-self: center;
  background: #232129;
`;