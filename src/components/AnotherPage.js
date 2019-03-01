import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom'
//
import { getSomethingByParam } from '../actions/smth-by-param';
import SomeContentDisplay from './SomeContentDisplay';

export class AnotherPage extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        let { page } = this.props.match.params;

        if (!!page) {
            this.props.dispatch(getSomethingByParam(page));
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.props.match.params.page !== prevProps.match.params.page) {
            // page param was updated
            this.updateSomethingByParam();
        }
    }
    componentWillUnmount() {
    }

    updateSomethingByParam() {
        let { page } = this.props.match.params;
        if (!!page) {
            console.log('fetching something by param', page);
            this.props.dispatch(getSomethingByParam(page));
        }
    }

    render() {
        return (
            <div>
                <Link to="/">To main page</Link>
                page var: {this.props.match.params.page}
                <SomeContentDisplay />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        someData: state.someData
    };
};

export default withRouter(connect(mapStateToProps)(AnotherPage))