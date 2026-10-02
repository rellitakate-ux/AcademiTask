import { View, Text, Pressable, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { s } from "../globalStyle";
import Header from "../components/Header";
import PrimaryButton from "../components/PrimaryButton";

export default function DetailsScreen({
  navigation,
  route,
  tasks,
  onToggle,
  onDelete,
}) {
  const task = tasks.find((t) => t.id === route.params?.taskId);

  const handleDelete = () => {
    Alert.alert(
      "Delete Assignment",
      "Are you sure you want to delete this assignment?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            onDelete(task.id);
            navigation.goBack();
          },
        },
      ],
    );
  };
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
            <Pressable style={s.deleteButton} onPress={handleDelete}>
              <Text style={s.deleteButtonText}>Delete Assignment</Text>
            </Pressable>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}
