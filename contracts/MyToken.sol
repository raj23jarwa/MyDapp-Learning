// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Pausable.sol";

contract MyToken is ERC20, ERC20Burnable, Ownable,ERC20Pausable {
    constructor() ERC20("MyToken", "MTK") Ownable(msg.sender) {
            uint256 initialSupply = 1000000 * (10**uint256(decimals()));

        _mint(msg.sender,initialSupply);
    }

function mintInitialSupply() internal {
        _mint(msg.sender, 1000000 * (10**uint256(decimals())));
}


 function pause() public onlyOwner {
       _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }
        // The following functions are overrides required by Solidity.

    function _update(address from, address to, uint256 value)
        internal
        override(ERC20, ERC20Pausable)
    {
        super._update(from, to, value);
    }

}
