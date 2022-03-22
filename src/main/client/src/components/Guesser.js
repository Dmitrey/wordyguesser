import {Component} from "react";
import axios from "axios";
import {LetterInput} from "./LetterInput";
import update from 'react-addons-update';

export class Guesser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mask: "",
            con: "",
            noCon: "",
            suggestions: ["nothing"],
            letters: []
        }
        this.request = this.request.bind(this);
        this.handleCon = this.handleCon.bind(this);
        this.handleNocon = this.handleNocon.bind(this);
        this.getLetter = this.getLetter.bind(this);
    }

    request() {
        let newArr = [];
        let length = JSON.parse(localStorage.getItem("length")).length;
        newArr.length = length;
        for (let i = 0; i < length; i++) {
            newArr[i] = this.state.letters[i];
        }
        this.setState({letters: newArr}, () => this.createMask()); // вызывается через коллбэк, чтобы функция запустилась точно после setState(), в противном случае сожет быть использовано старое состояние
    }

    createMask () {
        let mask = "";
        for (let l of this.state.letters) {
            if (l === "" || l === undefined || l === null) {
                mask += ".";
            } else {
                mask += l;
            }
        }

        this.setState({
            mask: mask
        }, () => this.sendData()); // сетаем маску и после этого используем её, т.е. коллбэк запускается только по завершению setState()
    };

    sendData() {
        let inputData = {"mask": this.state.mask, "con": this.state.con, "nocon": this.state.noCon}
        console.log(inputData);
        axios.post("https://thawing-inlet-75416.herokuapp.com/find", inputData)
            .then(response => this.setState(response.data.length === 0 ? {suggestions: ["nothing found"]} : {suggestions: response.data}))
    };

    handleCon(event) {
        this.setState({
            con: event.target.value
        });
    }

    handleNocon(event) {
        this.setState({
            noCon: event.target.value
        });
    }

    getLetter(id, value) {
        this.setState(update(this.state, {
            letters: {
                [id]: {$set: value}
            }
        }));
        console.log(this.state.letters);
    }

    render() {
        return (
            <div>
                <div className={"main"}>
                    <br/>
                    <LetterInput callback={this.getLetter}/>
                    <div>
                        <label>WORD CONTAINS</label>
                        <input value={this.state.con} onChange={this.handleCon}/>
                    </div>
                    <div>
                        <label>WORD DOESN'T CONTAIN</label>
                        <input value={this.state.noCon} onChange={this.handleNocon}/>
                    </div>
                    <div>
                        <button onClick={this.request}>SEND</button>
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