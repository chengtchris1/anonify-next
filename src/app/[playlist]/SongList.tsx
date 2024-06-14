"use client";
import SongElement from "./SongElement";
export default function SongList({songData, plData, deleteTrack}) {
    return songData.map((song : any, index:number) => {
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
      } )
  }
