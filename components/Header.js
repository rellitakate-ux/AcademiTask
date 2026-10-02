import { View, Text, Pressable } from "react-native";
import { s } from "../globalStyle";

export default function Header({ title, navigation, back = false }) {
  return (
    <View style={s.header}>
      {back && (
        <Pressable onPress={() => navigation.goBack()}>
          <Text style={s.back}>‹ Back</Text>
        </Pressable>
      )}

      <Text style={s.headerTitle}>{title}</Text>
    </View>
  );
}
