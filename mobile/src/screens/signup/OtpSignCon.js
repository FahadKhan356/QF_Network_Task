import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  ActivityIndicator
} from 'react-native';
import { verify_Otp } from '../../services/auth/authServices';
import { resendOtp } from '../../services/auth/authServices';
import OTPTextInput from 'react-native-otp-textinput';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../../assets/styles/otp_sign_con';



const OtpSignCon = ({ navigation, route }) => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const otpInput = useRef(null);

  // phone passed from PhoneSign
  const identifier = route?.params?.identifier;

  const verifyOtp = async () => {
    if (otp.length !== 6) {
      Alert.alert("Error", "Enter complete 6-digit OTP");
      return;
    }

    try {
      setLoading(true);

      const res = await verify_Otp(identifier,otp);

      const data = await res.json();

      if (data.success) {
        await AsyncStorage.setItem("token", data.token);
       navigation.replace("Home");
      } else {
        Alert.alert("Error", data.message || "Invalid OTP");
      }
    } catch (err) {
      Alert.alert("Error", "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  const resendOtp = async () => {
    try {
      await resendOtp(identifier);
      Alert.alert("Success", "OTP resent");
      otpInput.current?.clear();
      setOtp('');
    } catch (err) {
      Alert.alert("Error", "Failed to resend OTP");
    }
  };

  return (
    <LinearGradient colors={['#4C0082', '#6A0DAD']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>

        {/* Back Button */}
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="chevron-back" size={30} color="#FFF" />
        </TouchableOpacity>

        <View style={styles.content}>
          <Text style={styles.instructionText}>
            Enter the 6-digit code sent to your phone number{" "}
            <Text style={styles.phoneNumber}>{identifier}</Text>
          </Text>

          <OTPTextInput
            ref={otpInput}
            inputCount={6}
            handleTextChange={setOtp}
            keyboardType="number-pad"
            tintColor="#FFFFFF"
            offTintColor="rgba(255,255,255,0.2)"
            containerStyle={styles.otpContainer}
            textInputStyle={styles.otpInput}
          />

          <Text style={styles.activationText}>
            Full code is needed to activate
          </Text>

          {/* VERIFY BUTTON */}
          <TouchableOpacity style={styles.verifyButton} onPress={verifyOtp}>
            {loading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Text style={styles.verifyText}>Verify</Text>
            )}
          </TouchableOpacity>

          {/* RESEND */}
          <TouchableOpacity onPress={resendOtp}>
            <Text style={styles.resendText}>
              Didn't receive code? <Text style={styles.resendLink}>Resend</Text>
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            By providing your phone number, you agree Marsh Tech may send you texts with notifications and security codes
          </Text>
        </View>

      </SafeAreaView>
    </LinearGradient>
  );
};

export default OtpSignCon;
