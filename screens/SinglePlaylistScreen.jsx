import React from "react";
import { StyleSheet, View } from "react-native";
import { SinglePlaylist } from "../components/SinglePlaylist";
import { useSelector } from "react-redux";

const SinglePlaylistScreen = ({ route }) => {
  const { title, imageUrl, totalSongs } = route.params;
  return (
    <View style={styles.container}>
      <SinglePlaylist
        title={title}
        imageUrl={imageUrl}
        totalSongs={totalSongs}
      />
    </View>
  );
};

export default SinglePlaylistScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 100,
    padding: 5,
    backgroundColor: "black",
  },
});
