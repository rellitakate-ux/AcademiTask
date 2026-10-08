import { View, Text, Pressable } from "react-native";
import { styles } from "../globalStyle";

export default function Header({ title, navigation, back = false }) {
  return (
    <View style={styles.header}>
      {back && (
        <Pressable onPress={() => navigation.goBack()}>
          <Text style={styles.back}>‹ Back</Text>
        </Pressable>
      )}

      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
}
