const profileuploadcontroller = (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    var filename=req.file.path.split("/").pop();
    const fileUrl = `/uploads/profile/${filename}`;

    res.json({
        message: 'File uploaded successfully!',
        fileUrl,
    });
}
const statusuploadcontroller = (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    var filname = req.file.path.split("/").pop();
    const fileUrl = `/uploads/status/${filname}`;
  console.log(req.file);
    res.json({
        message: 'File uploaded successfully!',
        fileUrl,
    });
}
const chatsuploadcontroller = (req, res) => {

    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
      var filename = req.file.path.split("/").pop();
    const fileUrl = `/uploads/chats/${filename}`;
  
    
    res.json({
        message: 'File uploaded successfully!',
        fileUrl,
    });
}



module.exports = { profileuploadcontroller, statusuploadcontroller, chatsuploadcontroller }