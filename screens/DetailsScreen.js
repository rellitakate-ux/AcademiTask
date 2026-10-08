import { View, Text, Pressable, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { styles } from "../globalStyle";
import Header from "../components/Header";
import PrimaryButton from "../components/PrimaryButton";

export default function DetailsScreen({
  navigation,
  route,
  tasks,
  onToggle,
  onDelete,
}) {
  const task = tasks.find((task) => task.id === route.params?.taskId);

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
    <SafeAreaView style={styles.page} edges={["top", "bottom"]}>
      <Header title="Assignment Details" navigation={navigation} back />

      <View style={styles.content}>
        {!task ? (
          <Text>Task not found.</Text>
        ) : (
          <>
            <Text style={styles.hero}>{task.title}</Text>

            <View style={styles.detailCard}>
              <Text style={styles.fieldLabel}>SUBJECT</Text>
              <Text style={styles.fieldValue}>{task.subject}</Text>

              <Text style={styles.fieldLabel}>DEADLINE</Text>
              <Text style={styles.fieldValue}>{task.deadline}</Text>

              <Text style={styles.fieldLabel}>NOTES</Text>
              <Text style={styles.fieldValue}>
                {task.notes || "No notes added."}
              </Text>

              <Text style={styles.fieldLabel}>STATUS</Text>
              <Text style={styles.fieldValue}>
                {task.done ? "Completed" : "Pending"}
              </Text>
            </View>

            <PrimaryButton
              label={task.done ? "Mark as Pending" : "Mark as Completed"}
              onPress={() => onToggle(task.id)}
            />
            <Pressable style={styles.deleteButton} onPress={handleDelete}>
              <Text style={styles.deleteButtonText}>Delete Assignment</Text>
            </Pressable>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}
