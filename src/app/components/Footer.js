'use client'

import { useEffect, useState } from "react";
import Link from 'next/link'

export const Footer = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setTime(now);
  }, []);

  return (
    <footer className="md:max-w-[80vw] max-w-[90vw] mx-auto bg-black text-white py-12 md:px-6">
        <div className="flex flex-col md:flex-row justify-between gap-12">
          {/* Colonna Social */}
          <div className="flex flex-col gap-4">
            <h4 className="text-lg font-bold">Social</h4>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/cleopeofficial/" target="_blank" rel="noopener noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" className="w-6 h-6" viewBox="0 0 448 512"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/></svg>
              </a>
              <a href="https://www.tiktok.com/@cleopeofficial?lang=en" target="_blank" rel="noopener noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" className="w-6 h-6" viewBox="0 0 448 512"><path d="M448 209.9a210.1 210.1 0 0 1 -122.8-39.3V349.4A162.6 162.6 0 1 1 185 188.3V278.2a74.6 74.6 0 1 0 52.2 71.2V0l88 0a121.2 121.2 0 0 0 1.9 22.2h0A122.2 122.2 0 0 0 381 102.4a121.4 121.4 0 0 0 67 20.1z"/></svg>              </a>
              <a href="mailto:cleope.events@gmail.com">
                <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" className="w-6 h-6" viewBox="0 0 512 512"><path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48L48 64zM0 176L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-208L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"/></svg>              </a>
              <a href="https://wa.me/+393513895086" target="_blank" rel="noopener noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" className="w-6 h-6" viewBox="0 0 448 512"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/></svg>              </a>
            </div>

            <a href="/">
              <button className="mt-4 rounded-md bg-white text-black px-6 py-3 uppercase text-xs tracking-widest hover:bg-neutral-200 transition w-fit cursor-pointer">
                Join Newsletter
              </button>
            </a>
          </div>

          {/* Colonna Pages */}
          <div className="flex flex-col gap-4 text-left md:text-right">
            <h4 className="text-lg font-bold">Pages</h4>
            <ul className="flex flex-col gap-1">
              <li>
                <a href="/" className="hover:underline text-[10px] uppercase">Home</a>
              </li>
              <li>
                <a href="/nextevents" className="hover:underline text-[10px] uppercase">Events</a>
              </li>
              <li>
                <a href="/about" className="hover:underline text-[10px] uppercase">The Hub</a>
              </li>
              <li>
                <a href="/tables" className="hover:underline text-[10px] uppercase">Tables</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-neutral-700 pt-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          {/* Logo */}
          <img src="/logo/logowhite.png" alt="Cleope Logo" className="w-24" />

          {/* Info */}
          <div className="text-[10px] text-neutral-400 flex flex-col md:items-end">
            <p>{time} || based in Milan</p>
            <p className="mt-1">&copy; 2025 Cleope Hub</p>
          </div>
        </div>
      </footer>
  )
}
