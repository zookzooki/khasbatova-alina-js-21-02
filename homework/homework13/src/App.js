import React from 'react';

import './App.css';
import { Header } from "./components/header/Header";
import { Sidebar } from "./components/sidebar/Sidebar";
import { Content } from "./components/forms/content/Content";
import { Footer } from "./components/footer/Footer";

class App extends React.Component {
  render() {
  return (
    <div className="App">
        <Header/>
        <Sidebar/>
        <Content/>
        <Footer/>
    </div>
  );
};
}

export default App;
