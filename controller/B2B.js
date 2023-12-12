const B2Bmodel = require("../model/B2B");

class B2B {
  //add

  async addB2B(req, res) {
    try {
      let {
        b2bname,
        contactperson,
        maincontact,
        alternateno,
        gst,
        email,
        address,
        city,
        b2btype,
        instructions,
        executiveName,
        executivenumber,
        approach,
      } = req.body;
      const latestCustomer = await B2Bmodel.findOne()
        .sort({ B2BId: -1 })
        .exec();
      const latestEquiry = latestCustomer ? latestCustomer.B2BId : 0;
      const newId = latestEquiry + 1;

      // firstname = toTitleCase(firstname);
      const Email = await B2Bmodel.findOne({ email: email });
      if (Email) {
        return res.status(500).json({ error: "Email already exits" });
      }

      const phone = await B2Bmodel.findOne({ maincontact: maincontact });
      if (phone) {
        return res.status(500).json({ error: "mobile number already exits" });
      }

      let b2b = new B2Bmodel({
        B2BId: newId,
        b2bname,
        contactperson,
        maincontact,
        alternateno,
        gst,
        email,
        address,
        city,
        b2btype,
        instructions,
        approach,
        executiveName,
        executivenumber,
      });

      b2b.save().then((data) => {
        return res
          .status(200)
          .json({ Success: "Account created. Please login" });
      });
    } catch (error) {
      console.error("Error enquiry add:", error);
    }
  }

  //edit
  async editBuisness(req, res) {
    let id   = req.params.id;

    let {
      b2bname,
      contactperson,
      maincontact,
      alternateno,
      gstinid,
      email,
      address,
      city,
      b2btype,
      instructions,
      approach,
      executiveName,
      executivenumber,
    } = req.body;
    let data = await B2Bmodel.findOneAndUpdate(
      { _id: id },
      {
        b2bname,
        contactperson,
        maincontact,
        alternateno,
        gstinid,
        email,
        address,
        city,
        b2btype,
        instructions,
        approach,
        executiveName,
        executivenumber,
      }
    );
    if (data) {
      return res.json({ success: "Updated" });
    }
  }
  async addB2BViaExcelSheet(req, res) {
    const data = req.body;

    try {
      const insertedB2B = await B2Bmodel.insertMany(data);

      if (insertedB2B.length > 0) {
        return res.json({ success: "B2B added successfully" });
      } else {
        return res.status(400).json({ error: "Failed to add B2B" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  //Get all customer
  async getallB2B(req, res) {
    let data = await B2Bmodel.find({}).sort({ _id: -1 });
    if (data) {
      return res.status(200).json({ B2B: data });
    } else {
      return res.status(500).json({ error: "Something went wrong" });
    }
  }

  //Delete doctor
  async deleteB2B(req, res) {
    let id = req.params.id;
    const data = await B2Bmodel.deleteOne({ _id: id });
    return res.json({ success: "Delete Successf" });
  }
}
const B2Bcontroller = new B2B();
module.exports = B2Bcontroller;
