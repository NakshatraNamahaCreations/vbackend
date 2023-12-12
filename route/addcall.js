const express = require("express");
const router = express.Router();
const addcallcontroller = require("../controller/addcall");

router.post("/adddsrcall", addcallcontroller.save);
router.get("/getalldsrlist", addcallcontroller.getalldsrcall);
router.post("/postdsrcategory", addcallcontroller.postcategory);
router.post("/updatedsrdata/:id", addcallcontroller.editdsr);
router.post("/reshecdule/:id", addcallcontroller.reshecdule);


router.get("/getaggredsrdata", addcallcontroller.getallagreedata);
router.put("/startjob/:id", addcallcontroller.startJob);

router.put("/endjob/:id", addcallcontroller.endJob);
router.get("/getfindwithtechid/:id", addcallcontroller.getfindwithtechid);
router.get("/getfindwithtechidwithfilter/:id", addcallcontroller.getfindwithtechidwithfilter);
router.put("/startproject/:id", addcallcontroller.startproject);

router.get("/filteredservicedate/:serviceDate", addcallcontroller.getservicedatadate);
router.get("/filteredserviceIDanddate/:serviceDate/:serviceId", addcallcontroller.getserviceIDanddate);
router.get("/filteredservicedateandtechid/:serviceDate/:techid", addcallcontroller.filterwithtectandservicedate);
module.exports = router;
