import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardList from '../components/CardList.js';
import SearchBox from '../components/SearchBox.js';
import Scroll from '../components/Scroll.js';
import ErrorBoundary from '../components/ErrorBoundary.js';
import './App.css';

import {setSearchField} from '../actions';
import {requestRobots} from '../actions';

const mapStateToProps = state => {
    return {
        searchField: state.searchRobots.searchField,
        robots: state.requestRobots.robots,
        isPending: state.requestRobots.isPending,
        error: state.requestRobots.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
        onRequestRobots: () => dispatch(requestRobots())
    }   
}

class App extends Component {
    // constructor() {
    //     super()
    //     this.state = {
    //         robots: [],
    //         // searchfield: '' searchfield no longer required as props being passed through redux
    //     }
        
    // }

    // constructor and super no logner required as props are being passed down through onRequestRobots, there's no more state contained here

    componentDidMount() {
        this.props.onRequestRobots();
    }

    // componentDidMount() {
    //     fetch('https://jsonplaceholder.typicode.com/users')
    //     .then(response => {
    //        return response.json();
    //     })
    //     .then(users => {
    //         this.setState({ robots: users});
    //     })
        
        
    // }

// componentDidMount no longer requires fetch call

// onSearchChange = (event) => {
//     this.setState({ searchfield: event.target.value })
    
// } onSearchChange is being passed down as props through redux

    render() {
        const { searchField, onSearchChange, robots, isPending } = this.props;
        const filteredRobots = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchField.toLowerCase())
        })
        if (isPending === true) {
            return <h1>Loading</h1>
        } else {

        return (
        <div className='tc'>
        <h1 className='f1'>Robofriends</h1>
        <SearchBox searchChange={onSearchChange}/>
        <Scroll>
            <ErrorBoundary>
            <CardList robots={filteredRobots}/>
            </ErrorBoundary>
        </Scroll>
        </div>
    )
    }
}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);