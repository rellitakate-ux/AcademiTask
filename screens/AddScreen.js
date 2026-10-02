import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Pressable,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { s } from "../globalStyle";
import { SUBJECTS, dateAfter, validDate } from "../taskData";

import Header from "../components/Header";
import PrimaryButton from "../components/PrimaryButton";

export default function AddScreen({ navigation, onAdd }) {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState(SUBJECTS[0]);
  const [deadline, setDeadline] = useState(dateAfter(1));
  const [notes, setNotes] = useState("");

  // Validate inputs and save assignment
  const save = () => {
    if (!title.trim()) {
      return Alert.alert("Missing title", "Enter an assignment title.");
    }

    if (!validDate(deadline)) {
      return Alert.alert(
        "Invalid deadline",
        "Use YYYY-MM-DD, such as 2026-10-20.",
      );
    }

    onAdd({
      id: String(Date.now()),
      title: title.trim(),
      subject,
      deadline,
      notes: notes.trim(),
      done: false,
    });

    navigation.navigate("Tasks");
  };

  return (
    <SafeAreaView style={s.page} edges={["top", "bottom"]}>
      <Header title="Add Assignment" navigation={navigation} back />

      <ScrollView contentContainerStyle={s.content}>
        <Text style={s.fieldLabel}>ASSIGNMENT TITLE</Text>

        <TextInput
          style={s.input}
          placeholder="e.g. Finish React Native activity"
          value={title}
          onChangeText={setTitle}
        />

        <Text style={s.fieldLabel}>SUBJECT</Text>

        <View style={s.subjectGrid}>
          {SUBJECTS.map((item) => (
            <Pressable
              key={item}
              style={[s.chip, subject === item && s.activeChip]}
              onPress={() => setSubject(item)}
            >
              <Text style={[s.chipText, subject === item && s.activeChipText]}>
                {item}
              </Text>
            </Pressable>
          ))}
        </View>

        <Text style={s.fieldLabel}>DEADLINE (YYYY-MM-DD)</Text>

        <TextInput
          style={s.input}
          placeholder="2026-10-20"
          value={deadline}
          onChangeText={setDeadline}
          autoCapitalize="none"
        />

        <Text style={s.fieldLabel}>NOTES (OPTIONAL)</Text>

        <TextInput
          style={[
            s.input,
            {
              minHeight: 105,
              textAlignVertical: "top",
            },
          ]}
          placeholder="Details about the task"
          value={notes}
          onChangeText={setNotes}
          multiline
        />

        <PrimaryButton label="Save Assignment" onPress={save} />
      </ScrollView>
    </SafeAreaView>
  );
}
