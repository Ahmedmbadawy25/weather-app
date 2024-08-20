import React from 'react';

const DateTabs = ({ dates, selectedDate, onSelectDate }) => {
  return (
    <div>
      {dates.map((date) => (
        <button
          key={date}
          onClick={() => onSelectDate(date)}
          style={{ fontWeight: date === selectedDate ? 'bold' : 'normal' }}
        >
          {new Date(date).toLocaleDateString()}
        </button>
      ))}
    </div>
  );
};

export default DateTabs;