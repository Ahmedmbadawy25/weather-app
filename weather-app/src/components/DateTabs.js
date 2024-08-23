import React from 'react';

const DateTabs = ({ dates, selectedDate, onSelectDate }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
        {dates.map((date) => (
            <div
                key={date}
                onClick={() => onSelectDate(date)}
                style={{
                    padding: '8px',
                    cursor: 'pointer',
                    position: 'relative',
                    backgroundColor: date === selectedDate ? 'lightgrey' : 'transparent',
                }}
                onMouseEnter={(e) => {
                    if (date !== selectedDate) {
                    e.target.style.backgroundColor = '#f5f5f5';
                    }
                }}
                onMouseLeave={(e) => {
                    if (date !== selectedDate) {
                    e.target.style.backgroundColor = 'transparent';
                    }
                }}
            >
                {new Date(date).toLocaleDateString()}
                <div
                    style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    height: date === selectedDate ? '3px' : '0px',
                    backgroundColor: date === selectedDate ? 'grey' : 'transparent',
                    }}
                />
            </div>
        ))}
    </div>
  );
};

export default DateTabs;