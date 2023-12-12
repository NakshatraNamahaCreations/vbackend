const express = require("express");
const router = express.Router();
const servicedetailscontroller = require("../controller/servicedetails");

const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/services");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});
const upload = multer({ storage: storage });

router.post(
  "/addservicedetails",
  upload.single("serviceImg"),
  servicedetailscontroller.addservicedetails
);
router.get("/getservicedetails", servicedetailscontroller.getservicedetails);
router.post(
  "/deleteservicedetails/:id",
  servicedetailscontroller.deleteservicedetails
);
router.post(
  "/editservicedetails/:id",
  servicedetailscontroller.editServiceDetails
);
router.post("/updatepaymentmode/:id", servicedetailscontroller.updatepayment);

router.post("/postservicecategory", servicedetailscontroller.postcategory);
router.post("/closeproject/:id", servicedetailscontroller.updateclose);
router.post("/postservicecat", servicedetailscontroller.postservicecategory);
router.post(
  "/postservicecatdevideddates",
  servicedetailscontroller.getDevidedate
);
router.post(
  "/postservicecatdevideddatesnew",
  servicedetailscontroller.getDevidedatenew
);
router.post(
  "/getPaymentcalenderlist",
  servicedetailscontroller.getPaymentcalenderlist
);
router.put("/updatestatus/:id", servicedetailscontroller.editstatus);
router.get("/getrunningdata", servicedetailscontroller.getallrunningdata);

router.get(
  "/getfilterrunningdata",
  servicedetailscontroller.getfilteredrunningdata
);
router.get("/getdsrdata", servicedetailscontroller.getalldsrcalldata);
router.get("/mybookings/:id", servicedetailscontroller.getmybookingdata);
router.get("/mybookusingID/:id", servicedetailscontroller.findbyserviceID);
router.get(
  "/getpaymentfilterdatewis",
  servicedetailscontroller.getpaymentfilterdatewise
);

router.post(
  "/recheduledate/:id",
  servicedetailscontroller.findbyserviceIDandreschedule
);
router.post(
  "/cancelservice/:id",
  servicedetailscontroller.findbyserviceIDcancel
);
router.post(
  "/changeappotime/:serviceid/:bookid",
  servicedetailscontroller.findbyservicechaneapp
);

router.get(
  "/getservicedatawithaddcal",
  servicedetailscontroller.getaggregateaddcals
);

router.get(
  "/getservicedatawithaddcalnew",
  servicedetailscontroller.getaggregateaddcalsnew
);
router.get("/mybookingdata/:id", servicedetailscontroller.getuserappbookings);

module.exports = router;
