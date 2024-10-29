import React from "react";
import MareaCalculator from "./components/mareaCalculator";

function App() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-100">
      <h1 className="text-4xl font-bold text-blue-600">
        <MareaCalculator />
      </h1>
    </div>
  );
}

export default App;
