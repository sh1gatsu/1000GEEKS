import React, { useCallback, useEffect, useState } from "react";
import { Caption } from "../../../../../components/caption";
import { Loader } from "../../../../../components/loader";
import { getWiki } from "../../utils/httpClient";

import './WikiGet.scss'

interface Text {
  '*': string,
}

interface ParsedData {
  title: string,
  pageId: number,
  text: Text,
};

export const WikiGet: React.FC = () => {
  const [input, setInput] = useState('');
  const [parsedData, setParsedData] = useState<null | ParsedData>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [wordsCount, setWordsCount] = useState(0);
  const [visibleWord, setVisibleWord] = useState('');
  const [isPressed, setIsPressed] = useState(false);

  const getDataFromAPI = (title: string) => {
    setIsLoading(true);

    getWiki(`${title}`)
      .then(res => {
        setParsedData(res.data.parse);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
  }

  const getTopicCount = useCallback(() => {
    if (!parsedData) {
      return;
    }

    const topic = parsedData.title;

    const text = parsedData.text["*"];

    const count = text.split(topic).length - 1;

    setWordsCount(count);
  }, [parsedData])

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (input.trim() === '') {
      return;
    }

    getDataFromAPI(input);

    setVisibleWord(input);

    setInput('');

    setIsPressed(true);
  }

  useEffect(() => {
    getTopicCount();
  }, [getTopicCount, parsedData]);

  return (
    <>
      <Caption title="Exercise 4: HTTP GET" />

      <form
        className="wikiGET__container"
        onSubmit={handleSubmit}
      >
        <input
          className="wikiGET__container__input"
          type="text"
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />
        <button
          className="wikiGET__container__button"
          disabled={isLoading}
        >
          Count the number of words
        </button>
        {isLoading ? (
          <Loader />
        ) : (
          <p>
            {!isPressed
              ? 'Enter a search term'
              : `The word ${visibleWord} appears in the text ${wordsCount} times`}
          </p>
        )}
      </form>
    </>
  )
}
