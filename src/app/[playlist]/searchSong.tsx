"use client";
import { useState, useEffect, useCallback} from "react";
import { debounce, throttle } from "lodash";
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
      {
        results ? results.tracks.items.map((track: any) => {
          return (
            <div key={track.id} className='flex justify-between'>
              <span>{track.name}</span>
              <span>{track.artists.map((artist) => artist.name).join(', ')}</span>
              <button onClick={() => addSong(track.uri)} className='btn btn-primary'>Add</button>
            </div>
          )
        } ) : null
      }
    </>
);
}