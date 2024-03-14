var express = require('express');
var router = express.Router();
const Forum = require('../modal/forum.js')
const Comment = require('../modal/comment.js')

router.get('/',
  async function (req, res) {
    try {
      const forum = await Forum.find().sort({ createdAt: -1 });

      res.render('forum/view_forum', {
        title: 'LSP-STMIK BANJARBARU',
        forum,
        sessions: req.session.user,
      })
    } catch (error) {
      console.log('Tampilankan error di find() >>> ' + error);
      res.redirect('/forum')
    }
  });

router.post('/create',
  async function (req, res) {
    try {
      const { name, question } = req.body

      let forum = await Forum({ name, question })
      await forum.save()

      res.redirect('/forum')
    } catch (error) {
      console.log('Tampilankan error ketika create() >>> ' + error);
      res.redirect('/forum')
    }
  });

router.get('/detail/:id',
  async function (req, res) {
    try {
      const { id } = req.params;

      const forum = await Forum.findOne({ _id: id })

      const comment = await Comment.find({ question: id }).sort({ createdAt: -1 })
      res.render('forum/detail', {
        title: 'LSP-STMIK BANJARBARU',
        forum,
        comment,
        sessions: req.session.user,
      })
    } catch (error) {
      console.log('Tampilankan error ketika getDetailForum() >>> ' + error);
      res.redirect('/forum')
    }
  })

router.post('/comment',
  async function (req, res) {
    try {
      const { _id, name, answer } = req.body;

      let comment = await Comment({
        name: name,
        answer: answer,
        question: _id
      })
      await comment.save()

      res.redirect(`/forum/detail/${_id}`)
    } catch (error) {
      console.log('Tampilankan error ketika gagal addComment() >>>' + error);
      res.redirect(`/forum/detail/${_id}`)
    }
  });

module.exports = router;