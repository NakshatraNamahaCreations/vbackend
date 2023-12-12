const technicianmodel = require("../../model/master/technician");
const multer = require("multer");
const express = require("express");
const router = express.Router();

//add technician
router.route("/addtechnician").post(async (req, res) => {
  let {
    Type,
    servicetype,
    vhsname,
    smsname,
    number,
    password,
    experiance,
    city,
    category,
    languagesknow,
    walletBalance
  } = req.body;

   // Check if the contact already exists
   const contactnoExists = await technicianmodel.findOne({
    $or: [
      { number: number },
      // { email: loginnameOrEmail },
    ],
  });
  if (contactnoExists) {
    return res.status(500).json({ error: "Conatct Number already exists" });
  }
  let technician = new technicianmodel({
    Type,
    servicetype,
    vhsname,
    smsname,
    number,
    password,
    experiance,
    city,
    languagesknow,
    category,
    walletBalance
  });
  let save = technician.save();
  if (save) {
    return res.json({ success: "food created successfully" });
  }
});

//edit technician
router.route("/edittechnician/:id").post(async(req,res)=>{

  let id = req.params.id;
  let {
    Type,
    servicetype,
    vhsname,
    smsname,
    number,
    password,
    experiance,
    city,
    category,
    languagesknow,
    walletBalance
  } = req.body;

  let data = await technicianmodel.findOneAndUpdate(
    { _id: id },
    {
      Type,
      servicetype,
      vhsname,
      smsname,
      number,
      password,
      experiance,
      city,
      category,
      languagesknow,
      walletBalance
    }
  );
  if (data) {
    return res.json({ success: "Updated" });
  }
})

//get alltechnicain
router.route("/getalltechnician").get(async (req, res) => {
  let technician = await technicianmodel.find({}).sort({ _id: -1 });
  if (technician) {
    return res.status(200).json({ technician: technician });
  } else {
    return res.status(500).json({ error: "Something went wrong" });
  }
});

router.route("/gettechnicianbyid/:id").get(async (req, res) => {
  try {
    const technicianId = req.params.id;
    let technician = await technicianmodel.findById({_id:technicianId});
    if (technician) {
      return res.status(200).json({ technician: technician });
    } else {
      return res.status(404).json({ error: "Technician not found" });
    }
  } catch (err) {
    return res.status(500).json({ error: "Something went wrong" });
  }
});


//delete vendors
router.route("/deletetechnician/:id").post(async (req, res) => {
  let id = req.params.id;
  const data = await technicianmodel.deleteOne({ _id: id });
  return res.json({ sucess: "Delete successfuly" });
});


router.route("/technicianlogin").post(async (req, res) => {
  const { number, password } = req.body;
  try {
    if (!number) {
      return res.status(400).json({ error: "Please enter your Mobile Number" });
    }
    if (!password) {
      return res.status(400).json({ error: "Please enter your password" });
    }
    // Find the user by mobile number
    const user = await technicianmodel.findOne({ number });
    if (!user) {
      return res
        .status(404)
        .json({ error: "User not found or invalid password" });
    }
    // Check if the user type is "technician"
    if (user.Type !== "technician") {
      return res
        .status(403)
        .json({ error: "Access denied. You're type is not 'Technician'" });
    }
    // Check the password
    const passwordCheck = await technicianmodel.findOne({ password });
    if (!passwordCheck) {
      return res.status(403).json({ error: "Invalid password" });
    }
    // Update the technician's status to "Online"
    await technicianmodel.findOneAndUpdate({ number }, { status: "Online" });
    return res.json({ success: "Login successful", user });
  } catch (error) {
    console.error("Error", error);
    return res.status(500).json({ error: "An error occurred" });
  }
});

// signout

router.route("/technicianlogout/:id").get(async (req, res) => {
  const signoutId = req.params.id;
  if (!signoutId) {
    return res.status(400).json({ error: "Invalid signout ID" });
  }
  technicianmodel
    .findOneAndUpdate({ _id: signoutId }, { status: "Offline" })
    .then(() => {
      res.status(200).json({ Success: "Signout Successfully" });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "Something went wrong" });
    });
});

router.route("/changepassword/:id").post(async (req, res) => {
  const { password, newPassword, confirmPassword } = req.body;
  try {
    if (!password || !confirmPassword || !newPassword) {
      return res.status(400).json({
        error: "Please enter old password, new password, and confirm password",
      });
    }
    if (newPassword !== confirmPassword) {
      return res
        .status(400)
        .json({ error: "New password and confirm password do not match" });
    }

    const passwordMatch = await technicianmodel.findOne(password, password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid old password" });
    }
    await technicianmodel.findOneAndUpdate({
      password,
      newPassword,
    });
    return res.status(200).json({ success: "Password Changed Successfully" });
  } catch (error) {
    console.error("Something went wrong", error);
    // return res.status(500).json({ error: "Internal server error" });
  }
});


router.route("/pmlogin").post(async (req, res) => {
  const { number, password } = req.body;
  try {
    if (!number) {
      return res.status(400).json({ error: "Please enter your Mobile Number" });
    }
    if (!password) {
      return res.status(400).json({ error: "Please enter your password" });
    }

    const user = await technicianmodel.findOne({ number });
    if (!user) {
      return res
        .status(404)
        .json({ error: "User not found or invalid password" });
    }

    if (user.Type !== "pm") {
      return res
        .status(403)
        .json({ error: "Access denied. You're type is not 'PM'" });
    }

    const passwordCheck = await technicianmodel.findOne({ password });
    if (!passwordCheck) {
      return res.status(403).json({ error: "Invalid password" });
    }

    await technicianmodel.findOneAndUpdate({ number }, { status: "Online" });
    return res.json({ success: "Login successful", user });
  } catch (error) {
    console.error("Error", error);
    return res.status(500).json({ error: "An error occurred" });
  }
});

router.route("/pmlogout/:id").get(async (req, res) => {
  const signoutId = req.params.id;
  if (!signoutId) {
    return res.status(400).json({ error: "Invalid signout ID" });
  }
  technicianmodel
    .findOneAndUpdate({ _id: signoutId }, { status: "Offline" })
    .then(() => {
      res.status(200).json({ Success: "Signout Successfully" });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "Something went wrong" });
    });
});

module.exports = router;
