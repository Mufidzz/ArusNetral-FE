import React from 'react';
import {KeyboardDatePicker} from '@material-ui/pickers';


const DatePicker = props => {
    const {selectedDate, setSelectedDate} = props;
    // const [selectedDate, setSelectedDate] = React.useState(new Date());

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    return (
        <KeyboardDatePicker
            placeholder="2018-10-10"
            value={selectedDate}
            onChange={date => handleDateChange(date)}
            format="yyyy-MM-dd"
        />
    )

}

export default DatePicker