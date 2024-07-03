import { useState, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  TextInput,
} from "react-native";
import {
  createDB,
  insert,
  select,
  deleteDB,
  updateDB,
  checkExistsDB,
} from "../DB/DBusers";

export default function ScreenComments() {
  const [text, setText] = useState("");

  return (
    <View style={{ flex: 1 }}>
      <StatusBar />
      <TextInput onChangeText={setText}> {text}</TextInput> />
      <Text>ScreenComments</Text>
    </View>
  );
}
