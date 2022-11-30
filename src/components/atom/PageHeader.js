import React from 'react';
import Flex from '../shared-components/Flex';
import {PlusOutlined} from '@ant-design/icons';
import utils from 'utils';
import {Grid} from 'antd';

/*
    Átomo que mostrar só um Header. Geralmente usado acima
    de páginas de listas.
*/

function PageHeader(props) {
    const {
        title,
        subTitle,
        colorTitle = '#1C355E',
    } = props;
    const {useBreakpoint} = Grid;
    const screens = utils.getBreakPoint(useBreakpoint());
    const isMobile = !screens.includes('lg');

    return (
        <div className="container-fluid" style={{overflow: 'auto'}}>
            <Flex justifyContent="left" alignItems="center" className="py-4">
                <div style={{flexGrow: 1, display: 'flex', alignItems: 'center'}}>
                    <div
                        style={{
                            fontSize: isMobile ? '24px' : '48px',
                            color: colorTitle,
                            letterSpacing: -1,
                            fontWeight: 600,
                        }}>
                        {subTitle && <div style={{fontSize: isMobile ? 17 : 24, marginBottom: -10}}>{subTitle}</div>}
                        {title}
                    </div>
                </div>
            </Flex>
        </div>
    );
}

export default PageHeader;
