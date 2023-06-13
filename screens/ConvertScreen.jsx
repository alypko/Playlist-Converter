import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { useSelector } from "react-redux";

const ConvertScreen = ({route}) => {
  const { title } = route.params;
  const tracks = useSelector((state) => state.spotify.tracks);
  const youtubeToken = useSelector((state) => state.spotify.youtubeToken);

  const [youtubePlaylistId, setYoutubePlaylistId] = useState("");
  const [youtubeyVideoId, setyoutubeyVideoId] = useState([]);
  // console.log(tracks);
  // console.log(youtubeToken);

  const createYoutubePLaylist = useCallback(async () =>{
    try {
      const res = await axios("https://youtube.googleapis.com/youtube/v3/playlists?part=snippet",{
        method: "POST",
        data: {
          snippet: {
            title: `${title}`,
          }
        },
        headers: {
          Authorization: "Bearer " + youtubeToken,
          Accept: "application/json",
          "Content-Type": "application/json",
        }
      });

      if (res.status === 200) setYoutubePlaylistId(res.data.id);
      
    } catch (error) {
      console.log("error", error.response.data);
    }
  }, [youtubeToken]);

  useEffect(() => {
    createYoutubePLaylist();
  }, [createYoutubePLaylist])


  const searchSong = useCallback( async () => {
    const videosID = [];
    for(let track of tracks){
      try {
        const res = await axios(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${track}`,{
          method: "GET",
          headers: {
            Authorization: "Bearer " + youtubeToken,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      if (res.status === 200) videosID.push(res.data.items[0].id.videoId);
        
      } catch (error) {
        console.log("Search error", error.response.data);
      }
    }
    console.log(videosID);
    setyoutubeyVideoId(videosID);

  }, [youtubeToken]);

  
  useEffect(() => {
    searchSong();
  },[searchSong]);
  return (
    <View>
      <Text style={{ backgroundColor: "white" }}>CONVERT SCREEN</Text>
    </View>
  );
};

export default ConvertScreen;
