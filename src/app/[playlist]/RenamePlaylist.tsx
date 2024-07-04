"use client";
import db from '../api/db';
import SongElement from './SongElement';
import { useEffect } from 'react'
export default function Song(props : any) {
  return (
    <div>

      <form action={props.renamePlaylist}>
        <input type="text" name="newName" />
        <button type="submit">Rename</button>
      </form>

    </div>
  );
}
 /*<Song plName={params.playlist} data={plData} response={response.data} renamePlaylist={renamePlaylist}/>*/