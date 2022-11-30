import { PageHeader } from 'antd'
import React from 'react'

/*
    Átomo que mostrar só um Header com uma seta para voltar. Geralmente usado acima
    de páginas de formulários.
*/
export default function BackPageHeader(props) {
    const { title, link } = props;

    return (
        <PageHeader
            style={{
                borderBottom: '1px solid rgb(235, 237, 240)',
                background: 'white',
                marginLeft: -25,
                marginRight: -25,
                marginTop: -25,
            }}
            //onBack={() => window.location = link}
            title={title}
        />
    )
}
