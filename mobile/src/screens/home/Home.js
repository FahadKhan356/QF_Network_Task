// src/screens/MapScreen.js
// Navigation Screen with Route Creation on Button Click

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Image,
  Dimensions,
} from 'react-native';
import { WebView } from 'react-native-webview';
import Icon from 'react-native-vector-icons/FontAwesome';
import McIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const { width, height } = Dimensions.get('window');

const Home = ({ navigation }) => {
  const [showRoute, setShowRoute] = useState(false);

  // Point A (Current Location) and Point B (Destination)
  const pointA = {
    lat: 40.7589,
    lng: -73.9851,
    name: 'Brown Mountains',
    address: '61 Cuba St',
  };

  const pointB = {
    lat: 40.7484,
    lng: -73.9857,
    name: '3 Birrel Avenue',
    address: 'Newtown',
  };

  // Calculate center point
  const centerLat = (pointA.lat + pointB.lat) / 2;
  const centerLng = (pointA.lng + pointB.lng) / 2;

  // HTML with Leaflet.js - OpenStreetMap
  const mapHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
      <style>
        * { margin: 0; padding: 0; }
        html, body { height: 100%; width: 100%; overflow: hidden; }
        #map { height: 100%; width: 100%; background: #f5f5f5; }
      </style>
    </head>
    <body>
      <div id="map"></div>
      <script>
        var map = L.map('map', {
          center: [${centerLat}, ${centerLng}],
          zoom: 14,
          zoomControl: false
        });

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap',
          maxZoom: 19
        }).addTo(map);

        // Purple icon for Point A (Current Location)
        var iconA = L.divIcon({
          className: 'custom-marker',
          html: \`
            <div style="
              width: 50px;
              height: 50px;
              background: linear-gradient(135deg, #7C3AED 0%, #A855F7 100%);
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              border: 4px solid white;
              box-shadow: 0 4px 12px rgba(124, 58, 237, 0.4);
              position: relative;
            ">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" />
                <path d="M2 17L12 22L22 17" />
                <path d="M2 12L12 17L22 12" />
              </svg>
            </div>
          \`,
          iconSize: [50, 50],
          iconAnchor: [25, 25]
        });

        // Purple icon for Point B (Destination)
        var iconB = L.divIcon({
          className: 'custom-marker',
          html: \`
            <div style="
              width: 50px;
              height: 50px;
              background: linear-gradient(135deg, #7C3AED 0%, #A855F7 100%);
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              border: 4px solid white;
              box-shadow: 0 4px 12px rgba(124, 58, 237, 0.4);
              position: relative;
            ">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <path d="M5 13l4 4L19 7" stroke="white" stroke-width="3" fill="none"/>
              </svg>
            </div>
          \`,
          iconSize: [50, 50],
          iconAnchor: [25, 25]
        });

        // Add markers
        var markerA = L.marker([${pointA.lat}, ${pointA.lng}], {icon: iconA}).addTo(map);
        var markerB = L.marker([${pointB.lat}, ${pointB.lng}], {icon: iconB}).addTo(map);

        // Route line (only shown when showRoute is true)
        var routeLine = null;
        ${showRoute ? `
        var routePath = [
          [${pointA.lat}, ${pointA.lng}],
          [${pointA.lat - 0.002}, ${pointA.lng + 0.001}],
          [${pointA.lat - 0.005}, ${pointA.lng - 0.0005}],
          [${pointA.lat - 0.008}, ${pointA.lng + 0.002}],
          [${pointB.lat}, ${pointB.lng}]
        ];

        routeLine = L.polyline(routePath, {
          color: '#7C3AED',
          weight: 5,
          opacity: 0.8,
          smoothFactor: 1,
          lineCap: 'round',
          lineJoin: 'round'
        }).addTo(map);

        // Add "Arrival (2 mins)" label
        var midPoint = routePath[Math.floor(routePath.length / 2)];
        L.marker(midPoint, {
          icon: L.divIcon({
            className: 'arrival-label',
            html: \`
              <div style="
                background: white;
                padding: 6px 12px;
                border-radius: 12px;
                font-size: 13px;
                font-weight: 600;
                color: #1F2937;
                box-shadow: 0 2px 8px rgba(0,0,0,0.15);
                white-space: nowrap;
              ">
                Arrival (2 mins)
              </div>
            \`,
            iconSize: [100, 30],
            iconAnchor: [50, 15]
          })
        }).addTo(map);
        ` : ''}

        var bounds = L.latLngBounds([
          [${pointA.lat}, ${pointA.lng}],
          [${pointB.lat}, ${pointB.lng}]
        ]);
        
        map.fitBounds(bounds, {
          padding: [100, 100],
          maxZoom: 15
        });
      </script>
    </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      {/* Map */}
      <WebView
        key={showRoute ? 'with-route' : 'no-route'}
        style={styles.map}
        originWhitelist={['*']}
        source={{ html: mapHTML }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={false}
        scalesPageToFit={true}
      />

      {/* Bottom Card - Destination Info */}
      <View style={styles.bottomCard}>
        {/* Destination Image and Info */}
        <View style={styles.destinationCard}>
          <View style={styles.imageContainer}>
            <View style={styles.placeholderImage}>
              <Text style={styles.imageText}>🏠</Text>
            </View>
          </View>
          <View style={styles.destinationInfo}>
            <Text style={styles.destinationName}>
              {showRoute ? '3 Birrel Avenue' : 'Brown Mountains'}
            </Text>
            <View style={styles.locationRow}>
              <Text style={styles.locationIcon}>📍</Text>
             
              <Text style={styles.locationText}>
                {showRoute ? 'Newtown' : '61 Cuba St'}
              </Text>
            </View>
          </View>
        </View>

        {/* Bottom Navigation Buttons */}
        <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.navButton}>
            <View style={styles.iconWrapper}>
              {/* <Text style={styles.locationPinIcon}>📍</Text> */}
               <Icon name="map-marker" size={30} color="#7C3AED"/>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate("ARCameraScreen")}>
            <View style={styles.iconWrapper}>
              {/* <Text style={styles.mapIconText}>🗺</Text> */}
                             <Icon name="eye" size={30} color="#7C3AED"/>

            </View>
          </TouchableOpacity>
          
          {/* Navigation Button */}
          {!showRoute ? (
            <TouchableOpacity 
              style={styles.navigationButton}
              onPress={() => setShowRoute(true)}>
              <View style={styles.navigationArrow}>
                {/* <View style={styles.arrowBody} />
                <View style={styles.arrowHead} /> */}
                    <Icon name="location-arrow" size={30} color="#ede6faff"/>
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setShowRoute(false)}>
              <View style={styles.closeIconWrapper}>
                    <Icon name="close" size={20} color="#ede6faff"/>

                {/* <View style={styles.closeLine1} />
                <View style={styles.closeLine2} /> */}
              </View>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Turn Right Banner (Only shown when route is active) */}
      {showRoute && (
        <View style={styles.turnBanner}>
          <Text style={styles.turnText}>Turn right</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  map: {
    flex: 1,
  },

  // Bottom Card
  bottomCard: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    paddingHorizontal: 16,
    paddingBottom: 30,
  },

  // Destination Card
  destinationCard: {
    backgroundColor: '#7C3AED',
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  imageContainer: {
    marginRight: 16,
  },
  placeholderImage: {
    width: 70,
    height: 70,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageText: {
    fontSize: 32,
  },
  destinationInfo: {
    flex: 1,
  },
  destinationName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIcon: {
    fontSize: 14,
    marginRight: 4,
  },
  locationText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
  },

  // Bottom Navigation
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 40,
    paddingVertical: 8,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  navButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationPinIcon: {
    fontSize: 22,
  },
  mapIconText: {
    fontSize: 22,
  },
  
  // Navigation Button (Purple with Arrow)
  navigationButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#7C3AED',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  navigationArrow: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowBody: {
    width: 3,
    height: 16,
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    transform: [{ rotate: '45deg' }],
  },
  arrowHead: {
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderBottomWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#FFFFFF',
    position: 'absolute',
    top: -2,
    transform: [{ rotate: '45deg' }],
  },
  
  // Close Button (Black with X)
  closeButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#1F2937',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  closeIconWrapper: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeLine1: {
    width: 20,
    height: 2.5,
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    transform: [{ rotate: '45deg' }],
  },
  closeLine2: {
    width: 20,
    height: 2.5,
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    transform: [{ rotate: '-45deg' }],
  },

  // Turn Right Banner
  turnBanner: {
    position: 'absolute',
    top: 60,
    left: '50%',
    marginLeft: -75,
    backgroundColor: '#7C3AED',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  turnText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default Home;