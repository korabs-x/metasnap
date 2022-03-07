import {Client, KeyInfo, Buckets} from '@textile/hub'
import {Buffer} from 'buffer'

async function getBucketClient() {
    const keyInfo = {
        key: process.env.REACT_APP_KEY_TEXTILEBUCKETS,
        secret: process.env.REACT_APP_SECRET_TEXTILEBUCKETS
    }
    const buckets = await Buckets.withKeyInfo(keyInfo)
    console.log(buckets);
    return buckets;
}

async function getOrCreateBucket(buckets, bucketName) {
    const {root, threadID} = await buckets.getOrCreate(bucketName)
    if (!root) throw new Error('bucket not created')
    const bucketKey = root.key
    console.log(threadID);
    console.log(root);
    console.log(bucketKey);
    return bucketKey;
    //add(buckets, 'https://bafzbeibnbpxeejbzvkgb26ex4x6k336gwyr25kzldyxiwdlvalrmbwlpwq.textile.space/test.txt', bucketKey)
}

async function printInfo(buckets) {
    const links = await buckets.links('testbucket');
    console.log(links);
    const roots = await buckets.list();
    console.log(roots);
    //const existing = roots.find((bucket) => bucket.name === 'testbucket');
    //console.log(existing);
}

export const retreiveSnap = async (url) => {
    const objectURL = 'README.md';
    let buckets = await getBucketClient();
    let bucketKey = await getOrCreateBucket(buckets, 'testbucket');
    //var content = fs.createReadStream(objectURL, {highWaterMark: 1024})
    // see bottom of https://textileio.github.io/js-textile/docs/
    const file = { path: '/index.html', content: Buffer.from('https://bafzbeibnbpxeejbzvkgb26ex4x6k336gwyr25kzldyxiwdlvalrmbwlpwq.textile.space/test.txt') }
    const raw = await buckets.pushPath(bucketKey, 'index.html', file)
    return;
    fetch("http://api.scraperapi.com?api_key=" + process.env.REACT_APP_KEY_SCRAPERAPI + "&url=" + url)
        .then(response => response.blob())
        .then(async blob => {
            const objectURL = URL.createObjectURL(blob);
            console.log(objectURL);
            // TODO: store to bucket here
        });
    /*.then(res => {
        console.log("Done");
        return res.text();
    }).then(function (html) {
        console.log(html);
    }).catch(err => console.error(err));*/
}
