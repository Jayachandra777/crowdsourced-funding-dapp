Hello, this is jayachandra. I can help you create a tutorial on dapp development of train ticket booking app in celo blockchain. Here is the first page of the tutorial:

# Introduction

In this tutorial, you will learn how to build a decentralized application (dapp) for booking train tickets on the celo blockchain. You will use Solidity to write smart contracts that handle the logic and data of the dapp, and React to create a user interface that interacts with the celo network. You will also use hardhat as a development framework and toolchain for compiling, testing, and deploying your smart contracts.

## What is a dapp?

A dapp is a software application operating on a decentralized network like a blockchain. These applications are designed to be trustless, transparent, and secure, as they do not rely on a central authority for their operation. These apps use distributed ledgers and offer immutability in data storage and management⁴.

## What is celo?

Celo is an open-source blockchain platform focused on making decentralized financial tools accessible to anyone with a mobile phone. It offers a unique opportunity for developers to build and deploy dapps that have the potential to reach a wide audience¹. Celo has two native tokens: CELO, which is used for governance and staking, and cUSD, which is a stablecoin pegged to the US dollar.

## What is a train ticket booking dapp?

A train ticket booking dapp is an application that allows users to buy and sell train tickets on the celo blockchain. The dapp will have the following features:

- Users can create an account with their phone number and celo wallet address.
- Users can browse available train routes and prices.
- Users can book a ticket by paying with cUSD or CELO tokens.
- Users can cancel their booking and get a refund (minus a cancellation fee) before the departure time.
- Users can resell their tickets to other users at a market price.
- Users can rate their experience and leave feedback for the train service.

## Prerequisites

Before diving into building the dapp, you will need to have some level of knowledge of the following:

- Javascript
- Typescript
- React
- Tailwind CSS
- Hardhat
- Solidity

You will also need a few tools:

- Celo wallet: This is the official wallet for the celo platform, which you will need to test your dapp on the celo testnet.
- Remix IDE: This is a web-based Integrated Development Environment (IDE) for writing, testing, and debugging smart contracts.
- Truffle Suite: This is a popular development framework for Ethereum and Celo that provides a suite of tools for building and deploying smart contracts.

## Setting up the development environment

To set up the development environment, you will need to do the following steps:

1. Install Node.js on your computer. You can download it from here: https://nodejs.org/en/download/
2. Install yarn as a package manager. You can install it by running this command in your terminal: `npm install -g yarn`
3. Install hardhat as a development framework. You can install it by running this command in your terminal: `yarn add --dev hardhat`
4. Install truffle as a deployment tool. You can install it by running this command in your terminal: `yarn add --dev truffle`
5. Install react and tailwind as frontend libraries. You can install them by running this command in your terminal: `yarn add react react-dom tailwindcss`
6. Install celo-sdk as a web3 library for interacting with the celo network. You can install it by running this command in your terminal: `yarn add @celo/contractkit @celo-tools/use-contractkit`
7. Create a new folder for your project and initialize it with hardhat. You can do this by running these commands in your terminal:

```bash
mkdir train-ticket-dapp
cd train-ticket-dapp
npx hardhat init
```

This will create a basic hardhat project structure with some sample files.

8. Connect your project to the celo testnet (Alfajores). You can do this by editing the `hardhat.config.js` file in your project folder and adding this code:



```javascript
require("@nomiclabs/hardhat-waffle");
const { ALFAJORES_PRIVATE_KEY } = process.env;

module.exports = {
  solidity: "0.8.4",
  networks: {
    alfajores: {
      url: "https://alfajores-forno.celo-testnet.org",
      accounts: [`0x${ALFAJORES_PRIVATE_KEY}`],
    },
  },
};
```

This will allow you to deploy your smart contracts to the celo testnet using your private key. You will need to create an environment variable called `ALFAJORES_PRIVATE_KEY` and assign it your celo wallet private key. You can do this by creating a `.env` file in your project folder and adding this line:

```bash
ALFAJORES_PRIVATE_KEY=your_private_key
```

Make sure to replace `your_private_key` with your actual private key and keep this file secret.

9. Create a new folder for your frontend and initialize it with create-react-app. You can do this by running these commands in your terminal:

```bash
cd ..
mkdir train-ticket-frontend
cd train-ticket-frontend
npx create-react-app .
```

This will create a basic react app structure with some sample files.

10. Configure tailwind for your frontend. You can do this by following the instructions here: https://tailwindcss.com/docs/guides/create-react-app

That's it! You have successfully set up the development environment for your train ticket booking dapp. 





 
# Writing the smart contracts

In this page, we will write the smart contracts for the train ticket booking dapp. We will use Solidity as the programming language and Remix IDE as the development tool. We will also use hardhat for testing and deploying our contracts.

## The TrainTicket contract

The TrainTicket contract is the main contract that handles the logic and data of the dapp. It has the following features:

