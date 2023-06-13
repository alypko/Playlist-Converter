import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { SinglePlaylist } from "../components/SinglePlaylist";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@rneui/base";
import { spotifyTracks } from "../store/spotifySlice";
import axios from "axios";

const SinglePlaylistScreen = ({ route, navigation }) => {
  const { title, imageUrl, totalSongs, playlistHref } = route.params;

  const dispatch = useDispatch();

  const token = useSelector((state) => state.spotify.token);

  const [tracks, setTracks] = useState([]);

  const getPlaylistTracks = useCallback(async () => {
    try {
      const res = await axios(
        playlistHref +
          "?fields=tracks.items%28track%28artists%28name%29%2C+name%29%29",
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status === 200) setTracks(res.data.tracks.items);
    } catch (error) {
      console.log("error", error.response.data);
    }
  }, [token]);

  useEffect(() => {
    getPlaylistTracks();
  }, [getPlaylistTracks]);

  const formatTracks = useCallback(() => {
    const formattedTracks = [];

    (tracks || []).forEach((element) => {
      formattedTracks.push(
        `${element.track.artists[0].name}%20${element.track.name}`
      );
    });
    dispatch(spotifyTracks(formattedTracks));
  }, [tracks]);

  useEffect(() => {
    formatTracks();
  }, [formatTracks]);

  return (
    <View style={styles.container}>
      <SinglePlaylist
        title={title}
        imageUrl={imageUrl}
        totalSongs={totalSongs}
        playlistHref={playlistHref}
      />
      <Button
        title="START"
        style={styles.button}
        onPress={() => navigation.navigate("Convert", { title })}
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
  button: {
    width: 200,
    marginTop: 50,
  },
});
