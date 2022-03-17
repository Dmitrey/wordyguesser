import {Component} from "react";

export class LetterInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            length: 4,
            letters: []
        }
        this.setLength = this.setLength.bind(this);
        this.createLetterInputs = this.createLetterInputs.bind(this);
        this.updateArr = this.updateArr.bind(this);
    }

    setLength(event) {
        this.setState(() => ({length: event.target.value}));
    }

    createLetterInputs() {
        let rows = [];
        for (let i = 0; i < this.state.length; i++) {
            rows.push(<input key={i} className={"letterInput"} onChange={this.updateArr}/>); //добавлять буквы в массив
        }
        return (<div>{rows}</div>);
    }

    updateArr(){

    }

    render() {
        return (
            <div>
                <label>LENGTH</label>
                <input value={this.state.length} onChange={this.setLength}/>
                {this.createLetterInputs()}
            </div>
        );
    }
}