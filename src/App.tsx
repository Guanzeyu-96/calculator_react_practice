import React from "react";
import { Wrapper } from "./component/wrapper/Wrapper";
import "./App.css";
import { Screen } from "./component/Screen";
import { ButtonArea } from "./component/wrapper/ButtonArea";
import { btnValues } from "./constant/btnValues";
import { Button } from "./component/Button";

function App() {
  return (
    <Wrapper>
      <Screen />
      <ButtonArea>
        {btnValues.flat().map((btn, index) => {
          return <Button value={btn} key={btn} />;
        })}
      </ButtonArea>
    </Wrapper>
  );
}

export default App;
