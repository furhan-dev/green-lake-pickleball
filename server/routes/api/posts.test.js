const request = require('supertest');

const server = require('../../server');
const testUtils = require('../../utils/test-utils');
const jwt = require('jsonwebtoken');

const User = require('../../models/user');
const Post = require('../../models/post');

describe('/posts', () => {
  beforeAll(testUtils.connectDB);
  afterAll(testUtils.stopDB);

  afterEach(testUtils.clearDB);

  const post0 = {
    title: 'Post One',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ultrices neque ornare aenean euismod. Congue nisi vitae suscipit tellus mauris a diam maecenas sed. Cursus sit amet dictum sit amet. Mus mauris vitae ultricies leo integer malesuada nunc vel risus. Congue nisi vitae suscipit tellus mauris a. Rutrum tellus pellentesque eu tincidunt. In hendrerit gravida rutrum quisque. Pretium aenean pharetra magna ac placerat vestibulum lectus. Consectetur lorem donec massa sapien faucibus et. Nulla pellentesque dignissim enim sit amet venenatis urna cursus. Mattis aliquam faucibus purus in massa tempor nec. Volutpat commodo sed egestas egestas fringilla.',
    date: '2023-03-21T06:19:39.123Z',
  };
  const post1 = {
    title: 'Second Post',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Et tortor consequat id porta nibh venenatis. Pellentesque diam volutpat commodo sed egestas egestas fringilla phasellus.',
    date: '2023-06-14T06:19:39.123Z',
  };

  describe('Before login', () => {
    describe('POST /', () => {
      it('should send 401 without a token', async () => {
        const res = await request(server).post('/api/posts').send(post0);
        expect(res.statusCode).toEqual(401);
      });
      it('should send 401 with a bad token', async () => {
        const res = await request(server)
          .post('/api/posts')
          .set('Authorization', 'Bearer BAD')
          .send(post0);
        expect(res.statusCode).toEqual(401);
      });
    });
    describe.each([post0, post1])('GET /:id post %#', (post) => {
      let originalPost;
      const user = {
        email: 'user@mail.com',
        password: '678password',
        username: 'admin poster',
      };
      let adminToken;
      let userId;
      let postId;
      beforeEach(async () => {
        await request(server).post('/api/login/signup').send(user);
        await User.updateOne(
          { email: user.email },
          { $push: { roles: 'admin' } }
        );
        const res0 = await request(server).post('/api/login').send(user);
        adminToken = res0.body.token;
        userId = jwt.decode(adminToken)._id;
        const res = await request(server)
          .post('/api/posts')
          .set('Authorization', 'Bearer ' + adminToken)
          .send(post);
        postId = res.body._id;
      });
      it('should send 200 to everyone and return post', async () => {
        const res = await request(server).get(`/api/posts/${postId}`).send();
        expect(res.statusCode).toEqual(200);
        expect(res.body).toMatchObject([
          {
            ...post,
            author: user.username,
          },
        ]);
      });
    });
    describe('GET /', () => {
      let posts;
      const user = {
        email: 'user@mail.com',
        password: '678password',
        username: 'admin poster',
      };
      let adminToken;
      let userId;
      beforeEach(async () => {
        await request(server).post('/api/login/signup').send(user);
        await User.updateOne(
          { email: user.email },
          { $push: { roles: 'admin' } }
        );
        const res1 = await request(server).post('/api/login').send(user);
        adminToken = res1.body.token;
        userId = jwt.decode(adminToken)._id;
        posts = (
          await Post.insertMany([
            { ...post0, userId },
            { ...post1, userId },
          ])
        ).map((i) => i.toJSON());
        posts.forEach((i) => (i._id = i._id.toString()));
      });
      it('should send 200 to everyone and return all posts', async () => {
        const res = await request(server).get('/api/posts/').send();
        expect(res.statusCode).toEqual(200);
        expect(res.body).toMatchObject([post0, post1]);
      });
    });
  });
  describe('after login', () => {
    const user0 = {
      email: 'user0@mail.com',
      password: '123password',
      username: 'first-user',
    };
    const user1 = {
      email: 'user1@mail.com',
      password: '456password',
      username: 'second user',
    };
    let token0;
    let adminToken;
    beforeEach(async () => {
      await request(server).post('/api/login/signup').send(user0);
      const res0 = await request(server).post('/api/login').send(user0);
      token0 = res0.body.token;
      await request(server).post('/api/login/signup').send(user1);
      await User.updateOne(
        { email: user1.email },
        { $push: { roles: 'admin' } }
      );
      const res1 = await request(server).post('/api/login').send(user1);
      adminToken = res1.body.token;
    });
    describe.each([post0, post1])('POST / post %#', (post) => {
      it('should send 403 to normal user and not store post', async () => {
        const res = await request(server)
          .post('/api/posts')
          .set('Authorization', 'Bearer ' + token0)
          .send(post);
        expect(res.statusCode).toEqual(403);
        expect(await Post.countDocuments()).toEqual(0);
      });
      it('should send 200 to admin user and store post', async () => {
        const res = await request(server)
          .post('/api/posts')
          .set('Authorization', 'Bearer ' + adminToken)
          .send(post);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toMatchObject(JSON.stringify(post));
        const savedPost = await Post.findOne({ _id: res.body._id }).lean();
        expect(savedPost).toMatchObject(JSON.stringify(post));
      });
    });
    describe.each([post0, post1])('GET /:id post %#', (post) => {
      let originalPost;
      beforeEach(async () => {
        const res = await request(server).post('/api/posts').send(post);
        originalPost = res.body;
      });
      it('should send 200 to logged in user and return post', async () => {
        const res = await request(server)
          .get('/api/posts/' + originalPost._id)
          .set('Authorization', 'Bearer ' + token0)
          .send();
        expect(res.statusCode).toEqual(200);
        expect(res.body).toMatchObject(originalPost);
      });
    });
    describe.each([post0, post1])('PUT / post %#', (post) => {
      let originalPost;
      beforeEach(async () => {
        const res = await request(server)
          .post('/api/posts')
          .set('Authorization', 'Bearer ' + adminToken)
          .send(post);
        originalPost = res.body;
      });
      it('should send 403 to normal user and not update post', async () => {
        const res = await request(server)
          .put('/api/posts/' + originalPost._id)
          .set('Authorization', 'Bearer ' + token0)
          .send({
            ...post,
            content: `${post.content} some additional content`,
          });
        expect(res.statusCode).toEqual(403);
        const newPost = await Post.findById(originalPost._id).lean();
        newPost._id = newPost._id.toString();
        expect(newPost).toMatchObject(JSON.stringify(originalPost));
      });
      it('should send 200 to admin user and update post', async () => {
        const res = await request(server)
          .put('/api/posts/' + originalPost._id)
          .set('Authorization', 'Bearer ' + adminToken)
          .send({
            ...post,
            content: `${post.content} some additional content`,
          });
        expect(res.statusCode).toEqual(200);
        const newPost = await Post.findById(originalPost._id).lean();
        newPost._id = newPost._id.toString();
        expect(newPost).toMatchObject(
          JSON.stringify({
            ...originalPost,
            content: `${originalPost.content} some additional content`,
          })
        );
      });
    });
    describe('GET /', () => {
      let posts;
      beforeEach(async () => {
        posts = (await Post.insertMany([post0, post1])).map((i) => i.toJSON());
        posts.forEach((i) => (i._id = i._id.toString()));
      });
      it('should send 200 to normal user and return all posts', async () => {
        const res = await request(server)
          .get('/api/posts/')
          .set('Authorization', 'Bearer ' + token0)
          .send();
        expect(res.statusCode).toEqual(200);
        expect(res.body).toMatchObject(JSON.parse(posts));
      });
    });
  });
});
