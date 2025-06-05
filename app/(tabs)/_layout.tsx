import { Tabs } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { PuffProvider } from "../puffcontext";
import { ConnectionProvider } from "../../components/ConnectionProvider";

export default function Layout() {
  return (
    <ConnectionProvider>
      <PuffProvider>
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: "#29A86E",
            tabBarInactiveTintColor: "#B3B3B3",
            headerShown: false,
            tabBarLabelPosition: "below-icon",
            tabBarStyle: {
              backgroundColor: "#fff",
              height: 72,
              borderTopWidth: 0,
              elevation: 8,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: -3 },
              shadowOpacity: 0.05,
              shadowRadius: 4,
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              overflow: "hidden",
            },
            tabBarLabelStyle: {
              fontSize: 12,
              marginBottom: 8,
            },
            tabBarItemStyle: {
              paddingTop: 10,
            },
          }}
        >
          <Tabs.Screen
            name="home"
            options={{
              title: "Home",
              tabBarIcon: ({ color, size }) => (
                <FontAwesome name="home" size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="tracker"
            options={{
              title: "Tracker",
              tabBarIcon: ({ color, size }) => (
                <FontAwesome name="cog" size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="stats"
            options={{
              title: "Stats",
              tabBarIcon: ({ color, size }) => (
                <FontAwesome name="bar-chart" size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="leaderboard"
            options={{
              title: "Leaderboard",
              tabBarIcon: ({ color, size }) => (
                <FontAwesome name="trophy" size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="profile"
            options={{
              title: "Profiel",
              tabBarIcon: ({ color, size }) => (
                <FontAwesome name="user" size={size} color={color} />
              ),
            }}
          />
        </Tabs>
      </PuffProvider>
    </ConnectionProvider>
  );
}
