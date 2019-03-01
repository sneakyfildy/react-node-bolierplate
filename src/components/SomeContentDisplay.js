import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
//
import NoDataSorry from './NoDataSorry';

export class SomeContentDisplay extends React.Component {
    onDataItemClick(arg) {
        console.log('SomeContentDisplay: data item click', arg);
        this.props.history.push(`/${this.props.match.params.page}/${arg}`);
    }

    componentWillMount() {
        console.log('SomeContentDisplay: will mount');
    }

    renderData() {
        return this.props.someData.items.map((dataItem, index) => {
            if (dataItem) {
                const className = 'some-calculcated-class';
                return (
                    <div
                        key={index}
                        className={className}
                        onClick={() => {this.onDataItemClick(dataItem.someKey || 'someKey')}}
                        >
                        {dataItem.text}
                    </div>
                );
            }
        });
    }

    render() {
        return (
            <div className="some-data-component">
            {this.props.someData.isLoading &&
                <span className="loading-mask">Data is loading...</span>}
            {!!this.props.someData.items &&
                (
                <div>
                    <div className="component-caption">Component Caption</div>
                    <div className="data-display">
                        {this.renderData()}
                    </div>
                </div>
                )
            }
            {!this.props.someData.items && !this.props.someData.isLoading &&
                <NoDataSorry section="location"/>}
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        someStaticFlag: state.someStaticFlag,
        someData: state.someData
    };
};


export default withRouter(connect(mapStateToProps)(SomeContentDisplay));