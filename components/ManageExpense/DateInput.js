import { View, Text, Pressable } from 'react-native';
import { getFormattedDate } from '../../utils/date';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';

export default function DateInput({ onChange, date }) {
  function showDatePicker() {
    DateTimePickerAndroid.open({
      value: date,
      mode: 'date',
      onChange: (_, selectedDate) => onChange(selectedDate),
    });
  }

  return (
    <View>
      <Text className="text-white font-semibold">Date</Text>
      <View className="mt-2 bg-green-100 rounded-xl" style={{ elevation: 4 }}>
        <Pressable
          className="p-3"
          android_ripple={{ color: '#ccc', borderless: true }}
          onPress={showDatePicker}
        >
          <Text>{getFormattedDate(date)}</Text>
        </Pressable>
      </View>
    </View>
  );
}
