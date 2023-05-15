import { useState } from 'react';
import { View, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { addToExpenses, updateInExpenses } from '../../store/expenses-slice';

import {
  storeExpenseToFirebase,
  updateExpenseInFirebase,
} from '../../utils/http';
import ActionButtons from './ActionButtons';
import Input from './Input';
import DateInput from './DateInput';
import Loading from '../UI/Loading';
import Error from '../UI/Error';

export default function ExpenseForm({ id, defaultValues }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [inputValues, setInputValues] = useState({
    title: defaultValues ? defaultValues.title : '',
    price: defaultValues ? defaultValues.price.toString() : '',
    date: defaultValues ? new Date(defaultValues.date) : new Date(),
  });

  const dispatch = useDispatch();
  const navigation = useNavigation();

  function inputValuesHandler(inputIdentifier, value) {
    setInputValues((prev) => ({
      ...prev,
      [inputIdentifier]: value,
    }));
  }

  async function submitHandler() {
    // Check validity
    if (inputValues.title.trim() === '' || inputValues.price.trim() === '') {
      Alert.alert('Inputs Missing', 'Please fill all fields', [
        { text: 'ok', style: 'destructive' },
      ]);
      return;
    }

    if (isNaN(+inputValues.price) || +inputValues.price <= 0) {
      Alert.alert('Invalid Price', 'Price should be valid number', [
        { text: 'ok', style: 'destructive' },
      ]);
      return;
    }

    const expense = {
      title: inputValues.title,
      price: +inputValues.price,
      date: inputValues.date.toISOString(),
    };

    setIsLoading(true);

    if (id) {
      // Update the expense
      try {
        await updateExpenseInFirebase(id, expense);
        dispatch(updateInExpenses({ ...expense, id }));
        navigation.goBack();
      } catch (err) {
        setError("Couldn't update the expense");
      }
    } else {
      // Add the expense
      try {
        const expenseId = await storeExpenseToFirebase(expense);
        dispatch(addToExpenses({ ...expense, id: expenseId }));
        navigation.goBack();
      } catch (err) {
        setError("Couldn't add the expense");
      }
      // Add the expense to global store
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
    <View className="flex-1 p-5">
      {/* Input Card */}
      <View className="my-4 p-5 bg-gray-600 rounded-lg">
        {/* Title */}
        <Input
          label="Title"
          textInputConfig={{
            value: inputValues.title,
            onChangeText: inputValuesHandler.bind(this, 'title'),
          }}
        />

        {/* Price */}
        <Input
          label="Price"
          textInputConfig={{
            value: inputValues.price,
            onChangeText: inputValuesHandler.bind(this, 'price'),
            keyboardType: 'number-pad',
          }}
        />

        {/* Date Picker */}
        <DateInput
          onChange={inputValuesHandler.bind(this, 'date')}
          date={inputValues.date}
        />
      </View>

      {/* Buttons */}
      <ActionButtons id={id} onSubmit={submitHandler} />
    </View>
  );
}
