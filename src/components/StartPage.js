import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import { Link } from 'react-router-dom';
//

export class StartPage extends React.Component {
    constructor(props) {
        super(props);
        this.title = 'Start page';
        this.useAutoRedirect = true;
        this.state = {
        };
    }
    componentDidMount() {
        try {
            const redirectTo = 'test';
            if (this.useAutoRedirect){
                console.log('Using auto-redirect to', redirectTo);
                this.props.history.push('/' + redirectTo);
            }
            
        } catch (err) {
            console.error('Can not do initial redirect', err);
        }
    }
    componentDidUpdate(prevProps, prevState) {
    }
    componentWillUnmount() {
    }
    render() {
        return (
            <div>
                <div>
                    <Link to="/somewhere">To somewhere</Link>
                </div>
                start page
            </div>
        );
    }
}

const StartPageWithRouter = withRouter(connect()(StartPage));

export default StartPageWithRouter