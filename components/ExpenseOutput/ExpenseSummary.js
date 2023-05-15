import { View, Text } from 'react-native';

export default function ExpenseSummary({ period, expenses }) {
  // Calculate total expenses
  const totalExpense = expenses.reduce(
    (total, expense) => total + expense.price,
    0
  );

  return (
    <View
      className="flex-row justify-between items-center px-4 py-2 my-6 bg-white rounded-lg"
      style={{ elevation: 4 }}
    >
      <Text className="font-bold">
        Total expense {period ? `in last ${period} days` : 'all time'} :
      </Text>
      <Text className="font-bold text-lg">₹{totalExpense.toFixed(2)}</Text>
    </View>
  );
}
