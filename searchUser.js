const request = require('request');
const cheerio = require('cheerio');
//change this value when you restart the process after failure
let fileCounter = 0;

// JSON.parse(document.body.querySelector('script').innerHTML.split("_sharedData = ")[1].split(";")[0])
function searchUser(username){
    getOptions = {
        url : `https://www.instagram.com/${username}`,
        headers: {'User-agent':'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:61.0) Gecko/20100101 Firefox/61.0'},
        jar: true,
        followAllRedirects: true
    };
    request.get(getOptions,(err,responce,html)=>{

        if(html!=undefined){
            const $ = cheerio.load(html);
            const sharedData = JSON.parse($("body script").html().split("_sharedData = ")[1].split(";")[0]);
            let graphhql = sharedData.entry_data.ProfilePage[0].graphql;
            fileCounter++;
            fs.writeFileSync(`log_${fileCounter}.json`,graphhql,'utf8');
        }
        else{
           fs.appendFileSync('error.log',username+'\n','utf8');
        }

    });

};

function searchUserSync(username){
    getOptions = {
        url : `https://www.instagram.com/${username}`,
        headers: {'User-agent':'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:61.0) Gecko/20100101 Firefox/61.0'},
        jar: true,
        followAllRedirects: true
    };

    return new Promise((resolve ,reject)=> {

        }
    );
    // request.get(getOptions,(err,responce,html)=>{
    //
    //     if(html!=undefined){
    //         const $ = cheerio.load(html);
    //         const sharedData = JSON.parse($("body script").html().split("_sharedData = ")[1].split(";")[0]);
    //         let graphhql = sharedData.entry_data.ProfilePage[0].graphql;
    //         fileCounter++;
    //         fs.writeFileSync(`log_${fileCounter}.json`,graphhql,'utf8');
    //     }
    //     else{
    //        fs.appendFileSync('error.log',username+'\n','utf8');
    //     }
    //
    // });

}


async function run() {

    const usernameList = fs.readFileSync('foll.txt').split('\n');
    console.log(usernameList.length);
}


run();


