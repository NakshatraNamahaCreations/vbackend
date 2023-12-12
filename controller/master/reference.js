const referencemodel = require("../../model/master/reference");

class reference {
  async addreferencetype(req, res) {
    let { referencetype } = req.body;
    let add = new referencemodel({
        referencetype: referencetype,
    });
    let save = add.save();
    if (save) {
      return res.json({ sucess: "added successfully" });
    }
  }

  //edit category
  async editreferencetype(req,res){
    let id=req.params.id;
    let{referencetype}=req.body;
    
    let data=await referencemodel.findOneAndUpdate(
        {_id:id},
        {referencetype}
    );
    if (data) {
        return res.json({ success: "Updated" });
      }

  }
  async getreferencetype(req, res) {
    let referencetype = await referencemodel.find({}).sort({ _id: -1 });
    if (referencetype) {
      return res.json({ masterreference: referencetype });
    }
  }

  

  async postdeletereferencetype(req, res) {
    let id = req.params.id;
    const data = await referencemodel.deleteOne({ _id: id });

    return res.json({ success: "Successfully" });
  }
}

const referencetypecontroller = new reference();
module.exports = referencetypecontroller;
