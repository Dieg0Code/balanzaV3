import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import MainScreen from '../screens/MainScreen'
import AddProductScreens from '../screens/AddProductScreens'
import { NavigationContainer } from '@react-navigation/native'
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createMaterialBottomTabNavigator()

const Navigation = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator

                initialRouteName="Main"
                activeColor='#121212'
                inactiveColor='#CCCCCC'
                barStyle={
                    {
                        backgroundColor: '#121212',
                    }
                }

            >
                <Tab.Screen
                    name="Main"
                    component={MainScreen}
                    options={{
                        tabBarLabel: 'Productos',
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons name="view-list" color={color} size={26} />
                        ),
                    }}

                />
                <Tab.Screen
                    name='AddProduct'
                    component={AddProductScreens}
                    options={{
                        tabBarLabel: 'Agregar Producto',
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons name="plus" color={color} size={26} />
                        ),
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    )

}

export default Navigation