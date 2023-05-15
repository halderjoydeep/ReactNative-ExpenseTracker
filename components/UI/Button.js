import { View, Text, Pressable } from 'react-native';

export default function Button({ children, style, classes, onPress }) {
  return (
    <View
      className={`rounded-3xl ${classes}`}
      style={[{ elevation: 4 }, style]}
    >
      <Pressable
        className="px-3 py-2"
        android_ripple={{ color: '#ccc', borderless: true }}
        onPress={onPress}
      >
        <View className="justify-center items-center">
          <Text className="text-base text-white text-center font-semibold">
            {children}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}
