import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, KeyboardAvoidingView } from "react-native";
import React from "react";
import { useAuthRequest, ResponseType } from "expo-auth-session";
import * as Google from "expo-auth-session/providers/google";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "@rneui/base";
import axios from "axios";
import { spotifyToken, youtubeTokenStore, spotifyPlaylists } from "../store/spotifySlice";
import { useCallback } from "react";

const discovery = {
  authorizationEndpoint: "https://accounts.spotify.com/authorize",
  tokenEndpoint: "https://accounts.spotify.com/api/token",
};

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [token, setToken] = useState("");
  const [youtubeToken, setYoutubeToken] = useState("");
  const [userInfo, setUserInfo] = useState(null);

  const [youtubeRequest, youtubeResponse, promptAsync2] = Google.useAuthRequest(
    {
      scopes: ["https://www.googleapis.com/auth/youtube"],
      androidClientId:
        "789188389856-qrdu3nv47n5p5c0r95egvuvq43378bob.apps.googleusercontent.com",
      iosClientId:
        "789188389856-c27rki6kcpp2qno9lpt3ec1u9hn06qsu.apps.googleusercontent.com",
      clientId:
        "789188389856-j73o46dmaqcp4fnuskf6jsbpi3ps67m0.apps.googleusercontent.com",
    }
  );

  const [request, spotifyResponse, promptAsync1] = useAuthRequest(
    {
      responseType: ResponseType.Token,
      clientId: "dc8ef814556f4350bcec9238c0ea7ffa",
      scopes: ["playlist-read-private"],
      // In order to follow the "Authorization Code Flow" to fetch token after authorizationEndpoint
      // this must be set to false
      usePKCE: false,
      redirectUri: "exp://localhost:19000/--/",
    },
    discovery
  );

  useEffect(() => {
    if (
      spotifyResponse?.type === "success" &&
      youtubeResponse?.type === "success"
    ) {
      setYoutubeToken(youtubeResponse.authentication.accessToken);
      setToken(spotifyResponse.params.access_token);

      // console.log("token", token);
      // console.log("youtube token", youtubeToken);
    }
  }, [youtubeResponse, spotifyResponse]);

  const getUserInfo = useCallback(async () => {
    //console.log("youtube token", youtubeToken);
    try {
      const response = await axios(
        "https://youtube.googleapis.com/youtube/v3/playlists?part=snippet&maxResults=25&mine=true",
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + youtubeToken,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      const { user } = response.data;
      //console.log("user", user.items[0].snippet.title);
      //setUserInfo(user);
    } catch (error) {
      console.log("error getUserYoutube Youtube", error.response.data);
    }
  }, [youtubeToken]);

  const getUserPlaylists = useCallback(async () => {
    try {
      const response = await axios(
        "https://api.spotify.com/v1/me/playlists?limit=50",
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.data) return;

      const { items } = response.data;
      //console.log(items);
      dispatch(spotifyToken(token));
      dispatch(spotifyPlaylists(items));
    } catch (error) {
      console.log("error", error.response.data);
    }
  }, [token]);

  useEffect(() => {
    if (!token || !youtubeToken) return;
    
    dispatch(youtubeTokenStore(youtubeToken));
    getUserInfo();
    getUserPlaylists();
    setTimeout(
      () =>
        navigation.navigate("Playlists", {
          token: token,
          other: "blaaa",
        }),
      500
    );

    // console.log("token", token);
    // console.log("access token", token);
  }, [token, youtubeToken, getUserInfo, getUserPlaylists]);

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <StatusBar style="light" />
      <Text
        style={{
          fontSize: 30,
          fontWeight: "bold",
          color: "white",
          marginBottom: "20%",
        }}
      >
        Playlist Converter
      </Text>
      <Button
        title="Login with Spotify"
        disabled={!request}
        style={styles.button}
        onPress={() => {
          promptAsync1();
        }}
      />
      <View style={{ height: 50 }} />
      <Button
        title="Login with Google"
        disabled={!youtubeRequest}
        style={styles.button}
        onPress={() => {
          promptAsync2();
        }}
      />
      
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
  },
  button: {
    width: 200,
    marginTop: 50,
  },
});
