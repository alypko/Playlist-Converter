import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./LoginScreen";
import PlaylistsScreen from "./PlaylistsScreen";
import SinglePlaylistScreen from "./SinglePlaylistScreen";
import ConvertScreen from "./ConvertScreen";

const Stack = createNativeStackNavigator();

const globalScreenOptions = {
  headerStyle: { backgroundColor: "black" },
  headerTitleStyle: { color: "white" },
  headerTintColor: "white",
  backgroundColor: "yellow",
};

const Navigation = () => {
  return (
    <NavigationContainer
      theme={{ colors: { background: "black" } }}
      screenOptions={globalScreenOptions}
    >
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Playlists"
          component={PlaylistsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SinglePlaylist"
          component={SinglePlaylistScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Convert"
          component={ConvertScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
