import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import queryString from 'query-string';
import Pagination from '@material-ui/lab/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem';

export default function PaginationLink() {

	const location = useLocation();
	const { numberOfPages } = useSelector(state => state.products.productsSearch);

    const getFullSearch = pag => {
    	if (pag === 1) {
    		const parsed = queryString.parse(location.search);
    		parsed.page = undefined;    
    		let query = queryString.stringify(parsed);
    		return '?' + query;
    	} else {
    		const parsed = queryString.parse(location.search);
    		parsed.page = pag;    
    		let query = queryString.stringify(parsed);
    		return '?' + query;
    	}
    }

	return (
		<Pagination
			page={Number(queryString.parse(location.search).page) || 1}
			count={numberOfPages - 1}
			siblingCount={0} 
			boundaryCount={1}
			renderItem={(item) => (
				<PaginationItem
					component={Link}
					to={`${location.pathname + getFullSearch(item.page)}`}
					{...item}
				/>
			)}
		/>
	);
}
