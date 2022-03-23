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

    componentDidMount() {
        const listener = event => {
            if (event.code === "ArrowUp" && this.state.length <= 99) {
                this.setState((prevState) => ({length: prevState.length - 0 + 1}));
            }
            if (event.code === "ArrowDown" && this.state.length > 1) {
                this.setState((prevState) => ({length: prevState.length - 0 - 1}));
            }
        };
        document.addEventListener("keydown", listener);
    }

    setLength(event) {
        this.setState(() => ({length: event.target.value}));
    }

    createLetterInputs() {
        let rows = [];
        for (let i = 0; i < this.state.length; i++) {

            let onChange = (event) => { //как смириться что это функция?
                if (this.checkEnglish(event)) {
                    this.props.callback(i, event.target.value);
                    handleFocus(event);
                } else {
                    event.target.value = "";
                    alert("use english characters only")
                }
            };

            const handleFocus = (e) => {
                if (e.target.nextSibling)
                    e.target.nextSibling.focus();

            }

            rows.push(<input key={i} className={"letterInput"} maxLength={1}
                             onChange={onChange}/>); //добавлять буквы в массив
        }
        localStorage.setItem("length", JSON.stringify({length: this.state.length}));
        return (<div>{rows}</div>);
    }

    checkEnglish(event) { //todo не работает event.which undefined
        let str = event.target.value;
        let letter = str.charAt(str.length - 1);
        return (letter >= 'a' && letter <= 'z') || (letter >= 'A' && letter <= 'Z') || letter === '';
    }

    handleFocus(e) {
        if (e.target.nextSibling)
            e.target.nextSibling.focus();
    }

    render() {
        return (
            <div>
                <label>LENGTH</label>
                <input type="number" step="1" className={"wordLength"} min={1} max={100} value={this.state.length}
                       onChange={this.setLength}/>
                <div>
                    {this.createLetterInputs()}
                </div>
            </div>
        );
    }
}