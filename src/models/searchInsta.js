const request = require('request');
const cheerio = require('cheerio');


// JSON.parse(document.body.querySelector('script').innerHTML.split("_sharedData = ")[1].split(";")[0])
var searchInsta = {};
searchInsta.search = function(req, res){
    getOptions = {
        url : `https://www.instagram.com/${req.body.username}`,
        headers: {'User-agent':'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:61.0) Gecko/20100101 Firefox/61.0'},
        jar: true,
        followAllRedirects: true
    };
    request.get(getOptions,(err,responce,html)=>{

        if(html!=undefined){
            const $ = cheerio.load(html);
            const sharedData = JSON.parse($("body script").html().split("_sharedData = ")[1].slice(0,-1));
            let graphhql = sharedData.entry_data.ProfilePage[0].graphql;
            res.send({'post':graphhql.user.edge_owner_to_timeline_media.count,
                'imageUrl':graphhql.user.profile_pic_url,
                'followers':graphhql.user.edge_followed_by.count,
                'following':graphhql.user.edge_follow.count});
        }
        else{
            res.status(404).send({});
        }

    });

}
module.exports = searchInsta;