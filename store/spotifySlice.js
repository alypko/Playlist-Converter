import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
  youtubeToken: "",
  userId: "",
  playlists: [],
  tracks: [],
};

export const spotifySlice = createSlice({
  name: "spotify",
  initialState,
  reducers: {
    spotifyToken: (state, action) => {
      state.token = action.payload;
    },
    youtubeTokenStore: (state, action) => {
      state.youtubeToken = action.payload;
    },
    spotifyPlaylists: (state, action) => {
      state.playlists = action.payload;
    },
    spotifyTracks: (state, action) => {
      state.tracks = action.payload;
    },
  },
});

export const {
  spotifyToken,
  youtubeTokenStore,
  spotifyPlaylists,
  spotifyTracks,
} = spotifySlice.actions;

export default spotifySlice.reducer;
