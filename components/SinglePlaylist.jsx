import { Text, View } from "react-native";
import { Button } from "@rneui/themed";
import styled from "styled-components";
import { Separator } from "./Separator";
import DialogInput from "react-native-dialog-input";
import { useState } from "react";

const SinglePlaylistView = styled.KeyboardAvoidingView`
  flex-direction: column;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
`;

const SinglePlaylistImage = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 10px;
  margin-horizontal: 10px;
`;

const SinglePlaylistTitle = styled.Text`
  font-size: 20px;
  align-self: center;
  color: white;
`;

const SinglePlaylistInfo = styled.View`
  flex-direction: row;
  padding-bottom: 10px;
  margin-vertical: 5px;
`;

export const SinglePlaylist = ({
  stateChanger,
  title,
  imageUrl,
  totalSongs,
}) => {
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  return (
    <SinglePlaylistView>
      <SinglePlaylistTitle>Convert Playlist</SinglePlaylistTitle>
      <Separator />
      <SinglePlaylistInfo>
        <SinglePlaylistImage source={{ uri: imageUrl }} />
        <View style={{ flex: 1 }}>
          <Text style={{ color: "white", fontSize: 20 }}>{newTitle} </Text>
          <Text style={{ color: "white" }}>{totalSongs} songs</Text>
        </View>
      </SinglePlaylistInfo>
      <Button
        title="Rename Playlist"
        buttonStyle={{
          borderWidth: 1,
          borderRadius: 12,
          borderColor: "rgba(255, 255, 255, 0.5)",
        }}
        onPress={() =>{
          setIsDialogVisible(true);
        }}
      />
      <DialogInput isDialogVisible={isDialogVisible} title={"Change Playlist Name"}
        message={"Enter new name:"}
        initValueTextInput={newTitle}
        dialogStyle ={{backgroundColor: "rgba(52,52,52,255)"}}
        modalStyle = {{backgroundColor: "rgba(0, 0, 0, 0.6)"}}
        submitInput = {(inputText) =>{
          if(!inputText) return;
          setNewTitle(inputText);
          stateChanger(inputText); 
          setIsDialogVisible(false);
        }}
        closeDialog = {() => setIsDialogVisible(false)}>
      </DialogInput>
    </SinglePlaylistView>
  );
};
