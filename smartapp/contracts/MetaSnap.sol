// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <8.10.0;
pragma experimental ABIEncoderV2;
import "@chainlink/contracts/src/v0.6/ChainlinkClient.sol";

contract MetaSnap is ChainlinkClient {

    address private oracle;
    bytes32 private jobId;
    uint256 private fee;

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
        /*Snapshot[] storage memorySnapshots = snapshots[_url];
        Snapshot[] memory urlSnapshots = new Snapshot[](memorySnapshots.length);
        for (uint i = 0; i < memorySnapshots.length; i++) {
            Snapshot memory snap = memorySnapshots[i];
            urlSnapshots[i] = snap;
        }
        return urlSnapshots;*/
    }

    constructor() public {
        //setPublicChainlinkToken();
        // TODO these should not be fixed but changable by the owner
        oracle = 0x7AFe1118Ea78C1eae84ca8feE5C65Bc76CcF879e; // for rinkeby testnet, see https://docs.chain.link/docs/decentralized-oracles-ethereum-mainnet/
        jobId = "b0bde308282843d49a3a8d2dd2464af1";
        fee = 0.1 * 10 ** 18;
    }

    function requestMetaSnapFromOracle(string memory _url) public returns (bytes32 requestId) 
    {
        Chainlink.Request memory request = buildChainlinkRequest(jobId, address(this), this.fulfill.selector);
        
        // Set the URL to perform the GET request on
        request.add("get", _url);

        // Sends the request
        return sendChainlinkRequestTo(oracle, request, fee);
    }

    /**
     * Receive the response in the form of bytes32
     */ 
    function fulfill(bytes32 _requestId, bytes32 _content) public recordChainlinkFulfillment(_requestId)
    {
        // TODO: upload _content to ipfs
    }

    function addSnapshot(string memory _url, uint256 _date, string memory _snapshotUrl) public {
        // TODO: let smart contract fetch _url content and set snapshotUrl
        snapshots[_url].push(Snapshot(_date, _snapshotUrl));
    }

}
