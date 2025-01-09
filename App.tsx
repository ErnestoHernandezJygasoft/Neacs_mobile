global.Buffer = require('buffer').Buffer;

import React from "react";

// components
import NavigationView from "./src/Components/Navigation/NavigatorView";
import 'react-native-gesture-handler';

export default function App(): React.JSX.Element {
  return <NavigationView/>
}