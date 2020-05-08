import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { map } from "lodash";
import configRouting from "./configRouting";

export default function Routing(props) {
  const { setRefresCheckLogin } = props;
  return (
    <Router>
      <Switch>
        {map(configRouting, (route, index) => (
          <Route key={index} path={route.path} exact={route.exact}>
            <route.page setRefresCheckLogin={setRefresCheckLogin} />
          </Route>
        ))}
      </Switch>
    </Router>
  );
}
