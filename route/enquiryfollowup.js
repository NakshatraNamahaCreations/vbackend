const express = require("express");
const router = express.Router();
const enquiryfollowupcontroller = require("../controller/enquiryfollowup");

router.post("/addenquiryfollowup", enquiryfollowupcontroller.Addenquiryfollowup);
router.get("/getenquiryfollowup", enquiryfollowupcontroller.getallenquiryfollowup);
router.get("/getsurveydata", enquiryfollowupcontroller.getsurveydata);
router.get("/getsurveyaggredata", enquiryfollowupcontroller.getallagreedata);
router.get("/getcalllateraggredata", enquiryfollowupcontroller.getcalllaterdata);
router.get("/getallflwdata", enquiryfollowupcontroller.getflwdata);
router.get("/getnewflwdata", enquiryfollowupcontroller.getnewdata);
router.get("/getcallquotedata", enquiryfollowupcontroller.getcalllaterandquotedata);

router.post("/addenquiryfollowup", enquiryfollowupcontroller.Addenquiryfollowup);
router.post("/postsurveycat", enquiryfollowupcontroller.postsurveycat);
router.post("/canclesurvey/:id", enquiryfollowupcontroller.cancelsurvey);
router.post("/updateserviceexe/:id", enquiryfollowupcontroller.updateDetails);


module.exports = router;
