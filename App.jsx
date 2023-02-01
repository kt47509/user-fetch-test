import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, Button, Pressable, TouchableWithoutFeedback, Keyboard } from 'react-native';
import React, { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import ProfileScreen from './src/screens/ProfileScreen';
import FollowersScreen from './src/screens/FollowersScreen';
import FollowingScreen from './src/screens/FollowingScreen';


// initial screen
const HomeScreen = (props) => {

  const [inputText, setInputText] = useState("")

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Text style={styles.text}>Please enter a GitHub username</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => setInputText(text)}
          placeholder="Enter username"
          value={inputText}
        />
        <Pressable
          style={styles.button}
          // disabled if user has not input any text yet
          onPress={inputText ? () => props.navigation.push("ProfileScreen", { userSelection: inputText }) : null}
        >
          <Text style={styles.buttonText}>Search</Text>
        </Pressable>
      </View >
    </TouchableWithoutFeedback>
  )
}


const { Screen, Navigator } = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Navigator>
        <Screen
          name="HomeScreen"
          options={{ title: "Home" }}
          component={HomeScreen}
        />
        <Screen
          name="ProfileScreen"
          options={({ route, navigation }) => ({
            title: `${route.params.userSelection}'s profile`,
            // a button on the right side of the header to return to search screen
            headerRight: () => (
              <Button
                color="#6e40c9"
                onPress={() => navigation.push("HomeScreen")}
                title="Search"
              />
            )
          })}
          component={ProfileScreen}
        />
        <Screen
          name="FollowersScreen"
          options={({ route }) => ({ title: `${route.params.user}'s followers` })}
          component={FollowersScreen}
        />
        <Screen
          name="FollowingScreen"
          options={({ route }) => ({ title: `${route.params.user}'s followees` })}
          component={FollowingScreen}
        />
      </Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgrey',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 150
  },
  text: {
    color: "black",
    fontSize: 20,
  },
  input: {
    borderColor: "#333333",
    borderWidth: 2,
    marginTop: 50,
    marginBottom: 50,
    height: 50,
    width: 200,
    backgroundColor: "#fff",
    paddingLeft: 20,
    borderRadius: 10,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#6e40c9"
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  }
});
