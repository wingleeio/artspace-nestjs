import React, { Fragment, useEffect, useState } from 'react';
import ArtGroup from './ArtGroup';
import { useSelector, useDispatch } from 'react-redux';
import { getNewWorks } from '../../../actions/works';
import Pagination from '../../shared/Pagination';
import Spinner from '../../Spinner';

function Browse({ match, history }) {
  const [page, setPage] = useState(1);
  const { newWorks, worksCount } = useSelector(state => ({
    ...state.works,
  }));

  const paginate = '/browse/';

  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (match.params.page) {
      getNewWorks(match.params.page, dispatch);
      setPage(parseInt(match.params.page));
    } else {
      getNewWorks(page, dispatch);
    }
  }, [getNewWorks, match]);

  if (newWorks.length === 0) {
    return <Spinner />;
  }

  return (
    <Fragment>
      {/* <ArtGroup groupTitle="Following" />
      <ArtGroup groupTitle="Trending" /> */}
      <ArtGroup groupTitle="Latest" works={newWorks} history={history} />
      <Pagination
        perPage={25}
        total={worksCount}
        paginate={paginate}
        page={page}
      />
    </Fragment>
  );
}

export default Browse;