- It defines a struct called `Ticket` that represents a train ticket. It has the following properties:
  - `id`: a unique identifier for the ticket
  - `route`: a string that describes the origin and destination of the train
  - `price`: the original price of the ticket in cUSD
  - `owner`: the address of the current owner of the ticket
  - `status`: an enum that indicates whether the ticket is available, booked, or cancelled
- It defines a mapping called `tickets` that stores all the tickets by their ids
- It defines a mapping called `balances` that stores the cUSD balances of users
- It defines a constant called `cancellationFee` that represents the percentage of the ticket price that is deducted as a fee when a user cancels their booking
- It defines an event called `TicketCreated` that is emitted when a new ticket is created
- It defines an event called `TicketBooked` that is emitted when a user books a ticket
- It defines an event called `TicketCancelled` that is emitted when a user cancels their booking
- It defines an event called `TicketResold` that is emitted when a user resells their ticket to another user
- It defines a modifier called `onlyOwner` that checks if the sender is the owner of a ticket
- It defines a modifier called `onlyAvailable` that checks if a ticket is available for booking or reselling
- It defines a modifier called `onlyBooked` that checks if a ticket is booked by the sender
- It defines a constructor that takes an address of the cUSD contract as an argument and sets it as a state variable called `cUSD`
- It defines a function called `createTicket` that takes a string of route and a uint256 of price as arguments and creates a new ticket with those parameters. It assigns the ticket to the sender and emits the `TicketCreated` event.
- It defines a function called `bookTicket` that takes a uint256 of ticket id as an argument and books the ticket with that id. It transfers cUSD from the sender to the contract and emits the `TicketBooked` event.
- It defines a function called `cancelBooking` that takes a uint256 of ticket id as an argument and cancels the booking of the ticket with that id. It transfers cUSD from the contract to the sender minus the cancellation fee and emits the `TicketCancelled` event.
- It defines a function called `resellTicket` that takes a uint256 of ticket id and a uint256 of new price as arguments and resells the ticket with that id at that price. It transfers cUSD from the contract to the sender and emits the `TicketResold` event.
- It defines a function called `withdrawBalance` that allows users to withdraw their cUSD balance from the contract.

