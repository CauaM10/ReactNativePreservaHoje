import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Switch, StyleSheet, ActivityIndicator, Image, Animated, Dimensions, Easing } from 'react-native';

const TABS = ['Sobre Nós', 'Serviços', 'Objetivo'];
const INITIAL_TEXTS = [
  'Texto inicial - Sobre Nós',
  'Texto inicial - Serviços',
  'Texto inicial - Objetivo',
];
const API_RESPONSES = [
  'Atualização: A PreservaHoje é referência no transporte sustentável.',
  'Atualização: Serviços completos para gestão de emissões em tempo real.',
  'Atualização: Nosso objetivo é a inovação em sustentabilidade logística.',
];

const App = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [textos, setTextos] = useState(INITIAL_TEXTS);
  const [isNotificationEnabled, setNotificationEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  
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

 
  const fetchTextFromAPI = async (index) => {
    setLoading(true);
    try {
      const response = await new Promise((resolve) =>
        setTimeout(() => {
          resolve({ data: API_RESPONSES[index] });
        }, 1500)
      );

      const newTextsArray = [...textos];
      newTextsArray[index] = response.data;
      setTextos(newTextsArray);
    } catch (error) {
      console.error('Erro ao buscar o texto:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle tab switch and text fetching
  const handleTabSwitch = async (index) => {
    setTabIndex(index);
    await fetchTextFromAPI(index);
  };

  // Toggle notification switch
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
        {loading ? (
          <ActivityIndicator size="large" color="#4CAF50" />
        ) : (
          <Text style={styles.text}>{textos[tabIndex]}</Text>
        )}
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
  const underlineWidth = 80; // Fixar a largura da linha

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

const Footer = () => (
  <View style={styles.footer}>
    <Text style={styles.footerIcon}>🏠</Text>
  </View>
);

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
