import React, { lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Loading from 'components/shared-components/Loading';
import { APP_PREFIX_PATH } from 'configs/AppConfig'

export const AppViews = () => {
  return (
    <Suspense fallback={<Loading cover="content"/>}>
      <Switch>
        <Route path={`${APP_PREFIX_PATH}/home`} component={lazy(() => import(`./home`))} />
        
          <Route path={`${APP_PREFIX_PATH}/cadastro`} component={lazy(() => import(`./cadastro`))} />

          <Route path={`${APP_PREFIX_PATH}/edicao`} component={lazy(() => import(`./edicao`))} />

          <Route path={`${APP_PREFIX_PATH}/editar/:id`} component={lazy(() => import(`./editar`))} />

          <Route path={`${APP_PREFIX_PATH}/historico`} component={lazy(() => import(`./historico`))} />

        <Route path={`${APP_PREFIX_PATH}/visualizar-historico/:id`} component={lazy(() => import(`./visualizar-historico`))} />
          
        <Redirect from={`${APP_PREFIX_PATH}`} to={`${APP_PREFIX_PATH}/home`} />
      </Switch>
    </Suspense>
  )
}

export default React.memo(AppViews);