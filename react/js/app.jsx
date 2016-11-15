/**
 * app.jsx
 * main entry point for our React application
 */
"use strict";

class NameForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {name: ""};
    }
    
    // Set state is what we use when we want when the data has changed and we want to re-render
    handleChange(event) {
        this.setState({name: event.target.value});
        this.props.onChange(event.target.value); // Ca
    }

    render() {
        return (
            <form>
                <input type="text"
                className="form control"
                value={this.state.name}
                onChange={event => this.handleChange(event)} />
            </form>
        );
    }
}


// In JSX, we can define classes, and extend from React
class Hello extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        
        // this.props accesses the property value of this
        // You can add any number of props and utilize them in render method
        return (<h2>Hello {this.props.title} {this.props.name}! </h2>);      
    }

}

class App extends React.Component {
    // This takes in properties and passes them out
    constructor(props) {
        super(props);
        this.state = {name: ""}
    }
    
    // Every time the name change, we call this method to change the name
    handleNameChange(name) {
        this.setState({name: name}); // Reset our change
        
    }

    render() {
        return (
            <div>
                <NameForm onChange={name => this.handleNameChange(name)}> </NameForm>
                <Hello name = {this.state.name}> </Hello>
            </div>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById("app"));