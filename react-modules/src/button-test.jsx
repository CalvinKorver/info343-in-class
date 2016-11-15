import React from "react";

/**
 * SearchForm - implements a simple search form
 * This is a reusable React component that will
 * render a typical search form using Bootstrap
 * style classes. It will call the function 
 * passed in the `onSearch` property when the  
 * user submits the form. The search query string 
 * will be passed as the first parameter to that
 * callback function.
 */
export default class extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div class="row">
                <p>Hi</p>
            </div>
        );
    }
}