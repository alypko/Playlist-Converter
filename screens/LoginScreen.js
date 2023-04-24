import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, KeyboardAvoidingView } from 'react-native';
import React from 'react';
import { useAuthRequest, ResponseType } from 'expo-auth-session';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Image } from '@rneui/base';
import axios from 'axios';

const discovery = {
    authorizationEndpoint: 'https://accounts.spotify.com/authorize',
    tokenEndpoint: 'https://accounts.spotify.com/api/token',
};


const LoginScreen = () => {

    const [token, setToken] = useState("");
    const [request, response, promptAsync] = 
    useAuthRequest(
    {
        responseType: ResponseType.Token,
        clientId: 'dc8ef814556f4350bcec9238c0ea7ffa',
        scopes: [
            "playlist-read-private",
            "playlist-read-collaborative",
            "user-top-read",
            "user-library-read",
            "user-modify-playback-state",
            "user-read-email",
            "user-read-private",
        ],
        // In order to follow the "Authorization Code Flow" to fetch token after authorizationEndpoint
        // this must be set to false
        usePKCE: false,
        redirectUri: "exp://localhost:19000/--/",
        },
        discovery
    );

    useEffect(() => {
        if(response?.type === 'success') {
        const { access_token } = response.params;
        setToken(access_token);
        //console.log(access_token);
        }
    }, [response]);

    useEffect(() => {
        if(token) {
            axios(
                "https://api.spotify.com/v1/me", {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + token,
                },
        })
        .then((response) => { 
            const { id } = response.data;
            console.log(id)
        })
        .catch((error) => { 
            console.log("error", error); 
        });
    }
    });




    return (
        <KeyboardAvoidingView behavior="padding" 
        style={styles.container}>
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
            style={styles.button}
            onPress={() => {
            promptAsync();
            }}
        />
        <View style={{ height: 100 }} />
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
