
// Simple Test of Contract
pragma solidity ^0.4.11;
contract Storage {
  event SetEvent(
    address indexed from,
    uint256 val
  );
  uint256 storedData;
  function set (uint256 data) public {
    storedData = data;
    SetEvent(msg.sender, data);
  } 
  function get() public constant returns (uint256) {
    return storedData;
  } 
}


