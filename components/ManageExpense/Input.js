import { View, Text, TextInput } from 'react-native';

export default function Input({ label, textInputConfig }) {
  return (
    <View className="mb-5" style={{ elevation: 4 }}>
      <Text className="text-white font-semibold">{label}</Text>
      <TextInput
        {...textInputConfig}
        className="mt-2 bg-green-100 rounded-xl px-3 py-2"
      />
    </View>
  );
}
