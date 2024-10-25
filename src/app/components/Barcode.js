// components/Barcode.js
import React from 'react';
import styles from './Barcode.module.css';

const Barcode = ({ data }) => {
    // Funzione per generare la rappresentazione binaria del codice a barre
    const generateBarcodePattern = (data) => {
        // Convertiamo i caratteri in un pattern binario semplice
        return data.split('').map(char => parseInt(char) % 2); // Ogni cifra genera 1 o 0
    };

    const pattern = generateBarcodePattern(data);

    return (
        <svg
            className={styles.barcode}
            width={pattern.length * 10} // Larghezza in base al numero di barre
            height="100"
            viewBox={`0 0 ${pattern.length * 10} 100`}
        >
            {pattern.map((bit, index) => (
                <rect
                    key={index}
                    x={index * 10}
                    y={bit === 1 ? 0 : 20} // Sposta verso il basso se è uno spazio
                    width="10"
                    height={bit === 1 ? 100 : 40} // Altezza barra nera o spazio
                    fill={bit === 1 ? '#ccc' : 'white'}
                />
            ))}
        </svg>
    );
};

export default Barcode;
