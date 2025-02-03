import "./App.css";
import React, { Component } from "react";
import Clock from "./components/Clock/Clock";
import ClockForm from "./components/ClockForm/ClockForm";

interface ClockData {
  id: number;
  name: string;
  timezone: number;
}

interface AppState {
  clocks: ClockData[];
}

class App extends Component<object, AppState> {
  constructor(props: object) {
    super(props);
    this.state = {
      clocks: [],
    };
  }

  handleAddClock = (name: string, timezone: number) => {
    const newClock: ClockData = { id: Date.now(), name, timezone };
    this.setState((prevState) => ({ clocks: [...prevState.clocks, newClock] }));
  };

  handleRemoveClock = (id: number) => {
    this.setState((prevState) => ({
      clocks: prevState.clocks.filter((clock) => clock.id !== id),
    }));
  };

  render() {
    const { clocks } = this.state;

    return (
      <div className="app">
        <ClockForm onAddClock={this.handleAddClock} />
        <div className="clocks">
          {clocks.map((clock) => (
            <Clock
              key={clock.id}
              id={clock.id}
              name={clock.name}
              timezone={clock.timezone}
              onRemove={this.handleRemoveClock}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default App;
