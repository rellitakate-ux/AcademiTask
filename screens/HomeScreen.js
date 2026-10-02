import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { s } from "../globalStyle";
import Header from "../components/Header";
import PrimaryButton from "../components/PrimaryButton";
import TaskRow from "../components/TaskRow";

export default function HomeScreen({ navigation, tasks, onToggle }) {
  const done = tasks.filter((t) => t.done).length;

  const upcoming = tasks
    .filter((t) => !t.done)
    .sort((a, b) => a.deadline.localeCompare(b.deadline))
    .slice(0, 3);

  return (
    <SafeAreaView style={s.page} edges={["top", "bottom"]}>
      <Header title="AcademiTask" />

      <ScrollView contentContainerStyle={s.content}>
        <Text style={s.hero}>Stay on top of your assignments.</Text>

        <Text style={s.subtitle}>
          Track deadlines and finish tasks one by one.
        </Text>

        <View style={s.stats}>
          <View style={s.stat}>
            <Text style={s.statNumber}>{tasks.length}</Text>
            <Text style={s.muted}>Total</Text>
          </View>

          <View style={s.stat}>
            <Text style={s.statNumber}>{tasks.length - done}</Text>
            <Text style={s.muted}>Pending</Text>
          </View>

          <View style={s.stat}>
            <Text style={s.statNumber}>{done}</Text>
            <Text style={s.muted}>Completed</Text>
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

        <Text style={s.sectionTitle}>Upcoming deadlines</Text>

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
          <Text style={s.muted}>Everything is complete. Great work!</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
