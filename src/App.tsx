import React from 'react';
import { Header } from './components/header';
import { MaxDiff } from './Tasks/ExerciseFive';
import { WikiGet } from './Tasks/ExerciseFour/HttpGet/components/wikiGet';
import { KeyboardAlgorithm } from './Tasks/ExerciseOne';
import { DatabaseQuery } from './Tasks/ExerciseThree/databaseQuery';
import { FlexibleGrid } from './Tasks/ExerciseTwo';

function App() {
  return (
    <div className="App">
      <Header />
      <KeyboardAlgorithm />
      <FlexibleGrid />
      <DatabaseQuery />
      <WikiGet />
      <MaxDiff />
    </div>
  );
}

export default App;
