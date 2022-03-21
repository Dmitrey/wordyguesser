import {Component} from "react";

export class LetterInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            length: 4
        }
        this.setLength = this.setLength.bind(this);
        this.createLetterInputs = this.createLetterInputs.bind(this);
    }

    setLength(event) {
        this.setState(() => ({length: event.target.value}));
    }

    createLetterInputs() {
        let rows = [];
        for (let i = 0; i < this.state.length; i++) {
            rows.push(<input key={i} className={"letterInput"} maxLength={1}
                             onChange={(event) => {
                                 this.props.callback(i, event.target.value)
                             }}/>); //добавлять буквы в массив
        }
        localStorage.setItem("length", JSON.stringify({length: this.state.length}));
        return (<div>{rows}</div>);
    }

    render() {
        return (
            <div>
                <label>LENGTH</label>
                <input type="number" step="1" className={"wordLength"} min={0} max={100} value={this.state.length} onChange={this.setLength}/>
                <div>
                    {this.createLetterInputs()}
                </div>
            </div>
        );
    }
}