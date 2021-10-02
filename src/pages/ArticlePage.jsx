import React from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import faker, { database } from 'faker'
import { useParams } from 'react-router-dom'
import { useArticle } from '../hooks'
import { ArticleMeta } from '../components'
import authUser from '../server'

function ArticlePage() {
  const { slug } = useParams()
  const { data } = useArticle({ slug })

  return (
    <div className="article-page">
      <div className="banner">
        <div className="container">
          <h1>{data.title}</h1>
          <div className="article-meta">
            <ArticleMeta article={data}></ArticleMeta>
          </div>
        </div>
      </div>
      <div className="container page">
        <div className="row article-content">
          <div className="col-md-12">
            <p>{data.description}</p>
            <p>{data.body}</p>
          </div>
        </div>
        <hr />
        <div className="article-actions">
          <div className="article-meta">
            <ArticleMeta article={data}></ArticleMeta>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-md-8 offset-md-2">
            <form className="card comment-form">
              <div className="card-block">
                <textarea required className="form-control" placeholder="Write a comment..." rows={3} />
              </div>
              <div className="card-footer">
                <img
                  src={
                    // @ts-ignore
                    authUser?.image
                  }
                  className="comment-author-img"
                />
                <button disabled={false} type="submit" className="btn btn-sm btn-primary">
                  Post Comment
                </button>
              </div>
            </form>
            <div className="card">
              <div className="card-block">
                <p className="card-text">{faker.lorem.paragraph()}</p>
              </div>
              <div className="card-footer">
                <a className="comment-author">
                  <img
                    src={
                      // @ts-ignore
                      authUser?.image
                    }
                    className="comment-author-img"
                  />
                </a>
                &nbsp;
                <a className="comment-author">{faker.internet.userName()}</a>
                <span className="date-posted">{new Date(faker.date.past()).toDateString()}</span>
                <span className="mod-options">
                  <i className="ion-trash-a" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ArticlePage
