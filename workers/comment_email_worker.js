const queue = require('../config/kue');

const commentsMailer = require('../mailers/comments-mailer');

queue.process('email',function(job,done){
    console.log("email worker processing a job",job.data);
    commentsMailer.newComment(job.data);
    done();
})