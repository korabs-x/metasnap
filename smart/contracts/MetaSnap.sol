// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract MetaSnap {

    struct Snapshot {
        string date;
        string url;
    }

    mapping(string => Snapshot[]) public snapshots;

    constructor() public {
        addSnapshot('https://weburl', '2022-12-88', 'https://snapshoturl1');
        addSnapshot('https://weburl', '2021-13-66', 'https://snapshoturl2');
    }

    function addSnapshot(string memory _url, string memory _date, string memory _snapshotUrl) private {
        snapshots[_url].push(Snapshot(_date, _snapshotUrl));
    }

}