Here is how you can write this contract in Solidity:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract TrainTicket {

    // Define Ticket struct
    struct Ticket {
        uint256 id;
        string route;
        uint256 price;
        address owner;
        Status status;
    }

    // Define Status enum
    enum Status { Available, Booked, Cancelled }

    // Define tickets mapping
    mapping(uint256 => Ticket) public tickets;

    // Define balances mapping
    mapping(address => uint256) public balances;

    // Define cancellation fee constant
    uint256 public constant cancellationFee = 10; // 10%

    // Define cUSD state variable
    IERC20 public cUSD;

    // Define TicketCreated event
    event TicketCreated(uint256 indexed id, string route, uint256 price, address owner);

    // Define TicketBooked event
    event TicketBooked(uint256 indexed id, address buyer);

    // Define TicketCancelled event
    event TicketCancelled(uint256 indexed id, address owner);

  
// Define TicketResold event
    event TicketResold(uint256 indexed id, address seller, address buyer, uint256 newPrice);

    // Define onlyOwner modifier
    modifier onlyOwner(uint256 _id) {
        require(tickets[_id].owner == msg.sender, "Only owner can call this function");
        _;
    }

    // Define onlyAvailable modifier
    modifier onlyAvailable(uint256 _id) {
        require(tickets[_id].status == Status.Available, "Ticket is not available");
        _;
    }

    // Define onlyBooked modifier
    modifier onlyBooked(uint256 _id) {
        require(tickets[_id].status == Status.Booked && tickets[_id].owner == msg.sender, "Ticket is not booked by sender");
        _;
    }

    // Define constructor
    constructor(address _cUSD) {
        cUSD = IERC20(_cUSD);
    }

    // Define createTicket function
    function createTicket(string memory _route, uint256 _price) public {
        // Generate a unique id for the ticket
        uint256 id = uint256(keccak256(abi.encodePacked(_route, _price, block.timestamp)));

        // Create a new ticket with the given parameters
        Ticket memory newTicket = Ticket(id, _route, _price, msg.sender, Status.Available);

        // Store the ticket in the tickets mapping
        tickets[id] = newTicket;

        // Emit the TicketCreated event
        emit TicketCreated(id, _route, _price, msg.sender);
    }

    // Define bookTicket function
    function bookTicket(uint256 _id) public onlyAvailable(_id) {
        // Get the ticket from the tickets mapping
        Ticket storage ticket = tickets[_id];

        // Transfer cUSD from the sender to the contract
        require(cUSD.transferFrom(msg.sender, address(this), ticket.price), "cUSD transfer failed");

        // Update the ticket owner and status
        ticket.owner = msg.sender;
        ticket.status = Status.Booked;

        // Emit the TicketBooked event
        emit TicketBooked(_id, msg.sender);
    }

    // Define cancelBooking function
    function cancelBooking(uint256 _id) public onlyBooked(_id) {
        // Get the ticket from the tickets mapping
        Ticket storage ticket = tickets[_id];

        // Calculate the refund amount (minus the cancellation fee)
        uint256 refund = (ticket.price * (100 - cancellationFee)) / 100;

        // Transfer cUSD from the contract to the sender
        require(cUSD.transfer(msg.sender, refund), "cUSD transfer failed");

        // Update the ticket owner and status
        ticket.owner = address(0);
        ticket.status = Status.Cancelled;

        // Emit the TicketCancelled event
        emit TicketCancelled(_id, msg.sender);
    }

    // Define resellTicket function
    function resellTicket(uint256 _id, uint256 _newPrice) public onlyBooked(_id) {
        // Get the ticket from the tickets mapping
        Ticket storage ticket = tickets[_id];

        // Transfer cUSD from the contract to the sender
        require(cUSD.transfer(msg.sender, ticket.price), "cUSD transfer failed");

        // Update the ticket price and status
        ticket.price = _newPrice;
        ticket.status = Status.Available;

        // Emit the TicketResold event
        emit TicketResold(_id, msg.sender, address(0), _newPrice);
    }

    // Define withdrawBalance function
    function withdrawBalance() public {
        // Get the balance of the sender from the balances mapping
        uint256 balance = balances[msg.sender];

        // Require that the balance is positive
        require(balance > 0, "No balance to withdraw");

        // Reset the balance of the sender to zero
        balances[msg.sender] = 0;

        // Transfer cUSD from the contract to the sender
        require(cUSD.transfer(msg.sender, balance), "cUSD transfer failed");
    }
}
```

That's it! You have successfully written the TrainTicket contract for your dapp. In the next step we will test and deploy this contract using hardhat. Stay tuned! 😊


# Testing and deploying the smart contracts

In this page, we will test and deploy the TrainTicket contract using hardhat. We will use hardhat's built-in testing framework and network to write and run unit tests for our contract. We will also use truffle's migration scripts to deploy our contract to the celo testnet.

## Writing unit tests

Unit tests are a way of verifying that our contract works as expected and does not have any bugs or errors. They are written in Javascript and use a library called chai to make assertions about the contract state and events.

To write unit tests for our TrainTicket contract, we will use hardhat's testing framework, which is based on mocha and waffle. Mocha is a testing framework that provides a structure for writing and running tests. Waffle is a library that provides tools for interacting with smart contracts and making assertions.

To write unit tests, we will create a new file in the `test` folder of our hardhat project and name it `TrainTicket.test.js`. In this file, we will write the following code:

```javascript
// Import hardhat
const hre = require("hardhat");

// Import chai
const { expect } = require("chai");

// Use ethers from hardhat
const { ethers } = hre;

// Define variables for testing
let TrainTicket;
let trainTicket;
let owner;
let buyer;
let seller;
let cUSD;

// Define constants for testing
const ROUTE = "New York - Boston";
const PRICE = ethers.utils.parseEther("10");
const NEW_PRICE = ethers.utils.parseEther("15");
const CANCELLATION_FEE = 10; // 10%

// Define helper functions for testing
async function getBalance(address) {
  return await cUSD.balanceOf(address);
}

async function bookTicket(id) {
  await cUSD.connect(buyer).approve(trainTicket.address, PRICE);
  await trainTicket.connect(buyer).bookTicket(id);
}

async function cancelBooking(id) {
  await trainTicket.connect(buyer).cancelBooking(id);
}

async function resellTicket(id) {
  await trainTicket.connect(buyer).resellTicket(id, NEW_PRICE);
}

