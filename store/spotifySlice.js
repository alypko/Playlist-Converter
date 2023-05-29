import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
  userId: "",
  playlists: [],
};

export const spotifySlice = createSlice({
  name: "spotify",
  initialState,
  reducers: {
    spotifyToken: (state, action) => {
      state.token = action.payload;
    },
    spotifyUserId: (state, action) => {
      state.userId = action.payload;
    },
    spotifyPlaylists: (state, action) => {
      state.playlists = action.payload;
    },
  },
});

export const { spotifyToken, spotifyUserId, spotifyPlaylists } =
  spotifySlice.actions;

export default spotifySlice.reducer;
