const addcallModel = require("../model/addcall");
const servicedetailsmodel = require("../model/servicedetails");
const memoryCache = require('memory-cache');
function isSameDate(date1, date2) {
  return date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate();
}


class addcall {
  //add customer
  async save(req, res) {
    let {
      cardNo,
      serviceInfo,
      serviceId,
      serviceDate,
      bookingDate,
      jobCategory,
      priorityLevel,
      TechorPMorVendorID, //this
      appoDate,
      appoTime,
      customerFeedback,
      workerName,
      workerAmount,
      daytoComplete,
      techComment,
      backofficerExe,
      backofficerno,
      techName,
      salesExecutive,
      showinApp,
      sendSms,
      inSignDateTime,
      outSignDateTime,
      jobComplete,
      category,
      amount,
      type,
      jobType,
      BackofficeExecutive,
      TechorPMorVendorName,
      cancelOfficerName,
      cancelOfferNumber,
      reason,
    } = req.body;
    try {
      // Get the latest card number from the database
      const latestCustomer = await addcallModel
        .findOne()
        .sort({ complaintRef: -1 })
        .exec();
      const latestCardNo = latestCustomer ? latestCustomer.complaintRef : 0;

      // Increment the card number by 1
      const newCardNo = latestCardNo + 1;

      const updatedCall = await servicedetailsmodel.findByIdAndUpdate(
        serviceId,
        { $set: { techName: TechorPMorVendorName } },
        { new: true }
      );

      // Create a new customer instance with the generated card number
      const customer = new addcallModel({
        cardNo,
        serviceInfo,
        serviceId,
        serviceDate,
        category,
        bookingDate,
        jobCategory,
        complaintRef: newCardNo,
        priorityLevel,
        appoDate,
        TechorPMorVendorID,
        appoTime,
        customerFeedback,
        workerName,
        workerAmount,
        daytoComplete,
        techComment,
        salesExecutive,
        backofficerExe,
        backofficerno,
        techName,
        showinApp,
        sendSms,
        type,
        inSignDateTime,
        outSignDateTime,
        jobComplete,
        amount,
        jobType,
        BackofficeExecutive,
        TechorPMorVendorName,
        cancelOfficerName,
        cancelOfferNumber,
        reason,
      });
      // Save the customer data to the database
      const savedCustomer = await customer.save();

      if (savedCustomer) {
        return res.json({ success: "dsr data added successfully" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async editdsr(req, res) {
    let id = req.params.id;

    let {
      cardNo,
      serviceInfo,
      serviceDate,
      category,
      bookingDate,
      jobCategory,
      complaintRef,
      priorityLevel,
      appoDate,
      appoTime,
      customerFeedback,
      workerName,
      workerAmount,
      daytoComplete,
      techComment,
      salesExecutive,
      backofficerExe,
      backofficerno,
      techName,
      showinApp,
      sendSms,
      type,
      inSignDateTime,
      outSignDateTime,
      jobComplete,
      amount,
      TechorPMorVendorID,
      TechorPMorVendorName, //this
      jobType,
      cancelOfficerName,
      cancelOfferNumber,
      reason,
    } = req.body;
    let data = await addcallModel.findOneAndUpdate(
      { _id: id },
      {
        cardNo,
        serviceInfo,
        serviceDate,
        category,
        bookingDate,
        jobCategory,
        complaintRef,
        priorityLevel,
        appoDate,
        appoTime,
        customerFeedback,
        workerName,
        workerAmount,
        daytoComplete,
        techComment,
        salesExecutive,
        backofficerExe,
        backofficerno,
        techName,
        showinApp,
        sendSms,
        type,
        inSignDateTime,
        outSignDateTime,
        jobComplete,
        amount,
        jobType,
        TechorPMorVendorID:TechorPMorVendorID,
        TechorPMorVendorName,
        cancelOfficerName,
        cancelOfferNumber,
        reason,
      }
    );
    if (data) {
      return res.json({ success: "Updated" });
    }
  }

  async reshecdule(req, res) {
    let id = req.params.id;

    let { serviceDate } = req.body;
    let data = await addcallModel.findOneAndUpdate(
      { _id: id },
      {
        serviceDate,
      }
    );
    if (data) {
      return res.json({ success: "Updated" });
    }
  }

  // update start time
  async startJob(req, res) {
    let callId = req.params.id;
    try {
      const updatedCall = await addcallModel.findByIdAndUpdate(
        callId,
        { $set: { startJobTime: new Date() } },
        { new: true }
      );

      if (!updatedCall) {
        return res.status(404).json({ error: "Call not found." });
      }

      res.status(200).json(updatedCall);
    } catch (error) {
      res.status(500).json({ error: "Error updating the call data." });
    }
  }

  async endJob(req, res) {
    const callId = req.params.id;
    const {
      remarkOrComments,
      endJobReason,
      jobAmount,
      paymentType,
      chemicals,
    } = req.body;
    try {
      const updatedCall = await addcallModel.findByIdAndUpdate(
        callId,
        {
          $set: {
            endJobTime: new Date(),
            remarkOrComments,
            endJobReason,
            jobAmount,
            paymentType,
            chemicals,
          },
        },
        { new: true }
      );

      if (!updatedCall) {
        return res.status(404).json({ error: "Call not found." });
      }
      res.status(200).json(updatedCall);
    } catch (error) {
      res.status(500).json({ error: "Error updating the call data." });
    }
  }

  async getfindwithtechid(req, res) {
    const  TechorPMorVendorID  = req.params.id; 
  
    try {
      const data = await addcallModel.find({ TechorPMorVendorID }).sort({ _id: -1 });
  
      if (data && data.length > 0) {
        return res.status(200).json({ techservicedata: data });
      } else {
        return res.status(404).json({ error: "No data found for the provided ID" });
      }
    } catch (error) {
      return res.status(500).json({ error: "Something went wrong" });
    }
  }
  async getfindwithtechidwithfilter(req, res) {
    const TechorPMorVendorID = req.params.id; 
  
    try {
      const data = await addcallModel.find({ TechorPMorVendorID }).sort({ _id: -1 });
  
      if (data && data.length > 0) {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
  
        const filteredData = {
          todayData: data.filter(item => isSameDate(new Date(item.serviceDate), today)),
          tomorrowData: data.filter(item => isSameDate(new Date(item.serviceDate), tomorrow)),
          yesterdayData: data.filter(item => isSameDate(new Date(item.serviceDate), yesterday)),
          // Add other filters for this week, etc.
        };
  
        return res.status(200).json({ techservicedata: filteredData });
      } else {
        return res.status(404).json({ techservicedata:[] });
      }
    } catch (error) {
      return res.status(500).json({ error: "Something went wrong" });
    }
  }
  
  
  
  async postcategory(req, res) {
    let { category } = req.body;
    let data = await addcallModel.find({ category }).sort({ _id: -1 });

    if (data) {
      return res.json({ addcall: data });
    }
  }

  async startproject(req, res) {
    let callId = req.params.id;
    try {
      const updatedCall = await addcallModel.findByIdAndUpdate(
        callId,
        { $set: { startproject: "start" } },
        { new: true }
      );

      if (!updatedCall) {
        return res.status(404).json({ error: "Call not found." });
      }

      res.status(200).json(updatedCall);
    } catch (error) {
      res.status(500).json({ error: "Error updating the call data." });
    }
  }


  // async  getallagreedata(req, res) {
  //   try {
  //     let data = await addcallModel.aggregate([
  //       {
  //         $match: {
  //           /* Define your match conditions here */
  //           // Example: Filter documents where the status is "completed"
  //           status: "completed",
  //           // Add more conditions as needed
  //         },
  //       },
  //       {
  //         $lookup: {
  //           from: "servicedetails",
  //           localField: "cardNo",
  //           foreignField: "cardNo",
  //           as: "servicedetails",
  //         },
  //       },
  //       {
  //         $lookup: {
  //           from: "customers",
  //           localField: "cardNo",
  //           foreignField: "cardNo",
  //           as: "customer",
  //         },
  //       },
  //       {
  //         $lookup: {
  //           from: "quotes",
  //           localField: "cardNo",
  //           foreignField: "cardNo",
  //           as: "quotedata",
  //         },
  //       },
  //       {
  //         $lookup: {
  //           from: "technicians",
  //           localField: "TechorPMorVendorID",
  //           foreignField: "_id",
  //           as: "techdata",
  //         },
  //       },
  //     ]);
  
  //     if (data) {
  //       return res.json({ addcall: data });
  //     }
  //   } catch (error) {
  //     return res.status(500).json({ error: "Something went wrong" });
  //   }
  // }
  

  async getallagreedata(req, res) {
    try {
      let data = await addcallModel.aggregate([
        {
          $lookup: {
            from: "servicedetails",
            localField: "cardNo",
            foreignField: "cardNo",
            as: "servicedetails",
          },
        },
        {
          $lookup: {
            from: "customers",
            localField: "cardNo",
            foreignField: "cardNo",
            as: "customer",
          },
        },
        {
          $lookup: {
            from: "quotes",
            localField: "cardNo",
            foreignField: "cardNo",
            as: "quotedata",
          },
        },
        {
          $lookup: {
            from: "technicians",
            localField: "TechorPMorVendorID",
            foreignField: "_id",
            as: "techdata",
          },
        },
      ]);
      if (data) {
        return res.json({ addcall: data });
      }
    } catch (error) {
      return res.status(500).json({ error: "Something went wrong" });
    }
  }

  async getallagreedata1(req, res) {
    try {
      let data = await addcallModel.aggregate([
        {
          $lookup: {
            from: "servicedetails",
            localField: "cardNo",
            foreignField: "cardNo",
            as: "servicedetails",
          },
        },
       
      ]);
      if (data) {
        return res.json({ addcall: data });
      }
    } catch (error) {
      return res.status(500).json({ error: "Something went wrong" });
    }
  }

  async getservicedatadate(req, res) {
    const  serviceDate  = req.params.serviceDate; // Assuming the ID is provided in the request parameters
  

    try {
      const data = await addcallModel.find({ serviceDate }).sort({ _id: -1 });
  
      if (data && data.length > 0) {
        return res.status(200).json({ filterwithservicedata: data });
      } else {
        return res.status(404).json({ error: "No data found for the provided ID" });
      }
    } catch (error) {
      return res.status(500).json({ error: "Something went wrong" });
    }
  }
  
  async filterwithtectandservicedate(req, res) {
    const  serviceDate  = req.params.serviceDate;
    const  TechorPMorVendorID  = req.params.techid;
  

    try {
      let query = { serviceDate };
  
      if (TechorPMorVendorID) {
        query.TechorPMorVendorID = TechorPMorVendorID;
      }
  
      const data = await addcallModel.find(query).sort({ _id: -1 });
  
      if (data && data.length > 0) {
        return res.status(200).json({ techfilterid: data });
      } else {
        return res.status(404).json({ error: "No data found for the provided parameters" });
      }
    } catch (error) {
      return res.status(500).json({ error: "Something went wrong" });
    }
  }

  async getserviceIDanddate(req, res) {
    const  serviceDate  = req.params.serviceDate;
    const  serviceId  = req.params.serviceId;
  

    try {
      let query = { serviceDate };
  
      if (serviceId) {
        query.serviceId = serviceId;
      }
  
      const data = await addcallModel.find(query).sort({ _id: -1 });
  
      if (data && data.length > 0) {
        return res.status(200).json({ filterwithservicedata: data });
      } else {
        return res.status(404).json({filterwithservicedata:[] });
      }
    } catch (error) {
      return res.status(500).json({ error: "Something went wrong" });
    }
  }
  

  async getalldsrcall(req, res) {
    let data = await addcallModel.find({}).sort({ _id: -1 });
    if (data) {
      return res.status(200).json({ addcall: data });
    } else {
      return res.status(500).json({ error: "Something went wrong" });
    }
  }

  //Delete customer
  async deletecustomer(req, res) {
    let id = req.params.id;
    const data = await addcallModel.deleteOne({ _id: id });
    return res.json({ success: "Delete Successf" });
  }
}
const addcallcontroller = new addcall();
module.exports = addcallcontroller;
