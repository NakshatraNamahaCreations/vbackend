const whatsappmodel = require("../../model/master/whatsapptemplate");

class response {
  async addwhatsapptemplate(req, res) {
    let { templatename, template } = req.body;
    if (!templatename || !template) {
      return res.status(500).json({ error: "Field doestn't empty" });
    }
    let add = new whatsappmodel({
      templatename: templatename,
      template: template,
    });
    let save = add.save();
    if (save) {
      return res.json({ sucess: "added successfully" });
    }
  }

  //edit
  async editwhatsapptemplate(req, res) {
    let id = req.params.id;
    let { template } = req.body;

    let data = await whatsappmodel.findOneAndUpdate({ _id: id }, { template });
    if (data) {
      return res.json({ success: "Updated" });
    }
  }

  async getwhatsapptemplate(req, res) {
    let whatsapptemplate = await whatsappmodel.find({}).sort({ _id: -1 });
    if (whatsapptemplate) {
      return res.json({ whatsapptemplate: whatsapptemplate });
    }
  }

  async postwhatsapptemplate(req, res) {
    let id = req.params.id;
    const data = await whatsappmodel.deleteOne({ _id: id });

    return res.json({ success: "Successfully" });
  }
}

const whatsapptemplatecontroller = new response();
module.exports = whatsapptemplatecontroller;
