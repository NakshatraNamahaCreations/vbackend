const express = require("express");
const router = express.Router();
const enquiryaddcontroller = require("../controller/enquiryadd");

router.post("/addenquiry", enquiryaddcontroller.Addenquiry);
router.post("/addenquiry1/:id", enquiryaddcontroller.addenquiry1);
router.get("/getenquiry", enquiryaddcontroller.getallenquiryadd);
router.get("/getenquiryid/:id", enquiryaddcontroller.getallenquiryid);
router.get("/getenquiryquote", enquiryaddcontroller.getallagreegate);
router.get("/getenquiryquotewithfilter/:id", enquiryaddcontroller.getEnquiryAndAggregate);
router.get("/getallnewfollow", enquiryaddcontroller.getallnewfollow);
router.get("/getwithenqid/:id", enquiryaddcontroller.findWithEnquiryID);
router.post("/editenquiry/:id", enquiryaddcontroller.editenquiry);

router.post("/updatequote/:id", enquiryaddcontroller.updatequote);

router.post("/deleteteenquiry/:id", enquiryaddcontroller.deleteenquiryadd);
router.post("/postenquirycategory", enquiryaddcontroller.postsubcategory);
router.post("/addquotefollup/:id", enquiryaddcontroller.addquotefollup);

module.exports = router;
