const express = require('express');
const router = express.Router();
const EventLog = require('../models/eventLog');

// 이벤트 기록
router.post('/log', async (req, res) => {
  const { eventType } = req.body;
  try {
    const event = await EventLog.create({ eventType });
    res.status(200).json(event);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
