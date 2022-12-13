// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.7;

import "hardhat/console.sol";

contract Agrodao {
    struct User {
        uint id;
        string email;
        string password;
        bool exists;
    }

    struct Product {
        uint id;
        User owner;      // current owner user
        string external_id;
        uint weight;
        uint age;
        string location;
        string observation;
        bool exists;
    }

    uint global_product_id = 1;

    // This declares a state variable that
    // stores a `User` struct for each possible address.
    mapping(uint => User) public users;

    // stores a `Product` struct for each possible address.
    mapping(uint => Product) public products;

    constructor() {
        console.log("Deploying Agrodao contract!");
    }

    // this method is used for transeferring ownership
    // only owner can access this
    function transferProduct(uint product_id, uint owner_user_id, uint next_owner_id) public returns(string memory, uint, uint) {
        if (products[product_id].owner.id == users[owner_user_id].id) {
            if (users[next_owner_id].exists) {
                products[product_id].owner = users[next_owner_id];
                return ("product transferred successfully", products[product_id].owner.id, users[owner_user_id].id);
            } else {
                return ("user does not exist", products[product_id].owner.id, users[owner_user_id].id);
            }
        } else {
            return ("user does not own product", products[product_id].owner.id, users[owner_user_id].id);
        }
    }

    // user functions

    function createUser(uint id, string calldata mail, string calldata password) public  returns(string memory) {
        if (!users[id].exists) {
            User memory user = User(id, mail, password, true);
            users[id] = user;
            return  "user created successfully";
        } else {
            return "user does not exist";
        }
    }

    function createProductTeste(uint user_id, string calldata external_id, uint weight, uint age, string calldata location, string calldata observation) public returns (uint) {
        if (users[user_id].exists) {
            Product memory product = Product(global_product_id, users[user_id], external_id, weight, age, location, observation, true);
            products[global_product_id] = product;
            global_product_id += 1;
            return  global_product_id -1;
        } else {
            return 0;
        }
    }

    function getProductId() public view returns (int) {
        return int(global_product_id -1);
    }
}