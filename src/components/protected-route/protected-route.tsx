import React, { FC } from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from '../../utils/types';
import { RouteProps } from 'react-router';

export const ProtectedRoute: FC<RouteProps> = ({ children, ...rest }) => {
  const { userUnfo } = useSelector((store: RootState) => store.userInfo);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        userUnfo.email ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
