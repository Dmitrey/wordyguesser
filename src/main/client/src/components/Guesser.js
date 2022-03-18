import {Component} from "react";
import axios from "axios";
import {LetterInput} from "./LetterInput";
import update from 'react-addons-update';

export class Guesser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputData: {
                mask: "",
                con: "",
                nocon: ""
            },
            suggestions: ["nothing"],
            letters: []
        }
        this.sendData = this.sendData.bind(this);
        this.handleCon = this.handleCon.bind(this);
        this.handleNocon = this.handleNocon.bind(this);
        this.getLetter = this.getLetter.bind(this);
    }

    sendData() {
        this.createMask();
        console.log(this.state.inputData);
        axios.post("http://10.247.13.117:8080/hey", this.state.inputData)
            .then(response => this.setState(response.data.length === 0 ? {suggestions: ["nothing found"]} : {suggestions: response.data}))
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

    // getLetter(id, value) {
    //     let newArray = this.state.letters.slice(0, this.state.letters.length);
    //     newArray[id] = value;
    //     console.log(newArray);
    //     this.setState(prevState => ({
    //         letters: newArray
    //     })) //todo другие объекты нужно добавлять?
    // }

    getLetter(id, value) {
        //this.state.letters.length = length;// так работает
        this.setState(update(this.state, {
            letters: {
                [id]: {$set: value}
            }
        }));
        console.log(this.state.letters);
    }

    createMask() {
        let newArr = [];
        newArr.length = JSON.parse(localStorage.getItem("length")).length;
        for (let i = 0; i < JSON.parse(localStorage.getItem("length")).length; i++){
            newArr[i] = this.state.letters[i];
        }
        this.setState({letters:newArr});

        let mask = "";
        for (let l of this.state.letters) {
            if (l === "" || l === undefined || l === null) {
                mask += ".";
            } else {
                mask += l;
            }
        }
        this.setState({
            inputData: {
                mask: mask,
                con: this.state.inputData.con,
                nocon: this.state.inputData.nocon
            }
        });
    }

    render() {
        return (
            <div>
                <div>
                    <LetterInput callback={this.getLetter}/>
                    <div>
                        <label>WORD CONTAINS</label>
                        <input value={this.state.con} onChange={this.handleCon}/>
                    </div>
                    <div>
                        <label>WORD DOESN'T CONTAIN</label>
                        <input value={this.state.nocon} onChange={this.handleNocon}/>
                    </div>
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