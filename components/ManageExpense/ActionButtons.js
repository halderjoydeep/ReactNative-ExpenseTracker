import { useState } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { removeFromExpenses } from '../../store/expenses-slice';

import { deleteExpenseFromFirebase } from '../../utils/http';
import { GlobalStyles } from '../../constants/styles';
import Loading from '../UI/Loading';
import Button from '../UI/Button';
import Error from '../UI/Error';

export default function ActionButtons({ id, onSubmit }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  async function deleteExpense() {
    setIsLoading(true);
    try {
      await deleteExpenseFromFirebase(id);
      dispatch(removeFromExpenses({ id }));
      navigation.goBack();
    } catch (err) {
      setError("Couldn't delete the expense");
    }

    setIsLoading(false);
  }

  if (error && !isLoading) {
    return <Error message={error} onConfirm={() => navigation.goBack()} />;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View className="w-full my-3 flex-row justify-center items-center">
      {/* Delete Button */}
      {id && (
        <Button
          style={{ backgroundColor: GlobalStyles.colors.secondaryButton }}
          classes="w-28 mx-2"
          onPress={deleteExpense}
        >
          Delete
        </Button>
      )}
      {/* Upodate or Add button  */}
      <Button
        style={{ backgroundColor: GlobalStyles.colors.primaryButton }}
        classes="w-28 mx-2"
        onPress={onSubmit}
      >
        {id ? 'Update' : 'Add'}
      </Button>
    </View>
  );
}
