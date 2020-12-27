const express = require('express')
const recordMethod = require('../../controller/record')
const router = express.Router()

/**
 * 获取记录列表
 */
router.post('/getRecordList', async (req, res) => {
  const result = await recordMethod.getRecords(req.body.username)
  result ? res.status(200).send({recordList: result}) : res.send(500)
})

/**
 * 添加记录
 */
router.post('/add', async (req, res) => {
  const result = await recordMethod.addRecord(req.body.record)
  result ? res.status(200).send(result) : res.sendStatus(500)
})

module.exports = router
