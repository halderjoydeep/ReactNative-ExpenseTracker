import { createSlice } from '@reduxjs/toolkit';

function comparator(a, b) {
  return new Date(b.date) - new Date(a.date);
}

function sortExpenses(state) {
  state.expenses.sort(comparator);
}

const expensesSlice = createSlice({
  name: 'expenses',
  initialState: {
    expenses: [],
  },
  reducers: {
    setExpenses: (state, action) => {
      state.expenses = action.payload;
      sortExpenses(state);
    },
    addToExpenses: (state, action) => {
      state.expenses.push(action.payload);
      sortExpenses(state);
    },

    updateInExpenses: (state, action) => {
      const index = state.expenses.findIndex(
        (expense) => expense.id === action.payload.id
      );

      state.expenses[index] = action.payload;
      sortExpenses(state);
    },

    removeFromExpenses: (state, action) => {
      const index = state.expenses.findIndex(
        (expense) => expense.id === action.payload.id
      );

      state.expenses.splice(index, 1);
    },
  },
});

export const {
  setExpenses,
  addToExpenses,
  removeFromExpenses,
  updateInExpenses,
} = expensesSlice.actions;

export default expensesSlice.reducer;
