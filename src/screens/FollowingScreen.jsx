import { useState, useEffect } from "react";
import { FlatList, RefreshControl } from "react-native";
import User from "../components/User";

function FollowingScreen({ route }) {

	const { user } = route.params;
	const [followingList, setFollowingList] = useState([]);
	const [refreshing, setRefreshing] = useState(true)

	const getFollowing = async () => {
		try {
			const response = await fetch(`https://api.github.com/users/${user}/following`);
			const jsonData = await response.json();
			setFollowingList(jsonData);
			setRefreshing(false);
		}
		catch (error) {
			console.error(error)
		}
	}
	useEffect(() => {
		getFollowing()
	}, [])

	return (
		<FlatList
			data={followingList}
			renderItem={({ item }) => <User avatar={item.avatar_url} login={item.login} />}
			keyExtractor={item => item.id}
			numColumns={3}
			refreshControl={
				<RefreshControl refreshing={refreshing} onRefresh={getFollowing} />
			}
		/>
	)

}

export default FollowingScreen;