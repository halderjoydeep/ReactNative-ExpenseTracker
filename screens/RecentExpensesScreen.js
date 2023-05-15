import { useEffect, useState } from 'react';
import { ExpenseOutput } from '../components';
import { fetchExpensesFromFirebase } from '../utils/http';
import { useDispatch } from 'react-redux';
import { setExpenses } from '../store/expenses-slice';

export default function RecentExpensesScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    async function setGlobalStore() {
      setIsLoading(true);
      try {
        const expenses = await fetchExpensesFromFirebase();
        dispatch(setExpenses(expenses));
      } catch (err) {
        setError("Couldn't fetch the expenses");
      }
      setIsLoading(false);
    }

    setGlobalStore();
  }, []);

  return <ExpenseOutput period={7} isLoading={isLoading} error={error} />;
}
