import { useNavigation } from '@react-navigation/native';
import { View, Text, Pressable } from 'react-native';
import { getFormattedDate } from '../../utils/date';

export default function ExpenseItem({ item }) {
  const { id, title, price, date } = item;

  const navigation = useNavigation();

  return (
    <View className="my-3 bg-green-600 rounded-lg" style={{ elevation: 4 }}>
      <Pressable
        className="px-4 py-3"
        android_ripple={{ color: '#ccc', borderless: true }}
        onPress={() => navigation.navigate('ManageExpenseScreen', { id })}
      >
        <View className="flex-row justify-between items-center">
          <View>
            <Text className="text-white font-semibold">{title}</Text>
            <Text className="text-gray-700">
              {getFormattedDate(new Date(date))}
            </Text>
          </View>
          <Text className="text-lg text-white font-semibold">
            ₹{price.toFixed(2)}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}
