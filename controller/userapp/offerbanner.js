const offerbannerModel = require("../../model/userapp/offerbanner");

class offerbanner {
  async postaddofferbanner(req, res) {
    let file = req.file?.filename;
    let{header,desc,subcategory}=req.body;
    console.log(file)

    try {
      let newbanner = new offerbannerModel({
        icon: file,
        header:header,
        desc:desc,
        subcategory:subcategory
      });

      let save = newbanner.save();

      if (save) {
        return res.json({ success: "banner added successfully" });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getallofferbanner(req, res) {

    let banner = await offerbannerModel.find({ }).sort({_id:-1});

    if (banner) {
      return res.json({ offerbanner: banner });
    } else {
      return res.status(403).json({ error: "not able find banner" });
    }
  }

  async postdeleteofferbanner(req, res) {
    let id = req.params.id;
    const data = await offerbannerModel.deleteOne({ _id: id });

    return res.json({ success: "Successfully" });
  }
}

const offerbannerController = new offerbanner();
module.exports = offerbannerController;
