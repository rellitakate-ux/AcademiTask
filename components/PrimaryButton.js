import { Pressable, Text } from "react-native";
import { s } from "../globalStyle";

export default function PrimaryButton({ label, onPress }) {
  return (
    <Pressable style={s.primaryButton} onPress={onPress}>
      <Text style={s.primaryText}>{label}</Text>
    </Pressable>
  );
}
