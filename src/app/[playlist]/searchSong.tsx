"use client";
import { useState, useEffect, useCallback} from "react";
import { debounce, set, throttle } from "lodash";
import { useFormStatus } from "react-dom";
import SubmitButton from "./SubmitButton";
import Image from "next/image";
export default function SearchSong({songData, searchSong, addSong}) {
  const [songField, setSongField] = useState<string>('');
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const throttledSearch = useCallback(debounce(async (song) => {
    if (!song) return; // Ensure there's a value to search for
    setLoading(true);
    const data = await searchSong(song);
    console.log(song, data);
    setResults(data);
    setLoading(false);
  }, 500), []); // searchSong is stable, so it's okay to include it here

  useEffect(() => {
    if (!songField) return;
    // Call the throttled function inside useEffect
    throttledSearch(songField);
    // Make sure to cancel the throttled call on component unmount or when songField changes
    return () => throttledSearch.cancel();
  }, [songField, throttledSearch]);

  const act = async (e: FormData) => {
    return await addSong(e);
  }
  const { pending } = useFormStatus()
return (
    <>
  <button onClick={() => console.log(songData)}>Test</button>
  <label htmlFor='url' className='px-1'>Search Song</label>
  <div className="flex flex-col items-center justify-center">
    <div className="flex items-center">
      <input value={songField} onChange={(e) => { setSongField(e.target.value) }} className="input input-bordered max-w-xs z-40" name="url" type='text' />
      {(results && songField.length >= 1) && <button hidden onClick={() => { setSongField('') }} className="btn btn-neutral">Done</button>}
    </div>
<div className="absolute min-w-fit mt-2 bg-black px-10 z-10 top-[34%]">
      {
        loading ? <div className="text-white">Loading...</div> :
        (!loading && results && songField.length >= 1) ? results.tracks.items.map((track: any) => {
          const added = songData.some(({id})=>id === track.id)
          return (
            <div className="bg-black">
            <form action={act}>
            <div key={track.id} className='grid grid-cols-4 border rounded-2xl p-2 m-2'>
              <div className="col-span-1">
                <Image width={50} height={50} src={track.album.images[0].url} alt={`Album art for song ${track.name}`}/>
              </div>
              <div className="col-span-2 flex items-start justify-center flex-col text-xs">
              <div className="flex items-center">
                <span>{track.name}</span>

                </div>
                 <span>{track.album.name}</span>
              <div className="flex items-center">
              <input className='hidden' name="url" value={track.id}/>
              <span>{track.artists.map((artist) => artist.name).join(', ')}</span>
              </div>
              </div>
              <div className="col-span-1 flex items-center">
                <SubmitButton  additionalConditions={added}>
                  {added ? 'Added':'Add'}
                </SubmitButton>
              </div>
            </div>
            </form>
            </div>
          )
        } ) : null
      }
      </div>
      </div>
    </>
);
}