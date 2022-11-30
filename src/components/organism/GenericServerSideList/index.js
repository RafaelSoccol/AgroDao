import React, { useEffect, useState } from 'react'
import { Table, Button } from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import Loading from 'components/atom/Loading';
import { PageHeaderAlt } from 'components/layout-components/PageHeaderAlt';
import Flex from 'components/shared-components/Flex';

//TODO: após clonar o skeleton, entender como os filtros funcionam no back-end para ajustar o método onChangeTable()
/*
    Classe para criar um component de lista que é paginado no server.
    Cuidado ao usar essa classe em outros projetos, já que o método onChangeTable() provavelmente vai
    ter que ser adaptado à como o back-end recebe os dados de paginação.
*/
const GenericServerSideList = (props) => {

    const { title, newLabel = "Novo", newUrl, pageSize, columns, getItemsAndTotal } = props;

	const [items, setItems] = useState([]);
	const [totalCount, setTotalCount] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const getItems = async (page, orderIndex, orderDirection, filters) => {
		setIsLoading(true);

        const {items, recordsTotal} = await getItemsAndTotal(page, orderIndex, orderDirection, filters);
		setItems(items);
		setTotalCount(recordsTotal);

		setIsLoading(false);
	}

	useEffect(() => {
		getItems(0);
	}, []);

	const onChangeTable = (pagination, filters, sorter, extra) => {
		var orderIndex = columns.findIndex((c) => c.key === sorter.column?.key);
		orderIndex = orderIndex !== -1 ? orderIndex : 0;

		var orderDirection = sorter.order === 'descend' ? 'desc' : 'asc';

		var filtros = [];
		
		for(const key of Object.keys(filters)) {
			if(filters[key]) {
				filtros.push({
					id: key,
					value: filters[key]
				});
			}
		}

		getItems(pagination.current - 1, orderIndex, orderDirection, filtros);
	}

	return (
		<Loading isLoading={isLoading}>
			<div>
				<PageHeaderAlt className="border-bottom">
				<div className="container-fluid">
					<Flex justifyContent="between" alignItems="center" className="py-4">
						<h2>{title}</h2>
						{newUrl && (
							<div>
								<Button type="primary" className="ml-2" href={newUrl}>
								<PlusOutlined />
								<span>{newLabel}</span>
								</Button>
							</div>
						)}
					</Flex>
				</div>
				</PageHeaderAlt>
				<div style={{marginTop: 15}} className="code-box">
					<section className="code-box-demo">
						<Table 
							rowKey='_id' 
							columns={columns.filter(item => !item.hidden)} 
							dataSource={items}
							pagination={{
								pageSize: pageSize,
								total: totalCount
							}}
							onChange={onChangeTable}
						/>
					</section>
				</div>
			</div>
		</Loading>
	);
}

export default GenericServerSideList
