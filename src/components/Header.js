import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';

import DebugControls from './DebugControls';

export class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentDidMount() {
    }
    componentDidUpdate(prevProps, prevState) {
    }
    componentWillUnmount() {
    }
    render() {
        return (
            <header>
                <div className="header-inner-wrap">
                    <span className="logo-text">Logo text</span>
                    <DebugControls />
                </div>
            </header>
        );
    }
}

export default connect()(Header)
