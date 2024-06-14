"use client"
import Axios from "axios";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
export default function SongElement({
  id,
  title,
  artist,
  album,
  albumArt,
  previewUrl,
  enableDelete,
  votes,
  deleteTrack,
  track_id,
}) {

  const [upvoted, setUpvoted] = useState(false);
  const [downvoted, setDownvoted] = useState(false);


  return (
    <div className="card card-side my-3 flex items-center  overflow-clip bg-base-100 shadow-xl sm:my-5 w-full p-1">
      <div className="absolte left-0 top-0 flex text-center rounded-md m-0 flex-col-reverse justify-center items-center text-ellipsis p-1">
            <button

              className="btn btn-square btn-outline btn-primary btn-sm text-lg"
            >
              -
            </button>
            <span className="mx-2 text-lg">{votes}</span>
            <button

              className="btn btn-square btn-outline btn-primary btn-sm text-lg"
            >
              +
            </button>
          </div>
        <figure className="flex items-center justify-center size-24 min-w-24 sm:size-48 object-cover rounded-xl p-1">
          <img
            className="overflow-hidden object-cover rounded-xl border border-white"
            src={albumArt}
            alt={album}
          />
        </figure>

      <div className="card-body m-1 p-0">
        <h2 className="card-title text-primary m-0 overflow-hidden">
         {title}
        </h2>
        <div className="flex flex-col flex-shrink overflow-hidden">
          <p className="flex flex-shrink m-0  text-ellipsis overflow-hidden">{artist}</p>
          <div className="flex flex-shrink m-0  text-ellipsis w-full overflow-hidden">{album}</div>
        </div>
          </div>
        <div className="flex items-center justify-between">
          {/*{previewUrl !== null ? (
            <>
              <span className="card-actions justify-end">
                <audio
                  className="hidden sm:inline w-32:sm:w-60 "
                  src={previewUrl}
                  controls
                  controlsList="nodownload"
                />
              </span>
            </>
          ) : (
            <div className="text-gray-500">No preview available</div>
          )}*/}

      </div>

      <div className="flex flex-col items-center justify-between">
        <div className="absolute right-0 top-0">
          {true && (
            <div className="card-actions flex justify-end">
              <button
                onClick={()=>{console.log(id); console.log(track_id); deleteTrack(id, track_id)}}
                className="btn btn-square btn-outline btn-sm m-1
            bg-primary hover:bg-opacity-50"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-secondary-content hover:text-primary-content"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
        <div className="flex" />
        <div className="justify card-actions flex items-center"></div>
      </div>
    </div>
  );
};

