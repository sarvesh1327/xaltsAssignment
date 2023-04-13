// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import '@openzeppelin/contracts/access/AccessControl.sol';
import '@openzeppelin/contracts/metatx/ERC2771Context.sol';

contract Users is AccessControl, ERC2771Context {
  struct User {
    string email;
    address wallet;
    string password;
  }

  mapping(string => User) private UsersData;
  mapping(address => string) public walletEmails;
  mapping(string => bool) public userExists;

  constructor(address _forwarder) ERC2771Context(_forwarder) {
    _grantRole(DEFAULT_ADMIN_ROLE, _msgSender());
  }

  /**
     @dev modifier to check if the sender is the default admin of ADMN contract
     * Revert if the sender is not the admin
     */
  modifier onlyAdmin() {
    require(hasRole(DEFAULT_ADMIN_ROLE, _msgSender()), 'US: Only Admin');
    _;
  }

  /**
     @dev modifier to check if the sender is the trusted forwarder
     * Revert if the sender is not the trusted forwarder
     */
  modifier onlyTrustedForwarder() {
    require(isTrustedForwarder(msg.sender), 'US: Only Trusted Forwarder');
    _;
  }

  /**
     @dev Overriding _msgSender function inherited from Context and ERC2771Context
     */
  function _msgSender()
    internal
    view
    virtual
    override(Context, ERC2771Context)
    returns (address)
  {
    return ERC2771Context._msgSender();
  }

  /**
     @dev Overriding _msgData function inherited from Context and ERC2771Context
     */
  function _msgData()
    internal
    view
    virtual
    override(Context, ERC2771Context)
    returns (bytes calldata)
  {
    return ERC2771Context._msgData();
  }

  function createUser(
    string memory _email,
    string memory _password,
    address _wallet
  ) external onlyTrustedForwarder {
    require(hasRole(DEFAULT_ADMIN_ROLE, _msgSender()), 'US: Only Admin ');
    require(!userExists[_email], 'US: user already exists');
    UsersData[_email] = User(_email, _wallet, _password);
    walletEmails[_wallet] = _email;
    userExists[_email] = true;
  }

  function getUser(
    string memory _email
  )
    external
    view
    returns (string memory email, string memory password, address wallet)
  {
    require(userExists[_email], 'US: user does not exists');
    User memory userData = UsersData[_email];
    email = userData.email;
    password = userData.password;
    wallet = userData.wallet;
  }

  function isUserExist(string memory _email) external view returns (bool) {
    return userExists[_email];
  }
}
