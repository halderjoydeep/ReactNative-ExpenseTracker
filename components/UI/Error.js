import { View, Text } from 'react-native';
import Button from './Button';
import { GlobalStyles } from '../../constants/styles';

export default function Error({ message, onConfirm }) {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-white text-lg font-semibold">
        Something Wrong Happened!
      </Text>
      <Text className="text-gray-400">{message}</Text>
      {onConfirm && (
        <Button
          onPress={onConfirm}
          classes="w-28 mt-4"
          style={{ backgroundColor: GlobalStyles.colors.secondaryButton }}
        >
          Okay
        </Button>
      )}
    </View>
  );
}
