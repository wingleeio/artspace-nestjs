import React, { Fragment, useEffect, useState } from 'react';
import ArtGroup from './ArtGroup';
import { useSelector, useDispatch } from 'react-redux';
import { getNewWorks, getFollowingWorks } from '../../../actions/works';
import Pagination from '../../shared/Pagination';
import Spinner from '../../Spinner';
import { SHOW_FOLLOWING, SHOW_LATEST } from '../../../actions/types';

function Browse({ match, history }) {
  const [page, setPage] = useState(1);
  // const [showFollowing, setShowFollowing] = useState(true);
  const {
    user,
    newWorks,
    followingWorks,
    newWorksCount,
    followingWorksCount,
    token,
    isAuthenticated,
    showFollowing,
  } = useSelector(state => ({
    ...state.works,
    ...state.user,
  }));

  const paginate = '/browse/';

  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!isAuthenticated || !user.followingCount > 0) {
      dispatch({ type: SHOW_LATEST });
    }

    if (match.params.page) {
      getNewWorks(match.params.page, dispatch);
      if (isAuthenticated) {
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        getFollowingWorks(match.params.page, config, dispatch);
      }
      setPage(parseInt(match.params.page));
    } else {
      if (isAuthenticated) {
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        getFollowingWorks(page, config, dispatch);
      }
      getNewWorks(page, dispatch);
    }
  }, [getNewWorks, getFollowingWorks, match]);

  if (newWorks.length === 0) {
    return <Spinner />;
  }

  return (
    <Fragment>
      <div className="tab-toggle">
        {isAuthenticated && user.followingCount > 0 && (
          <a
            className={showFollowing === true ? 'btn-success' : ''}
            onClick={() => {
              dispatch({ type: SHOW_FOLLOWING });
              history.push('/browse');
            }}
          >
            Latest Following
          </a>
        )}

        <a
          className={showFollowing === false ? 'btn-success' : ''}
          onClick={() => {
            dispatch({ type: SHOW_LATEST });
            history.push('/browse');
          }}
        >
          Latest All
        </a>
      </div>
      {isAuthenticated && user.followingCount > 0 && showFollowing === true ? (
        <>
          <ArtGroup works={followingWorks} history={history} />
          <Pagination
            perPage={25}
            total={followingWorksCount}
            paginate={paginate}
            page={page}
          />
        </>
      ) : (
        <>
          <ArtGroup works={newWorks} history={history} />
          <Pagination
            perPage={25}
            total={newWorksCount}
            paginate={paginate}
            page={page}
          />
        </>
      )}
    </Fragment>
  );
}

export default Browse;
