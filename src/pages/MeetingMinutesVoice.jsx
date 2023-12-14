import React, { useState, useCallback } from 'react';
import axios from 'axios';

const MeetingMinutesVoice = () => {
  const [stream, setStream] = useState();
  const [media, setMedia] = useState();
  const [onRec, setOnRec] = useState(true);
  const [source, setSource] = useState();
  const [analyser, setAnalyser] = useState();
  const [audioUrl, setAudioUrl] = useState();

  const onRecAudio = () => {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = audioCtx.createScriptProcessor(0, 1, 1);
    setAnalyser(analyser);

    function makeSound(stream) {
      const source = audioCtx.createMediaStreamSource(stream);
      setSource(source);
      source.connect(analyser);
      analyser.connect(audioCtx.destination);
    }

    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.start();
      setStream(stream);
      setMedia(mediaRecorder);
      makeSound(stream);

      analyser.onaudioprocess = function (e) {
        if (e.playbackTime > 3600) {
          stream.getAudioTracks().forEach(function (track) {
            track.stop();
          });
          mediaRecorder.stop();
          analyser.disconnect();
          audioCtx.createMediaStreamSource(stream).disconnect();

          mediaRecorder.ondataavailable = function (e) {
            setAudioUrl(e.data);
            setOnRec(true);
          };
        } else {
          setOnRec(false);
        }
      };
    });
  };

  const offRecAudio = () => {
    media.ondataavailable = function (e) {
      setAudioUrl(e.data);
      setOnRec(true);
    };

    stream.getAudioTracks().forEach(function (track) {
      track.stop();
    });

    media.stop();
    analyser.disconnect();
    source.disconnect();
  };

  const onSubmitAudioFile = useCallback(() => {
    // if (audioUrl) {
    //   console.log('파일 URL:', URL.createObjectURL(audioUrl));
    // }
    const sound = new File([audioUrl], 'soundBlob.mp3', {
      lastModified: new Date().getTime(),
      type: 'audio/mpeg',
    });
    console.log('파일:', sound);

    const formData = new FormData();
    formData.append('voiceFile', sound, 'soundBlob.mp3');

    axios
      .post('http://localhost:8080/meeting/transfer', formData)
      .then((response) => {
        console.log('서버 응답:', response.data);
      })
      .catch((error) => {
        console.error('오류 발생:', error);
      });
  }, [audioUrl]);

  return (
    <div className="flex flex-col gap-2 ">
      <button
        className="px-10 bg-red-400"
        onClick={onRec ? onRecAudio : offRecAudio}
      >
        녹음
      </button>
      <button className="bg-blue-300" onClick={onSubmitAudioFile}>
        결과 확인
      </button>
    </div>
  );
};

export default MeetingMinutesVoice;
