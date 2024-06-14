"use client";
import db from '../api/db';
import SongElement from './SongElement';
import { useEffect } from 'react'
export default function Song(props : any) {
  useEffect(() => {
       for(let key of Object.keys(props)) {
          console.log(props[key])
        }
  } , [])
  return (
    <div>
    </div>
  );
}