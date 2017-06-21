module.exports = {
  generateOtp: function(characters = 6){
    let possible = '0123456789';
    let otp = '';
    for(let i = 0; i < characters;i++){
      otp += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return otp;
  },
  generateAlphaNumericString : function (num) {
          let text = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
          let possible = "0123456789";
          for( let i = 0; i < num; i++ )
          text += possible.charAt(Math.floor(Math.random() * possible.length));
          return text;
  },
  getEmailTemplate : function (referenceId, cb) {
          const TemplateModel = require('../models/template.js');
          TemplateModel
          .findOne(
                    {
                         "title" : referenceId,
                         "status" : true
                    },
                    {
                         "status" : 0,
                         "isDeleted" : 0,
                         "createdDate" : 0,
                         "modifiedDate" : 0
                    }
          )
          .exec(
               function (err, template) {
                    if(err) {
                         cb();
                    } else {
                         if(template) {
                              cb(template);
                         } else {
                              cb();
                         }
                    }
               }
          )
     }
}
