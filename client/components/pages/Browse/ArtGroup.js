import React from 'react';
import moment from 'moment';

import * as Unicons from '@iconscout/react-unicons';

function ArtGroup({ groupTitle, works, history }) {
  return (
    <section className="art-group-container">
      {/* <h1 className="art-group-title">{groupTitle}</h1> */}
      <div className="art-container">
        <div className="images-container flex flex-wrap">
          {works !== undefined &&
            works.map(work => (
              <>
                <div className="image" key={work.id}>
                  <img src={work.imageUrl} alt={`${work.title} image`} />
                  {/* begin image overlay */}
                  <div
                    className="image-overlay"
                    onClick={() => history.push(`/browse/work/${work.id}`)}
                  >
                    <div className="browse-author-container">
                      <img
                        className="browse-avatar"
                        src={work.author.avatar}
                        alt="profile image"
                      />
                      <div className="browse-title-author">
                        <p className="browse-title">{work.title}</p>
                        <div className="flex flex-between w-100">
                          <p className="browse-author">
                            {work.author.username}
                          </p>
                          <div className="flex">
                            <div className="work-action">
                              <Unicons.UilHeart size="12" />{' '}
                              {work.favouriteCount}
                            </div>
                            <div className="work-action">
                              <Unicons.UilComments size="12" />{' '}
                              {work.commentCount}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* end image overlay */}
                </div>
              </>
            ))}
        </div>
      </div>
    </section>
  );
}

export default ArtGroup;
