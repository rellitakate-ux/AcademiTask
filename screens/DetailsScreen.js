import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { s } from "../globalStyle";
import Header from "../components/Header";
import PrimaryButton from "../components/PrimaryButton";

export default function DetailsScreen({ navigation, route, tasks, onToggle }) {
  const task = tasks.find((t) => t.id === route.params?.taskId);

  return (
    <SafeAreaView style={s.page} edges={["top", "bottom"]}>
      <Header title="Assignment Details" navigation={navigation} back />

      <View style={s.content}>
        {!task ? (
          <Text>Task not found.</Text>
        ) : (
          <>
            <Text style={s.hero}>{task.title}</Text>

            <View style={s.detailCard}>
              <Text style={s.fieldLabel}>SUBJECT</Text>
              <Text style={s.fieldValue}>{task.subject}</Text>

              <Text style={s.fieldLabel}>DEADLINE</Text>
              <Text style={s.fieldValue}>{task.deadline}</Text>

              <Text style={s.fieldLabel}>NOTES</Text>
              <Text style={s.fieldValue}>
                {task.notes || "No notes added."}
              </Text>

              <Text style={s.fieldLabel}>STATUS</Text>
              <Text style={s.fieldValue}>
                {task.done ? "Completed" : "Pending"}
              </Text>
            </View>

            <PrimaryButton
              label={task.done ? "Mark as Pending" : "Mark as Completed"}
              onPress={() => onToggle(task.id)}
            />
          </>
        )}
      </View>
    </SafeAreaView>
  );
}
