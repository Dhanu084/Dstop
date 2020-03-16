module.exports.index = function (req,res) {
    res.json(200,{
        message : "List of Posts"
        ,
        posts : []
    })
}