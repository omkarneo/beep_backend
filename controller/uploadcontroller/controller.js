const profileuploadcontroller = (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    const fileUrl = `/uploads/profile/${req.file.filename}`;

    res.json({
        message: 'File uploaded successfully!',
        fileUrl,
    });
}
const statusuploadcontroller = (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    const fileUrl = `/uploads/status/${req.file.filename}`;

    res.json({
        message: 'File uploaded successfully!',
        fileUrl,
    });
}
const chatsuploadcontroller = (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    const fileUrl = `/uploads/chats/${req.file.filename}`;

    res.json({
        message: 'File uploaded successfully!',
        fileUrl,
    });
}



module.exports = { profileuploadcontroller, statusuploadcontroller, chatsuploadcontroller }