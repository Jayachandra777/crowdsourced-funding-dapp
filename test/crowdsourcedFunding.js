const { expect } = require("chai");

describe("CrowdsourcedFunding", function () {
  it("Should create a new project", async function () {
    const CrowdsourcedFunding = await ethers.getContractFactory("CrowdsourcedFunding");
    const crowdsourcedFunding = await CrowdsourcedFunding.deploy();

    await crowdsourcedFunding.createProject("New Project", 1000,1);

    const projectCount = await crowdsourcedFunding.getProjectCount();
    const project = await crowdsourcedFunding.getProject(projectCount - 1);

    expect(project.title).to.equal("New Project");
    expect(project.goalAmount).to.equal(1000);
    expect(project.currentAmount).to.equal(0);
    expect(project.contributorsCount).to.equal(0);
  });

  it("Should contribute to a project", async function () {
    const CrowdsourcedFunding = await ethers.getContractFactory("CrowdsourcedFunding");
    const crowdsourcedFunding = await CrowdsourcedFunding.deploy();

    await crowdsourcedFunding.createProject("New Project", 1000,1);
    await crowdsourcedFunding.contribute(0, { value: 500 });

    const project = await crowdsourcedFunding.getProject(0);

    expect(project.currentAmount).to.equal(500);
    expect(project.contributorsCount).to.equal(1);
  });
  
  
});
