import {Component} from "react";
import axios from "axios";
import {LetterInput} from "./LetterInput";

export class Guesser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputData: {
                mask: "",
                con: "",
                nocon: ""
            },
            suggestions: ["nothing"]
        }
        this.sendData = this.sendData.bind(this);
        this.handleMask = this.handleMask.bind(this);
        this.handleCon = this.handleCon.bind(this);
        this.handleNocon = this.handleNocon.bind(this);
        this.bam = this.bam.bind(this);

    }

    sendData() {
        console.log(this.state.inputData);
        axios.post("http://localhost:8080/hey", this.state.inputData)
            .then(response => this.setState(response.data.length === 0 ? {suggestions: ["nothing found"]} : {suggestions: response.data}))
    }

    handleMask(event) {
        this.setState({
            inputData:
                {
                    mask: event.target.value,
                    con: this.state.inputData.con,
                    nocon: this.state.inputData.nocon
                }
        });
    }

    handleCon(event) {
        this.setState({
            inputData: {
                mask: this.state.inputData.mask,
                con: event.target.value,
                nocon: this.state.inputData.nocon
            }
        });
    }

    handleNocon(event) {
        this.setState({
            inputData: {
                mask: this.state.inputData.mask,
                con: this.state.inputData.con,
                nocon: event.target.value
            }
        });
    }

    bam() {
        axios.get("http://localhost:8080/bam")
            .then(response => {
                console.log(response);
            });
    }

    render() {
        return (
            <div>
                <div>
                    <LetterInput callback = {this.handleMask}/>
                    <div>
                        <label>MASK</label>
                        <input value={this.state.mask} onChange={this.handleMask}/></div>
                    <div>
                        <label>WORD CONTAINS</label>
                        <input value={this.state.con} onChange={this.handleCon}/></div>
                    <div>
                        <label>WORD DOESN'T CONTAIN</label>
                        <input value={this.state.nocon} onChange={this.handleNocon}/></div>
                    <div>
                        <button onClick={this.sendData}>SEND</button>
                    </div>
                </div>
                <ul>
                    {this.state.suggestions.map(item => {
                        return <li>{item}</li>;
                    })}
                </ul>
            </div>

        );
    }
}