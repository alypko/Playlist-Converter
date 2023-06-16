import {
  StyleSheet,
  FlatList,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import { Playlist } from "../components/Playlist";
import { Separator } from "../components/Separator";

const PlaylistsScreen = ({ navigation }) => {
  const playlists = useSelector((state) => state.spotify.playlists);
  //console.log(playlists);
  //console.log('Height on: ', Platform.OS, StatusBar.currentHeight);
  return (
    
    
    <FlatList
      contentContainerStyle={styles.container}
      data={playlists}
      renderItem={({ item }) => (
        <>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("SinglePlaylist", {
                title: item.name,
                imageUrl: item.images[0].url,
                totalSongs: item.tracks.total,
                playlistHref: item.href,
              })
            }
          >
            <Playlist
              title={item.name}
              imageUrl={item.images[0].url}
              totalSongs={item.tracks.total}
            />
          </TouchableOpacity>
          <Separator />
        </>
      )}
    />
    
  );
};

export default PlaylistsScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 30,
  },
});
