// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract NFT {
  // NFT contract implementation
}

contract CrowdsourcedFunding {
  NFT public nftContract;

  struct Project {
    address creator;
    string title;
    uint256 goalAmount;
    uint256 currentAmount;
    uint256 contributorsCount;
    uint256 nftTokenId;
  }

  mapping(uint256 => mapping(address => uint256)) public contributions;
  Project[] public projects;

  event ProjectCreated(address indexed creator, string title, uint256 goalAmount);
  event ContributionAdded(address indexed contributor, uint256 amount);
  event ProjectFunded(address indexed creator, uint256 amount, uint256 nftTokenId);

  constructor() {
    nftContract = new NFT();
  }

  function createProject(string memory _title, uint256 _goalAmount, uint256 _nftTokenId) external {
    Project memory newProject = Project({
      creator: msg.sender,
      title: _title,
      goalAmount: _goalAmount,
      currentAmount: 0,
      contributorsCount: 0,
      nftTokenId: _nftTokenId
    });

    projects.push(newProject);

    emit ProjectCreated(msg.sender, _title, _goalAmount);
  }

  function contribute(uint256 _projectId) external payable {
    require(_projectId < projects.length, "Invalid project ID");
    Project storage project = projects[_projectId];
    require(project.currentAmount < project.goalAmount, "Goal amount reached");

    contributions[_projectId][msg.sender] += msg.value;
    project.currentAmount += msg.value;
    project.contributorsCount++;

    emit ContributionAdded(msg.sender, msg.value);

    if (project.currentAmount >= project.goalAmount) {
      emit ProjectFunded(project.creator, project.currentAmount, project.nftTokenId);
    }
  }

  function getProjectCount() external view returns (uint256) {
    return projects.length;
  }

  function getProject(uint256 _projectId) external view returns (
    address creator,
    string memory title,
    uint256 goalAmount,
    uint256 currentAmount,
    uint256 contributorsCount
  ) {
    require(_projectId < projects.length, "Invalid project ID");
    Project storage project = projects[_projectId];
    return (
      project.creator,
      project.title,
      project.goalAmount,
      project.currentAmount,
      project.contributorsCount
    );
  }
}
