// components/Barcode.js
import React from 'react';
import styles from './Barcode.module.css';

const Barcode = ({ data }) => {
    const generateBarcodePattern = (data) => {
        return data.split('').map(char => parseInt(char) % 2);
    };

    const pattern = generateBarcodePattern(data);

    return (
        <svg
            className={styles.barcode}
            width={pattern.length * 10}
            height="100"
            viewBox={`0 0 ${pattern.length * 10} 100`}
        >
            {pattern.map((bit, index) => (
                <rect
                    key={index}
                    x={index * 10}
                    y={bit === 1 ? 0 : 20}
                    width="10"
                    height={bit === 1 ? 100 : 40}
                    fill={bit === 1 ? '#ccc' : 'white'}
                />
            ))}
        </svg>
    );
};

export default Barcode;
