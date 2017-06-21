process.env.NODE_ENV = 'test';

const mongoose = require('mongoose');
const User = require('../models/users');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);

describe('Users', () => {
  beforeEach((done) => {
    User.remove({}, (err) => {
      done();
    });
  });

  describe('/POST create user', () => {
    const user = {
      email: 'avinash.thakur@mobilyte.com',
      username: 'avinash.thakur',
      password: '12345678',
    };
    it('should create a user', (done) => {
      chai.request(server)
        .post('/register')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql('success');
          res.body.should.have.property('message');
          res.body.should.have.property('user');
          res.body.user.should.be.a('object');
          res.body.user.should.have.property('_id');
          res.body.user.should.have.property('email').eql(user.email);
          res.body.user.should.have.property('username').eql(user.username);
          res.body.user.should.have.property('profilePic');
          res.body.user.should.have.property('otp');
          res.body.user.should.have.property('otpExpiresAt');
          res.body.user.should.have.property('status').eql('pending');
          res.body.user.should.have.property('deviceToken');
        });
      done();
    });
    it('should not allow to add duplicate user', (done) => {
      chai.request(server)
        .post('/register')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql('error');
          res.body.should.have.property('message').eql('User already exists');
          res.body.should.have.property('errors');
          res.body.errors.should.be.a('object');
          res.body.errors.should.have.property('code').eql(11000);
        });
      done();
    });

    it('should login user', (done) => {
      chai.request(server)
        .post('/login')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql('success');
          res.body.should.have.property('message').eql('user logged in successfully');
          res.body.should.have.property('token');
          res.body.should.have.property('user');
          res.body.user.should.be.a('object');
          res.body.user.should.have.property('_id');
          res.body.user.should.have.property('username').eql('avinash.thakur');
          res.body.user.should.have.property('email').eql('avinash.thakur@mobilyte.com');
          res.body.user.should.have.property('profilePic');
          res.body.user.should.have.property('deviceToken');
          res.body.user.should.have.property('status').eql('active');
        });
      done();
    });
  });
});