import { DefaultTheme } from '@react-navigation/native';
import { useColorScheme } from 'react-native';

const UNIVERSAL_COLORS = {
  ...DefaultTheme.colors,
  tabBarActiveTintColor: 'blue',
  tabBarInactiveTintColor: 'gray',
}

const Colors = {
  light: {
    background: "#f5f5f5",
    text: "#191919",
    primary: "#191919",
    borderColor: '#d9d9d9',
  },
  dark: {
    ...UNIVERSAL_COLORS,
    background: "black",
    text: "white",
    primary: "#f5f5f5",
    borderColor: '#ccc',
  },
}

const useThemeColors = () => {
  const colorScheme = useColorScheme()
  const colors = colorScheme ? Colors[colorScheme] : Colors.light;

  return colors;
}

export default useThemeColors