import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/TabScreen/HomeScreen';
import ListScreen from '../screens/TabScreen/ListScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Text} from 'react-native';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'List') {
            iconName = focused ? 'list' : 'list-outline';
          }

          return (
            <>
              <Ionicons
                name={iconName ?? 'default-icon'}
                size={size}
                color={color}
              />
              <Text>{route.name === 'Home' ? 'Home' : 'List'}</Text>
            </>
          );
        },
        tabBarActiveTintColor: '#3E7C17',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
        tabBarLabel: () => null,
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="List" component={ListScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
