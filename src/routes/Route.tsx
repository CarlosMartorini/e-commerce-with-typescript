import { Redirect, Route as ReactDOMRoute } from "react-router-dom";
import { useAuth } from "../providers/authentication/Auth";

interface RouteProps {
  path: string;
  exact?: boolean;
  isPrivate?: boolean;
  component: () => JSX.Element;
}

const Route = ({
  isPrivate = false,
  component: Component,
  ...rest
}: RouteProps) => {
  const { token } = useAuth();

  return (
    <ReactDOMRoute
      {...rest}
      render={() => {
        return isPrivate === !!token ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? "/" : "/dashboard",
            }}
          />
        );
      }}
    />
  );
};

export default Route;