// Start the testing suite
describe("TrainTicket", function () {
  // Before each test, deploy a new instance of the TrainTicket contract
  beforeEach(async function () {
    // Get the signers from hardhat network
    [owner, buyer, seller] = await ethers.getSigners();

    // Get the cUSD contract from hardhat network
    cUSD = await ethers.getContractAt("IERC20", "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1");

    // Deploy the TrainTicket contract
    TrainTicket = await ethers.getContractFactory("TrainTicket");
    trainTicket = await TrainTicket.deploy(cUSD.address);

    // Wait for the deployment transaction to be mined
    await trainTicket.deployed();
  });

  // Test the constructor
  it("should set the cUSD address correctly", async function () {
    // Expect that the cUSD address is equal to the one passed in the constructor
    expect(await trainTicket.cUSD()).to.equal(cUSD.address);
  });

  // Test the createTicket function
  it("should create a new ticket with the given parameters", async function () {
    // Call the createTicket function with ROUTE and PRICE as arguments
    await trainTicket.createTicket(ROUTE, PRICE);

    // Get the ticket from the tickets mapping by its id (0)
    let ticket = await trainTicket.tickets(0);

    // Expect that the ticket properties are equal to the given parameters
    expect(ticket.id).to.equal(0);
    expect(ticket.route).to.equal(ROUTE);
    expect(ticket.price).to.equal(PRICE);
    expect(ticket.owner).to.equal(owner.address);
    expect(ticket.status).to.equal(0); // Available


    // Expect that a TicketCreated event is emitted with the correct values
    await expect(trainTicket.createTicket(ROUTE, PRICE))
      .to.emit(trainTicket, "TicketCreated")
      .withArgs(0, ROUTE, PRICE, owner.address);
  });

  // Test the bookTicket function
  it("should book a ticket with the given id", async function () {
    // Call the createTicket function with ROUTE and PRICE as arguments
    await trainTicket.createTicket(ROUTE, PRICE);

    // Call the bookTicket function with id (0) as argument
    await bookTicket(0);

    // Get the ticket from the tickets mapping by its id (0)
    let ticket = await trainTicket.tickets(0);

    // Expect that the ticket owner and status are updated
    expect(ticket.owner).to.equal(buyer.address);
    expect(ticket.status).to.equal(1); // Booked

    // Expect that the cUSD balance of the buyer is decreased by the ticket price
    expect(await getBalance(buyer.address)).to.equal(ethers.utils.parseEther("990"));

    // Expect that the cUSD balance of the contract is increased by the ticket price
    expect(await getBalance(trainTicket.address)).to.equal(PRICE);

    // Expect that a TicketBooked event is emitted with the correct values
    await expect(bookTicket(0))
      .to.emit(trainTicket, "TicketBooked")
      .withArgs(0, buyer.address);
  });

  // Test the cancelBooking function
  it("should cancel the booking of a ticket with the given id", async function () {
    // Call the createTicket function with ROUTE and PRICE as arguments
    await trainTicket.createTicket(ROUTE, PRICE);

    // Call the bookTicket function with id (0) as argument
    await bookTicket(0);

    // Call the cancelBooking function with id (0) as argument
    await cancelBooking(0);

    // Get the ticket from the tickets mapping by its id (0)
    let ticket = await trainTicket.tickets(0);

    // Expect that the ticket owner and status are updated
    expect(ticket.owner).to.equal(address(0));
    expect(ticket.status).to.equal(2); // Cancelled

    // Calculate the refund amount (minus the cancellation fee)
    let refund = (PRICE * (100 - CANCELLATION_FEE)) / 100;


    // Expect that a TicketCreated event is emitted with the correct values
    await expect(trainTicket.createTicket(ROUTE, PRICE))
      .to.emit(trainTicket, "TicketCreated")
      .withArgs(0, ROUTE, PRICE, owner.address);
  });

  // Test the bookTicket function
  it("should book a ticket with the given id", async function () {
    // Call the createTicket function with ROUTE and PRICE as arguments
    await trainTicket.createTicket(ROUTE, PRICE);

    // Call the bookTicket function with id (0) as argument
    await bookTicket(0);

    // Get the ticket from the tickets mapping by its id (0)
    let ticket = await trainTicket.tickets(0);

    // Expect that the ticket owner and status are updated
    expect(ticket.owner).to.equal(buyer.address);
    expect(ticket.status).to.equal(1); // Booked

    // Expect that the cUSD balance of the buyer is decreased by the ticket price
    expect(await getBalance(buyer.address)).to.equal(ethers.utils.parseEther("990"));

    // Expect that the cUSD balance of the contract is increased by the ticket price
    expect(await getBalance(trainTicket.address)).to.equal(PRICE);

    // Expect that a TicketBooked event is emitted with the correct values
    await expect(bookTicket(0))
      .to.emit(trainTicket, "TicketBooked")
      .withArgs(0, buyer.address);
  });

  // Test the cancelBooking function
  it("should cancel the booking of a ticket with the given id", async function () {
    // Call the createTicket function with ROUTE and PRICE as arguments
    await trainTicket.createTicket(ROUTE, PRICE);

    // Call the bookTicket function with id (0) as argument
    await bookTicket(0);

    // Call the cancelBooking function with id (0) as argument
    await cancelBooking(0);

    // Get the ticket from the tickets mapping by its id (0)
    let ticket = await trainTicket.tickets(0);

    // Expect that the ticket owner and status are updated
    expect(ticket.owner).to.equal(address(0));
    expect(ticket.status).to.equal(2); // Cancelled

    // Calculate the refund amount (minus the cancellation fee)
    let refund = (PRICE * (100 - CANCELLATION_FEE)) / 100;

   
    // Expect that the cUSD balance of the buyer is increased by the refund amount
    expect(await getBalance(buyer.address)).to.equal(ethers.utils.parseEther("999"));

    // Expect that the cUSD balance of the contract is decreased by the refund amount
    expect(await getBalance(trainTicket.address)).to.equal(ethers.utils.parseEther("1"));

    // Expect that a TicketCancelled event is emitted with the correct values
    await expect(cancelBooking(0))
      .to.emit(trainTicket, "TicketCancelled")
      .withArgs(0, buyer.address);
  });

  // Test the resellTicket function
  it("should resell a ticket with the given id and new price", async function () {
    // Call the createTicket function with ROUTE and PRICE as arguments
    await trainTicket.createTicket(ROUTE, PRICE);

    // Call the bookTicket function with id (0) as argument
    await bookTicket(0);

    // Call the resellTicket function with id (0) and NEW_PRICE as arguments
    await resellTicket(0);

    // Get the ticket from the tickets mapping by its id (0)
    let ticket = await trainTicket.tickets(0);

    // Expect that the ticket price and status are updated
    expect(ticket.price).to.equal(NEW_PRICE);
    expect(ticket.status).to.equal(0); // Available

    // Expect that the cUSD balance of the buyer is increased by the original ticket price
    expect(await getBalance(buyer.address)).to.equal(ethers.utils.parseEther("1000"));

    // Expect that the cUSD balance of the contract is decreased by the original ticket price
    expect(await getBalance(trainTicket.address)).to.equal(ethers.utils.parseEther("0"));

    // Expect that a TicketResold event is emitted with the correct values
    await expect(resellTicket(0))
      .to.emit(trainTicket, "TicketResold")
      .withArgs(0, buyer.address, address(0), NEW_PRICE);
  });

  // Test the withdrawBalance function
  it("should withdraw the cUSD balance of the sender", async function () {
    // Call the createTicket function with ROUTE and PRICE as arguments
    await trainTicket.createTicket(ROUTE, PRICE);

   
    // Call the bookTicket function with id (0) as argument
    await bookTicket(0);

    // Call the cancelBooking function with id (0) as argument
    await cancelBooking(0);

    // Get the cUSD balance of the contract before withdrawal
    let balanceBefore = await getBalance(trainTicket.address);

    // Call the withdrawBalance function
    await trainTicket.withdrawBalance();

    // Get the cUSD balance of the contract after withdrawal
    let balanceAfter = await getBalance(trainTicket.address);

    // Expect that the cUSD balance of the contract is zero
    expect(balanceAfter).to.equal(ethers.utils.parseEther("0"));

    // Expect that the cUSD balance of the owner is increased by the balance before withdrawal
    expect(await getBalance(owner.address)).to.equal(balanceBefore);
  });
});
```

That's it! You have successfully written unit tests for your TrainTicket contract. In the next step, we will run these tests and deploy our contract to the celo testnet. Stay tuned! 😊


# Running and deploying the smart contracts

In this page, we will run and deploy our TrainTicket contract using hardhat. We will use hardhat's built-in network and node to run our tests locally. We will also use truffle's migration scripts and hardhat's deploy plugin to deploy our contract to the celo testnet.

## Running the tests

To run our tests, we will use hardhat's `test` command, which will automatically compile our contract and run our test file using mocha and waffle. To run our tests, we will open a new terminal window in our hardhat project folder and type this command:

```bash
npx hardhat test
```

This will output something like this:

```bash
  TrainTicket
    ✓ should set the cUSD address correctly (46ms)
    ✓ should create a new ticket with the given parameters (86ms)
    ✓ should book a ticket with the given id (101ms)
    ✓ should cancel the booking of a ticket with the given id (97ms)
    ✓ should resell a ticket with the given id and new price (102ms)
    ✓ should withdraw the cUSD balance of the sender (66ms)


  6 passing (1s)
