import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Switch, ImageBackground, Animated } from 'react-native';

const InputBoxScreen = () => {
  const [inputValue, setInputValue] = useState('');
  const [displayValue, setDisplayValue] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  // Background images
  const dayBackground = 'https://img.freepik.com/free-vector/colorful-gradient-background-modern-design_361591-4585.jpg?t=st=1740422356~exp=1740425956~hmac=7e5224718b06eeeb3263fc67cffd383f76dd562cfe3df03854f858b4b5d611e5&w=740';
  const nightBackground = 'https://img.freepik.com/free-vector/pink-neon-synthwave-patterned-social-story-template-vector_53876-176441.jpg?t=st=1740422523~exp=1740426123~hmac=88d844d3578eaf46ac16bf928b39d92c4c6937f28f9265fdb0f40ad4bbe6ac08&w=740';

  // Smooth transition effect
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 0, 
      duration: 300, 
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(fadeAnim, {
        toValue: 1, 
        duration: 300, 
        useNativeDriver: true,
      }).start();
    });
  }, [isDarkMode]);

  return (
    <View style={styles.fullScreen}>
      {/* Background with Smooth Transition */}
      <Animated.View style={[styles.background, { opacity: fadeAnim }]}>
        <ImageBackground 
          source={{ uri: isDarkMode ? nightBackground : dayBackground }} 
          style={styles.backgroundImage}
        />
      </Animated.View>

      {/* Toggle Switch for Day/Night Mode */}
      <View style={styles.toggleContainer}>
        <Text style={[styles.toggleText, { color: isDarkMode ? 'white' : 'black' }]}>Day</Text>
        <Switch 
          value={isDarkMode} 
          onValueChange={() => setIsDarkMode(!isDarkMode)} 
          trackColor={{ false: '#ccc', true: '#555' }}
          thumbColor={isDarkMode ? '#fff' : '#000'}
        />
        <Text style={[styles.toggleText, { color: isDarkMode ? 'white' : 'black' }]}>Night</Text>
      </View>

      <View style={styles.container}>
        {/* Input Section */}
        <View style={styles.inputSection}>
          <Text style={styles.heading}>NFC Card Input</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your code here"
            placeholderTextColor="#ddd"
            value={inputValue}
            onChangeText={setInputValue}
          />
          <TouchableOpacity style={styles.button} onPress={() => setDisplayValue(inputValue)}>
            <Text style={styles.buttonText}>Send Data</Text>
          </TouchableOpacity>
        </View>

        {/* Button Section */}
        <View style={styles.buttonSection}>
          <TouchableOpacity style={styles.nextButton} onPress={() => console.log('Next button pressed')}>
            <Text style={styles.buttonText}>Receive Data</Text>
          </TouchableOpacity>
        </View>

        {displayValue ? <Text style={styles.output}>You entered: {displayValue}</Text> : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  toggleContainer: {
    position: 'absolute',
    top: 50,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  toggleText: {
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'sans-serif',
    marginHorizontal: 5,
  },
  container: {
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'sans-serif',
    color: 'white',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 15,
    paddingHorizontal: 15,
    fontSize: 18,
    color: 'white',
    fontFamily: 'sans-serif',
    marginBottom: 20,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  button: {
    width: '100%',
    backgroundColor: '#ff6b6b',
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonSection: {
    width: '100%',
    alignItems: 'center',
  },
  nextButton: {
    width: '100%',
    backgroundColor: '#48dbfb',
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
    marginVertical: 10,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'sans-serif',
    color: 'white',
  },
  output: {
    marginTop: 20,
    fontSize: 18,
    fontFamily: 'sans-serif',
    color: 'white',
    fontWeight: 'bold',
  },
});

export default InputBoxScreen;
