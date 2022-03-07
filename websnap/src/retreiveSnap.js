export const retreiveSnap = async (url) => {
    fetch("http://api.scraperapi.com?api_key="+process.env.REACT_APP_KEY_SCRAPERAPI+"&url=" + url)
        .then(res => {
            console.log("Done");
            return res.text();
        }).then(function (html) {
            console.log(html);
    }).catch(err => console.error(err));
}
