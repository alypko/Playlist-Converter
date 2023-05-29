import React from "react";
import { store } from "./store/store";
import { Provider } from "react-redux";
import Navigation from "./screens/Navigation";

export default function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}
