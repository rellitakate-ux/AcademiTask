import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { styles } from "../globalStyle";
import Header from "../components/Header";
import PrimaryButton from "../components/PrimaryButton";
import TaskRow from "../components/TaskRow";

export default function HomeScreen({ navigation, tasks, onToggle }) {
  const done = tasks.filter((t) => t.done).length;

  const upcoming = tasks
    .filter((task) => !task.done)
    .sort((taskA, taskB) => taskA.deadline.localeCompare(taskB.deadline))
    .slice(0, 3);

  return (
    <SafeAreaView style={styles.page} edges={["top", "bottom"]}>
      <Header title="AcademiTask" />

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.hero}>Plan Smarter, Study Better.</Text>

        <Text style={styles.subtitle}>
          Track deadlines and finish tasks one by one.
        </Text>

        <View style={styles.stats}>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>{tasks.length}</Text>
            <Text style={styles.muted}>Total</Text>
          </View>

          <View style={styles.stat}>
            <Text style={styles.statNumber}>{tasks.length - done}</Text>
            <Text style={styles.muted}>Pending</Text>
          </View>

          <View style={styles.stat}>
            <Text style={styles.statNumber}>{done}</Text>
            <Text style={styles.muted}>Completed</Text>
          </View>
        </View>

        <PrimaryButton
          label="+ Add Assignment"
          onPress={() => navigation.navigate("Add")}
        />

        <PrimaryButton
          label="View All Tasks"
          onPress={() => navigation.navigate("Tasks")}
        />

        <Text style={styles.sectionTitle}>Upcoming deadlines</Text>

        {upcoming.length ? (
          upcoming.map((task) => (
            <TaskRow
              key={task.id}
              task={task}
              navigation={navigation}
              onToggle={onToggle}
            />
          ))
        ) : (
          <Text style={styles.muted}>Everything is complete. Great work!</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
