import { useState, useCallback } from 'react';
import axios from 'axios';
import ButtonBox from '@/components/ButtonBox';

import TitleTextBox from '@/components/TitleTextBox';
// import { useEffect } from 'react';

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

  // useEffect(() => {
  //   onRecAudio();
  //   return () => {
  //     offRecAudio();
  //   };
  // }, []);

  return (
    <>
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
      <section className="relative flex flex-col justify-between h-full ">
        <TitleTextBox title="녹음을 시작합니다."></TitleTextBox>
        <div className="flex flex-col items-center gap-4 m-9">
          <img
            src=""
            alt="녹음중입니다."
            className="-bg--grey100 w-[240px] h-[240px]"
          ></img>
          <p className="text-center text-title4">
            녹음을 완료하시면 녹음한 내용을
            <br /> AI가 요약해드려요
          </p>
        </div>
        <div className="fixed w-[calc(100vw-32px)] bottom-4">
          <ButtonBox>녹음완료</ButtonBox>
        </div>
      </section>
    </>
  );
};

export default MeetingMinutesVoice;
