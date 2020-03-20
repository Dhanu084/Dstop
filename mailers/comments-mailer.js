const nodemailer = require('../config/nodemialer');

//another way of exporting a method
exports.newComment = (comment) =>{
    let htmlString = nodemailer.renderTemplate({comment : comment},"./comments/new_comments.ejs");
    console.log(htmlString);
    nodemailer.transporter.sendMail({
        from : 'dhanuufc.dk@gmail.com',
        to : comment.user.email,
        subject : "new comment on your post",
        html: htmlString
    },
    (error,info) =>{
        if(error){
            console.log("Error in sending mail "+error+" "+comment.user.email);
            return;
        }
        console.log("Mail delivered "+ info);
        return;

    });
}