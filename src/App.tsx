import GlobalStyles from './global/styles';
import React from "react";
import Route from "./routes/Route";
import Header from "./components/header/Header";


function App() {
  return (
    <>
      <Header/>
      <Route/>
      <GlobalStyles/>
    </>
  );
}

export default App;
