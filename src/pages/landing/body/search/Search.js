import React from 'react';
import {MyAutocomplete} from "../../../../utils/autocomplete/MyAutocomplete";
import {ReactComponent as SearchIcon} from "../../../../img/search.svg"

import "./Search.css";

export class Search extends React.PureComponent {

    render() {
        return (
            <div className="s">
                <MyAutocomplete tabIndex={0} suggestions={["test", "hello"]} value={"test"}/>
                <SearchIcon className="s__i"/>
            </div>
        )
    }
}
