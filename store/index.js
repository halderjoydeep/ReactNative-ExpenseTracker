import { configureStore } from '@reduxjs/toolkit';
import ExpenseReducer from './expenses-slice';

export default store = configureStore({
  reducer: {
    expenses: ExpenseReducer,
  },
});
