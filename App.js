import { useState } from "react";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { sampleTasks } from "./taskData";
import HomeScreen from "./screens/HomeScreen";
import TasksScreen from "./screens/TasksScreen";
import AddScreen from "./screens/AddScreen";
import DetailsScreen from "./screens/DetailsScreen";

const Stack = createNativeStackNavigator();

// main app component
export default function App() {
  const [tasks, setTasks] = useState(sampleTasks);
  const toggle = (id) => {
    setTasks((old) =>
      old.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task,
      ),
    );
  };
  const add = (task) => {
    setTasks((old) => [task, ...old]);
  };
  const deleteTask = (id) => {
    setTasks((old) => old.filter((task) => task.id !== id));
  };

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" backgroundColor="#182C4D" />

      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home">
            {(props) => (
              <HomeScreen {...props} tasks={tasks} onToggle={toggle} />
            )}
          </Stack.Screen>

          <Stack.Screen name="Tasks">
            {(props) => (
              <TasksScreen {...props} tasks={tasks} onToggle={toggle} />
            )}
          </Stack.Screen>

          <Stack.Screen name="Details">
            {(props) => (
              <DetailsScreen
                {...props}
                tasks={tasks}
                onToggle={toggle}
                onDelete={deleteTask}
              />
            )}
          </Stack.Screen>

          <Stack.Screen name="Add">
            {(props) => <AddScreen {...props} onAdd={add} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
