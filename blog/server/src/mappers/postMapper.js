class PostMapper {
  mapThirdPartyPostList(posts) {
    return {
      data: posts.data,
      page: posts.page+1,
      total: posts.total,
    }
  }
}

module.exports = new PostMapper();
