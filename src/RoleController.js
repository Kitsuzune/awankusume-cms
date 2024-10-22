export const getAccessibleRoutes = (routes, role) => {
    if (role === "SUPER_ADMIN" || role === "ADMIN") {
      return routes; // All routes are accessible for SUPER_ADMIN and ADMIN
    }
  
    return routes.filter(route => {
      if (role === "MAKELAR") {
        const accessibleMakelarPaths = [
          '/app/dashboard',
          '/app/tracking',
          '/app/tracking/',
          '/app/share-auth',
          '/app/users'
        ];
  
        return (route.path && accessibleMakelarPaths.some(basePath => 
          route.path.startsWith(basePath)
        )) || 
        (route.components && route.components.some(subRoute =>
          subRoute.submenu ? 
          subRoute.submenu.some(nestedRoute =>
            nestedRoute.path && accessibleMakelarPaths.some(basePath => 
              nestedRoute.path.startsWith(basePath)
            )
          ) : subRoute.path && accessibleMakelarPaths.some(basePath => 
            subRoute.path.startsWith(basePath)
          )
        ));
      }
  
      if (role === "CONTRIBUTION") {
        const accessibleContributionPaths = [
          '/app/dashboard',
          '/app/post',
          '/app/users'
        ];
  
        return (route.path && accessibleContributionPaths.some(basePath => 
          route.path.startsWith(basePath)
        )) ||
        (route.components && route.components.some(subRoute =>
          subRoute.submenu ? 
          subRoute.submenu.some(nestedRoute =>
            nestedRoute.path && accessibleContributionPaths.some(basePath =>
              nestedRoute.path.startsWith(basePath)
            )
          ) : subRoute.path && accessibleContributionPaths.some(basePath =>
            subRoute.path.startsWith(basePath)
          )
        ));
      }
  
      return false;
    });
};