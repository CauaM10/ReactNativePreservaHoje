import React, { useState, useRef, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, Switch, StyleSheet, Image, Animated, Dimensions, Easing, Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { AuthContext } from '../Context/AuthContext';

const TABS = ['Sobre Nós', 'Serviços', 'Objetivo'];
const TEXTS = [
  " A PreservaHJ nasceu em 2010 com a missão de transformar o setor de transportes. Nosso fundador, ao trabalhar em uma transportadora, viu o impacto ambiental causado pelas frotas e decidiu agir. Começamos focados em otimizar o uso de combustível para reduzir custos e emissões de carbono. Com o tempo, percebemos que podíamos ir além e desenvolver uma solução completaAssim, criamos o EcoFrota, um aplicativo que calcula as emissões de carbono das frotas e oferece opções práticas de despoluição. Hoje, a PreservaHJ é referência em transporte sustentável, ajudando empresas a reduzir seu impacto ambiental e a adotar práticas mais verdes. Nosso compromisso é com o meio ambiente e um futuro mais sustentável",
  'Na PreservaHJ, além de calcular as emissões de carbono das frotas de caminhões, oferecemos soluções eficazes para despoluir a pegada ambiental das empresas. Não apenas sugerimos práticas mais sustentáveis, mas também conectamos nossos clientes com parceiros especializados, como empresas que oferecem créditos de carbono. Essas empresas permitem que as emissões inevitáveis sejam compensadas, financiando projetos de preservação ambiental e energias renováveis.Nosso serviço inclui a análise detalhada das emissões e a proposta de soluções de compensação, ajudando as empresas a alcançar a neutralidade de carbono. Dessa forma, proporcionamos não só economia e eficiência operacional',
  'O objetivo da PreservaHJ é transformar o setor de transportes em um exemplo de sustentabilidade. Nossa missão é ajudar as empresas a entenderem, monitorarem e reduzirem suas emissões de carbono, fornecendo soluções práticas e acessíveis para despoluir suas operações. Queremos que cada empresa possa operar de forma eficiente e sustentável, minimizando seu impacto ambiental e contribuindo para um futuro mais verde.Ao conectar nossos clientes com serviços de compensação, como créditos de carbono, buscamos não apenas reduzir emissões, mas também promover ações positivas que ajudem a preservar o meio ambiente. Nossa visão é um mundo onde o transporte de cargas seja mais limpo, eficiente e comprometido com a preservação do planeta.',
];

const App = () => {
  const { setAction } = useContext(AuthContext);
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
      <Pressable onPress={() => { setAction('home'); }} style={styles.volt}>
        <Ionicons name="arrow-back" size={28} color="white" style={styles.voltIcon} />
      </Pressable>
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
  volt: {
    position: 'absolute',
    top: 45,
    left: 5,
    padding: 5,
    backgroundColor: '#4CAF50',
    borderRadius: 30,
    zIndex: 1,
  },
  voltIcon: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
  },
});

export default App;
