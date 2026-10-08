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
import { styles } from "../globalStyle";
import { SUBJECTS, dateAfter, validDate } from "../taskData";
import Header from "../components/Header";
import PrimaryButton from "../components/PrimaryButton";

export default function AddScreen({ navigation, onAdd }) {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState(SUBJECTS[0]);
  const [deadline, setDeadline] = useState(dateAfter(1));
  const [notes, setNotes] = useState("");

  // validate inputs and save assignments
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
    <SafeAreaView style={styles.page} edges={["top", "bottom"]}>
      <Header title="Add Assignment" navigation={navigation} back />

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.fieldLabel}>ASSIGNMENT TITLE</Text>

        <TextInput
          style={styles.input}
          placeholder="e.g. Finish React Native activity"
          value={title}
          onChangeText={setTitle}
        />

        <Text style={styles.fieldLabel}>SUBJECT</Text>

        <View style={styles.subjectGrid}>
          {SUBJECTS.map((item) => (
            <Pressable
              key={item}
              style={[styles.chip, subject === item && styles.activeChip]}
              onPress={() => setSubject(item)}
            >
              <Text
                style={[
                  styles.chipText,
                  subject === item && styles.activeChipText,
                ]}
              >
                {item}
              </Text>
            </Pressable>
          ))}
        </View>

        <Text style={styles.fieldLabel}>DEADLINE (YYYY-MM-DD)</Text>

        <TextInput
          style={styles.input}
          placeholder="2026-10-20"
          value={deadline}
          onChangeText={setDeadline}
          autoCapitalize="none"
        />

        <Text style={styles.fieldLabel}>NOTES (OPTIONAL)</Text>

        <TextInput
          style={[
            styles.input,
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
