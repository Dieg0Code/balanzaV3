import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Navigation from './src/navigation/Navigation';
import { PaperProvider } from 'react-native-paper';

export default function App() {
  return (
    <Navigation />
  );
}
