"use strict";

// This is how we used to do it with an in-line anonymous function
//
// var females = BABYNAMES.filter(function(record) {
//     return "F" == record.sex;
// });
// New way to do it
var females = BABYNAMES.filter(record => "F" == record.sex);
var topFemNames = 
females.sort((a, b) => b.count - a.count).slice(0, 100);

console.log(females.length);

// We can implement the React component as a JS class based method
// All react components are classes that extend React.Component
class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var colMeta =  {
            count: {
                type: columnTypes.numeric,
                caption: "Number of Babies"
            },

            sex: {
                caption: "Sex"
            },

            name: {
                caption: "Name"
            }
        }
        return (    
            <div className="container">
                <h1>Most Popular Female Baby Names from 1996!</h1>
                <DataTable records = {this.props.records} 
                    columnMeta = {colMeta} />

            </div>
        );
    }
}

//render the App component to the element with id="app"
ReactDOM.render(<App records={topFemNames}/>, document.getElementById("app"));

// <li>{this.props.records.length}</li>
// for this.props.records.map returns an li element that we are placing in the DOM
// The first set of curly braces define a JS expression

//<ul>
//    {this.props.records.map(record => <li key = {record.name}> {record.name{record.count} </li>)     
//</ul>
