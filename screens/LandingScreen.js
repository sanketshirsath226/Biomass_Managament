import {Platform, SafeAreaView, StatusBar, Text, View, StyleSheet, Image, TextBase} from 'react-native';
const Landing_Page = require('../assets/images/welcome-img.png')
export default function LandingScreen() {
  return (
      <View className={'flex-1 relative'}>
      <StatusBar style={'light'} />
      <SafeAreaView className="">
        <View className={'flex flex-col items-center'}>
            <Image source={Landing_Page} className={'object-cover'}>
            </Image>
            <Text className={'text-black text-3xl leading-normal font-semibold   w-3/4 text-center'}>
                Discover Your
                Biomass waste here
            </Text>
        </View>
      </SafeAreaView>
    </View>
  );
}
const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 10,
  },
});