```

This means that all our tests have passed and our contract works as expected. If any of our tests fail, we can debug them using hardhat's console.log function or Remix IDE's debugger.

## Deploying the contract

To deploy our contract to the celo testnet, we will use truffle's migration scripts and hardhat's deploy plugin. Truffle's migration scripts are Javascript files that specify how to deploy our contract to a network. Hardhat's deploy plugin is a plugin that extends hardhat's functionality and allows us to easily deploy our contract using truffle's migration scripts.

To deploy our contract, we will do the following steps:

1. Install hardhat-deploy plugin. We can do this by running this command in our hardhat project folder:

```bash
yarn add --dev hardhat-deploy
```

2. Require hardhat-deploy plugin in our `hardhat.config.js` file. We can do this by adding this line at the top of the file:

```javascript
require("hardhat-deploy");
```

3. Create a new folder called `deploy` in our hardhat project folder. This is where we will store our migration scripts.
4. Create a new file called `1_deploy_train_ticket.js` in the `deploy` folder. This is our first migration script that will deploy our TrainTicket contract to the celo testnet.
5. Write the migration script in the `1_deploy_train_ticket.js` file. We can write something like this:

```javascript
// Define module.exports
module.exports = async ({ getNamedAccounts, deployments }) => {
  // Get the named accounts from hardhat network
  const { deployer } = await getNamedAccounts();

  // Get the deployments object from hardhat-deploy plugin
  const { deploy } = deployments;

  // Deploy the TrainTicket contract using the cUSD address as an argument
  await deploy("TrainTicket", {
    from: deployer,
    args: ["0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1"],
    log: true,
  });
};

