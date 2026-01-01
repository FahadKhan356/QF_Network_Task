import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'http://192.168.10.8:3001/api/authentication';

export const sendOtp = async (identifier) => {
  const res = await fetch(`${BASE_URL}/send-otp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ identifier }),
  });

  return res.json();
};

export const verifyOtp = async (identifier, otp) => {
  const res = await fetch(`${BASE_URL}/verify-otp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ identifier, otp }),
  });

  const data = await res.json();

  if (data.success && data.token) {
    await AsyncStorage.setItem('token', data.token);
  }

  return data;
};

export const resendOtp = async (identifier) => {
  const res = await fetch(
    `${BASE_URL}/send-otp`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier }),
    }
  );

  return res.json();
};
