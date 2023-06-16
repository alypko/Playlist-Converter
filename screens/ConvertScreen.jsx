import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { useSelector } from "react-redux";
import { Loading } from "../components/Loading";
import { Button } from "@rneui/base";

const ConvertScreen = ({ route, navigation }) => {
  const { newTitle } = route.params;
  //console.log(newTitle);
  const tracks = useSelector((state) => state.spotify.tracks);
  const youtubeToken = useSelector((state) => state.spotify.youtubeToken);

  const [youtubePlaylistId, setYoutubePlaylistId] = useState("");
  const [youtubeVideoId, setYoutubeVideoId] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // console.log(tracks);
  // console.log(youtubeToken);

  // youtubePlaylistId ya29.a0AWY7CklbXP_wBoH_iRqKVL8xnTxv21GN-S_7cZMMLXgarGLyKtXzFjQxCYc14EImo4lNlBXo7fVjl1zgs_NzFyo-JyWzchkXeQtmZvZd8vkc0vcx2RcTtqJLWpjfR-Udi1UFE8vYGaWyUEs_eGUlI2ooD
  // youtubeVideoId ["3NPxqXMZq7o", "WnxySVRrMsE", "2MMpYIuDMlg"]

  const createYoutubePLaylist = useCallback(async () => {
    try {
      const res = await axios(
        "https://youtube.googleapis.com/youtube/v3/playlists?part=snippet",
        {
          method: "POST",
          data: {
            snippet: {
              title: newTitle,
            },
          },
          headers: {
            Authorization: "Bearer " + youtubeToken,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      if (res.status === 200) setYoutubePlaylistId(res.data.id);
      //setYoutubePlaylistId("plalistID");
    } catch (error) {
      console.log("error", error.response.data);
    }
  }, [youtubeToken]);

  const searchSong = useCallback(async () => {
    const videosID = [];
    for (let track of tracks) {
      try {
        const res = await axios(
          `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${encodeURIComponent(
            track
          )}`,
          {
            method: "GET",
            headers: {
              Authorization: "Bearer " + youtubeToken,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );
        if (res.status === 200) {
          videosID.push(res.data.items[0].id.videoId);
        }

        // videosID.push(track);
      } catch (error) {
        console.log("Search error", error.response.data);
      }
    }
    setYoutubeVideoId(videosID);
  }, [youtubeToken]);

  useEffect(() => {
    if (youtubeToken) {
      console.log("createYoutubePLaylist");
      createYoutubePLaylist();
      console.log("searchSong");
      searchSong();
    }
  }, [createYoutubePLaylist, searchSong, youtubeToken]);

  const insertSongs = useCallback(async () => {
    if (
      isLoading &&
      !!youtubePlaylistId &&
      !!youtubeToken &&
      !!youtubeVideoId.length
    ) {
      console.log("insertSongs");
      for (let video of youtubeVideoId) {
        try {
          const res = await axios(
            `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet`,
            {
              method: "POST",
              data: {
                snippet: {
                  playlistId: youtubePlaylistId,
                  resourceId: {
                    kind: "youtube#video",
                    videoId: video,
                  },
                },
              },
              headers: {
                Authorization: "Bearer " + youtubeToken,
                Accept: "application/json",
                "Content-Type": "application/json",
              },
            }
          );
          if (res.status === 200) console.log("inserted");
        } catch (error) {
          console.log("Insert error", error.response.data);
        }
      }
      setIsLoading(false);
    }
  }, [isLoading, youtubeVideoId, youtubePlaylistId, youtubeToken]);

  useEffect(() => {
    insertSongs();
  }, [insertSongs]);

  if (isLoading) {
    return (
      <Loading action="Converting"/>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontSize: 30,
          fontWeight: "bold",
          color: "white",
          marginBottom: "20%",
        }}
      >
        Convert completed!
      </Text>
      <Button
        title="Go Back"
        style={{
          width: 200,
          marginTop: 50,}}
        onPress={() => {
          navigation.navigate("Playlists");
        }}
      />
    </View>
  );
};

export default ConvertScreen;
