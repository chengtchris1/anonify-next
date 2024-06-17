"use client";
import { useState, useEffect } from "react";
import { upvoteTrack, downvoteTrack } from "../actions";
import React from "react";
export default function Upvotes({ serverVotes, id }) {
    const [ratingStatus, setRatingStatus] = useState({
    upvoted: false,
    downvoted: false,
  });
    const [loading, setLoading] = useState(false);
    useEffect(() => {
    const songsRatedByUser =
      JSON.parse(localStorage.getItem("songsRatedByUser")) || {};
    setRatingStatus(
      songsRatedByUser[id] || { upvoted: false, downvoted: false },
    );
  }, []);
    useEffect(() => {
    if (ratingStatus.upvoted && ratingStatus.downvoted) {
      let nextRating = { upvoted: false, downvoted: false };
      let updatedSongsRating = {
        ...(JSON.parse(localStorage.getItem("songsRatedByUser")) || {}),
        [id]: nextRating,
      };
      localStorage.setItem(
        "songsRatedByUser",
        JSON.stringify(updatedSongsRating),
      );
      setRatingStatus({ upvoted: false, downvoted: false });
    }
  }, [ratingStatus.upvoted, ratingStatus.downvoted]);
  const finishRatingChange = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setTimeout(() => setLoading(false), 1000);
    const target = e.target as HTMLButtonElement;
    const nextRating = target.name === 'upvote' ? { ...ratingStatus, upvoted: true } : { ...ratingStatus, downvoted: true };
    const updatedSongsRatedByUser = {
      ...(JSON.parse(localStorage.getItem("songsRatedByUser")) || {}),
      [id]: nextRating,
    };
    localStorage.setItem(
      "songsRatedByUser",
      JSON.stringify(updatedSongsRatedByUser),
    );
    setRatingStatus(updatedSongsRatedByUser[id]);
  }
  return (
          <div className="absolte left-0 top-0 flex text-center rounded-md m-0 flex-col-reverse justify-center items-center text-ellipsis p-1">
            <button
              name="downvote"
              disabled={(ratingStatus.downvoted && !ratingStatus.upvoted) || loading}
              onClick={async (e)=>{
                await downvoteTrack(id);
                setLoading(true);
                finishRatingChange(e);}
              }
              className="btn btn-square btn-outline btn-primary btn-sm text-lg"
            >
              -
            </button>
            <span className="mx-2 text-lg">{ serverVotes }</span>
            <button
              name="upvote"
              disabled={(ratingStatus.upvoted && !ratingStatus.downvoted) || loading}
              onClick={async (e)=>{
                await upvoteTrack(id);
                setLoading(true);
                finishRatingChange(e);}
              }
              className="btn btn-square btn-outline btn-primary btn-sm text-lg"
            >
              +
            </button>
          </div>
  )
}