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
            rows.push(<input key={i} className={"letterInput"}
                             onChange={(event) => {
                                 this.props.callback(i, event.target.value, this.state.length)
                             }}/>); //добавлять буквы в массив
        }
        return (<div>{rows}</div>);
    }

    render() {
        return (
            <div>
                <label>LENGTH</label>
                <input value={this.state.length} onChange={this.setLength}/>
                <div>
                    <label>MASK</label>
                    {this.createLetterInputs()}
                </div>
            </div>
        );
    }
}