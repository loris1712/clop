// components/Barcode.js
import React, { useMemo } from 'react';
import styles from './Barcode.module.css';

const Barcode = ({ data }) => {
    // Genera il pattern una sola volta e lo memorizza in `useMemo`
    const pattern = useMemo(() => {
        return data.split('').flatMap(char => {
            // Ogni carattere genera 3-5 barre per simulare un codice dettagliato
            const numBars = Math.floor(Math.random() * 3) + 3;  
            return Array.from({ length: numBars }, () => ({
                width: Math.random() > 0.5 ? 1 : 2,  // Larghezza sottile per ogni barra
                color: parseInt(char) % 2 === 0 ? '#000' : '#bbb',  // Alternanza tra barre scure e chiare
            }));
        });
    }, [data]); // `pattern` sarà generato una sola volta a meno che `data` cambi

    return (
        <svg
            className={styles.barcode}
            width="200"  
            height="80"
            viewBox={`0 0 240 100`}
        >
            {pattern.map((bar, index) => (
                <rect
                    key={index}
                    x={index * 4}  // Maggior distanza tra le barre
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
