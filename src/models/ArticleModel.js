import AuthorModel from './AuthorModel'

class ArticleModel {
  constructor({
    slug = '',
    title = '',
    description = '',
    body = '',
    tagList = [],
    createdAt = '',
    updatedAt = '',
    favorited = false,
    favoritesCount = 0,
    author = {},
  } = {}) {
    this.slug = slug
    this.title = title
    this.description = description
    this.body = body
    this.tagList = tagList
    this.createdAt = new Date(createdAt).toDateString()
    this.updatedAt = new Date(updatedAt).toDateString()
    this.favorited = favorited
    this.favoritesCount = favoritesCount
    this.author = new AuthorModel(author)
  }
}

export default ArticleModel
