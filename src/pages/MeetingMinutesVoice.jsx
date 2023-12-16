import { useState, useCallback } from 'react';
import axios from 'axios';
import ButtonBox from '@/components/ButtonBox';

import TitleTextBox from '@/components/TitleTextBox';

const projectId = 1;

const MeetingMinutesVoice = () => {
  const [stream, setStream] = useState();
  const [media, setMedia] = useState();
  // const [onRec, setOnRec] = useState(true);
  const [source, setSource] = useState();
  const [analyser, setAnalyser] = useState();
  const [audioUrl, setAudioUrl] = useState();
  const [recState, setRecState] = useState(2);

  const convertToWav = async (blob) => {
    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    const reader = new FileReader();

    return new Promise((resolve) => {
      reader.onloadend = () => {
        audioContext.decodeAudioData(reader.result, (buffer) => {
          const offlineContext = new OfflineAudioContext({
            numberOfChannels: buffer.numberOfChannels,
            length: buffer.length,
            sampleRate: buffer.sampleRate,
          });

          const source = offlineContext.createBufferSource();
          source.buffer = buffer;

          const destination = offlineContext.destination;
          source.connect(destination);

          source.start();
          offlineContext.startRendering().then((renderedBuffer) => {
            const wavBlob = new Blob([encodeWav(renderedBuffer)], {
              type: 'audio/wav',
            });
            resolve(wavBlob);
          });
        });
      };

      reader.readAsArrayBuffer(blob);
    });
  };

  const encodeWav = (audioBuffer) => {
    const numOfChan = audioBuffer.numberOfChannels;
    const length = audioBuffer.length * numOfChan * 2 + 44;
    const buffer = new ArrayBuffer(length);
    const view = new DataView(buffer);

    const writeString = (view, offset, str) => {
      for (let i = 0; i < str.length; i++) {
        view.setUint8(offset + i, str.charCodeAt(i));
      }
    };

    const floatTo16BitPCM = (output, offset, input) => {
      for (let i = 0; i < input.length; i++, offset += 2) {
        const s = Math.max(-1, Math.min(1, input[i]));
        output.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
      }
    };

    writeString(view, 0, 'RIFF');
    view.setUint32(4, 44 + length, true);
    writeString(view, 8, 'WAVE');
    writeString(view, 12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, numOfChan, true);
    view.setUint32(24, audioBuffer.sampleRate, true);
    view.setUint32(28, audioBuffer.sampleRate * 2 * numOfChan, true);
    view.setUint16(32, numOfChan * 2, true);
    view.setUint16(34, 16, true);
    writeString(view, 36, 'data');
    view.setUint32(40, length - 44, true);

    floatTo16BitPCM(view, 44, audioBuffer.getChannelData(0));

    if (numOfChan > 1) {
      floatTo16BitPCM(view, 44 + length, audioBuffer.getChannelData(1));
    }

    return view;
  };

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

          mediaRecorder.ondataavailable = async function (e) {
            const wavBlob = await convertToWav(e.data);
            setAudioUrl(wavBlob);
            setRecState(0);
          };
        } else {
          setRecState(1);
        }
      };
    });
  };

  const offRecAudio = () => {
    media.ondataavailable = async function (e) {
      const wavBlob = await convertToWav(e.data);
      setAudioUrl(wavBlob);
      setRecState(0);
    };

    stream.getAudioTracks().forEach(function (track) {
      track.stop();
    });

    media.stop();
    analyser.disconnect();
    source.disconnect();
  };

  const onSubmitAudioFile = useCallback(() => {
    const sound = new File([audioUrl], 'soundBlob.wav', {
      lastModified: new Date().getTime(),
      type: 'audio/wav',
    });
    console.log('파일:', sound);

    const formData = new FormData();
    formData.append('voiceFile', sound, 'soundBlob.wav');
    formData.append('projectId', projectId);

    axios
      .post('http://43.201.85.197/meeting/transfer', formData)
      .then((response) => {
        console.log('서버 응답:', response.data);
      })
      .catch((error) => {
        console.error('오류 발생:', error);
      });
  }, [audioUrl]);

  return (
    <div className="flex flex-col gap-2 ">
      <section className="relative flex flex-col justify-between h-full ">
        <TitleTextBox title="녹음을 시작합니다."></TitleTextBox>
        <div className="flex flex-col items-center gap-4 m-9">
          <img
            onClick={recState == 2 ? onRecAudio : offRecAudio}
            src=""
            alt={
              !recState
                ? '녹음 완료'
                : recState === 1
                  ? '녹음중'
                  : '녹음 준비중'
            }
            className="-bg--grey100 w-[240px] h-[240px]"
          ></img>
          <p className="text-center text-title4">
            {!recState ? (
              '성공적으로 녹음이 완료 되었어요!'
            ) : recState === 1 ? (
              <>
                녹음을 완료하시면 녹음한 내용을 <br /> AI가 요약해드려요
              </>
            ) : (
              '캐릭터를 눌러 녹음을 시작해 주세요'
            )}
          </p>
        </div>
        <div className="fixed w-[calc(100vw-32px)] bottom-4">
          <ButtonBox
            onClick={onSubmitAudioFile}
            disable={recState}
            navigateTo="/meetingminuteslist"
          >
            녹음완료
          </ButtonBox>
        </div>
      </section>
    </div>
  );
};

export default MeetingMinutesVoice;
