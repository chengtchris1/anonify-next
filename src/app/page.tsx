import Image from "next/image";
import { FaCopy, FaCheckCircle } from "react-icons/fa";
import { useState } from "react";
export default function Home() {
  return (
        <div className="flex flex-col justify-center border-solid border-neutral-content  bg-base-200 bg-opacity-100 px-12 sm:px-24 md:px-32 lg:px-[500px] pb-12 w-screen">
          <h1 className="mb-5 mt-5 text-center text-[20px] font-bold text-primary">
            Create a playlist!
          </h1>
          <input
            type="text"
            name="playlistName"
            className="flex-grow-3 input input-bordered input-primary mx-auto my-1 w-full py-2 text-left"
            placeholder="Enter playlist name"
          />
          <div className="radius-button join ">
            <input
              className="flex-grow-3 input join-item input-bordered input-primary mx-auto my-10 w-full py-2 text-left"
              placeholder="URL will appear here..."
            />
            <button
              className="btn btn-primary join-item my-10 rounded-btn px-3 py-2 text-xl duration-500 ease-in-out"
            >
              <label className="swap swap-active swap-rotate">

                  <FaCopy className="mx-1" />

              </label>
            </button>
          </div>
          <div className="my-0">
            <button
              className="btn btn-primary mb-0 mt-0 w-full px-3 py-2 text-xl duration-500 ease-in-out"
            >
              <span className="loading loading-spinner"></span>
              <span>Generate URL</span>
            </button>
          </div>
        </div>
  );
}