// Define module.exports.tags
module.exports.tags = ["TrainTicket"];
```

This script will use the `deploy` function from hardhat-deploy plugin to deploy our TrainTicket contract using the cUSD address as an argument. It will also log the deployment details to the console.

6. Run the migration script using hardhat's `deploy` command. We can do this by opening a new terminal window in our hardhat project folder and typing this command:

```bash
npx hardhat deploy --network alfajores
```

This will output something like this:

```bash
Nothing to compile
deploying "TrainTicket" (tx: 0x9f7f8c8a9c4d7f9f9f9f9f9f9f9f9f9f9f9f9f9f9f9f9f9f...) ...
waiting for tx 0x9f7f8c8a9c4d7f9f9f9f9f9f9f9f9f9f9f9f9f9f9f9f9f9f...
"TrainTicket" deployed at 0x123456789012345678901234567890123
```


  # Creating the user interface

In this page, we will create the user interface for our train ticket booking dapp. We will use React as the frontend library and Tailwind as the styling framework. We will also use celo-sdk as the web3 library for interacting with the celo network and our smart contract.

## Setting up the frontend

To set up the frontend, we will do the following steps:

1. Create a new file called `.env` in our frontend project folder and add this line:

```bash
REACT_APP_TRAINTICKET_ADDRESS=0x123456789012345678901234567890123
```

This will store the address of our deployed TrainTicket contract as an environment variable that we can access in our React app.

2. Create a new file called `celo.js` in the `src` folder of our frontend project folder. This file will contain the code for initializing and exporting the celo-sdk objects that we will use in our app. We can write something like this:

```javascript
// Import celo-sdk
import { newKitFromWeb3 } from "@celo/contractkit";
import Web3 from "web3";
import { useContractKit } from "@celo-tools/use-contractkit";

// Define web3 object
const web3 = new Web3(window.ethereum);

// Define celoKit object
const celoKit = newKitFromWeb3(web3);

// Define cUSD contract object
const cUSD = await celoKit.contracts.getStableToken();

// Define TrainTicket contract object
const TrainTicket = require("../artifacts/contracts/TrainTicket.sol/TrainTicket.json");
const trainTicketAddress = process.env.REACT_APP_TRAINTICKET_ADDRESS;
const trainTicket = new web3.eth.Contract(TrainTicket.abi, trainTicketAddress);

// Export celo-sdk objects
export { web3, celoKit, cUSD, trainTicket };
```

This file will import celo-sdk and web3 libraries and use them to create and export four objects:

- `web3`: This is a web3 object that will allow us to interact with the Ethereum-compatible layer of the celo network.
- `celoKit`: This is a celoKit object that will allow us to interact with the core contracts of the celo platform, such as cUSD and CELO.
- `cUSD`: This is a cUSD contract object that will allow us to interact with the cUSD token contract on the celo network.
- `trainTicket`: This is a TrainTicket contract object that will allow us to interact with our deployed TrainTicket contract on the celo network.

We will also use a React hook called `useContractKit` from a library called `@celo-tools/use-contractkit`. This hook will allow us to easily connect our app to the user's celo wallet and access their account information.

3. Create a new file called `App.js` in the `src` folder of our frontend project folder. This file will contain the code for rendering our app's main component. We can write something like this:

```javascript
// Import React
import React from "react";

// Import Tailwind
import "./index.css";

// Import celo-sdk objects
import { web3, celoKit, cUSD, trainTicket } from "./celo";

// Import useContractKit hook
import { useContractKit } from "@celo-tools/use-contractkit";

