import React, { useEffect, useState } from "react";

const VoiceTester = () => {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] =
    useState<SpeechSynthesisVoice | null>(null);
  const [sampleText, setSampleText] = useState(
    "Hello, this is a test of the selected voice."
  );

  useEffect(() => {
    const loadVoices = () => {
      const synth = window.speechSynthesis;
      const voiceList = synth.getVoices();
      setVoices(voiceList);

      if (voiceList.length > 0) {
        setSelectedVoice(voiceList[0]);
      }
    };

    loadVoices();

    if (
      typeof window !== "undefined" &&
      window.speechSynthesis.onvoiceschanged !== undefined
    ) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  const handleVoiceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedIndex = event.target.selectedIndex;
    const voice = voices[selectedIndex];
    setSelectedVoice(voice);
  };

  const handleUtterance = () => {
    if (selectedVoice) {
      const utterance = new SpeechSynthesisUtterance(sampleText);
      utterance.voice = selectedVoice;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Voice Tester
      </h2>

      <label
        htmlFor="voiceSelect"
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        Select a Voice:
      </label>
      <select
        id="voiceSelect"
        onChange={handleVoiceChange}
        className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        {voices.map((voice, index) => (
          <option key={index} value={voice.name}>
            {voice.name} ------ ({voice.lang})
          </option>
        ))}
      </select>

      <label
        htmlFor="sampleText"
        className="block text-sm font-medium text-gray-700 mt-4 mb-2"
      >
        Sample Text:
      </label>
      <textarea
        id="sampleText"
        value={sampleText}
        onChange={(e) => setSampleText(e.target.value)}
        rows={4}
        className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />

      <button
        onClick={handleUtterance}
        className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Test Voice
      </button>
    </div>
  );
};

export default VoiceTester;
