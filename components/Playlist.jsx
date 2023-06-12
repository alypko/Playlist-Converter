import styled from "styled-components";

const PlaylistView = styled.KeyboardAvoidingView`
  padding: 15px;
  flex-direction: row;
`;

const PlaylistImage = styled.Image`
  width: 60px;
  height: 60px;
  margin-right: 12px;
  border-radius: 12px;
`;

const PlaylistSongs = styled.Text`
  font-size: 14px;
  margin-top: 2px;
  color: rgba(255, 255, 255, 0.5);
`;

const PlaylistDetails = styled.View`
  flex: 1;
  justify-content: center;
`;

const PLaylistTitle = styled.Text`
  font-size: 18px;
  font-weight: 700;
  color: white;
`;

export const Playlist = ({ title, imageUrl, totalSongs }) => {
  return (
    <PlaylistView>
      <PlaylistImage source={{ uri: imageUrl }} />
      <PlaylistDetails>
        <PLaylistTitle>{title}</PLaylistTitle>
        <PlaylistSongs>{totalSongs} songs</PlaylistSongs>
      </PlaylistDetails>
    </PlaylistView>
  );
};
