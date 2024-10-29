'use client'

import { useEffect, useState } from "react";
import Card from "../components/Card";
import { getNicknameFromToken } from "../../utils/tokenUtils";

export default function CardPage() {
    const [nicknameData, setNicknameData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');

        if (token) {
            const data = getNicknameFromToken(token);
            if (data) {
                setNicknameData(data);
            }
        }
        setLoading(false);
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!nicknameData) {
        return <div>Token non valido</div>;
    }

    return (
<div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
}} className="cardDiv">                <Card nickname={nicknameData.nickname} type={nicknameData.type} />
        </div>
    );
}
