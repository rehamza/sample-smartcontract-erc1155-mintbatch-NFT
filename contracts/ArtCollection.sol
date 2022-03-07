// contracts/ArtCollection.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import '@openzeppelin/contracts/access/Ownable.sol';

contract ArtCollection is ERC1155 , Ownable {
    string private baseURI;
    string public name;

    constructor() ERC1155('ipfs://QmfRWivDRAzAZxK4rs3gaZxRnfnfs4kd3cbn8rgZZyPJgT/{id}.json') {
        setName('Hamza Rehman Art Set Collection');
    }

     function setURI(string memory _newuri) public onlyOwner {
        _setURI(_newuri);
    }

     function setName(string memory _name) public onlyOwner {
        name = _name;
    }

    function mintBatch(uint256[] memory ids, uint256[] memory amounts)
        public
        onlyOwner
    {
        _mintBatch(msg.sender, ids, amounts, '');
    }

     function mint(uint256 id, uint256 amount) public onlyOwner {
        _mint(msg.sender, id, amount, '');
    }
}