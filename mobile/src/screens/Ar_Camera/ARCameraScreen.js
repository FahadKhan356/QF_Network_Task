import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Alert,
  Animated,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { Camera, useCameraDevice, useCameraPermission } from 'react-native-vision-camera';
import styles from '../../assets/styles/ar_camera.styles';

const { width, height } = Dimensions.get('window');

const ARCameraScreen = ({ navigation }) => {
  // --- 1. Permissions & Camera Setup ---
  const { hasPermission, requestPermission } = useCameraPermission();
  const device = useCameraDevice('back');

  // --- 2. Animation States ---
  const [stampPlaced, setStampPlaced] = useState(false);
  const [stampPosition, setStampPosition] = useState({ x: width / 2, y: height / 2 });
  
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const rotateYAnim = useRef(new Animated.Value(0)).current;
  const bounceAnim = useRef(new Animated.Value(0)).current;

  // --- 3. Request Permission on Mount ---
  useEffect(() => {
    requestPermission();
  }, []);

  // --- 4. Trigger AR Animations ---
  useEffect(() => {
    if (stampPlaced) {
      // Scale up pop-in
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      }).start();

      // 3D Spinning
      Animated.loop(
        Animated.timing(rotateYAnim, {
          toValue: 1,
          duration: 4000,
          useNativeDriver: true,
        })
      ).start();

      // Floating Bounce
      Animated.loop(
        Animated.sequence([
          Animated.timing(bounceAnim, {
            toValue: -15,
            duration: 1500,
            useNativeDriver: true,
          }),
          Animated.timing(bounceAnim, {
            toValue: 0,
            duration: 1500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [stampPlaced]);

  const handleScreenTap = (event) => {
    if (!stampPlaced) {
      const { locationX, locationY } = event.nativeEvent;
      setStampPosition({ x: locationX, y: locationY });
      setStampPlaced(true);
    }
  };

  const handleReset = () => {
    Animated.timing(scaleAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setStampPlaced(false);
      setStampPosition({ x: width / 2, y: height / 2 });
    });
  };

  // Interpolation for 3D spin
  const spinY = rotateYAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  // --- 5. Conditional Rendering for Camera ---
  if (!hasPermission) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Camera permission is required.</Text>
        <TouchableOpacity style={styles.retryButton} onPress={requestPermission}>
          <Text style={styles.retryText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (device == null) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#7C3AED" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      {/* THE REAL CAMERA LAYER */}
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
      />

      {/* INTERACTIVE OVERLAY LAYER */}
      <TouchableOpacity 
        style={StyleSheet.absoluteFill} 
        activeOpacity={1}
        onPress={handleScreenTap}
      >
        {/* GRID OVERLAY */}
        <View style={styles.gridOverlay}>
          <View style={styles.gridLineH} />
          <View style={[styles.gridLineH, { top: '66%' }]} />
          <View style={styles.gridLineV} />
          <View style={[styles.gridLineV, { left: '66%' }]} />
        </View>

        {/* ENHANCED FLOATING STAMP */}
        {stampPlaced && (
          <Animated.View
            style={[
              styles.stampContainer,
              {
                left: stampPosition.x - 60,
                top: stampPosition.y - 80,
                transform: [
                  { scale: scaleAnim },
                  { rotateY: spinY },
                  { translateY: bounceAnim }
                ],
              },
            ]}
          >
            {/* Outer Glow */}
            <View style={styles.glowEffect} />

            {/* Main Purple Box */}
            <View style={styles.enhancedStampBox}>
              <View style={styles.glassShine} />
              <Text style={styles.stampText}>STIZI</Text>
            </View>
            
            {/* QR Component */}
            <View style={styles.enhancedQrBox}>
              <View style={styles.qrSquare} />
              <View style={[styles.qrSquare, { right: 8 }]} />
              <View style={[styles.qrSquare, { bottom: 8 }]} />
              <View style={styles.qrCenter} />
            </View>

            {/* Laser Beam Base */}
            <View style={styles.lightBeam} />
            <View style={styles.basePlatform} />
          </Animated.View>
        )}

        {/* AIMING CROSSHAIR */}
        {!stampPlaced && (
          <View style={styles.crosshair}>
            <View style={styles.chH} />
            <View style={styles.chV} />
            <View style={styles.chDot} />
          </View>
        )}
      </TouchableOpacity>

      {/* TOP HEADER UI */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.closeBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.closeBtnText}>✕</Text>
        </TouchableOpacity>
        <View style={styles.titleBadge}>
          <Text style={styles.topTitle}>{stampPlaced ? 'STAMP ACTIVE' : 'AR VIEWER'}</Text>
        </View>
        <View style={{ width: 40 }} />
      </View>

      {/* BOTTOM CONTROL UI */}
      <View style={styles.bottomUI}>
        <View style={styles.instructionCard}>
          <Text style={styles.instrTitle}>
            {stampPlaced ? '📍 Treasure Locked' : '🎯 Find a Spot'}
          </Text>
          <Text style={styles.instrSub}>
            {stampPlaced ? 'Your stamp is now floating in this location.' : 'Tap the screen to drop your virtual STIZI stamp.'}
          </Text>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.actionBtn} onPress={handleReset}>
            <Text style={styles.actionIcon}>🔄</Text>
            <Text style={styles.actionLabel}>Reset</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.mainActionBtn}>
             <Text style={styles.mainActionText}>CAPTURE</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionBtn}>
            <Text style={styles.actionIcon}>💾</Text>
            <Text style={styles.actionLabel}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ARCameraScreen;