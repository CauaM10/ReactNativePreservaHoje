
import React, { useState, useContext, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Switch, StyleSheet, ActivityIndicator, Image, Animated, Dimensions, Easing, Pressable } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { AuthContext } from '../Context/AuthContext';



const TABS = ['Sobre Nós', 'Serviços', 'Objetivo'];
const TEXTS = [
  'Texto inicial - Sobre Nós',
  'Texto inicial - Serviços',
  'Texto inicial - Objetivo',
];

const App = () => {


  const [tabIndex, setTabIndex] = useState(0);
  const [isNotificationEnabled, setNotificationEnabled] = useState(false);
  
  const windowWidth = Dimensions.get('window').width;
  const animation = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current; 

  useEffect(() => {
    const tabWidth = windowWidth / TABS.length;
    const textOffset = (tabWidth - 80) / 2 + 5; 
    Animated.timing(animation, {
      toValue: tabIndex * tabWidth + textOffset,
      duration: 400, 
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    }).start();

    Animated.sequence([
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start();
  }, [tabIndex]);

  const handleTabSwitch = (index) => {
    setTabIndex(index);
  };

  const toggleNotification = () => {
    setNotificationEnabled((prevState) => !prevState);
  };

  return (
    <View style={styles.container}>
      <HeaderImage source={require('../../assets/caminhao.jpg')} />
      <TabNavigation 
        tabs={TABS}
        activeIndex={tabIndex}
        onTabPress={handleTabSwitch}
        animation={animation}
      />
      <Animated.View style={[styles.textContainer, { opacity: opacityAnim }]}>
        <Text style={styles.text}>{TEXTS[tabIndex]}</Text>
      </Animated.View>
      <NotificationSwitch 
        isEnabled={isNotificationEnabled}
        toggleSwitch={toggleNotification}
      />
      <Footer />
    </View>
  );
};

const HeaderImage = ({ source }) => (
  <View style={styles.imageContainer}>
    <Image style={styles.image} source={source} />
  </View>
);

const TabNavigation = ({ tabs, activeIndex, onTabPress, animation }) => {
  const windowWidth = Dimensions.get('window').width;
  const tabWidth = windowWidth / tabs.length;
  const underlineWidth = 80;


  return (
    <View>
      <View style={styles.tabContainer}>
        {tabs.map((tab, index) => (
          <TouchableOpacity 
            key={index} 
            onPress={() => onTabPress(index)} 
            style={styles.tabButton}
            accessible
            accessibilityLabel={`Selecionar aba ${tab}`}
          >
            <Text style={activeIndex === index ? styles.tabTextActive : styles.tabTextInactive}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Animated.View 
        style={[styles.underline, { 
          width: underlineWidth, 
          transform: [{ translateX: animation }]
        }]}
      />
    </View>
  );
};

const NotificationSwitch = ({ isEnabled, toggleSwitch }) => (
  <View style={styles.notificationButton}>
    <Text style={styles.notificationText}>Receba Notificação</Text>
    <Switch
      trackColor={{ false: '#e0e0e0', true: '#4CAF50' }}
      thumbColor={isEnabled ? '#ffffff' : '#ffffff'}
      ios_backgroundColor="#e0e0e0"
      onValueChange={toggleSwitch}
      value={isEnabled}
    />
  </View>
);


// Footer Component
 

const Footer = () => {
  const { setAction } = useContext(AuthContext);

  return (
    <View style={styles.footer}>
      <Pressable onPress={() => setAction('home')} style={styles.volt}>
        <FontAwesome6 name="house" size={24} color="#4CAF50" />
      </Pressable>
    </View>
  );
};




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
  },
  imageContainer: {
    width: '100%',
    height: 250, 
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 10,
    zIndex: -1
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    backgroundColor: '#ffffff',
    paddingVertical: 10,
    elevation: 3,
    bottom: 10,
    borderRadius: 5
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 15, 
  },
  tabTextActive: {
    fontSize: 14, 
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  tabTextInactive: {
    fontSize: 14,
    color: '#888888',
  },
  underline: {
    height: 3,
    backgroundColor: '#4CAF50',
    position: 'absolute',
    bottom: 8,
    borderRadius: 2,
  },
  textContainer: {
    backgroundColor: '#ffffff',
    padding: 15, 
    borderRadius: 10,
    marginVertical: 15,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
  },
  text: {
    fontSize: 16, 
    color: '#333333',
    textAlign: 'justify',
  },
  notificationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 30,
    padding: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 3,
  },
  notificationText: {
    fontSize: 16,
    color: '#333',
    marginRight: 10,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 10,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    alignItems: 'center',
  },
  footerIcon: {
    fontSize: 24,
    color: '#4CAF50',
  },
});

export default App;
