// Simple Test of Contract
pragma solidity ^0.4.11;
contract StringStorage {
  event SetEvent(
    address indexed from,
    uint256 val,
    string _inputs
  );
  uint256 storedData=0;
  string storedString='';
  function set (uint256 data,string mylogs) public {
    if( storedData != 3982 ) {
      storedData = data;
      storedString = mylogs;
      SetEvent(msg.sender, data, mylogs);
    }
  } 
  function get() public constant returns (uint256,string) {
    return (storedData,storedString);
  } 
}