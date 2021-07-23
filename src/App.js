import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Bar from "./components/Bar";
import Invoices from "./components/Invoices";
import Details from "./components/Details";

//redux
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <Router>
      <Provider store={store}>
        <Bar />
        <Switch>
          <Route exact path="/" component={Invoices} />
          <Route exact path="/details/:id" component={Details} />
        </Switch>
      </Provider>
    </Router>
  );
}

export default App;
