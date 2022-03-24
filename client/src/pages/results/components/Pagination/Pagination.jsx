import React from 'react';
import { Link } from 'react-router-dom';
import Pagination from '@material-ui/lab/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem';

export default function PaginationLink() {
	return (
		<Pagination
			page={1}
			count={10}
			siblingCount={0} 
			boundaryCount={1}
			renderItem={(item) => (
				<PaginationItem
					component={Link}
					to={`/inbox${item.page === 1 ? '' : `?page=${item.page}`}`}
					{...item}
				/>
			)}
		/>
	);
}
