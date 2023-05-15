import { View, Text, FlatList } from 'react-native';
import ExpenseItem from './ExpenseItem';

export default function ExpenseList({ expenses, period }) {
  if (expenses.length === 0) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-white text-lg font-semibold">
          No expenses in last {period} days
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={expenses}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ExpenseItem item={item} />}
      showsVerticalScrollIndicator={false}
    />
  );
}
