// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.21;

contract SimpleStorage {
	uint256 private value;

	function set(uint256 _value) public {
		value = _value;
	}

	function get() public view returns (uint256) {
		return value;
	}
}
