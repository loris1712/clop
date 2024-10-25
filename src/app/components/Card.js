// components/Card.js
import React from 'react';
import styles from './Card.module.css';
import Barcode from './Barcode';

const Card = ({ nickname, type }) => {
    return (
        <div className={styles.card}>
            <div className={styles.cardInner}>
            <div className={type === 'vip' ? styles.cardFrontVip : styles.cardFront}>
            <div className={styles.frontContent}>
                        <p className={styles.vipPass}>VIP Pass</p>
                        <h2 className={styles.cardTitle}>{nickname}</h2>
                        <img src="./logo.svg" alt="Logo" className={styles.logoFront} />
                        <div style={{width: '20px', height: '20px', position: 'absolute', bottom: '2%', left: '0',}}>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" fill='#cccccc' color='#cccccc'><path d="M54.2 202.9C123.2 136.7 216.8 96 320 96s196.8 40.7 265.8 106.9c12.8 12.2 33 11.8 45.2-.9s11.8-33-.9-45.2C549.7 79.5 440.4 32 320 32S90.3 79.5 9.8 156.7C-2.9 169-3.3 189.2 8.9 202s32.5 13.2 45.2 .9zM320 256c56.8 0 108.6 21.1 148.2 56c13.3 11.7 33.5 10.4 45.2-2.8s10.4-33.5-2.8-45.2C459.8 219.2 393 192 320 192s-139.8 27.2-190.5 72c-13.3 11.7-14.5 31.9-2.8 45.2s31.9 14.5 45.2 2.8c39.5-34.9 91.3-56 148.2-56zm64 160a64 64 0 1 0 -128 0 64 64 0 1 0 128 0z"/></svg>
                        </div>
                        <p className={styles.author}>@cleopeofficial</p>
                    </div>
                </div>
                
                <div className={type === 'vip' ? styles.cardBackVip : styles.cardBack}>
                    <img src="./logo.svg" alt="Logo" className={styles.logoBack} />
                    <Barcode data="18185182358138509" />
                    <p className={styles.type}>{type}</p>
                </div>
            </div>
            <div className={styles.pedestal}>
              <div className={styles.stepBottom}></div>
              <div className={styles.stepTop}></div>
            </div>
        </div>
    );
};

export default Card;
