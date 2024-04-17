function profiler(req, res) {
    let fullUrl = req.protocol + "://" + req.hostname + req.originalUrl;
    let responseTime = res.get("X-Response-Time");
    let session = JSON.stringify(req.session);
    // let flashdata = JSON.stringify(req.flash());
    let post = JSON.stringify(req.body);
    let get = JSON.stringify(req.query);
    let query;
    req.session.flash["dbQuery"] ? (query = req.session.flash["dbQuery"]) : false;
    console.log("-----------PROFILER------------");
    console.log("Respose Time: " + responseTime);
    console.log("Full Request URL: " + fullUrl);
    console.log("SESSION: " + session);
    // console.log("FLASHDATA: " + flashdata);
    console.log("GET Data: " + get);
    console.log("POST Data: " + post);
    console.log(`Query: ${query}`);
    console.log("-------------END---------------");
}

module.exports = { profiler };
