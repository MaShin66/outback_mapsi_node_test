const express = require("express");
const router = express.Router();
const { Coupon, sequelize } = require("../models/coupon");

// 미리 생성된 쿠폰 중 사용하지 않은 쿠폰 하나 발급
router.get("/issue", async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const coupon = await Coupon.findOne({
      where: { isIssued: false },
      lock: t.LOCK.UPDATE,
      transaction: t,
    });

    if (!coupon) {
      await t.rollback();
      return res.status(404).json({ error: "더 이상 이용할 수 있는 쿠폰이 없습니다." });
    }

    coupon.isIssued = true;
    coupon.issuedAt = new Date();

    await coupon.save({ transaction: t });
    await t.commit();
    res.status(200).json(coupon);
  } catch (error) {
    await t.rollback();
    res.status(400).json({ error: error.message });
  }
});

// 특정 쿠폰 조회
router.get('/:code', async (req, res) => {
  try {
    const coupon = await Coupon.findOne({ where: { code: req.params.code } });
    if (!coupon) {
      return res.status(404).json({ error: 'Coupon not found' });
    }
    res.status(200).json(coupon);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 쿠폰 사용 처리
router.post("/use", async (req, res) => {
  const t = await sequelize.transaction();
  const { code } = req.body;

  try {
    const coupon = await Coupon.findOne({
      where: { code },
      transaction: t,
      lock: t.LOCK.UPDATE,
    });
    if (!coupon) {
      await t.rollback();
      return res.status(404).json({ error: "Coupon not found" });
    }
    if (coupon.usedAt) {
      await t.rollback();
      return res.status(400).json({ error: "Coupon already used" });
    }

    coupon.usedAt = new Date();

    await coupon.save({ transaction: t });
    await t.commit();

    res.status(200).json({ message: "Coupon used successfully!", coupon });
  } catch (error) {
    await t.rollback();
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
