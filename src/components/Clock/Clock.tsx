import React, { Component } from "react";

interface ClockProps {
  id: number;
  name: string;
  timezone: number;
  onRemove: (id: number) => void;
}

interface ClockState {
  time: Date;
}

class Clock extends Component<ClockProps, ClockState> {
  intervalId?: number;

  constructor(props: ClockProps) {
    super(props);
    this.state = {
      time: this.getCurrentTime(),
    };
  }

  componentDidMount() {
    this.intervalId = setInterval(this.updateTime, 1000);
  }

  componentWillUnmount() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  getCurrentTime = () => {
    const utc = new Date();
    const localTime = new Date(
      utc.getTime() + this.props.timezone * 60 * 60 * 1000
    );
    return localTime;
  };

  updateTime = () => {
    this.setState({ time: this.getCurrentTime() });
  };

  render() {
    const { id, name, onRemove } = this.props;
    const { time } = this.state;
    const formattedTime = time.toLocaleTimeString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    return (
      <div className="clock">
        <h3>{name}</h3>
        <p>{formattedTime}</p>
        <button onClick={() => onRemove(id)}>x</button>
      </div>
    );
  }
}

export default Clock;
