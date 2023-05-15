import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { Provider } from 'react-redux';

import store from './store';

import {
  AllExpensesScreen,
  ManageExpenseScreen,
  RecentExpensesScreen,
} from './screens';
import { GlobalStyles } from './constants/styles';

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

function BottomTabComponent() {
  return (
    <BottomTab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: GlobalStyles.colors.darkGreen },
        headerTintColor: 'white',
        headerTitleAlign: 'center',
        headerShadowVisible: false,
        tabBarStyle: {
          backgroundColor: GlobalStyles.colors.darkGreen,
          borderTopWidth: 0,
        },
        tabBarActiveTintColor: GlobalStyles.colors.lightGreen,
        tabBarInactiveTintColor: 'white',
      }}
      sceneContainerStyle={{ backgroundColor: GlobalStyles.colors.darkGray }}
    >
      <BottomTab.Screen
        name="RecentExpenses"
        component={RecentExpensesScreen}
        options={{
          title: 'Recent Expenses',
          tabBarLabel: 'Recent',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="time-outline" size={size} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="AllExpenses"
        component={AllExpensesScreen}
        options={{
          title: 'All Expenses',
          tabBarLabel: 'All',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cash-outline" size={size} color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: GlobalStyles.colors.darkGreen },
              headerTintColor: 'white',
              headerTitleAlign: 'center',
              headerShadowVisible: false,
              contentStyle: { backgroundColor: GlobalStyles.colors.darkGray },
            }}
          >
            <Stack.Screen
              name="BottomTab"
              component={BottomTabComponent}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="ManageExpenseScreen"
              component={ManageExpenseScreen}
              options={{
                presentation: 'modal',
                animation: 'slide_from_bottom',
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </>
  );
}
