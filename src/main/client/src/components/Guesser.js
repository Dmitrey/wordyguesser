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
            suggestions: [],
            letters: [],
            loading: false
        }
        this.request = this.request.bind(this);
        this.handleCon = this.handleCon.bind(this);
        this.handleNocon = this.handleNocon.bind(this);
        this.getLetter = this.getLetter.bind(this);
    }

    componentDidMount() {
        const listener = event => {
            if (event.code === "Enter" || event.code === "NumpadEnter") {
                console.log("Enter key was pressed. Run your function.");
                event.preventDefault();
                this.request();
            }
            if (event.code === "KeyUp") {

            }
        };
        document.addEventListener("keydown", listener);
    }

    request() {
        this.setState({
            loading: true,
            suggestions: []
        });
        let newArr = [];
        let length = JSON.parse(localStorage.getItem("length")).length;
        newArr.length = length;
        for (let i = 0; i < length; i++) {
            newArr[i] = this.state.letters[i];
        }
        this.setState({letters: newArr}, () => this.createMask()); // вызывается через коллбэк, чтобы функция запустилась точно после setState(), в противном случае сожет быть использовано старое состояние
    }

    createMask() {
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

        axios.post("/find", inputData)
            .then(response => this.setState(response.data.length === 0
                ? {suggestions: ["nothing found"], loading: false}
                : {suggestions: response.data, loading: false}))
    };

    handleCon(event) {
        if (this.checkEnglish(event)) {
            this.setState({
                con: event.target.value
            });
        } else {
            this.setState(prevState => ({
                con: prevState.con
            }));
            alert("use english characters only");
        }
    }

    handleNocon(event) {
        if (this.checkEnglish(event)) {
            this.setState({
                noCon: event.target.value
            });
        } else {
            this.setState(prevState => ({
                noCon: prevState.noCon
            }));
            alert("use english characters only");
        }
    }

    getLetter(id, value) {
        this.setState(update(this.state, {
            letters: {
                [id]: {$set: value}
            }
        }));
        console.log(this.state.letters);
    }

    checkEnglish(event) {
        let str = event.target.value;
        let letter = str.charAt(str.length - 1);
        return (letter >= 'a' && letter <= 'z') || (letter >= 'A' && letter <= 'Z') || letter === '';
    }

    render() {
        const loadingElement = <li>LOADING</li>;
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
                        <button onClick={this.request}>FIND</button>
                    </div>
                </div>
                <ul>
                    {this.state.loading ? loadingElement : ""}
                    {this.state.suggestions.map(item => {
                        return <li>{item}</li>;
                    })}
                </ul>
            </div>
        );
    }
}