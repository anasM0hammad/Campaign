pragma solidity ^0.8.9;

contract CampaignFactory{
    address[] public deplopyedCampaigns ;

    function createCampaign(uint minimum) public{
        address newCampaign = address(new Campaign(minimum, msg.sender)) ;
        deplopyedCampaigns.push(newCampaign) ;
    }

    function getDeployedCampaigns() public view returns(address[] memory){
        return deplopyedCampaigns;
    }
}

contract Campaign{
    struct Request{
        string description;
        uint value ;
        address recipient ;
        bool complete ;
        uint approvalCount ;
        mapping(address => bool) approvals ;
    }

    address public manager ;
    uint public minimumContribution ;
    mapping(address => bool) public approvers ;
    mapping(uint => Request) public requests ;
    uint numReq ;
    uint approversCount ;

    modifier restricted{
        require(msg.sender == manager) ;
        _;
    }

    constructor(uint minimum, address creator){
        manager = creator ;
        minimumContribution = minimum ;
        numReq = 0 ;
    }

    function contribute() public payable{
        require(msg.value >= minimumContribution) ;
        approversCount++ ;
        approvers[msg.sender] = true ;
    }

    function createRequest(string memory description, uint _value, address recipient) public restricted {

        Request storage newRequest = requests[numReq++] ;
        newRequest.description = description ;
        newRequest.value = _value ;
        newRequest.recipient = recipient ;
        newRequest.complete = false ;
        newRequest.approvalCount = 0 ;
    }

    function approveRequest(uint index) public{
        Request storage request = requests[index] ;

        require(approvers[msg.sender]) ;
        require(!request.approvals[msg.sender]) ;

        request.approvalCount++ ;
        request.approvals[msg.sender] = true ;
    }

    function finalizeRequest(uint index) public restricted{
        Request storage request = requests[index] ;

        require(!request.complete) ;
        require(request.approvalCount > (approversCount / 2)) ;

        payable(request.recipient).transfer(request.value) ;
        request.complete = true ;
    }
}