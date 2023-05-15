import { Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import ExpenseSummary from './ExpenseSummary';
import ExpenseList from './ExpenseList';
import { GlobalStyles } from '../../constants/styles';

import Loading from '../UI/Loading';
import Button from '../UI/Button';
import Error from '../UI/Error';

export default function ExpenseOutput({ period, isLoading, error }) {
  const navigation = useNavigation();

  // Get expenses
  let expenses = useSelector((state) => state.expenses.expenses);

  // If period is mentioned then filter out the expenses
  if (period) {
    const periodDaysAgo = new Date(new Date().getTime() - period * 86400000); // 24 * 60 * 60 * 1000
    expenses = expenses.filter(
      (expense) => new Date(expense.date) >= periodDaysAgo
    );
  }

  let content = <ExpenseList expenses={expenses} period={period} />;

  if (error && !isLoading) {
    content = <Error message={error} />;
  }

  if (isLoading) {
    content = <Loading />;
  }

  return (
    <View className="flex-1 p-5">
      {/* Add Button */}
      <Button
        classes="my-2"
        style={{ backgroundColor: GlobalStyles.colors.primaryButton }}
        onPress={() => navigation.navigate('ManageExpenseScreen')}
      >
        Add new Expense
      </Button>
      <ExpenseSummary expenses={expenses} period={period} />

      {content}
    </View>
  );
}
