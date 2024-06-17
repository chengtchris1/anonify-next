"use client"
import Image from "next/image";
import { useState, useEffect } from "react";
import { FaCopy, FaCheckCircle } from "react-icons/fa";
import { addPlaylist } from "./actions";
import { add, set } from "lodash";
export default function Home() {
  const [copyClicked, setCopyClicked] = useState(false);
  const [generatedURL, setGeneratedURL] = useState('');
  const [playlistName, setPlaylistName] = useState('');
  const [generatingURL, setGeneratingURL] = useState(false);

  return (
        <div className="flex flex-col justify-center border-solid border-neutral-content  bg-base-200 bg-opacity-100 px-12 sm:px-24 md:px-32 lg:px-[500px] pb-12 w-screen">
          <h1 className="mb-5 mt-5 text-center text-[20px] font-bold text-primary">
            Create a playlist!
          </h1>
          <input
            type="text"
            value={playlistName}
            onChange={(e) => {console.log(e.target.value); setPlaylistName(e.target.value)}}
            name="playlistName"
            className="flex-grow-3 input input-bordered input-primary mx-auto my-1 w-full py-2 text-left"
            placeholder="Enter playlist name"
          />
          <div className="my-0 flex justify-center">
            <button
              type='submit'
              className="btn btn-primary mb-0 mt-0 w-full px-3 py-2 text-xl duration-500 ease-in-out"
              disabled={generatingURL}
              onClick={async () => {
                try{
                setGeneratingURL(true);
                let response = await addPlaylist(playlistName)
                setGeneratedURL(window.location.href+response);
                } catch (err){
                  console.error(err)
                } finally {
                  setGeneratingURL(false);
                }
              }}
            >
              {generatingURL && <span className="loading loading-spinner"></span>}
              <span>Generate URL</span>
            </button>
          </div>
          <div className="radius-button join ">
            <input
              readOnly
              value={generatedURL}
              className="flex-grow-3 input join-item input-bordered input-primary mx-auto my-10 w-full py-2 text-left"
              placeholder="URL will appear here..."
            />
            <button
              className="btn btn-primary join-item my-10 rounded-btn px-3 py-2 text-xl duration-500 ease-in-out"
               onClick={() => {
              setCopyClicked(true);
                navigator.clipboard.writeText(generatedURL);
              }}
              onMouseLeave={() => {
                setCopyClicked(false);
              }}
            >
              <label className="swap swap-active swap-rotate">
                <div className={copyClicked ? "swap-off" : "swap-on"}>
                  <FaCopy className="mx-1" />
                </div>
                <div className={copyClicked ? "swap-on" : "swap-off"}>
                  <FaCheckCircle className="mx-1" />
                </div>
              </label>
            </button>
          </div>
        </div>
  );
}
