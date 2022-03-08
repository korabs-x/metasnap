const testSnaps = {
    "https://bafzbeibnbpxeejbzvkgb26ex4x6k336gwyr25kzldyxiwdlvalrmbwlpwq.textile.space/test.txt": {
        "3/8/2022 12:9:56": {
            "snapUrl": "https://hub.textile.io/ipfs/bafkreie7q3iidccmpvszul7kudcvvuavuo7u6gzlbobczuk5nqk3b4akba"
        },
        "3/8/2022 12:11:20": {
            "snapUrl": "https://hub.textile.io/ipfs/bafkreie7q3iidccmpvszul7kudcvvuavuo7u6gzlbobczuk5nqk3b4akba"
        }
    },
    "https://www.webkitx.com/doc/light/images/WebKitX_Logo_64x64.png": {
        "3/8/2022 12:10:56": {
            "snapUrl": "https://hub.textile.io/ipfs/bafkreif5thzztxr62jz7igszjypgtvqwdpdvt4f32j6wz6jf5jncdzkyku"
        }
    }
}
const snaps = testSnaps; //{}

/*const getSnapFileContent = async (snap) => {
    console.log("getSnapFileContent");
    fetch(snapFile)
        .then(response => {
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
                return response.json().then(data => {
                    console.log('exists');
                    console.log(data);
                });
            } else {
                console.log('does not exist');
                return {};
            }
        })
}*/

export const storeSnapMetadata = (snap) => {
    console.log('storeSnapMetadata')
    if (!(snap.url in snaps))
        snaps[snap.url] = {}
    snaps[snap.url][snap.date] = { snapUrl: snap.snapUrl }
    console.log(snaps);
}

export const getSnapsForURL = (url) => {
    if (!(url in snaps))
        return {}
    return snaps[url]
}

export const getAllSnapsURLs = () => {
    return snaps.keys()
}
