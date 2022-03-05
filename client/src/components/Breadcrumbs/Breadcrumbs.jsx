import React from "react";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";

import { CustomRouterLink } from 'components';

export default function MyBreadcrumbs(props) {
  const { historyBreadcrumbs, ...rest } = props;

  return (
    <Breadcrumbs {...rest}>
      {historyBreadcrumbs
        .split("/")
        .slice(1)
        .map((location, index) => {
          let label = location.charAt(0).toUpperCase() + location.slice(1).replace('-', ' ');
          let path =
            "/admin/" +
            historyBreadcrumbs
              .split("/")
              .slice(1, index + 2)
              .join("/");
          if (path === "/admin" + historyBreadcrumbs) {
            return (
              <Typography key={path} color="textPrimary">
                {label}
              </Typography>
            );
          }
          return (
            <Link
              key={path}
              to={path}
              color="inherit"
              component={CustomRouterLink}
            >
              {label}
            </Link>
          );
        })}
    </Breadcrumbs>
  );
}
