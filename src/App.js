import React, { Component } from 'react';
import { Provider } from 'react-redux';
import RouterNav from './Route';
import store from './store';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DrawerList from './components/drawerList';

// import Counter from './container/counter';

class App extends Component {
    render() {
        return (
            <Provider store={store}>

                <MuiThemeProvider>
                    <div>
                        {/* <Counter /> */}
                        <DrawerList />
                        <RouterNav />
                    </div>
                </MuiThemeProvider>
            </Provider>
        )
    }
}
export default App;