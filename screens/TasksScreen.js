import { useState } from "react";
import { View, Text, Pressable, ScrollView, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../globalStyle";
import { SUBJECTS } from "../taskData";
import Header from "../components/Header";
import PrimaryButton from "../components/PrimaryButton";
import TaskRow from "../components/TaskRow";

export default function TasksScreen({ navigation, tasks, onToggle }) {
  const [subject, setSubject] = useState("All");
  const [earliest, setEarliest] = useState(true);

  // filter and sorting
  const visible = tasks
    .filter((task) => subject === "All" || task.subject === subject)
    .sort((taskA, taskB) =>
      earliest
        ? taskA.deadline.localeCompare(taskB.deadline)
        : taskB.deadline.localeCompare(taskA.deadline),
    );

  return (
    <SafeAreaView style={styles.page} edges={["top", "bottom"]}>
      <Header title="My Assignments" navigation={navigation} back />

      <View style={styles.content}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ flexGrow: 0 }}
          contentContainerStyle={styles.filters}
        >
          {["All", ...SUBJECTS].map((name) => (
            <Pressable
              key={name}
              style={[styles.chip, subject === name && styles.activeChip]}
              onPress={() => setSubject(name)}
            >
              <Text
                style={[
                  styles.chipText,
                  subject === name && styles.activeChipText,
                ]}
              >
                {name}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        <Pressable
          style={styles.sortButton}
          onPress={() => setEarliest(!earliest)}
        >
          <Text style={styles.sortText}>
            Deadline: {earliest ? "Earliest first ↑" : "Latest first ↓"}
          </Text>
        </Pressable>

        <FlatList
          data={visible}
          keyExtractor={(task) => task.id}
          renderItem={({ item }) => (
            <TaskRow task={item} navigation={navigation} onToggle={onToggle} />
          )}
          ListEmptyComponent={
            <Text style={styles.muted}>No tasks in this subject yet.</Text>
          }
        />

        <PrimaryButton
          label="+ Add Assignment"
          onPress={() => navigation.navigate("Add")}
        />
      </View>
    </SafeAreaView>
  );
}
