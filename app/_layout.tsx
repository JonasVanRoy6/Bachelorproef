import { Tabs } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { PuffProvider } from './screens/PuffContext';
import StatsScreen from './screens/StatsScreen';  // Voeg deze import toe

export default function Layout() {
  return (
    <PuffProvider>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#29A86E",
          tabBarInactiveTintColor: "#999",
          tabBarStyle: { backgroundColor: "#fff", height: 60 },
        }}
      >
        {/* Home Tab */}
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="home" size={size} color={color} />
            ),
          }}
        />

        {/* Profiel Tab */}
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profiel",
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="user" size={size} color={color} />
            ),
          }}
        />

        {/* Tracker Tab */}
        <Tabs.Screen
          name="TrackerScreen"
          options={{
            title: "Tracker",
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="cog" size={size} color={color} />
            ),
          }}
        />

        {/* Stats Tab */}
        <Tabs.Screen
          name="StatsScreen"  // Voeg deze regel toe
          options={{
            title: "Stats",
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="bar-chart" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </PuffProvider>
  );
}
