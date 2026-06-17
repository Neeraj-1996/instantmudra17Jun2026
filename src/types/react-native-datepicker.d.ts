declare module 'react-native-datepicker' {
    import { Component } from 'react';
    import { ViewStyle, TextStyle } from 'react-native';

    interface DatePickerProps {
        style?: ViewStyle;
        date?: any;
        mode?: 'date' | 'time' | 'datetime';
        placeholder?: string;
        format?: string;
        minDate?: string;
        maxDate?: string;
        confirmBtnText?: string;
        cancelBtnText?: string;
        customStyles?: {
            dateIcon?: ViewStyle;
            dateInput?: ViewStyle;
            placeholderText?: TextStyle;
            dateText?: TextStyle;
        };
        onDateChange?: (date: string) => void;
    }

    export default class DatePicker extends Component<DatePickerProps> { }
}