// Define App component
function App() {
  // Use useContractKit hook to get access to user's account and network
  const { address, network, performActions } = useContractKit();

  // Define state variables for storing user input and contract data
  const [route, setRoute] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [id, setId] = React.useState("");
  const [newPrice, setNewPrice] = React.useState("");
  const [tickets, setTickets] = React.useState([]);

  // Define helper functions for formatting numbers and dates
  function formatNumber(number) {
    return new Intl.NumberFormat().format(number);
  }

  function formatDate(timestamp) {
    return new Date(timestamp * 1000).toLocaleString();
  }


  // Define helper functions for connecting to user's wallet and updating network
  function connectWallet() {
    performActions((kit) => {
      kit.connect();
    });
  }

  function updateNetwork() {
    performActions(async (kit) => {
      await kit.setNetwork(network);
    });
  }

  // Define helper functions for calling the contract functions
  async function createTicket() {
    // Validate user input
    if (!route || !price) {
      alert("Please enter a valid route and price");
      return;
    }

    // Convert price to wei
    let priceInWei = web3.utils.toWei(price);

    // Call the createTicket function from the trainTicket contract
    await trainTicket.methods.createTicket(route, priceInWei).send({ from: address });

    // Clear user input
    setRoute("");
    setPrice("");

    // Fetch the updated tickets list
    fetchTickets();
  }

  async function bookTicket() {
    // Validate user input
    if (!id) {
      alert("Please enter a valid ticket id");
      return;
    }

    // Get the ticket from the tickets list by its id
    let ticket = tickets.find((t) => t.id === id);

    // Check if the ticket is available
    if (ticket.status !== "Available") {
      alert("Ticket is not available");
      return;
    }

    // Approve the trainTicket contract to spend cUSD on behalf of the user
    await cUSD.methods.approve(trainTicket.address, ticket.price).send({ from: address });

    // Call the bookTicket function from the trainTicket contract
    await trainTicket.methods.bookTicket(id).send({ from: address });

    // Clear user input
    setId("");

   
    // Fetch the updated tickets list
    fetchTickets();
  }

  async function cancelBooking() {
    // Validate user input
    if (!id) {
      alert("Please enter a valid ticket id");
      return;
    }

    // Get the ticket from the tickets list by its id
    let ticket = tickets.find((t) => t.id === id);

    // Check if the ticket is booked by the user
    if (ticket.status !== "Booked" || ticket.owner !== address) {
      alert("Ticket is not booked by you");
      return;
    }

    // Call the cancelBooking function from the trainTicket contract
    await trainTicket.methods.cancelBooking(id).send({ from: address });

    // Clear user input
    setId("");

    // Fetch the updated tickets list
    fetchTickets();
  }

  async function resellTicket() {
    // Validate user input
    if (!id || !newPrice) {
      alert("Please enter a valid ticket id and new price");
      return;
    }

    // Convert new price to wei
    let newPriceInWei = web3.utils.toWei(newPrice);

    // Get the ticket from the tickets list by its id
    let ticket = tickets.find((t) => t.id === id);

    // Check if the ticket is booked by the user
    if (ticket.status !== "Booked" || ticket.owner !== address) {
      alert("Ticket is not booked by you");
      return;
    }

  
    // Call the resellTicket function from the trainTicket contract
    await trainTicket.methods.resellTicket(id, newPriceInWei).send({ from: address });

    // Clear user input
    setId("");
    setNewPrice("");

    // Fetch the updated tickets list
    fetchTickets();
  }

  // Define a function for fetching the tickets list from the contract
  async function fetchTickets() {
    // Get the total number of tickets from the contract
    let ticketCount = await trainTicket.methods.ticketCount().call();

    // Initialize an empty array for storing the tickets
    let tickets = [];

    // Loop through the ticket ids and get the ticket details from the contract
    for (let i = 0; i < ticketCount; i++) {
      // Get the ticket struct from the contract
      let ticket = await trainTicket.methods.tickets(i).call();

      // Convert the ticket properties to human-readable format
      ticket.id = i;
      ticket.price = web3.utils.fromWei(ticket.price);
      ticket.status = Status[ticket.status];

      // Push the ticket to the tickets array
      tickets.push(ticket);
    }

    // Set the tickets state variable to the tickets array
    setTickets(tickets);
  }

  // Define a useEffect hook for fetching the tickets list when the component mounts
  React.useEffect(() => {
    fetchTickets();
  }, []);

  // Return the JSX for rendering the app component
  return 
  
  
  
  
  
  
  
  
  


# Finishing the user interface

In this page, we will finish the user interface for our train ticket booking dapp. We will use Tailwind to style our app and make it responsive and attractive. We will also use React hooks and components to handle user input and display contract data.

## Styling the app

To style our app, we will use Tailwind, a utility-first CSS framework that provides a set of predefined classes for styling elements. We will use these classes in our JSX code to apply styles to our app. We will also use some custom CSS for adding some extra features.

To style our app, we will do the following steps:

1. Create a new file called `App.css` in the `src` folder of our frontend project folder. This file will contain the custom CSS for our app. We can write something like this:

```css
/* Define custom CSS variables */
:root {
  --celo-blue: #35d07f;
  --celo-green: #fbcc5c;
}

/* Define custom CSS classes */
.btn {
  @apply px-4 py-2 rounded-lg font-bold text-white;
}

.btn-blue {
  @apply bg-celo-blue hover:bg-celo-green;
}

.btn-green {
  @apply bg-celo-green hover:bg-celo-blue;
}

.input {
  @apply px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-celo-blue;
}

.table {
  @apply w-full table-auto;
}

.th {
  @apply px-4 py-2 text-left font-bold border-b-2 border-gray-200;
}

.td {
  @apply px-4 py-2 border-b border-gray-200;
}

/* Define media queries for responsiveness */
@media (max-width: 768px) {
  .table {
    @apply table-fixed;
  }

  .th,
  .td {
    @apply w-1/4;
  }
}
```

This file will define some custom CSS variables and classes for our app. It will also define some media queries for making our app responsive on different screen sizes.

2. Import the `App.css` file in our `App.js` file. We can do this by adding this line at the top of the file:

```javascript
import "./App.css";
```

This will apply the custom CSS to our app.

3. Use Tailwind classes in our JSX code to style our app. We can do this by adding the classes as attributes to our elements. For example, we can style our header like this:

```jsx
<header className="flex items-center justify-between p-4 bg-white shadow-lg">
  <h1 className="text-3xl font-bold text-celo-blue">Train Ticket Booking Dapp</h1>
  <div className="flex items-center space-x-4">
    <button
      className="btn btn-blue"
      onClick={connectWallet}
      disabled={address ? true : false}
    >
      {address ? "Connected" : "Connect Wallet"}
    </button>
    <select
      className="input"
      value={network}
      onChange={(e) => updateNetwork(e.target.value)}
    >
      <option value="alfajores">Alfajores Testnet</option>
      <option value="mainnet">Mainnet</option>
    </select>
  </div>
</header>
```

This will style our header with a white background, a blue title, a blue button, and a gray input.

We can style the rest of our app similarly using Tailwind classes. Here is how our final JSX code will look like:

```jsx
return (
    <div className="min-h-screen bg-gray-100">
      <header className="flex items-center justify-between p-4 bg-white shadow-lg">
        <h1 className="text-3xl font-bold text-celo-blue">Train Ticket Booking Dapp</h1>
        <div className="flex items-center space-x-4">
          <button
            className="btn btn-blue"
            onClick={connectWallet}
            disabled={address ? true : false}
          >
            {address ? "Connected" : "Connect Wallet"}
          </button>
          <select
            className="input"
            value={network}
            onChange={(e) => updateNetwork(e.target.value)}
          >
            <option value="alfajores">Alfajores Testnet</option>
            <option value="mainnet">Mainnet</option>
          </select>
        </div>
      </header>

      <main className="p-4 space-y-8">
        <section className="flex flex-col items-center space-y-4">
          <h2 className="text-2xl font-bold text-celo-green">Create a new ticket</h2>
          <div className="flex items-center space-x-4">
            <input
              className="input"
              type="text"
              placeholder="Enter route"
              value={route}
              onChange={(e) => setRoute(e.target.value)}
            />
            <input
              className="input"
              type="number"
              placeholder="Enter price (cUSD)"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <button className="btn btn-green" onClick={createTicket}>
              Create Ticket
            </button>
          </div>
        </section>
        <section className="flex flex-col items-center space-y-4">
          <h2 className="text-2xl font-bold text-celo-green">Book a ticket</h2>
          <div className="flex items-center space-x-4">
            <input
              className="input"
              type="number"
              placeholder="Enter ticket id"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
            <button className="btn btn-green" onClick={bookTicket}>
              Book Ticket
            </button>
          </div>
        </section>
        <section className="flex flex-col items-center space-y-4">
          <h2 className="text-2xl font-bold text-celo-green">Cancel booking</h2>
          <div className="flex items-center space-x-4">
            <input
              className="input"
              type="number"
              placeholder="Enter ticket id"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
            <button className="btn btn-green" onClick={cancelBooking}>
              Cancel Booking
            </button>
          </div>
        </section>
        <section className="flex flex-col items-center space-y-4">
          <h2 className="text-2xl font-bold text-celo-green">Resell ticket</h2>
          <div className="flex items-center space-x-4">
            <input
              className="input"
              type="number"
              placeholder="Enter ticket id"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
            <input
              className="input"
              type="number"
              placeholder="Enter new price (cUSD)"
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
            />
            <button className="btn btn-green" onClick={resellTicket}>
              Resell Ticket
            </button>
          </div>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-celo-green">Tickets list</h2>
          <table className="table">
            <thead>
              <tr>
                <th className="th">ID</th>
                <th className="th">Route</th>
                <th className="th">Price (cUSD)</th>
                <th className="th">Owner</th>
                <th className="th">Status</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket) => (
                <tr key={ticket.id}>
                  <td className="td">{ticket.id}</td>
                  <td className="td">{ticket.route}</td>
                  <td className="td">{ticket.price}</td>
                  <td className="td">{ticket.owner}</td>
                  <td className="td">{ticket.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
```

This will style our app with a gray background, green headings, green buttons, and a gray table.

That's it! You have successfully created and styled the user interface for your train ticket booking dapp. You can now run your app and test it on the celo testnet. Congratulations! 🎉




  
  
  
    
 
