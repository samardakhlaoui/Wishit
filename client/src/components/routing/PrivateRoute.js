import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ component: Component, adminComponent: AdminComponent, ...rest }) => {
  const authToken = localStorage.getItem("authToken");
  const isAdmin = localStorage.getItem("admin") === "true";

  return (
    <Route
      {...rest}
      render={(props) =>
        authToken ? (
          isAdmin ? (
            <AdminComponent {...props} />
          ) : (
            <Component {...props} />
          )
        ) : (
          <Redirect to="/signin" />
        )
      }
    />
  );
};

export default PrivateRoute;
