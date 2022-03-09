// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <8.10.0;
pragma experimental ABIEncoderV2;

contract MetaSnap {

    struct Snapshot {
        uint256 date;
        string url;
    }

    mapping(string => Snapshot[]) public snapshots;

    //function set(uint x) public {
    //    addSnapshot('https://weburl', 20201444, 'https://snapshoturl3');
    //}

    function getSnapsForUrl(string memory _url) public view returns (Snapshot[] memory) {
        return snapshots[_url];
        Snapshot[] storage memorySnapshots = snapshots[_url];
        Snapshot[] memory urlSnapshots = new Snapshot[](memorySnapshots.length);
        for (uint i = 0; i < memorySnapshots.length; i++) {
            Snapshot memory snap = memorySnapshots[i];
            urlSnapshots[i] = snap;
        }
        return urlSnapshots;
    }

    constructor() public {
        //addSnapshot('https://weburl', 20221288, 'https://snapshoturl1');
        //addSnapshot('https://weburl', 20211366, 'https://snapshoturl2');
    }

    function addSnapshot(string memory _url, uint256 _date, string memory _snapshotUrl) public {
        // TODO: let smart contract fetch _url content and set snapshotUrl
        snapshots[_url].push(Snapshot(_date, _snapshotUrl));
    }

}
