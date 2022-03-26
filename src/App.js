import './App.css';
import AudioControls from './AudioControls';
import React, { useState, useEffect, useRef } from 'react';
import GooglePayButton from '@google-pay/button-react';

const tracks = [
  {
    title: '22322',
    artist: 'BadTrip Radio Live',
    audioSrc: 'https://ipfs.infura.io/ipfs/QmacYixpmG534Pw1B94RziPBCvGt3EPvA2dDGAZFCJrY6B',
    image: 'https://ipfs.infura.io/ipfs/QmQKoXYX6w8MNPanEgyMdKUXnA3FiYif8BJCeMfZKwcAmK',
    color: 'blue',
  },
  {
    title: '22222',
    artist: 'BadTrip Radio Live',
    audioSrc: 'https://ipfs.infura.io/ipfs/Qmbj3bpDQU7eK57qNmhATDGA5oTTQk3PC39FbWxoQF5GWz',
    image: 'https://ipfs.infura.io/ipfs/QmQKoXYX6w8MNPanEgyMdKUXnA3FiYif8BJCeMfZKwcAmK',
    color: 'blue',
  },
  {
    title: '22122',
    artist: 'BadTrip Radio Live',
    audioSrc: 'https://ipfs.infura.io/ipfs/QmV67naV6NQJbRom1ZKDrJcXtZim14DfGTeqfWdxkcfV4x',
    image: 'https://ipfs.infura.io/ipfs/QmQKoXYX6w8MNPanEgyMdKUXnA3FiYif8BJCeMfZKwcAmK',
    color: 'blue',
  },
  {
    title: '21722',
    artist: 'BadTrip Radio Live',
    audioSrc: 'https://ipfs.infura.io/ipfs/QmejxcVsJWp7VtY4oY4e3amGnB9ygBqqXiD3mVfqgUj7hp',
    image: 'https://ipfs.infura.io/ipfs/QmQKoXYX6w8MNPanEgyMdKUXnA3FiYif8BJCeMfZKwcAmK',
    color: 'blue',
  },
  {
    title: '20822',
    artist: 'BadTrip Radio Live',
    audioSrc: 'https://ipfs.infura.io/ipfs/QmcKV5GcXeXDerEsMJFr7VYmQwtJFoZ9n71G9DYuqJrRxL',
    image: 'https://ipfs.infura.io/ipfs/QmQKoXYX6w8MNPanEgyMdKUXnA3FiYif8BJCeMfZKwcAmK',
    color: 'blue',
  },
  {
    title: '20522',
    artist: 'BadTrip Radio Live',
    audioSrc: 'https://ipfs.infura.io/ipfs/QmT3WqFBN1nSnNc6CZUwZyVptxaiq9EzFSinTSdY8dchkr',
    image: 'https://ipfs.infura.io/ipfs/QmQKoXYX6w8MNPanEgyMdKUXnA3FiYif8BJCeMfZKwcAmK',
    color: 'blue',
  }
];

function App() {

  const [amount, setAmount] = useState('1.00');
  const [existingPaymentMethodRequired, setExistingPaymentMethodRequired] = useState(false);
  const [buttonColor, setButtonColor] = useState('default');
  const [buttonType, setButtonType] = useState('buy');
  const [buttonLocale, setButtonLocale] = useState('');

  const props = {
    amount,
    existingPaymentMethodRequired,
    buttonColor,
    buttonType,
    buttonLocale,
  };


  const [trackIndex, setTrackIndex] = useState(0);
  const [trackProgress, setTrackProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [urlArr, setUrlArr] = useState([]);
  const [file, setFile] = useState(null);
  // Destructure for conciseness
  const { title, artist, color, image, audioSrc } = tracks[trackIndex];
  const audioRef = useRef(new Audio(audioSrc));
  const intervalRef = useRef();
  const isReady = useRef(false);
  // Destructure for conciseness
  const { duration } = audioRef.current;
  console.log(duration)
  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);


  useEffect(() => {
    // Pause and clean up on unmount
    return () => {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
    }
  }, []);

  const startTimer = () => {
    // Clear any timers already running
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        console.log('ended')
        toNextTrack();
      } else {
        setTrackProgress(audioRef.current.currentTime);
      }
    }, [1000]);
  }
// Handle setup when changing tracks
  useEffect(() => {
    audioRef.current.pause();

    audioRef.current = new Audio(audioSrc);
        setTrackProgress(audioRef.current.currentTime);

    if (isReady.current) {
      audioRef.current.play();
      setIsPlaying(true);
      startTimer();
    } else {
      // Set the isReady ref as true for the next pass
      isReady.current = true;
    }
  }, [trackIndex]);

  const toPrevTrack = () => {
    if (trackIndex - 1 < 0) {
      setTrackIndex(tracks.length - 1);
    } else {
      setTrackIndex(trackIndex - 1);
    }
  }


  const toNextTrack = () => {

    if (trackIndex < tracks.length - 1) {
      setTrackIndex(trackIndex + 1);
    } else {
      setTrackIndex(0);
    }
  }
  return (
    <div className="App">
      <header className="App-header">
          <img className="artwork"
               src={image}
               alt={`track artwork for ${title} by ${artist}`}
                          />
                    <h2 className="title">{title}</h2>
        <h3 className="artist">{artist}</h3>
        <AudioControls
          isPlaying={isPlaying}
          onPrevClick={toPrevTrack}
          onNextClick={toNextTrack}
          onPlayPauseClick={setIsPlaying}
        />

      </header>
    </div>
  );
}

export default App;
