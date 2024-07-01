"use client";
import { useState, useEffect, useCallback} from "react";
import { debounce, throttle } from "lodash";
import SubmitButton from "./SubmitButton";
import Image from "next/image";
export default function SearchSong({searchSong, addSong}) {
  const [songField, setSongField] = useState<string>('');
  const [results, setResults] = useState<any>(null);
  const throttledSearch = useCallback(debounce(async (song) => {
    if (!song) return; // Ensure there's a value to search for
    const data = await searchSong(song);
    console.log(song, data);
    setResults(data);
  }, 500), [searchSong]); // searchSong is stable, so it's okay to include it here

  useEffect(() => {
    if (!songField) return;
    // Call the throttled function inside useEffect
    throttledSearch(songField);
    // Make sure to cancel the throttled call on component unmount or when songField changes
    return () => throttledSearch.cancel();
  }, [songField, throttledSearch]);

return (
    <>
      <label htmlFor='url' className='px-1'>Search Song</label>
      <input value={songField} onChange={(e)=>{setSongField(e.target.value)}} className="input input-bordered w-full max-w-xs" name="url" type='text'/>
      <div className="w-1/2">
      {
        (results && songField.length >= 1) ? results.tracks.items.map((track: any) => {
          return (
            <form action={addSong}>
            <div key={track.id} className='grid grid-cols-7 border rounded-2xl p-2 m-2'>
              <div className="col-span-2">
                <Image width={100} height={100} src={track.album.images[0].url}/>
              </div>
              <div className="col-span-2 flex items-center">
                <span>{track.name}</span>
                </div>
              <div className="col-span-2 flex items-center">
              <input className='hidden' name="url" value={track.id}/>
              <span>{track.artists.map((artist) => artist.name).join(', ')}</span>
              </div>
              <div className="col-span-1 flex items-center">
              <SubmitButton/>
              </div>
            </div>
            </form>
          )
        } ) : null
      }
      </div>
    </>
);
}