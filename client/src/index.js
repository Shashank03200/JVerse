import React from "react";
import ReactDOM from "react-dom";
import { ChakraProvider } from "@chakra-ui/react";

import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import theme from "./theme/theme";

import store from "./store/index";
// import SocketContext, { socket } from "./utils/socket";

import App from "./App";

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <ChakraProvider theme={theme}>
        {/* <SocketContext.Provider value={socket}> */}
        <App />
        {/* </SocketContext.Provider> */}
      </ChakraProvider>
    </Router>
  </Provider>,
  document.getElementById("root")
);
