import React from "react";
import { StyleSheet, View } from "react-native";
import { SinglePlaylist } from "../components/SinglePlaylist";
import { useSelector } from "react-redux";
import { Button } from "@rneui/base";

const SinglePlaylistScreen = ({ route }) => {
  const { title, imageUrl, totalSongs, playlistHref } = route.params;
  return (
    <View style={styles.container}>
      <SinglePlaylist
        title={title}
        imageUrl={imageUrl}
        totalSongs={totalSongs}
      />
      <Button title="START" style={styles.button} />
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
  button: {
    width: 200,
    marginTop: 50,
  },
});
