import React, { useState } from 'react';
import {
  View,
  Text,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import { sendOtp } from '../../services/auth/authServices';
import LinearGradient from 'react-native-linear-gradient';
import styles from '../../assets/styles/phone_sign.styles';

// const BASE_URL = "http://YOUR_IP:5000";

const PhoneLogin = ({ navigation }) => {
  const [phoneno, setPhoneno] = useState('');
  const [loading, setLoading] = useState(false);

  const sendOtp = async () => {
    const isOnlyNumbers = /^\d+$/.test(phoneno);

    if (!phoneno || phoneno.length < 9 || !isOnlyNumbers) {
      Alert.alert("Error", "Enter valid phone number");
      return;
    }

    try {
      setLoading(true);

      const identifier = `+1${phoneno}`;

      const res = sendOtp(identifier);

      const data = await res.json();

      if (data.success) {
        Alert.alert("Success", "OTP sent");
        navigation.navigate("OtpSignCon", { identifier });
      } else {
        Alert.alert("Error", data.message || "Failed to send OTP");
      }
    } catch (err) {
      Alert.alert("Error", "Server error");
      

    } finally {
      setLoading(false);
    }
  };

  return (
   
   

   
    <LinearGradient colors={['#6B21A8', '#7C3AED', '#6B21A8']} style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#6B21A8" />

      <View style={styles.content}>
        <ScrollView  style={{flexGrow:1}}> 
        <View style={styles.logoContainer}>
          <Text style={styles.welcomeText}>Welcome to</Text>
          <Text style={styles.logo}>stizi</Text>
        </View>

        <View style={styles.bottomSection}>
          <View style={styles.phoneInput}>
            <View style={styles.countryCode}>
              <Text style={styles.countryCodeText}>+1</Text>
            </View>
            <TextInput
              keyboardType="number-pad"
              value={phoneno}
              onChangeText={setPhoneno}
              placeholder="Phone number"
              placeholderTextColor="grey"
              style={styles.textContainer}
            />
          </View>

          <TouchableOpacity
            style={styles.signInButton}
            onPress={sendOtp}
            disabled={loading}
          >
            <Text style={styles.GetCodeButtonText}>
              {loading ? "Sending..." : "Get Code"}
            </Text>
          </TouchableOpacity>

          <Text style={styles.disclaimer}>
            Stizi shares the same encryption as iMessage...
          </Text>
        </View>

        <Text style={styles.footer}>Candidate Fahad Khan</Text>
        </ScrollView>
      </View>
    </LinearGradient>
   
     
  );
};

export default PhoneLogin;
