import { useLayoutEffect } from 'react';
import { View } from 'react-native';
import { ExpenseForm } from '../components';
import { useSelector } from 'react-redux';

export default function ManageExpenseScreen({ route, navigation }) {
  const id = route.params?.id;

  let expense;
  if (id) {
    expense = useSelector((state) =>
      state.expenses.expenses.find((expense) => expense.id === id)
    );
  }

  // Setting the header title based on route parameters
  useLayoutEffect(() => {
    navigation.setOptions({ title: id ? 'Edit expense' : 'Add New Expense' });
  }, [navigation, id]);

  return (
    <View className="flex-1 p-5">
      <ExpenseForm id={id} defaultValues={expense} />
    </View>
  );
}
