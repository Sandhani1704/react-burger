import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

export function ProtectedRoute({ children, ...rest }) {
  const { userUnfo } = useSelector((store) => store.userInfo);

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
