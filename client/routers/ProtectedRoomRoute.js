import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { isAllowed } from '../utils/roomUtil';

const ProtectedRoomRoute = ({ component: Component, layout: Layout, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
        isAllowed(props) ? (
        <Layout>
          <Component {...props} />
        </Layout>
      ) : (
        <Redirect
          to={{
            pathname: '/leagues',
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

export default ProtectedRoomRoute;