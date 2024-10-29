// components/Barcode.js
import React from 'react';
import styles from './Barcode.module.css';

const Barcode = ({ data }) => {
    // Genera un pattern realistico con barre molto sottili
    const generateBarcodePattern = (data) => {
        return data.split('').flatMap(char => {
            // Ogni carattere genera 3-5 barre per simulare un codice dettagliato
            const numBars = Math.floor(Math.random() * 3) + 3;  
            return Array.from({ length: numBars }, () => ({
                width: Math.random() > 0.5 ? 1 : 2,  // Larghezza sottile per ogni barra
                color: parseInt(char) % 2 === 0 ? '#000' : '#bbb',  // Alternanza tra barre scure e chiare
            }));
        });
    };

    const pattern = generateBarcodePattern(data);

    return (
        <svg
            className={styles.barcode}
            width={pattern.length * 4}  // Spazio totale esteso
            height="100"
            viewBox={`0 0 ${pattern.length * 2} 100`}
        >
            {pattern.map((bar, index) => (
                <rect
                    key={index}
                    x={index * 2}  // Distanza minima tra le barre
                    y="0"
                    width={bar.width}
                    height="100"  // Altezza fissa per le barre
                    fill={bar.color}
                />
            ))}
        </svg>
    );
};

export default Barcode;
