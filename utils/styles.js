import { MD3DarkTheme as DefaultTheme }from 'react-native-paper'

export const colors = {
  color: '#2CABE0',
  primary: 'rgb(10, 132, 255)',
  background: 'rgb(1, 1, 1)',
  card: 'rgb(18, 18, 18)',
  text: 'rgb(229, 229, 231)',
  border: 'rgb(39, 39, 41)',
  notification: 'rgb(255, 69, 58)',
  secondary: "#00FF00",
  colorDark: '#00325D',
  colorAlt: '#914D00',
  colorLight: '#E6F4F1',
  colorGray: '#999a9c',
  darkGray: "#202020",
  error100: '#fcdcbf',
  error500: '#f37c13',
}

// DEFAULT LIGHT THEME
export const DefaultTheme_ = {
  dark: false,
  colors: {
    primary: 'rgb(0, 122, 255)',
    background: 'rgb(242, 242, 242)',
    card: 'rgb(255, 255, 255)',
    text: 'rgb(28, 28, 30)',
    border: 'rgb(216, 216, 216)',
    notification: 'rgb(255, 59, 48)',
  },
};

// DEFAULT DARK THEME
export const DarkTheme_ = {
  dark: true,
  colors: {
    primary: 'rgb(10, 132, 255)',
    background: 'rgb(1, 1, 1)',
    card: 'rgb(18, 18, 18)',
    text: 'rgb(229, 229, 231)',
    border: 'rgb(39, 39, 41)',
    notification: 'rgb(255, 69, 58)',
  },
};

export const LightTheme = {
  ...DefaultTheme,
  dark: false,
  roundness: 4,
  colors: {
    ...DefaultTheme.colors,
    primary: "#FF0000",
    primaryContainer: "#7FAF73",
    secondary: "#00FF00",
    secondaryContainer: "#FFFF00",
    tertiary: "#800080",
    tertiaryContainer: "#FFA500",
    surface: "#FFC0CB",
    surfaceVariant: "#008080",
    surfaceDisabled: "#808080",
    background: "#FFFFFF",
    error: "#A52A2A",
    errorContainer: "#808080",
    onPrimary: "#00FFFF",
    onPrimaryContainer: "#FFFFFF",
    onSecondary: "#00FF00",
    onSecondaryContainer: "#808000",
    onTertiary: "#800000",
    onTertiaryContainer: "#000080",
    onSurface: "#C0C0C0",
    onSurfaceVariant: "#FFD700",
    onSurfaceDisabled: "#808080",
    onError: "#4B0082",
    onErrorContainer: "#FF7F50",
    onBackground: "#F5F5DC",
    outline: "#CD853F",
    outlineVariant: "#708090",
    inverseSurface: "#7FFFD4",
    inverseOnSurface: "#BDB76B",
    inversePrimary: "#DA70D6",
    shadow: "#E6E6FA",
    scrim: "#D8BFD8",
    backdrop: "#808080",
  },
};

export const DarkTheme = {
  ...DefaultTheme,
  dark: true,
  roundness: 4,
  colors: {
    ...DefaultTheme.colors,
    primary: "rgb(53, 107, 0)",
    onPrimary: "rgb(255, 255, 255)",
    primaryContainer: "rgb(156, 250, 81)",
    "onPrimaryContainer": "rgb(12, 32, 0)",
    "secondary": "rgb(86, 98, 75)",
    "onSecondary": "rgb(255, 255, 255)",
    "secondaryContainer": "rgb(218, 231, 201)",
    "onSecondaryContainer": "rgb(20, 30, 12)",
    "tertiary": "rgb(56, 102, 101)",
    "onTertiary": "rgb(255, 255, 255)",
    "tertiaryContainer": "rgb(187, 236, 234)",
    "onTertiaryContainer": "rgb(0, 32, 31)",
    "error": "rgb(186, 26, 26)",
    "onError": "rgb(255, 255, 255)",
    "errorContainer": "rgb(255, 218, 214)",
    "onErrorContainer": "rgb(65, 0, 2)",
    "background": "rgb(253, 253, 245)",
    "onBackground": "rgb(26, 28, 24)",
    "surface": "rgb(253, 253, 245)",
    "onSurface": "rgb(26, 28, 24)",
    "surfaceVariant": "rgb(224, 228, 214)",
    "onSurfaceVariant": "rgb(68, 72, 62)",
    "outline": "rgb(116, 121, 109)",
    "outlineVariant": "rgb(196, 200, 186)",
    "shadow": "rgb(0, 0, 0)",
    "scrim": "rgb(0, 0, 0)",
    "inverseSurface": "rgb(47, 49, 44)",
    "inverseOnSurface": "rgb(241, 241, 234)",
    "inversePrimary": "rgb(129, 221, 54)",
    "elevation": {
    "level0": "transparent",
      "level1": "rgb(243, 246, 233)",
      "level2": "rgb(237, 241, 225)",
      "level3": "rgb(231, 237, 218)",
      "level4": "rgb(229, 236, 216)",
      "level5": "rgb(225, 233, 211)"
  },
  "surfaceDisabled": "rgba(26, 28, 24, 0.12)",
    "onSurfaceDisabled": "rgba(26, 28, 24, 0.38)",
    "backdrop": "rgba(45, 50, 40, 0.4)",
    "custom0": "rgb(135, 82, 0)",
    "onCustom0": "rgb(255, 255, 255)",
    "custom0Container": "rgb(255, 221, 186)",
    "onCustom0Container": "rgb(43, 23, 0)"
  }
}