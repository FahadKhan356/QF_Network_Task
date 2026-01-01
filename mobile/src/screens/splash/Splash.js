
import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  StatusBar,
} from 'react-native';
import styles from '../../assets/styles/splash.styles';
import LinearGradient from 'react-native-linear-gradient';

const Splash = ({ navigation }) => {
  const pulseAnim = new Animated.Value(1);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 8000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    const timer = setTimeout(() => {
      navigation.replace('PhoneSign');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <LinearGradient
      colors={['#6B21A8', '#7C3AED', '#6B21A8']}
      style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#6B21A8" />
      <View style={styles.content}>
        <Text style={styles.logo}>stizi</Text>
        <Animated.View
          style={[
            styles.loadingBar,
            { transform: [{ scaleX: pulseAnim }] },
          ]}
        />
      </View>
      <Text style={styles.footer}>Candidate Fahad Khan</Text>
    </LinearGradient>
  );
};

export default Splash;
