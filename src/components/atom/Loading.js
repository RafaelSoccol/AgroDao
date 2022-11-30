import React from 'react';
import {Spin} from 'antd';

/*
  Átomo de Loading. Mostra o spinner quando isLoading = true.
  Em geral, deve englobar todos os componentes da tela.
*/
export default function Loading(props) {
  const {isLoading, children} = props;
  return (
    <Spin size="large" spinning={isLoading} style={{position: 'absolute'}}>
      {children}
    </Spin>
  );
}
