import { View, Text, Pressable } from "react-native";
import { styles } from "../globalStyle";

export default function TaskRow({ task, navigation, onToggle }) {
  return (
    <View style={styles.taskRow}>
      <Pressable
        onPress={() => onToggle(task.id)}
        style={[styles.circle, task.done && styles.checked]}
      >
        <Text style={styles.checkText}>{task.done ? "✓" : ""}</Text>
      </Pressable>

      <Pressable
        style={{ flex: 1 }}
        onPress={() =>
          navigation.navigate("Details", {
            taskId: task.id,
          })
        }
      >
        <Text style={[styles.taskTitle, task.done && styles.crossed]}>
          {task.title}
        </Text>

        <Text style={styles.muted}>
          {task.subject} · Due {task.deadline}
        </Text>
      </Pressable>
    </View>
  );
}
