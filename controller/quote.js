const quotemodel = require("../model/quote");

class addequote {
  //add
  async addquote(req, res) {
    let {
      userId,
      EnquiryId,
      projectType,
      SUM,
      GST,
      total,
      adjustments,
      netTotal,
      date,
      time,
      Bookedby,
      salesExecutive,
      type,
      exeId,
      number
    } = req.body;

    if (!total) {
      return res.status(500).json({ error: "Fill all fields" });
    } else {
      try {
        const latestCustomer = await quotemodel
          .findOne()
          .sort({ quoteId: -1 })
          .exec();
        const latestCardNo = latestCustomer ? latestCustomer.quoteId : 0;
        // if (typeof GST !== "undefined") {
        //   return GST;
        // }
        // Increment the card number by 1
        const newCardNo = latestCardNo + 1;
        let quote = new quotemodel({
          quoteId: newCardNo,
          userId,
          EnquiryId,
          projectType,
          SUM,
          GST,
          total,
          adjustments,
          netTotal,
          date,
          time,
          Bookedby,
          salesExecutive,
          type,
          exeId,
          number
        });

        let save = quote.save();
        if (save) {
          return res.json({ success: "enquiry added successfully" });
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  async updatequoteDetails(req, res) {
    try {
      let id = req.params.id;
      let {
        quoteId,
        userId,
        EnquiryId,
        projectType,
        SUM,
        GST,
        total,
        adjustments,
        netTotal,
        date,
        time,
        Bookedby,
        salesExecutive,
        type,
        exeId,
        number
      } = req.body;
      if (typeof GST !== "undefined") {
        GST = GST;
      }
      let newData = await quotemodel.findOneAndUpdate(
        { _id: id },
        {
          quoteId,
          userId,
          EnquiryId,
          projectType,
          SUM,
          GST,
          total,
          adjustments,
          netTotal,
          date,
          time,
          Bookedby,
          salesExecutive,
          type,
          exeId,
          number
        }
      );
      if (newData) {
        return res.status(200).json({ Success: "Added" });
      } else {
        return res.status(500).json({ error: "Something went wrong" });
      }
    } catch (error) {
      console.log("error:", error);
    }
  }

  async getallagreegatequote(req, res) {
    try {
      const result = await quotemodel.aggregate([
        {
          $lookup: {
            from: "enquiryadds",
            localField: "EnquiryId",
            foreignField: "EnquiryId",
            as: "enquirydata",
          },
        },
        {
          $lookup: {
            from: "quotefollowups",
            localField: "EnquiryId",
            foreignField: "EnquiryId",
            as: "quotefollowup",
          },
        },
        {
          $lookup: {
            from: "enquiryfollowups",
            localField: "EnquiryId",
            foreignField: "EnquiryId",
            as: "enquiryfollowups",
          },
        },
      ]);

      return res.json({ quote: result });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  //Get all
  async getallquote(req, res) {
    let data = await quotemodel.find({}).sort({ _id: -1 });
    if (data) {
      return res.status(200).json({ quote: data });
    } else {
      return res.status(500).json({ error: "Something went wrong" });
    }
  }

  async  findWithEnquiryID(req, res) {
    try {
      let EnquiryId = req.params.id;
  
      const data = await quotemodel.find({ EnquiryId }).sort({ _id: -1 }).exec();
  
      if (data && data.length > 0) {
        return res.status(200).json({ quote: data });
      } else {
        return res.json({ quote: [] });
      }
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }


  //Delete
  async deletequote(req, res) {
    let id = req.params.id;
    const data = await quotemodel.deleteOne({ _id: id });
    return res.json({ success: "Delete Successf" });
  }
}
const quoteaddcontroller = new addequote();
module.exports = quoteaddcontroller;
