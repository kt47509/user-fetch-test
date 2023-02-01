import React from 'react';
import { Text, Image, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function User({ login, avatar }) {

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.push("ProfileScreen", { userSelection: login })}
      >
        <Text style={styles.title}>{login}</Text>
        <Image
          style={styles.avatar}
          source={{
          uri: avatar
          }}
        />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxWidth: 115,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    borderRadius: 10,
    backgroundColor: "#333333",
    paddingTop: 10,
    paddingBottom: 10
  },
  title: {
    textAlign: 'center',
    marginBottom: 5,
    color: "white"
  },
  avatar: {
    height: 90,
    width: 90,
    borderRadius: 100,
  },
  button: {
    backgroundColor: 'yellow',
    width: 100,
    height: 100
  }
});


export default User;