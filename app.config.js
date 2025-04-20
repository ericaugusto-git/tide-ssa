module.exports = {
  expo: {
    name: "tide-ssa",
    slug: "tide-ssa",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "myapp",
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
      "package": "com.yourcompany.tidessa",
      "versionCode": 1
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
      ],
      [
        "expo-location",
        {
          locationAlwaysAndWhenInUsePermission: "Permitir que o $(PRODUCT_NAME) use sua localização para mostrar o clima da sua região."
        }
      ]
    ],
    experiments: {
      typedRoutes: true
    },
    extra: {
      weatherApiKey: process.env.WEATHER_API_KEY,
      tideApiKey: process.env.TIDE_API_KEY
    }
  }
}; 