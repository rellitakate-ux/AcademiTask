import { useState } from "react";
import { View, Text, Pressable, ScrollView, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { s } from "../globalStyle";
import { SUBJECTS } from "../taskData";

import Header from "../components/Header";
import PrimaryButton from "../components/PrimaryButton";
import TaskRow from "../components/TaskRow";

export default function TasksScreen({ navigation, tasks, onToggle }) {
  const [subject, setSubject] = useState("All");
  const [earliest, setEarliest] = useState(true);

  // Filter and sort tasks
  const visible = tasks
    .filter((t) => subject === "All" || t.subject === subject)
    .sort((a, b) =>
      earliest
        ? a.deadline.localeCompare(b.deadline)
        : b.deadline.localeCompare(a.deadline),
    );

  return (
    <SafeAreaView style={s.page} edges={["top", "bottom"]}>
      <Header title="My Assignments" navigation={navigation} back />

      <View style={s.content}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ flexGrow: 0 }}
          contentContainerStyle={s.filters}
        >
          {["All", ...SUBJECTS].map((name) => (
            <Pressable
              key={name}
              style={[s.chip, subject === name && s.activeChip]}
              onPress={() => setSubject(name)}
            >
              <Text style={[s.chipText, subject === name && s.activeChipText]}>
                {name}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        <Pressable style={s.sortButton} onPress={() => setEarliest(!earliest)}>
          <Text style={s.sortText}>
            Deadline: {earliest ? "Earliest first ↑" : "Latest first ↓"}
          </Text>
        </Pressable>

        <FlatList
          data={visible}
          keyExtractor={(t) => t.id}
          renderItem={({ item }) => (
            <TaskRow task={item} navigation={navigation} onToggle={onToggle} />
          )}
          ListEmptyComponent={
            <Text style={s.muted}>No tasks in this subject yet.</Text>
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
