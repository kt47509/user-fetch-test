import { Text, Image, View, StyleSheet, TouchableOpacity, Button } from "react-native";
// import SkeletonContent from "react-native-skeleton-content";

import React, { useEffect, useState } from "react";

function ProfileScreen({ route, navigation }) {

	const { userSelection } = route.params;
	const [githubData, setGithubData] = useState([]);
	const [userFound, setUserFound] = useState(true);
	const [loading, setLoading] = useState(true);
	const [refreshing, setRefreshing] = useState(true)

	useEffect(() => {
		const getUserData = async () => {
			try {
				const response = await fetch(`https://api.github.com/users/${userSelection}`);
				const data = await response.json();
				if (data.message == "Not Found") {
					setUserFound(false);
				}
				setLoading(false)
				setGithubData(data);
			}
			catch (error) {
				setLoading(false)
				console.error(error)
			}
		}
		getUserData()
	}, [])


	if (loading) {
		return (<View><Text>loading</Text></View>)
	}
	else
	if (!userFound) {
		return (
			<View style={styles.notFound}>
				<Text style={[styles.text, {marginBottom: 20}]}>user not found</Text>
				<Button title="Go Back" color="#6e40c9" onPress={() => navigation.goBack()} />
			</View>)
	}

	return (
		<View style={styles.container}>
			{/* <SkeletonContent
				isLoading={loading}
			> */}

				<Image
					style={styles.avatar}
					source={{
						uri: githubData.avatar_url
					}}
				/>
				<Text style={[styles.text, { fontSize: 25, marginBottom: 5 }]}>{githubData.login}</Text>
				<Text style={styles.text}>{githubData.name}</Text>
				<View style={styles.descriptionContainer}>
					<Text style={styles.descriptionText}>{githubData.bio ? githubData.bio : "(No description provided)"}</Text>
				</View>

				<View style={styles.socialContainer}>
					<TouchableOpacity
						style={styles.button}
						onPress={() => navigation.push("FollowersScreen", { user: userSelection })}>
						<Text style={styles.buttonText}>Followers</Text>
						<Text style={styles.buttonText}>{githubData.followers}</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.button}
						onPress={() => navigation.push("FollowingScreen", { user: userSelection })}>
						<Text style={styles.buttonText}>Following</Text>
						<Text style={styles.buttonText}>{githubData.following}</Text>
					</TouchableOpacity>
				</View>
			{/* </SkeletonContent> */}
		</View>
	)


}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	avatar: {
		height: 200,
		width: 200,
		borderRadius: 100,
		marginBottom: 10
	},
	text: {
		color: "#6e40c9",
		fontSize: 18
	},
	descriptionContainer: {
		maxWidth: '80%',
	},
	socialContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: 10,
		width: 230
	},
	notFound :{
		flex:1,
		justifyContent: 'center',
		alignItems: "center",
	},
	button: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#6e40c9',
		width: 100,
		height: 100,
		borderRadius: 10
	},
	buttonText: {
		color: "white"
	}
});

export default ProfileScreen;