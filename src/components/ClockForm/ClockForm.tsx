import { Component, ChangeEvent, FormEvent } from "react";

interface ClockFormProps {
  onAddClock: (name: string, timezone: number) => void;
}

interface ClockFormState {
  name: string;
  timezone: string;
}

class ClockForm extends Component<ClockFormProps, ClockFormState> {
  constructor(props: ClockFormProps) {
    super(props);
    this.state = {
      name: "",
      timezone: "",
    };
  }

  handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ [e.target.name]: e.target.value } as Pick<
      ClockFormState,
      keyof ClockFormState
    >);
  };

  handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, timezone } = this.state;
    if (name && timezone) {
      this.props.onAddClock(name, parseInt(timezone, 10));
      this.setState({ name: "", timezone: "" });
    }
  };

  render() {
    const { name, timezone } = this.state;
    return (
      <form className="clock-form" onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="name"
          value={name}
          placeholder="Название"
          onChange={this.handleInputChange}
        />
        <input
          type="number"
          name="timezone"
          value={timezone}
          placeholder="Временная зона (например, 3)"
          onChange={this.handleInputChange}
        />
        <button type="submit">Добавить</button>
      </form>
    );
  }
}

export default ClockForm;
