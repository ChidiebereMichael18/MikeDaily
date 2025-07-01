import 'dotenv/config';

export default {
  expo: {
    name: "mikedaily",
    slug: "mikedaily",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "mikedaily",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
      supportsTablet: true
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff"
      },
      edgeToEdgeEnabled: true
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png"
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/splash-icon.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff"
        }
      ]
    ],
    experiments: {
      typedRoutes: true
    },
    extra: {
      gnewsApiKey: process.env.EXPO_PUBLIC_GNEWS_API_KEY,
      eas: {
        projectId: "4c6162bd-674e-4287-946c-f8bb9fa08ed0"
      }
    }
  }
};
