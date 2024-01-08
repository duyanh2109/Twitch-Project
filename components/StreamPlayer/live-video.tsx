import { Participant, Track } from "livekit-client";
import React, { useRef, useState, useEffect } from "react";
import { useTracks } from "@livekit/components-react";
import FullScreenControl from "./fullscreen-control";
import { useEventListener } from "usehooks-ts";
import VolumeControl from "./volume-control";
interface LiveVideoProps {
  participant: Participant;
}
const LiveVideo = ({ participant }: LiveVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isFullScreen, setFullScreen] = useState(false);
  const [volume, setVolume] = useState(0);
  const onVolumeChange = (value: number) => {
    setVolume(+value);
    if (videoRef?.current) {
      videoRef.current.muted = value === 0;
      videoRef.current.volume = +value * 0.01;
    }
  };
  const toggleFullScreen = () => {
    if (isFullScreen) {
      document.exitFullscreen();
    } else if (wrapperRef?.current) {
      wrapperRef.current.requestFullscreen();
    }
  };
  const toggleMute = () => {
    const isMute = volume === 0;
    setVolume(isMute ? 50 : 0);
    if (videoRef?.current) {
      videoRef.current.muted = !isMute;
      videoRef.current.volume = isMute ? 0.5 : 0;
    }
  };

  useEffect(() => {
    onVolumeChange(0);
  }, []);
  const handleFullScreenChange = () => {
    const isCurrentFullScreen = document.fullscreenElement !== null;
    setFullScreen(isCurrentFullScreen);
  };
  useEventListener("fullscreenchange", handleFullScreenChange, wrapperRef);
  useTracks([Track.Source.Camera, Track.Source.Microphone])
    .filter((track) => track.participant.identity === participant.identity)
    .forEach((track) => {
      if (videoRef.current) {
        track.publication.track?.attach(videoRef.current);
      }
    });
  return (
    <div className="h-full flex relative" ref={wrapperRef}>
      <video width="100%" ref={videoRef} />
      <div className="absolute top-0 h-full w-full opacity-0 hover:opacity-100 hover:transition-all ">
        <div className="absolute bottom-0 flex h-14 w-full items-center justify-between bg-gradient-to-r from-neutral-900 px-4">
          <VolumeControl
            onChange={onVolumeChange}
            value={volume}
            onToggle={toggleMute}
          />
          <FullScreenControl
            isFullScreen={isFullScreen}
            onToggle={toggleFullScreen}
          />
        </div>
      </div>
    </div>
  );
};

export default LiveVideo;
