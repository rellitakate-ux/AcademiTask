import { View, Text, Pressable } from "react-native";
import { s } from "../globalStyle";

export default function TaskRow({ task, navigation, onToggle }) {
  return (
    <View style={s.taskRow}>
      <Pressable
        onPress={() => onToggle(task.id)}
        style={[s.circle, task.done && s.checked]}
      >
        <Text style={s.checkText}>{task.done ? "✓" : ""}</Text>
      </Pressable>

      <Pressable
        style={{ flex: 1 }}
        onPress={() =>
          navigation.navigate("Details", {
            taskId: task.id,
          })
        }
      >
        <Text style={[s.taskTitle, task.done && s.crossed]}>{task.title}</Text>

        <Text style={s.muted}>
          {task.subject} · Due {task.deadline}
        </Text>
      </Pressable>

      <Text style={s.arrow}>›</Text>
    </View>
  );
}
