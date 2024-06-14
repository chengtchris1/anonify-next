import React from 'react';
import db from '../api/db';
import Song from './Song'
import Axios from 'axios';
import SongElement from './SongElement';
import { revalidatePath } from 'next/cache';
import SubmitButton from './SubmitButton';
import SongList from './SongList';
interface Playlist {
  id: number;
  name: string;
  path: string;
  tracks: Track[];
}
interface Track {
  id: number;
  track_id: string;
  votes: number;
}




export default async function Page({ params } : { params: { playlist: string } }) {
const { data : {token}} = await Axios.get(`${process.env.NEXT_PUBLIC_APP_URL}/api/spotify`);
const plData  = await db.getPlaylist(`/${params.playlist}`, false)
const songString = plData.tracks.map((song : Track) => song.track_id).join(",");
let response;
try {
response = await Axios.get(
      "https://api.spotify.com/v1/tracks?market=US&ids=" + songString,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    ); } catch (e) {
        response  = {data: {tracks: []}}
        }

    async function addSong(formData : FormData) {
      "use server"
     const url = formData.get('url') || '';
     const spotifyUrlRegex = /\/track\/([a-zA-Z0-9]{22})/;
    const spotifyUrlMatch = (url as string).match(spotifyUrlRegex);
    if(spotifyUrlMatch) {
        console.log(spotifyUrlMatch[1])
    } else {
        console.log('invalid url')
        return; // Add a return statement here to exit the function if the URL is invalid
    }
      console.log(formData.get('url'))
     const res = await db.addTrack(`/${params.playlist}`, spotifyUrlMatch[1])
     console.log("THE RES", res)
     revalidatePath(`/${params.playlist}`)
    }
    async function deleteTrack(anonify_index : any, track_id : any){
        "use server"
        console.log("Deleting track", anonify_index)
        const res = await db.deleteTrack(anonify_index, track_id)
        console.log("THE RES", res)
        revalidatePath(`/${params.playlist}`)

    }

return (
    <>
    <Song data={plData} response={response.data}/>

    <form className='flex px-4 justify-center' action={addSong}>
      <label htmlFor='url' className='px-1'>Add Song</label>
      <input className="input input-bordered w-full max-w-xs" name="url" type='text'/>
      <SubmitButton />
    </form>
     <div className='flex flex-col items-center justify-center px-4'>
      <SongList songData={response.data.tracks} plData={plData} deleteTrack={deleteTrack}/>

      { /*response.data.tracks.map((song : any, index:number) => {
        return <SongElement
          key={plData.tracks[index].id}
          id={plData.tracks[index].id}
          track_id={song.id}
          title={song.name}
          artist={song.artists[0].name}
          album={song.album.name}
          albumArt={song.album.images[0].url}
          previewUrl={song.preview_url}
          enableDelete={false}
          votes={0}
          deleteTrack={deleteTrack}
        />

      } ) */
     }
     </div>
    </>
  );
}
