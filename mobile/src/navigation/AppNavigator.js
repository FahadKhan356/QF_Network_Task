import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import PhoneSign from '../screens/signup/PhoneSign';
import OtpSignCon from '../screens/signup/OtpSignCon';
import PhoneLogin from '../screens/login/PhoneLogin';
import Home from '../screens/home/Home';
import OtpLogCon from '../screens/login/OtpLogCon';
import Splash from '../screens/splash/Splash';
import ARCameraScreen from '../screens/Ar_screen/ARCameraScreen';

// Import your separate files


const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      {/* initialRouteName determines which screen shows first */}
     <Stack.Navigator initialRouteName="Splash">
        
        <Stack.Screen 
          name="Splash" 
          component={Splash} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="PhoneSign" 
          component={PhoneSign} 
          options={{ headerShown: false }} 
        />
        
        <Stack.Screen 
          name="OtpSignCon" 
          component={OtpSignCon}
          options={{ headerShown: false }}
        />
        
        <Stack.Screen 
          name="PhoneLogin" 
          component={PhoneLogin} 
        />
         <Stack.Screen 
          name="OtpLogCon" 
          component={OtpLogCon} 
        />
         <Stack.Screen 
          name="Home" 
          component={Home} 
           options={{ headerShown: false }}
        />

        <Stack.Screen  
        name="ARCameraScreen"
        component={ARCameraScreen}
        options={{headerShown:false}}/>

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;