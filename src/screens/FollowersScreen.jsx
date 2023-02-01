import { useState, useEffect } from "react";
import { FlatList, RefreshControl } from "react-native";
import User from '../components/User';

function FollowersScreen({ route }) {

	const { user } = route.params;
	const [followersList, setFollowersList] = useState([]);
	const [refreshing, setRefreshing] = useState(true)

	const getFollowers = async () => {
		try {
			const response = await fetch(`https://api.github.com/users/${user}/followers`);
			const jsonData = await response.json();
			setFollowersList(jsonData);
			setRefreshing(false);
		}
		catch (error) {
			console.error(error)
		}
	}
	useEffect(() => {
		getFollowers()
	}, [])

	return (
		<FlatList
			data={followersList}
			renderItem={({ item }) => <User avatar={item.avatar_url} login={item.login} />}
			keyExtractor={item => item.id}
			numColumns={3}
			refreshControl={
				<RefreshControl refreshing={refreshing} onRefresh={getFollowers} />
			}
		/>
	)

}

export default FollowersScreen;