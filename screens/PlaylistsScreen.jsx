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
  const token = useSelector((state) => state.spotify.token);
  const playlists = useSelector((state) => state.spotify.playlists);
  //console.log(playlists);
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
              })
            }
          >
            <Playlist
              title={item.name}
              imageUrl={item.images[0].url}
              totalSongs={item.tracks.total}
              playlistHref={item.href}
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
    paddingTop: StatusBar.currentHeight,
  },
});
