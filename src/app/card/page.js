"use client";

import { useEffect, useState } from "react";
import Card from "../components/Card";
import { getNicknameFromToken } from "../../utils/tokenUtils";
import styles from './CardPage.module.css';

export default function CardPage() {
    const [nicknameData, setNicknameData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [countdown, setCountdown] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        // Recupera il token dall'URL e ottieni i dati del nickname
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get("token");

        if (token) {
            const data = getNicknameFromToken(token);
            if (data) {
                setNicknameData(data);
            }
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        // Countdown per il 14 novembre 2024 alle 21:30
        const targetDate = new Date("2024-11-14T21:30:00");
        
        const intervalId = setInterval(() => {
            const now = new Date();
            const distance = targetDate - now;

            if (distance < 0) {
                clearInterval(intervalId);
            } else {
                setCountdown({
                    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((distance % (1000 * 60)) / 1000),
                });
            }
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        // Seleziona il contenitore della card
        const body = document.querySelector(".cardDiv");
    
        if (body) {
            // Creazione delle particelle solo se `body` esiste
            const particleCount = 50;
            
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement("div");
                particle.classList.add("particle");
                particle.style.top = Math.random() * 100 + "vh";
                particle.style.left = Math.random() * 100 + "vw";
                particle.style.animationDelay = Math.random() * 10 + "s";
                particle.style.animationDuration = 5 + Math.random() * 5 + "s";
                body.appendChild(particle);
            }
        }
    
        return () => {
            // Pulisci le particelle al dismount
            document.querySelectorAll(".particle").forEach((particle) => particle.remove());
        };
    }, []);
    
    if (loading) {
        return <div>Loading...</div>;
    }

    if (!nicknameData) {
        return <div>Token non valido</div>;
    }

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                height: "100vh",
                position: "relative",
                overflow: "hidden",
            }}
            className="cardDiv"
        >
            <h1 className={styles.metallicText}>
                CLEOPE <span className={styles.metallicTextSpan}>VOL. I</span>
            </h1>


            {/* Countdown */}
            <div style={{ color: "white", marginTop: "1rem", display: "flex", gap: "1rem", fontSize: "1rem" }}>
                <div style={{ textAlign: "center", padding: "0.5rem 1rem"}}>
                    <span className={styles.metallicText}>{countdown.days}</span>
                    <div className={styles.countSpan}>Giorni</div>
                </div>
                <div style={{ textAlign: "center", padding: "0.5rem 1rem"}}>
                    <span className={styles.metallicText}>{countdown.hours}</span>
                    <div className={styles.countSpan}>Ore</div>
                </div>
                <div style={{ textAlign: "center", padding: "0.5rem 1rem"}}>
                    <span className={styles.metallicText}>{countdown.minutes}</span>
                    <div className={styles.countSpan}>Minuti</div>
                </div>
                <div style={{ textAlign: "center", padding: "0.5rem 1rem"}}>
                    <span className={styles.metallicText}>{countdown.seconds}</span>
                    <div className={styles.countSpan}>Secondi</div>
                </div>
            </div>

            {/* Card */}
            <Card nickname={nicknameData.nickname} type={nicknameData.type} />

        </div>
    );
}
