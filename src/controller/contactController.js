
import { Contact } from "../models/contactUs";
import { contactValidation } from "../validation/validation";

//!!get All messages
export const allMessage =  async (req, res) => {
    Contact.find()
      .sort({ createdAt: -1 })
      .then((result) => {
        return res.status(200).json({ title: "All messages", status: 200, messages: result });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({status: 500, message: "Internal server error" });
      });
  };

//!!Posting new message
export const createMessage = async (req, res) =>{
    const { error } = contactValidation(req.body);

    if (error) return res.status(400).json({status: 400, message: error.details[0].message });
  
    //!!creating new message
    var contact = new Contact({
      name: req.body.name,
      email: req.body.email,
      message: req.body.message,
    });
  
    //!!save a message to db
    try {
      const savedMessage = await contact.save();
      console.log(savedMessage.id);
      return res.status(201).json({status:"success", message: "Successfully sent, we will talk soon." });
    } catch (error) {
      console.log(error)
      return res.status(500).json({status: 500, message: "Internal server error" });
    }
}

//!!get one message
export const messageDetails = async (req, res) =>{
    const id = req.params.id;

    if (!id) return res.status(404).json({status: 404, message: "Message not found" });
  
    Contact.findById(id)
      .then((result) => {
        return res.status(200).json({ title: "Message details",status: 200, message: result });
      })
      .catch((err) => {
        console.log(err);
        
        return res.status(500).json({status: 500, message: "Internal server error"
         });
      });
}

//!!Delete a Message
export const deleteMessage = async (req, res) =>{
    const id = req.params.id;

    const result = await Contact.findById(id);
    if (!result) return res.status(404).json({status: 404, message: "Message not found" });
  
    const contactDelete = await result.delete();
  
    if (contactDelete)
      return res.status(200).json({status: 200, message: "Message successfully deleted" });
  
    return res.status(500).json({status: 500, message: "Internal server error" });
}
///////////////////////////////////////////





export const subscribeToNewsletter = async (req, res) => {
	const { error } = subscriberValidation(req.body);
	if (error) return res.status(400).json({ message: error.details[0].message });

	let subscriber = await Subscriber.findOne({
		email: req.body.email,
	});
	if (subscriber) {
		return res.status(400).json({
			error: true,
			message: "Sorry , you are already subscribed to our newsletter",
		});
	}
	subscriber = req.body;
	const newSubscriber = new Subscriber(subscriber);
	await newSubscriber.save();
	res.status(201).json({ success: true, data: newSubscriber });
};

// export const getAllSubscribers = async (req, res) => {
// 	const subscribers = await Subscriber.find();
// 	res.status(200).json({ success: true, data: subscribers });
// };

// export const unsubscribeToNewsletter = async (req, res) => {
// 	const { error } = subscriberValidation(req.body);
// 	if (error) return res.status(400).json({ message: error.details[0].message });

// 	let subscriber = await Subscriber.findOne({
// 		email: req.body.email,
// 	});
// 	if (subscriber) {
// 		await Subscriber.findByIdAndDelete(subscriber.id);
// 		res.status(200).json({
// 			success: true, message: "Successfully unsubscribed from our newsletter",
// 		});
// 	}
// 	return res.status(404).json({ success: false, message: "No record found for your email" });
// };
